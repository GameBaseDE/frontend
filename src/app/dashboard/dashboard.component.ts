import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {NbIconLibraries, NbThemeService} from '@nebular/theme';
import {ToastrService} from 'ngx-toastr';
import {GameContainerStatus, Status} from '../rest-client/models';
import { Constants } from '../global';
import {Router} from '@angular/router';
import {GameserverService} from '../rest-client/services/gameserver.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

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

  private static ownerId = Constants.dummyOwnerId;
  options: any = {};
  themeSubscription: any;

  gameServers: GameContainerStatus[] = [];

  ngOnInit() {
    this.updateAll();
    setInterval(() => this.updateAll(), 5000);
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

  displayError(step: string, error: any) {
    console.error(error);
    this.toastr.error(`Error during ${step}: ${error.details}`, `${step} failed`);
  }

  /**
   * Delegate method for event of game server accordion item deletion
   * @param id of game server whose accordion item needs to be destroyed
   */
  deleteGameServerAccordionItem(id: string) {
    this.gameServers = this.gameServers.filter(server => server.id !== id);
  }
}
