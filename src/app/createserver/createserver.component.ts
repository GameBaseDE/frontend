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

  constructor() { }

  ngOnInit(): void {
  }

}
