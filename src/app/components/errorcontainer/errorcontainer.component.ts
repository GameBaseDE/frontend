import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gb-error-container',
  templateUrl: './errorcontainer.component.html',
  styleUrls: ['./errorcontainer.component.scss']
})
export class ErrorContainerComponent implements OnInit {

  @Input() errorMessage = '';

  constructor() { }

  ngOnInit(): void {
  }

}
