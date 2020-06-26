import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {GameserverService} from '../rest-client/services/gameserver.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NbThemeService} from '@nebular/theme';
import { TextBoxBindModel } from '../binding/bindingmodels';
import {Md5} from 'ts-md5';
import {assertNotNull} from '@angular/compiler/src/output/output_ast';
import {StringUtils} from '../global';

class GeneralDetails {
  username: TextBoxBindModel = new TextBoxBindModel();
  emailAddress: TextBoxBindModel = new TextBoxBindModel();
  password = {
    old: new TextBoxBindModel(),
    $new: new TextBoxBindModel(),
    repeat: new TextBoxBindModel()
  };
  gravatarEmail: TextBoxBindModel = new TextBoxBindModel();
}

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss', '../serverconfiguration/serverconfiguration.component.scss']
})
export class UserSettingsComponent implements OnInit {

  private static redirectRoute = ['/dashboard'];

  generalDetails: GeneralDetails;

  constructor(
    private toastr: ToastrService,
    private gameServerService: GameserverService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.generalDetails = new GeneralDetails();
  }

  ngOnInit(): void {
  }

  cancel() {
    this.router.navigate(UserSettingsComponent.redirectRoute).then(r => { return; });
    this.toastr.info('Profile changes have not been applied.', 'Profile change cancelled!');
  }

  apply() {
    // TODO API Call
    if (this.haveNoErrors) {
      this.router.navigate(UserSettingsComponent.redirectRoute).then(r => { return; });
      this.toastr.success('Your new changes have been applied.', 'Profile updated!');
    } else {
      this.toastr.error('There are errors in your changes. Please correct them before proceeding.', 'Error when applying changes!');
    }
  }

  updateUserName(value: string) {
    this.resetModel(this.generalDetails.username)
    if (!StringUtils.isEmptyOrNull(value)) {
      this.generalDetails.username.value = value;
    } else {
      this.generalDetails.username.error.hasError = true;
      this.generalDetails.username.error.errorMessage = 'Your name cannot be empty!';
    }
  }

  private resetModel(model: TextBoxBindModel) {
    model.error.hasError = false;
    model.error.errorMessage = '';
  }

  updateEmail(value: string) {
    this.resetModel(this.generalDetails.emailAddress)
    if (!StringUtils.isEmptyOrNull(value)) {
      this.generalDetails.emailAddress.value = value;
    } else {
      this.generalDetails.emailAddress.error.hasError = true;
      this.generalDetails.emailAddress.error.errorMessage = 'Your name cannot be empty!';
    }
  }

  updateOldPassword(value: string) {
    this.generalDetails.password.old.value = value;
  }

  updateNewPassword(value: string) {
    this.generalDetails.password.$new.value = value;
  }

  updateRepeatPassword(value: string) {
    this.resetModel(this.generalDetails.password.repeat)
    this.generalDetails.password.repeat.value = value;

    if (value !== this.generalDetails.password.$new.value) {
      this.generalDetails.password.repeat.error.hasError = true;
      this.generalDetails.password.repeat.error.errorMessage = 'Your input does not match with your new password!';
    }
  }

  updateGravatarEmail(value: string) {
    this.resetModel(this.generalDetails.gravatarEmail)
    if (!StringUtils.isEmptyOrNull(value)) {
      this.generalDetails.gravatarEmail.value = value;
    } else {
      this.generalDetails.gravatarEmail.error.hasError = true;
      this.generalDetails.gravatarEmail.error.errorMessage = 'Your name cannot be empty!';
    }
  }

  gravatarUrl = (): string => {
    const hash = Md5.hashStr(this.sanitizeString(this.generalDetails.gravatarEmail.value));
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  private sanitizeString(value: string) {
    return value.toLowerCase().trim();
  }

  clearPasswordForm() {
    for (const key in this.generalDetails.password) {
      if (this.generalDetails.password.hasOwnProperty(key)) {
        const model = this.generalDetails.password[key];
        this.resetModel(model);
        model.value = '';
      }
    }
  }

  private haveNoErrors = (): boolean => {
    return !(
      this.generalDetails.password.repeat.error.hasError && this.generalDetails.password.$new.error.hasError &&
      this.generalDetails.password.old.error.hasError && this.generalDetails.gravatarEmail.error.hasError &&
      this.generalDetails.emailAddress.error.hasError && this.generalDetails.username.error.hasError
    );
  }
}
