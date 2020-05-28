import {Component, OnInit} from '@angular/core';
import {NbSidebarService} from '@nebular/theme';
import {NbAuthService} from '@nebular/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userMenu = [{title: 'Profile', link: '/profile'}, {title: 'Log out', link: '/logout'}];

  isLoggedIn = false;

  user = {
    name: 'Test User',
    pictureOnly: false,
    picture: 'assets/images/eva.png',
  };

  constructor(private sidebarService: NbSidebarService, public authService: NbAuthService) {
  }

  ngOnInit() {
    this.authService.onTokenChange().subscribe(token => {
      this.isLoggedIn = token.isValid();
      // TODO add getTokenPayload
    })
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    window.dispatchEvent(new Event('resize')); // trigger window resize event to recalculate content sizes after the sidebar resizes

    return false;
  }

}
