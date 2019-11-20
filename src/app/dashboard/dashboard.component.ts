import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {RestclientService} from '../rest/restclient.service';
import {GameServerStatus} from '../rest/response/GameServerStatus';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  gameServers: GameServerStatus[];

  constructor(private titleService: Title, private restClient: RestclientService) {
    this.gameServers = [
      {
        id: '1',
        image: 'minecraft',
        ports: [1, 2, 3],
        slots: 12
      }
    ];
  }

  ngOnInit() {
    this.titleService.setTitle('GameBase | Dashboards');
  }

}
