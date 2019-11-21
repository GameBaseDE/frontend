import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {RestclientService} from '../rest/restclient.service';
import {GameServerStatus, Status} from '../rest/response/GameServerStatus';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  gameServers: GameServerStatus[];
  statusEnum = Status;

  constructor(private titleService: Title,
              private restClient: RestclientService,
              private toastr: ToastrService) {
    this.gameServers = [
      {
        id: '1',
        image: 'minecraft',
        ports: [1, 2, 3],
        slots: 12,
        status: Status.RUNNING,
      }
    ];
    this.randomizeStatus();
  }

  /**
   * Button click event handler for the restart GameServer button
   *
   * @param event the click event
   * @param id the GameServer id to restart
   */
  restartServerEvent(event: Event, id: string) {
    event.stopPropagation();
    if (!this.restartPossible(id)) {
      this.toastr.error('Could not restart server.', `Restarting game server #${id} failed!`);
      return;
    }
    this.toastr.success('Restarted server.', `Restarted game server #${id} successfully!`);
    console.log(`Restarting GameServer #${id}`);
  }

  /**
   * Button click event handler for the start GameServer button
   *
   * @param event the click event
   * @param id the GameServer id to restart
   */
  startServerEvent(event: Event, id: string) {
    event.stopPropagation();
    if (!this.startPossible(id)) {
      this.toastr.error('Could not start server.', `Starting game server #${id} failed!`);
      return;
    }
    this.toastr.success('Started server.', `Started game server #${id} successfully!`);
    console.log(`Starting GameServer #${id}`);
  }

  /**
   * Button click event handler for the stop GameServer button
   *
   * @param event the click event
   * @param id the GameServer id to restart
   */
  stopServerEvent(event: Event, id: string) {
    event.stopPropagation();
    if (!this.stopPossible(id)) {
      this.toastr.error('Could not stop server.', `Stopping game server #${id} failed!`);
      return;
    }
    this.toastr.success('Stopped server.', `Stopped game server #${id} successfully!`);
    console.log(`Stopping GameServer #${id}`);
  }

  /**
   * Returns whether a restart is possible for a specific GameServer
   * @param id the id of the GameServer to check
   */
  restartPossible(id: string) {
    const gameServer = this.gameServers.find(value => value.id === id);
    return gameServer.status === Status.RUNNING;
  }

  /**
   * Returns whether a restart is possible for a specific GameServer
   * @param id the id of the GameServer to check
   */
  stopPossible(id: string) {
    const gameServer = this.gameServers.find(value => value.id === id);
    return gameServer.status === Status.RUNNING;
  }

  /**
   * Returns whether a restart is possible for a specific GameServer
   * @param id the id of the GameServer to check
   */
  startPossible(id: string) {
    const gameServer = this.gameServers.find(value => value.id === id);
    return gameServer.status === Status.STOPPED || gameServer.status === Status.ERROR;
  }

  // test function
  randomizeStatus() {
    setInterval(() => {
      this.gameServers.forEach(value => {
        const keys = Object.keys(Status).filter(k => !(Math.abs(parseInt(k, 0)) + 1));
        const enumKey = keys[Math.floor(Math.random() * keys.length)];
        value.status = Status[enumKey];
      });
    }, 1000);
  }

  ngOnInit() {
    this.titleService.setTitle('GameBase | Dashboards');
  }

}
