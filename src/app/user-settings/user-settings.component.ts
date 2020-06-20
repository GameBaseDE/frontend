import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {GameserverService} from '../rest-client/services/gameserver.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NbThemeService} from '@nebular/theme';
import { TextBoxBindModel } from '../binding/bindingmodels';
import {Md5} from 'ts-md5';

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

  }

  apply() {

  }

  updateUserName(value: string) {

  }

  updateEmail(value: string) {

  }

  updateOldPassword(value: string) {

  }

  updateNewPassword(value: string) {

  }

  updateRepeatPassword(value: string) {

  }

  updateGravatarEmail(value: string) {

  }

  gravatarUrl = (): string => {
    const hash = Md5.hashStr(this.sanitizeString(this.generalDetails.gravatarEmail.value));
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  private sanitizeString(value: string) {
    return value.toLowerCase().trim();
  }

  clearPasswordForm() {

  }
}
