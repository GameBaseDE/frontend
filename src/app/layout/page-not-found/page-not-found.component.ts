import {Component, OnInit} from '@angular/core';
import {NbMenuService} from '@nebular/theme';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private menuService: NbMenuService) {
  }

  ngOnInit() {
  }

  goToHome() {
    this.menuService.navigateHome();
  }
}
