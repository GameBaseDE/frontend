import {Component, OnInit} from '@angular/core';
import {NbSidebarService} from '@nebular/theme';
import {NbAuthService} from '@nebular/auth';
import {Md5} from 'ts-md5';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userMenu = [{title: 'Profile', link: '/profile'}, {title: 'Log out', link: '/logout'}];

  isLoggedIn = false;

  user = {
    name: '',
    pictureOnly: false,
    picture: 'assets/images/eva.png',
  };

  constructor(private sidebarService: NbSidebarService, public authService: NbAuthService) {
  }

  ngOnInit() {
    this.authService.onTokenChange().subscribe(token => {
      this.isLoggedIn = token.isValid();
      const payload = token.getPayload();
      if (payload) {
        this.user.name = payload.user_name;
        if (payload.gravatar || payload.user_email) {
          this.user.picture = this.gravatarUrl(payload.gravatar || payload.user_email)
        } else {
          this.user.pictureOnly = false;
        }
      }
    })
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    window.dispatchEvent(new Event('resize')); // trigger window resize event to recalculate content sizes after the sidebar resizes

    return false;
  }

  gravatarUrl(email: string): string {
    const hash = Md5.hashStr(email);
    return `https://www.gravatar.com/avatar/${hash}`;
  }


}
