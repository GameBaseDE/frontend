import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  requestedUrl: string;

  constructor(private router: Router, private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('GameBase | Error 404');
    this.requestedUrl = this.router.url.split('?')[0];
  }

}
