import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {GameserverService} from '../rest-client/services/gameserver.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NbThemeService} from '@nebular/theme';
import { TextBoxBindModel } from '../binding/bindingmodels';
import {Md5} from 'ts-md5';
import {assertNotNull} from '@angular/compiler/src/output/output_ast';
import {StringUtils} from '../global';
import {UserService} from '../rest-client/services/user.service';
import {UserProfile} from '../rest-client/models/user-profile';
import {NbAuthService} from '@nebular/auth';

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

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: NbAuthService
  ) {
    this.generalDetails = new GeneralDetails();
  }

  private static redirectRoute = ['/dashboard'];

  generalDetails: GeneralDetails;

  private static sanitizeString(value: string) {
    return value.toLowerCase().trim();
  }

  ngOnInit(): void {
    this.authService.getToken()
      .subscribe(
        result => {
          // TODO: User details are still missing; result.getPayload()
          this.updateUserName('Test User');
          this.updateEmail('test123@test.de');
        },
        error => {
          this.toastr.warning('User details could not be retrieved. Token might be invalid?', 'User details retrieval failed!');
          this.router.navigate(UserSettingsComponent.redirectRoute).then(r => { return; });
        }
      );
  }

  cancel() {
    this.router.navigate(UserSettingsComponent.redirectRoute).then(r => { return; });
    this.toastr.info('Profile changes have not been applied.', 'Profile change cancelled!');
  }

  apply() {
    if (!this.hasErrors) {
      this.userService.updateUserProfile({body: this.userProfile()})
        .subscribe(
          result => {
            this.router.navigate(UserSettingsComponent.redirectRoute).then(r => { return; });
            this.toastr.success('Your new changes have been applied.', 'Profile updated!');
          },
          error => {
            if (error.error.details) {
              this.toastr.error(`An error occurred: (${error.error.details}). Please try again later!`, 'Error when applying changes!');
            } else {
              this.toastr.error('An unknown error occurred. Please try again later!', 'Error when applying changes!');
            }
          }
        );
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
    this.resetModel(this.generalDetails.password.old)
    if (!StringUtils.isEmptyOrNull(value)) {
      this.generalDetails.password.old.value = value;
    } else {
      this.generalDetails.password.old.error.hasError = true;
      this.generalDetails.password.old.error.errorMessage = 'Your old mustn\'t be empty!';
    }
  }

  updateNewPassword(value: string) {
    this.generalDetails.password.$new.value = value;
  }

  updateRepeatPassword(value: string) {
    this.resetModel(this.generalDetails.password.repeat)
    this.generalDetails.password.repeat.value = value;

    if (!this.areNewPasswordsEqual()) {
      this.generalDetails.password.repeat.error.hasError = true;
      this.generalDetails.password.repeat.error.errorMessage = 'Your input does not match with your new password!';
    }
  }

  areNewPasswordsEqual = (): boolean => {
    return this.generalDetails.password.$new.value === this.generalDetails.password.repeat.value
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
    const hash = Md5.hashStr(UserSettingsComponent.sanitizeString(this.generalDetails.gravatarEmail.value));
    return `https://www.gravatar.com/avatar/${hash}`;
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

  userProfile = (): UserProfile => {
    return {
      email: this.generalDetails.emailAddress.value,
      gravatar: this.generalDetails.gravatarEmail.value,
      password: {
        old: this.generalDetails.password.old.value,
        new: this.generalDetails.password.$new.value
      },
      username: this.generalDetails.username.value
    };
  }

  private hasErrors = (): boolean => {
    return this.generalDetails.password.repeat.error.hasError || this.generalDetails.password.$new.error.hasError ||
      this.generalDetails.password.old.error.hasError || this.generalDetails.gravatarEmail.error.hasError ||
      this.generalDetails.emailAddress.error.hasError || this.generalDetails.username.error.hasError;
  }
}
