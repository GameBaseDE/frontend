import { Component, OnInit, Input } from '@angular/core';

@Component({
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
