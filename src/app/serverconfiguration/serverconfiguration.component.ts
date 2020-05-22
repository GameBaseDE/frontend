import { Component, OnInit } from '@angular/core';
import {GameServerConfigurationTemplate, GameServerStatus} from '../rest-client/models';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../rest-client/services';
import { Router, ActivatedRoute, ParamMap, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Constants, StringUtils } from '../global';
import {rejects} from "assert";

@Component({
  selector: 'app-serverconfiguration',
  templateUrl: './serverconfiguration.component.html',
  styleUrls: ['./serverconfiguration.component.scss']
})
export class ServerConfigurationComponent implements OnInit {

  restartBehaviorOptions = [
    { value: 'none', label: 'None', checked: true },
    { value: 'unless-stopped', label: 'Unless stopped' },
    { value: 'on-failure', label: 'On failure' },
    { value: 'always', label: 'Always' },
  ];

  // deployTemplate: GameServerDeployTemplate = {
  //   image: null,
  //   ownerId: Global.dummyOwnerId
  // }

  generalDetails = {
    serverName: '',
    description: null,
    ownerId: Constants.dummyOwnerId
  }

  resources = {
    dockerImage: {
      value: '',
      hasError: false,
    },
    startupArgs: '',
    memoryAlloc: {
      value: '',
      hasError: false,
      errorMessage: null,
    },
    portAlloc: {
      rawValue: '',
      parsedValues: [],
      hasError: false,
      errorMessage: null,
      faultyValues: [],
    },
    restartBehavior: ''
  }

  private static numericListRegExp: RegExp = /^\d{1,5}(,\d{1,5})*$/gm;
  private static numericValuesOnlyRegExp: RegExp = /^\d+$/g;
  private static redirectRoute = ['/dashboard'];

  private currentServer: GameServerStatus;

  constructor(
    private toastr: ToastrService,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    await this.route.params.subscribe(
      params => {
        const id = params['id'];
        if (!StringUtils.isEmptyOrNull(id)) {
          this.api.getStatus(null).subscribe(
            result => {
              const filterResult = result.filter(value => value.id === id);

              if (filterResult && filterResult.length > 0) {
                this.currentServer = result[0];
              } else {
                this.router.navigate(ServerConfigurationComponent.redirectRoute);
                this.displayErrorWithStrings('Error on access!', `Could not access configuration page as the provided ID ${id} is invalid.`);
              }
            }
          );
        } else {
          this.router.navigate(ServerConfigurationComponent.redirectRoute);
          this.displayErrorWithStrings('Error on access!', `Could not access configuration page as the provided ID ${id} is invalid.`);
        }
      },
      error => {
        this.router.navigate(ServerConfigurationComponent.redirectRoute);
        console.error('Fehler!')
        this.displayErrorWithStrings('Error on access!', `Could not access configuration page. (${error})`);
        console.error(error);
      }
    );
  }

