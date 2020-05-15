import { Component, OnInit } from '@angular/core';
import { GameServerDeployTemplate } from '../rest-client/models';

@Component({
  selector: 'app-createserverwizard',
  templateUrl: './createserver.component.html',
  styleUrls: ['./createserver.component.scss']
})
export class CreateServerWizardComponent implements OnInit {

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

  dockerImage = '';

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

  constructor() { }

  ngOnInit(): void {
  }

  submit(): void {
    console.log('> Create Game Server clicked!');
    console.log('>> Docker image: ' + this.dockerImage);
    console.log('>> Startup args: ' + this.startupArgs);
    console.log('>> Memory alloc: ' + this.memoryAlloc);
    console.log('>> Port alloc: ' + this.portAlloc);
  }

  onInputMemoryAlloc(event: any): void {
    // let value = event.target.value;
    // if (this.isNumericList(value) && this.isValueInValidRange(value)) {
    //   console.log(value + " is a numericLis")
    // }
  }

  onInputPortAlloc(event: any): void {
    let value = event.target.value;
    this.portAlloc.hasError = false;
    this.portAlloc.faultyValues = [];

    console.log("> onInputPortAlloc(" + value + ")");
    console.log(">> isNumericList: " + this.isNumericList(value));

    this.portAlloc.hasError = !this.isNumericList(value);
    if (this.portAlloc.hasError) {
      this.portAlloc.errorMessage = "Your input does not match a comma-separated list!";
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

  private isNumericList(input: string): boolean {
    let result = input.match(CreateServerWizardComponent.numericListRegExp);
    return result !== null && result.length > 0;
  }

  private isValueInValidRange(input: any): boolean {
    return input >= 1024 && input <= 65565;
  }
}
