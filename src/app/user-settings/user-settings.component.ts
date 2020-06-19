import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {GameserverService} from '../rest-client/services/gameserver.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NbThemeService} from '@nebular/theme';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss', '../serverconfiguration/serverconfiguration.component.scss']
})
export class UserSettingsComponent implements OnInit {
  generalDetails = {
    username: undefined,
    emailAddress: undefined,
    password: {
      old: undefined,
      $new: undefined,
      repeat: undefined
    },
    gravatarEmail: undefined
  };

  constructor(
    private toastr: ToastrService,
    private gameServerService: GameserverService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
  }

  cancel() {

  }

  apply() {

  }
}
