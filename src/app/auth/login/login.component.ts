import {Component} from '@angular/core';
import {NbAuthService, NbLoginComponent} from '@nebular/auth';
import {NbIconLibraries} from '@nebular/theme';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent {
  constructor(iconsLibrary: NbIconLibraries, authService: NbAuthService, router: Router) {
    super(authService, {}, undefined, router);
    iconsLibrary.registerFontPack('fas', {packClass: 'fas', iconClassPrefix: 'fa'});

    // redirect if already authenticated
    authService.isAuthenticated().subscribe(auth => {
      if (auth) {
        router.navigate(['dashboard'])
      }
    })
  }
}
