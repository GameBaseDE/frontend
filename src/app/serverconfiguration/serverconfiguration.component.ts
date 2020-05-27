import {Component, OnInit} from '@angular/core';
import {GameContainerConfiguration, GameContainerStatus, RestartBehavior} from '../rest-client/models';
import {ToastrService} from 'ngx-toastr';
import {GameserverService} from '../rest-client/services';
import {ActivatedRoute, Router} from '@angular/router';
import {Constants, EnumUtils, StringUtils} from '../global';

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

  private static numericListRegExp: RegExp = /^\d{1,5}(,\d{1,5})*$/gm;
  private static numericValuesOnlyRegExp: RegExp = /^\d+$/g;
  private static redirectRoute = ['/dashboard'];

  restartBehaviorOptions = [
    {value: 'none', label: 'None', checked: true},
    {value: 'unless-stopped', label: 'Unless stopped'},
    {value: 'on-failure', label: 'On failure'},
    {value: 'always', label: 'Always'},
  ];
  generalDetails = {
    serverName: {
      value: '',
      hasError: false,
    },
    description: undefined,
    // ToDo: Replace dummyOwnerId with user system in the future
    ownerId: Constants.dummyOwnerId
  }
  resources = {
    templatePath: {
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
  /**
   * This is a wrapper which is to be used in HTML templates only!
   */

  gbPortType = PortType;

  private currentServer: GameContainerStatus;

  constructor(
    private toastr: ToastrService,
    private gameServerService: GameserverService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  private static isNumericList(input: string): boolean {
    const result = input.match(ServerConfigurationComponent.numericListRegExp);
    return result !== null && result.length > 0;
  }

  private static isValueInValidRange(input: any): boolean {
    return input >= 1 && input <= 65565;
  }

  private static isNumericOnly(input: any): boolean {
    const result = input.match(ServerConfigurationComponent.numericValuesOnlyRegExp);
    return result !== null && result.length > 0;
  }

  async ngOnInit() {
    await this.route.params.subscribe(
      params => {
        const id = params.id;
        if (!StringUtils.isEmptyOrNull(id)) {
          this.gameServerService.getStatus(undefined).subscribe(
            result => {
              const filterResult = result.filter(value => value.id === id);

              if (filterResult && filterResult.length > 0) {
                this.currentServer = result[0];
                this.updateAllInfos();
              } else {
                this.router.navigate(ServerConfigurationComponent.redirectRoute);
                this.displayErrorWithStrings(
                  'Error on access!',
                  `Could not access configuration page as the provided ID ${id} is invalid.`
                );
              }
            }
          );
        } else {
          this.router.navigate(ServerConfigurationComponent.redirectRoute);
          this.displayErrorWithStrings(
            'Error on access!',
            `Could not access configuration page as the provided ID ${id} is invalid.`
          );
        }
      },
      error => {
        this.router.navigate(ServerConfigurationComponent.redirectRoute);
        this.displayErrorWithStrings(
          'Error on access!',
          `Could not access configuration page. (${error})`
        );
        console.error(error);
      }
    );
  }

  apply() {
    const resources = this.resources;
    const generalDetails = this.generalDetails;

    if ((resources.memoryAlloc.hasError || StringUtils.isEmptyOrNull(resources.memoryAlloc.value))
      && (resources.portAlloc.tcp.hasError || StringUtils.isEmptyOrNull(resources.portAlloc.tcp.rawValue))
      && (resources.portAlloc.udp.hasError || StringUtils.isEmptyOrNull(resources.portAlloc.udp.rawValue))
      && (resources.templatePath.hasError || StringUtils.isEmptyOrNull(resources.templatePath.value))
      && (generalDetails.serverName.hasError || StringUtils.isEmptyOrNull(generalDetails.serverName.value))) {
      this.displayErrorWithStrings(
        'Error while submitting',
        'There are errors in your provided input values.'
      );
      return;
    } else {
      const configuration: GameContainerConfiguration = {
        details: {
          ownerId: Constants.dummyOwnerId,
          description: generalDetails.description,
          serverName: generalDetails.serverName.value
        },
        resources: {
          templatePath: resources.templatePath.value,
          memory: resources.memoryAlloc.value as unknown as number,
          ports: {
            tcp: resources.portAlloc.tcp.parsedValues,
            udp: resources.portAlloc.udp.parsedValues
          },
          restartBehavior: EnumUtils.getKeyByValue(RestartBehavior, resources.restartBehavior),
          startupArgs: resources.startupArgs
        }
      };

      this.gameServerService.configureContainer({id: this.currentServer.id, body: configuration}).subscribe(
        result => {
          this.router.navigate(ServerConfigurationComponent.redirectRoute);
          this.displaySuccess(
            'Configuration applied',
            `Your new configurations have been applied to game server ${this.currentServer.id}.`
          );
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

  updateTemplatePath(image: string) {
    this.resources.templatePath.hasError = !(image.length > 0);
    this.resources.templatePath.value = image;
  }

  updateMemoryAlloc(value: string) {
    this.resources.memoryAlloc.hasError = false;
    this.resources.memoryAlloc.value = value;

    // @ts-ignore
    // tslint:disable-next-line:triple-equals
    if (!(ServerConfigurationComponent.isNumericOnly(value) || value == -1)) {
      this.resources.memoryAlloc.hasError = true;
      this.resources.memoryAlloc.errorMessage = 'Only numeric values are allowed!';
      return;
    }
  }

  updatePortAlloc(portType: PortType, value: string) {
    this.resources.portAlloc[portType].hasError = false;
    this.resources.portAlloc[portType].rawValue = value;
    this.resources.portAlloc[portType].faultyValues = [];

    this.resources.portAlloc[portType].hasError
      = !(StringUtils.isEmptyOrNull(value) || ServerConfigurationComponent.isNumericList(value));
    if (this.resources.portAlloc[portType].hasError) {
      this.resources.portAlloc[portType].errorMessage = 'Your input does not match a comma-separated list!';
      return;
    }

    this.resources.portAlloc[portType].parsedValues = [];

    value.split(',').forEach(element => {
      if (!(element.length > 0)) {
        return;
      }
      this.resources.portAlloc[portType].parsedValues.push(element);

      if (!ServerConfigurationComponent.isValueInValidRange(element)) {
        this.resources.portAlloc[portType].hasError = true;
        this.resources.portAlloc[portType].faultyValues.push(element);
      }
    });

    this.resources.portAlloc[portType].errorMessage
      = `The following values are not in allowed range: ${this.resources.portAlloc[portType].faultyValues}`;
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
    const details = this.currentServer.configuration.details;
    const resources = this.currentServer.configuration.resources;
    const ports = this.currentServer.configuration.resources.ports;

    this.updateServerName(details.serverName ?? '');
    this.updateDescription(details.description ?? '');


    if (ports) {
      this.updatePortAlloc(PortType.TCP, ports.tcp.join(',') ?? '');
      this.updatePortAlloc(PortType.UDP, ports.udp.join(',') ?? '');
    } else {
      this.updatePortAlloc(PortType.TCP, '');
      this.updatePortAlloc(PortType.UDP, '');
    }

    this.updateTemplatePath(resources.templatePath ?? '');
    this.updateMemoryAlloc((resources.memory ?? '-1').toString());
    this.updateStartupArgs(resources.startupArgs ?? '');
    this.setRestartBehaviorOption(resources.restartBehavior ?? 'none');
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
