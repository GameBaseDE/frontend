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
    hasError: false
  };

  portAlloc = {
    value: '',
    hasError: false
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
    console.log("> onInputPortAlloc(" + value + ")");
    console.log(">> isNumericList: " + this.isNumericList(value));
    value.split(",").forEach(element => {
      if (!(element.length > 0)) { return; }
      console.log(">> isValueInValidRange(" + element + "): " + this.isValueInValidRange(element));
    });
  }

  private isNumericList(input: string): boolean {
    let result = input.match(CreateServerWizardComponent.numericListRegExp);
    return result !== null && result.length > 0;
  }

  private isValueInValidRange(input: any): boolean {
    return input >= 1024 && input <= 65565;
  }
}