  apply() {
    const resources = this.resources;
    const generalDetails = this.generalDetails;
    console.log('> Create Game Server clicked!');
    console.log('>> Docker image: ' + resources.dockerImage);
    console.log('>> Startup args: ' + resources.startupArgs);
    console.log('>> Memory alloc: ' + resources.memoryAlloc);
    console.log('>> Port alloc: ' + resources.portAlloc);

    if ((resources.memoryAlloc.hasError || StringUtils.isEmptyOrNull(resources.memoryAlloc.value))
        && (resources.portAlloc.hasError || StringUtils.isEmptyOrNull(resources.portAlloc.rawValue))
        && (resources.dockerImage.hasError || StringUtils.isEmptyOrNull(resources.dockerImage.value))
        && StringUtils.isEmptyOrNull(generalDetails.serverName)) {
      this.displayErrorWithStrings('Error while submitting', 'There are errors in your provided input values.');
      return;
    } else {
      //this.deployTemplate.image = this.dockerImage.value;

      // this.api.deployContainer({body: this.deployTemplate}).subscribe(
      //   (result) => {
      //     this.router.navigate(ServerConfigurationComponent.dashboardRoute);
      //     this.displaySuccess('Success!', `Your game server has been deployed`);
      //   },
      //   (error) => {
      //     this.displayError('Deployment error', error);
      //     console.error(error);
      // });
      let configuration: GameServerConfigurationTemplate = {
        details: {
          ownerId: Constants.dummyOwnerId,
          description: generalDetails.description,
          serverName: generalDetails.serverName
        },
        resources: {
          image: resources.dockerImage.value,
          memory: resources.memoryAlloc.value as unknown as number,
          //ports: resources.portAlloc.parsedValues,
          //restartBehavior: resources.restartBehavior,
          startupArgs: resources.startupArgs
        }
      };

      this.api.configureContainer({body: configuration}).subscribe(
        result => {
          this.router.navigate(ServerConfigurationComponent.redirectRoute);
          this.displaySuccess('Configuration applied', `Your new configurations have been applied to game server ${this.currentServer.id}.`);
          console.log(result);
        },
        error => {
          this.displayError('Configuration failed', error);
          console.error(error);
        }
      );
    }
  }

  cancel() {
    this.router.navigate(ServerConfigurationComponent.redirectRoute);
  }

  updateDescription(description: string) {
    this.generalDetails.description = description;
  }

  updateDockerImage(image: string) {
    this.resources.dockerImage.hasError = !(image.length > 0);
  }

  updateMemoryAlloc(value: string) {
    this.resources.memoryAlloc.hasError = false;

    // @ts-ignore
    if (!(ServerConfigurationComponent.isNumericOnly(value) || value == -1)) {
      this.resources.memoryAlloc.hasError = true;
      this.resources.memoryAlloc.errorMessage = 'Only numeric values are allowed!';
      return;
    }
  }

  updatePortAlloc(value: string) {
    this.resources.portAlloc.hasError = false;
    this.resources.portAlloc.faultyValues = [];

    console.log("> onInputPortAlloc(" + value + ")");
    console.log(">> isNumericList: " + ServerConfigurationComponent.isNumericList(value));

    this.resources.portAlloc.hasError = !ServerConfigurationComponent.isNumericList(value);
    if (this.resources.portAlloc.hasError) {
      this.resources.portAlloc.errorMessage = 'Your input does not match a comma-separated list!';
      return;
    }

    value.split(",").forEach(element => {
      if (!(element.length > 0)) { return; }
      this.resources.portAlloc.parsedValues.push(element);
      console.log(">> isValueInValidRange(" + element + "): " + ServerConfigurationComponent.isValueInValidRange(element));

      if (!ServerConfigurationComponent.isValueInValidRange(element)) {
        this.resources.portAlloc.hasError = true;
        this.resources.portAlloc.faultyValues.push(element);
      }
    });

    this.resources.portAlloc.errorMessage = `The following values are not in allowed range: ${this.resources.portAlloc.faultyValues}`;
  }

  updateServerName(name: string) {
    this.generalDetails.serverName = name;
  }

  updateStartupArgs(args: string) {
    this.resources.startupArgs = args;
  }

  /**
   * This is a wrapper which is to be used in HTML templates only!
   */
  isStringEmptyOrNull = StringUtils.isEmptyOrNull;

  private displayError(title: string, error: any) {
    this.toastr.error(error.details, title);
  }

  private displayErrorWithStrings(title: string, description: string) {
    this.toastr.error(description, title);
  }

  private displaySuccess(title: string, description: string) {
    this.toastr.success(description, title);
  }

  private static isNumericList(input: string): boolean {
    let result = input.match(ServerConfigurationComponent.numericListRegExp);
    return result !== null && result.length > 0;
  }

  private static isValueInValidRange(input: any): boolean {
    return input >= 1 && input <= 65565;
  }

  private static isNumericOnly(input: any): boolean {
    let result = input.match(ServerConfigurationComponent.numericValuesOnlyRegExp);
    return result !== null && result.length > 0;
  }
}
