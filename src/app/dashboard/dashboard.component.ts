import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {NbIconLibraries, NbThemeService} from '@nebular/theme';
import {ToastrService} from 'ngx-toastr';
import {ApiService} from '../rest-client/services/api.service';
import {GameServerDeployTemplate} from '../rest-client/models/game-server-deploy-template';

export enum Status {
  STOPPED,
  RUNNING,
  ERROR,
  RESTARTING
}

export class GameServerStatus {
  id: string;
  image: string;
  status: Status;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  statusEnum = Status;

  gameServers: GameServerStatus[] = [];

  constructor(iconsLibrary: NbIconLibraries, private theme: NbThemeService, private toastr: ToastrService, private api: ApiService) {
    iconsLibrary.registerFontPack('fa', {packClass: 'fa', iconClassPrefix: 'fa'});
    iconsLibrary.registerFontPack('fas', {packClass: 'fas', iconClassPrefix: 'fa'});
    iconsLibrary.registerFontPack('far', {packClass: 'far', iconClassPrefix: 'fa'});
  }

  ngOnInit() {
    const config: GameServerDeployTemplate = {
      image: 'docker'
    };
    this.api.deployContainer({body: config}).subscribe(value => {
      this.gameServers = [value.message];
    });

    setInterval(() => {
      for (let i = 0; i < this.gameServers.length; i++) {
        this.api.getStatus({id: this.gameServers[i].id}).subscribe(
          result => {
            if (this.gameServers[i].status !== result.message.status) {
              this.gameServers[i] = result.message;
            }
          },
          () => this.toastr.error(`Something went wrong with your GameServer ${this.gameServers[i].id}`)
        );
      }
    }, 5000);
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
  }

  deployServer(image: string) {
    this.api.deployContainer({body: {image}}).subscribe(value => {
      this.gameServers = [...this.gameServers, value.message];
    });
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
    gameServer.status = Status.RESTARTING;

    console.error(`Restarting game server #${id}...`);

    this.api.restartContainer({id}).subscribe(
      () => {
        gameServer.status = Status.RUNNING;
        this.toastr.success(`GameServer ${id} restarted`, `Restart successful`);
      },
      error => {
        gameServer.status = Status.ERROR;
        this.displayError('restart', error);
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
    console.error(`Stopping game server #${id}...`);

    this.api.stopContainer({id}).subscribe(
      () => {
        gameServer.status = Status.STOPPED;
        this.toastr.success(`GameServer ${id} stopped`, `Stop successful`);
      },
      error => {
        gameServer.status = Status.ERROR;
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
    console.error(`Restarting game server #${id}...`);

    this.api.startContainer({id}).subscribe(
      () => {
        gameServer.status = Status.RUNNING;
        this.toastr.success(`GameServer ${id} started`, `Start successful`);
      },
      error => {
        gameServer.status = Status.ERROR;
        this.displayError('start', error);
      }
    );
  }


  displayError(step: string, error: any) {
    console.error(error);
    this.toastr.error(`Error during ${step}: ${error.error.message}`, `${step} failed`);
  }

  /**
   *  Returns whether a restart is possible for a specific GameServer
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


}
