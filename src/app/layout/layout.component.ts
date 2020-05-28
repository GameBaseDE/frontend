import {Component} from '@angular/core';
import {NbMenuItem} from '@nebular/theme';
import {NbAuthService} from '@nebular/auth';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  menu: NbMenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'home-outline',
      link: '/dashboard',
      home: true,
    },
    // {
    //   title: 'SERVERS',
    //   group: true
    // },
    // {
    //   title: 'Create Server',
    //   icon: 'plus-circle-outline',
    //   link: '/createserver'
    // },
    {
      title: 'FEATURES',
      group: true,
    },
    {
      title: 'Charts',
      icon: 'pie-chart-outline',
      link: '/charts',
    }
  ];

  isLoggedIn = false;

  constructor(private authService: NbAuthService) {
    authService.onTokenChange().subscribe(token => {
      this.isLoggedIn = token.isValid();
    })
  }
}
