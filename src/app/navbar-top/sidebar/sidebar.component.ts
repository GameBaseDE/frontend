import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebarToggle = false;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    const id = event.target.parentElement.id || event.target.id;
    if (id === 'sidebarToggle') {
      this.sidebarToggle = !this.sidebarToggle;
    }
  }

  constructor() {
  }

  ngOnInit() {
  }

}
