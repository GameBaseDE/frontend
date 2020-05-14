import { Component, OnInit } from '@angular/core';

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

  dockerImage = '';

  startupArgs = '';

  memoryAlloc = '';

  portAlloc = '';

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
}
