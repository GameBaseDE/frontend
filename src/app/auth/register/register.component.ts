import {Component} from '@angular/core';
import {NbAuthService, NbRegisterComponent} from '@nebular/auth';
import {NbIconLibraries} from '@nebular/theme';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends NbRegisterComponent {
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
