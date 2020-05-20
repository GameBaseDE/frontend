import { Component, OnInit } from '@angular/core';
import { GameServerDeployTemplate } from '../rest-client/models';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../rest-client/services';
import { Router, ActivatedRoute, ParamMap, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-serverconfiguration',
  templateUrl: './serverconfiguration.component.html',
  styleUrls: ['./serverconfiguration.component.scss']
})
export class ServerConfigurationComponent implements OnInit, Resolve<null> {

  restartBehaviorOptions = [
    { value: 'none', label: 'None', checked: true },
    { value: 'unless-stopped', label: 'Unless stopped' },
    { value: 'on-failure', label: 'On failure' },
    { value: 'always', label: 'Always' },
  ];

  deployTemplate: GameServerDeployTemplate = {
    image: null,
    ownerId: null
  }

  dockerImage = {
    value: '',
    hasError: false,
  };

  startupArgs = '';

  memoryAlloc = {
    value: '',
    hasError: false,
    errorMessage: null,
  };

  portAlloc = {
    rawValue: '',
    parsedValues: [],
    hasError: false,
    errorMessage: null,
    faultyValues: [],
  };

  private static numericListRegExp: RegExp = /^\d{1,5}(,\d{1,5})*$/gm;
  private static numericValuesOnlyRegExp: RegExp = /^\d+$/g;
  private static dashboardRoute = ['dashboard'];

  private serverId: Observable<string>;

  constructor(
    private toastr: ToastrService,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let id = route.paramMap.get('id');

    if (id === null || id.length === 0) {
      this.router.navigate(ServerConfigurationComponent.dashboardRoute);
      this.displayError('Error on access!', 'Could not access configuration page as the provided ID is invalid.');
    } else {
      return null;
    }
  }

  ngOnInit(): void {
    this.serverId = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        params.get('id')
      )
    );
  }

  onSubmitButtonClick(): void {
    console.log('> Create Game Server clicked!');
    console.log('>> Docker image: ' + this.dockerImage);
    console.log('>> Startup args: ' + this.startupArgs);
    console.log('>> Memory alloc: ' + this.memoryAlloc);
    console.log('>> Port alloc: ' + this.portAlloc);

    if ((this.memoryAlloc.hasError || !(this.memoryAlloc.value.length > 0))
        && (this.portAlloc.hasError || !(this.portAlloc.rawValue.length > 0))
        && (this.dockerImage.hasError || !(this.dockerImage.value.length > 0))) {
      this.displayError('Error while submitting', 'There are errors in your provided input values.');
      return;
    } else {
      this.deployTemplate.image = this.dockerImage.value;

      this.api.deployContainer({body: this.deployTemplate}).subscribe((result) => {
        this.router.navigate(ServerConfigurationComponent.dashboardRoute);
        this.displaySuccess('Success!', 'Your container ' + /*result. +*/ ' has been deployed!');
      },
      (error) => {
        this.displayError('Deployment error', 'An error occurred while deploying your container: ' + error);
        console.error(error);
      });
    }
  }

  onCancelButtonClick(event: any): void {
    this.router.navigate(ServerConfigurationComponent.dashboardRoute);
  }

  onInputDockerImage(event: any): void {
    let value = event.target.value;
    this.dockerImage.hasError = !(value.length > 0);
  }

  onInputMemoryAlloc(event: any): void {
    let value = event.target.value;
    this.memoryAlloc.hasError = false;

    if (!(this.isNumericOnly(value) || value == -1)) {
      this.memoryAlloc.hasError = true;
      this.memoryAlloc.errorMessage = 'Only numeric values are allowed!';
      return;
    }
  }

  onInputPortAlloc(event: any): void {
    let value = event.target.value;
    this.portAlloc.hasError = false;
    this.portAlloc.faultyValues = [];

    console.log("> onInputPortAlloc(" + value + ")");
    console.log(">> isNumericList: " + this.isNumericList(value));

    this.portAlloc.hasError = !this.isNumericList(value);
    if (this.portAlloc.hasError) {
      this.portAlloc.errorMessage = 'Your input does not match a comma-separated list!';
      return;
    }

    value.split(",").forEach(element => {
      if (!(element.length > 0)) { return; }
      this.portAlloc.parsedValues.push(element);
      console.log(">> isValueInValidRange(" + element + "): " + this.isValueInValidRange(element));

      if (!this.isValueInValidRange(element)) {
        this.portAlloc.hasError = true;
        this.portAlloc.faultyValues.push(element);
      }
    });

    this.portAlloc.errorMessage = "The following values are not in allowed range: " + this.portAlloc.faultyValues;
  }

  private displayError(title: string, description: string): void {
    this.toastr.error(description, title);
  }

  private displaySuccess(title: string, description: string): void {
    this.toastr.success(description, title);
  }

  private isNumericList(input: string): boolean {
    let result = input.match(ServerConfigurationComponent.numericListRegExp);
    return result !== null && result.length > 0;
  }

  private isValueInValidRange(input: any): boolean {
    return input >= 1024 && input <= 65565;
  }

  private isNumericOnly(input: any): boolean {
    let result = input.match(ServerConfigurationComponent.numericValuesOnlyRegExp);
    return result !== null && result.length > 0;
  }
}
