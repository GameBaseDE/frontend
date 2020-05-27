import {Component} from '@angular/core';
import {NbLoginComponent} from '@nebular/auth';
import {NbIconLibraries} from '@nebular/theme';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent {
  constructor(iconsLibrary: NbIconLibraries) {
    super(undefined, {}, undefined, undefined);
    iconsLibrary.registerFontPack('fas', {packClass: 'fas', iconClassPrefix: 'fa'});
  }
}
