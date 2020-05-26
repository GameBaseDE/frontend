import { Component, OnInit } from '@angular/core';
import {GameServerConfigurationTemplate, GameServerStatus, RestartBehavior} from '../rest-client/models';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../rest-client/services';
import { Router, ActivatedRoute, ParamMap, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import {Constants, EnumUtils, StringUtils} from '../global';
import {rejects} from "assert";

enum PortType {
  UDP = 'udp',
  TCP = 'tcp'
}

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
    serverName: {
      value: '',
      hasError: false,
    },
    description: undefined,
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
      errorMessage: undefined,
    },
    portAlloc: {
      tcp: {
        rawValue: '',
        parsedValues: [],
        hasError: false,
        errorMessage: undefined,
        faultyValues: [],
      },
      udp: {
        rawValue: '',
        parsedValues: [],
        hasError: false,
        errorMessage: undefined,
        faultyValues: [],
      }
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
          this.api.getStatus(undefined).subscribe(
            result => {
              const filterResult = result.filter(value => value.id === id);

              if (filterResult && filterResult.length > 0) {
                this.currentServer = result[0];
                this.updateAllInfos();
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
        && (resources.portAlloc.tcp.hasError || StringUtils.isEmptyOrNull(resources.portAlloc.tcp.rawValue))
        && (resources.portAlloc.udp.hasError || StringUtils.isEmptyOrNull(resources.portAlloc.udp.rawValue))
        && (resources.dockerImage.hasError || StringUtils.isEmptyOrNull(resources.dockerImage.value))
        && (generalDetails.serverName.hasError || StringUtils.isEmptyOrNull(generalDetails.serverName.value))) {
      this.displayErrorWithStrings('Error while submitting', 'There are errors in your provided input values.');
      return;
    } else {
      let configuration: GameServerConfigurationTemplate = {
        details: {
          ownerId: Constants.dummyOwnerId,
          description: generalDetails.description,
          serverName: generalDetails.serverName.value
        },
        resources: {
          image: resources.dockerImage.value,
          memory: resources.memoryAlloc.value as unknown as number,
          ports: {
            tcp: resources.portAlloc.tcp.parsedValues,
            udp: resources.portAlloc.udp.parsedValues
          },
          restartBehavior: EnumUtils.getKeyByValue(RestartBehavior, resources.restartBehavior),
          startupArgs: resources.startupArgs
        }
      };

      console.log(configuration);

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
    this.resources.dockerImage.value = image;
  }

  updateMemoryAlloc(value: string) {
    this.resources.memoryAlloc.hasError = false;
    this.resources.memoryAlloc.value = value;

    // @ts-ignore
    if (!(ServerConfigurationComponent.isNumericOnly(value) || value == -1)) {
      this.resources.memoryAlloc.hasError = true;
      this.resources.memoryAlloc.errorMessage = 'Only numeric values are allowed!';
      return;
    }
  }

  /**
   * This is a wrapper which is to be used in HTML templates only!
   */
  gbPortType = PortType;

  updatePortAlloc(portType: PortType, value: string) {
    this.resources.portAlloc[portType].hasError = false;
    this.resources.portAlloc[portType].rawValue = value;
    this.resources.portAlloc[portType].faultyValues = [];

    this.resources.portAlloc[portType].hasError = !(StringUtils.isEmptyOrNull(value) || ServerConfigurationComponent.isNumericList(value));
    if (this.resources.portAlloc[portType].hasError) {
      this.resources.portAlloc[portType].errorMessage = 'Your input does not match a comma-separated list!';
      return;
    }

    value.split(",").forEach(element => {
      if (!(element.length > 0)) { return; }
      this.resources.portAlloc[portType].parsedValues.push(element);

      if (!ServerConfigurationComponent.isValueInValidRange(element)) {
        this.resources.portAlloc[portType].hasError = true;
        this.resources.portAlloc[portType].faultyValues.push(element);
      }
    });

    this.resources.portAlloc[portType].errorMessage = `The following values are not in allowed range: ${this.resources.portAlloc[portType].faultyValues}`;
  }

  updateServerName(name: string) {
    this.generalDetails.serverName.hasError = StringUtils.isEmptyOrNull(name);
    this.generalDetails.serverName.value = name;
  }

  updateStartupArgs(args: string) {
    this.resources.startupArgs = args;
  }

  /**
   * Updates all models values in this component.
   */
  private updateAllInfos() {
    this.updateServerName(this.currentServer.gameTag);
    this.updateDescription(this.currentServer.description ?? '');
    this.updateDockerImage(this.currentServer.image);

    if (this.currentServer.ports) {
      this.updatePortAlloc(PortType.TCP, this.currentServer.ports.tcp.join(',') ?? '');
      this.updatePortAlloc(PortType.UDP, this.currentServer.ports.udp.join(',') ?? '');
    } else {
      this.updatePortAlloc(PortType.TCP, '');
      this.updatePortAlloc(PortType.UDP, '');
    }

    this.updateMemoryAlloc((this.currentServer.memory ?? '-1').toString());
    this.updateStartupArgs(this.currentServer.startupArgs ?? '');
    this.setRestartBehaviorOption(this.currentServer.restartBehavior ?? 'none');
  }

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

  /**
   * Set restart behavior option based of a string value.
   * @param restartBehavior option as string
   */
  private setRestartBehaviorOption(restartBehavior: string) {
    if (restartBehavior === null) {
      return;
    }

    this.restartBehaviorOptions.forEach(
      option => {
        if (option.value === restartBehavior) {
          this.resources.restartBehavior = restartBehavior;
          return;
        }
      }
    );
  }
}
