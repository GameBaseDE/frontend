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
  gameServers: GameServerStatus[] = [];
  statusEnum = Status;

  constructor(private titleService: Title,
              private restClient: RestclientService,
              private toastr: ToastrService) {

    restClient.getServerList().subscribe(res => this.gameServers = res,
      error => console.log(error)
    );
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
      this.toastr.error(`Restarting game server #${id} failed!`, 'Error');
      return;
    }
    console.error(`Restarting game server #${id}...`);

    const gameServer = this.gameServers.find(server => server.id === id);
    gameServer.status = Status.RESTARTING;

    this.restClient.restartServer(id)
      .subscribe(res => {
          if (res === 200) {
            gameServer.status = Status.RUNNING;
            this.toastr.success(`Restarted game server #${id} successfully!`, 'Success');
            console.log(`Restarted game server #${id} successfully!`);
          } else {
            this.toastr.error(`Restarting game server #${id} failed!`, 'Error');
            console.error(`Restarting game server #${id} failed!`);
          }
        },
        error => {
          gameServer.status = Status.ERROR;
          this.toastr.error(`Restarting game server #${id} failed!`, 'Error');
          console.error(`Started game server #${id} failed!`);
        });
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
      this.toastr.error(`Starting game server #${id} failed!`, 'Error');
      return;
    }
    console.error(`Starting game server #${id}...`);
    this.restClient.startServer(id)
      .subscribe(res => {
          if (res === 200) {
            this.toastr.success(`Started game server #${id} successfully!`, 'Success');
            console.log(`Started game server #${id} successfully!`);
          } else {
            this.toastr.error(`Started game server #${id} failed!`, 'Error');
            console.error(`Started game server #${id} failed!`);
          }
        },
        error => {
          this.toastr.error(`Started game server #${id} failed!`, 'Error');
          console.error(`Started game server #${id} failed!`);
        });

    this.gameServers.find(server => server.id === id).status = Status.RUNNING;
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
      this.toastr.error(`Stopped game server #${id} failed!`, 'Error');
      return;
    }
    console.error(`Stopped game server #${id}...`);
    this.restClient.stopServer(id)
      .subscribe(
        res => {
          if (res === 200) {
            this.toastr.success(`Stopped game server #${id} successfully!`, 'Success');
            console.log(`Stopped game server #${id} successfully!`);
          } else {
            this.toastr.error(`Stopped game server #${id} failed!`, 'Error');
            console.error(`Stopped game server #${id} failed!`);
          }
        },
        error => {
          this.toastr.error(`Stopped game server #${id} failed!`, 'Error');
          console.error(`Stopped game server #${id} failed!`);
        });

    this.gameServers.find(server => server.id === id).status = Status.STOPPED;
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

  ngOnInit() {
    this.titleService.setTitle('GameBase | Dashboards');
  }

}
