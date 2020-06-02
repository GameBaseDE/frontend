import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GameContainerStatus} from '../../rest-client/models/game-container-status';
import {Status} from '../../rest-client/models/status';
import {NbIconLibraries, NbThemeService} from '@nebular/theme';
import {ToastrService} from 'ngx-toastr';
import {GameserverService} from '../../rest-client/services/gameserver.service';
import {Router} from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gb-game-server-accordion-item',
  templateUrl: './game-server-accordion-item.component.html',
  styleUrls: ['./game-server-accordion-item.component.scss']
})
export class GameServerAccordionItemComponent implements OnInit {

  @Input() gameServer: GameContainerStatus;

  @Output() delete: EventEmitter<string> = new EventEmitter();

  statusEnum = Status;

  constructor(
    iconsLibrary: NbIconLibraries,
    private theme: NbThemeService,
    private toastr: ToastrService,
    private gameServerService: GameserverService,
    private router: Router
  ) {
    iconsLibrary.registerFontPack('fa', {packClass: 'fa', iconClassPrefix: 'fa'});
    iconsLibrary.registerFontPack('fas', {packClass: 'fas', iconClassPrefix: 'fa'});
    iconsLibrary.registerFontPack('far', {packClass: 'far', iconClassPrefix: 'fa'});
  }


  ngOnInit(): void {
  }

  /**
   * Deletes a deployment
   *
   * @param id the id of the deployment to delete
   */
  deleteContainer(id: string) {
    this.gameServerService.deleteContainer({id}).subscribe(
      result => {
        this.toastr.success(`Container '${id}' removed`, 'Deletion successful');
        this.delete.emit(id);
      },
      error => {
        this.displayError(`Deletion of container #${id} failed`, error);
        console.warn(error);
      }
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
      // user shouldn't be able to get here unless he hacks his way here
      return;
    }

    this.gameServer.status = Status.Restarting;

    console.error(`Restarting game server #${id}...`);

    this.gameServerService.restartContainer({id}).subscribe(
      () => {
        this.gameServer.status = Status.Running;
        this.toastr.success(`Game server ${id} restarted`, `Restart successful`);
      },
      error => {
        this.gameServer.status = Status.Error;
        this.displayError('Restart failed', error);
      }
    );
  }

  /**
   * Button click event handler for the stop GameServer button
   *
   * @param event the click event
   * @param id the GameServer id to stop
   */
  stopServerEvent(event: Event, id: string) {
    event.stopPropagation();

    if (!this.stopPossible(id)) {
      // user shouldn't be able to get here unless he hacks his way here
      return;
    }

    console.log(`Stopping game server #${id}...`);

    this.gameServerService.stopContainer({id}).subscribe(
      () => {
        this.gameServer.status = Status.Stopped;
        this.toastr.success(`Game server ${id} stopped`, `Stop successful`);
      },
      error => {
        this.gameServer.status = Status.Error;
        this.displayError('stop', error);
      }
    );
  }

  /**
   * Button click event handler for the start GameServer button
   *
   * @param event the click event
   * @param id the GameServer id to start
   */
  startServerEvent(event: Event, id: string) {
    event.stopPropagation();

    if (!this.startPossible(id)) {
      // user shouldn't be able to get here unless he hacks his way here
      return;
    }

    console.log(`Restarting game server #${id} ...`);

    this.gameServerService.startContainer({id}).subscribe(
      () => {
        this.gameServer.status = Status.Running;
        this.toastr.success(`Game server #${id} started`, `Start successful`);
      },
      error => {
        this.gameServer.status = Status.Error;
        this.displayError(`Starting game server #${id} failed`, error);
      }
    );
  }

  /**
   *  Returns whether a restart is possible for a specific GameServer
   * @param id the id of the GameServer to check
   */
  restartPossible(id: string) {
    return this.gameServer.status === Status.Running;
  }

  /**
   * Returns whether a restart is possible for a specific GameServer
   * @param id the id of the GameServer to check
   */
  stopPossible(id: string) {
    return this.gameServer.status === Status.Running;
  }

  /**
   * Returns whether a restart is possible for a specific GameServer
   * @param id the id of the GameServer to check
   */
  startPossible(id: string) {
    return this.gameServer.status === Status.Stopped || this.gameServer.status === Status.Error;
  }

  openServerConfiguration(id: string) {
    this.router.navigate([`/server/configure/${id}`]);
  }

  private displayError(step: string, error: any) {
    console.error(error);
    this.toastr.error(`Error during ${step}: ${error.details}`, `${step} failed`);
  }
}
