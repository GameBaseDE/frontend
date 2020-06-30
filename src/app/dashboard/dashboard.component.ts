import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {NbIconLibraries, NbThemeService} from '@nebular/theme';
import {ToastrService} from 'ngx-toastr';
import {GameContainerStatus, Status} from '../rest-client/models';
import {Constants} from '../global';
import {Router} from '@angular/router';
import {GameserverService} from '../rest-client/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  private static ownerId = Constants.dummyOwnerId;

  statusEnum = Status;

  options: any = {};
  themeSubscription: any;
  updateInterval;

  gameServers: GameContainerStatus[] = [];

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

  ngOnInit() {
    this.updateAll();
    this.updateInterval = setInterval(() => this.updateAll(), 5000);
  }

  updateAll() {
    this.gameServerService.getStatus(null).subscribe(
      result => {
        // @ts-ignore
        result = result.filter(value => value.id !== '');
        // @ts-ignore
        if (result.length === 0) {
          this.gameServers = [];
        }

        let newIds = [];

        // @ts-ignore
        result.forEach(gameServer => {
          newIds = [...newIds, gameServer.id];
          const present = this.gameServers.find(value => value.id === gameServer.id);
          if (present) {
            Object.assign(present, gameServer);
          } else if (!present) {
            this.gameServers = [...this.gameServers, gameServer];
          }
        });

        this.gameServers.forEach(server => {
          if (!newIds.includes(server.id)) {
            this.gameServers = this.gameServers.filter(value => value.id !== server.id);
          }
        });
      },
      () => this.toastr.error(`Something went wrong updating the GameServers`)
    );
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = {
        bg: '#222b45',
        textColor: '#ffffff',
        axisLineColor: '#ffffff',
        splitLineColor: '#1b1b38',
        itemHoverShadowColor: 'rgba(0, 0, 0, 0.5)',
        tooltipBackgroundColor: '#3366ff',
        areaOpacity: '0.7'
      };

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: echarts.tooltipBackgroundColor,
            },
          },
        },
        legend: {
          data: ['Mail marketing', 'Affiliate advertising', 'Video ad', 'Direct interview', 'Search engine'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: 'Mail marketing',
            type: 'line',
            stack: 'Total amount',
            areaStyle: {normal: {opacity: echarts.areaOpacity}},
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: 'Affiliate advertising',
            type: 'line',
            stack: 'Total amount',
            areaStyle: {normal: {opacity: echarts.areaOpacity}},
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: 'Video ad',
            type: 'line',
            stack: 'Total amount',
            areaStyle: {normal: {opacity: echarts.areaOpacity}},
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: 'Direct interview',
            type: 'line',
            stack: 'Total amount',
            areaStyle: {normal: {opacity: echarts.areaOpacity}},
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: 'Search engine',
            type: 'line',
            stack: 'Total amount',
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            areaStyle: {normal: {opacity: echarts.areaOpacity}},
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
    clearInterval(this.updateInterval);
  }

  deployServer(templatePath: string) {
    this.gameServerService.deployContainer({body: {templatePath}}).subscribe(
      () => this.updateAll(),
      error => {
        this.displayError(`Deployment failed`, error);
        console.warn(error);
      }
    );
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
        this.gameServers = this.gameServers.filter(value => value.id !== id);
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

    const gameServer = this.gameServers.find(server => server.id === id);
    gameServer.status = Status.Starting;

    console.error(`Restarting game server #${id}...`);

    this.gameServerService.restartContainer({id}).subscribe(
      () => {
        gameServer.status = Status.Running;
        this.toastr.success(`Game server ${id} restarted`, `Restart successful`);
      },
      error => {
        gameServer.status = Status.Error;
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

    const gameServer = this.gameServers.find(server => server.id === id);
    console.log(`Stopping game server #${id}...`);

    this.gameServerService.stopContainer({id}).subscribe(
      () => {
        gameServer.status = Status.Stopped;
        this.toastr.success(`Game server ${id} stopped`, `Stop successful`);
      },
      error => {
        gameServer.status = Status.Error;
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

    const gameServer = this.gameServers.find(server => server.id === id);
    console.log(`Restarting game server #${id} ...`);

    this.gameServerService.startContainer({id}).subscribe(
      () => {
        gameServer.status = Status.Running;
        this.toastr.success(`Game server #${id} started`, `Start successful`);
      },
      error => {
        gameServer.status = Status.Error;
        this.displayError(`Starting game server #${id} failed`, error);
      }
    );
  }


  displayError(step: string, error: any) {
    console.error(error);
    this.toastr.error(`Error during ${step}: ${error.details}`, `${step} failed`);
  }

  /**
   *  Returns whether a restart is possible for a specific GameServer
   * @param id the id of the GameServer to check
   */
  restartPossible(id: string) {
    const gameServer = this.gameServers.find(value => value.id === id);
    return gameServer.status === Status.Running;
  }

  /**
   * Returns whether a restart is possible for a specific GameServer
   * @param id the id of the GameServer to check
   */
  stopPossible(id: string) {
    const gameServer = this.gameServers.find(value => value.id === id);
    return gameServer.status === Status.Running;
  }

  /**
   * Returns whether a restart is possible for a specific GameServer
   * @param id the id of the GameServer to check
   */
  startPossible(id: string) {
    const gameServer = this.gameServers.find(value => value.id === id);
    return gameServer.status === Status.Stopped || gameServer.status === Status.Error;
  }


  openServerConfiguration(id: string) {
    this.router.navigate([`/server/configure/${id}`]);
  }
}
