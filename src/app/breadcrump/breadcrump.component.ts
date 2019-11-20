import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrump',
  templateUrl: './breadcrump.component.html',
  styleUrls: ['./breadcrump.component.scss']
})
export class BreadcrumpComponent implements OnInit {

  currentPage: string;

  constructor(private titleService: Title) {
  }

  ngOnInit() {
    this.currentPage = this.titleService.getTitle().split('|').pop().trim();
  }

}
