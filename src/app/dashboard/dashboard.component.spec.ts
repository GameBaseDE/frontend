import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {environment} from '../../environments/environment';

import {DashboardComponent} from './dashboard.component';
import {
  NbAccordionModule,
  NbAlertModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbStepperModule,
  NbThemeModule
} from '@nebular/theme';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxEchartsModule} from 'ngx-echarts';
import {ToastrModule} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ApiModule} from '../rest-client/api.module';
import {AppRoutingModule} from '../app-routing.module';
import {By} from '@angular/platform-browser';
import {GameContainerStatus} from '../rest-client/models/game-container-status';
import {Status} from '../rest-client/models/status';
import {NbAuthModule, NbDummyAuthStrategy} from '@nebular/auth';
import {NbEvaIconsModule} from '@nebular/eva-icons';

function loadFakeGameServers(): GameContainerStatus[] {
  return [
    {
      id: 'testm652l',
      status: Status.Running,
      configuration: {
        details: {},
        resources: {
          startupArgs: 'mytestserver.sh --karma-test',
          ports: {}
        }
      }
    }
  ]
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          DashboardComponent
      ],
      imports: [
        NbCardModule,
        FormsModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        ApiModule.forRoot({rootUrl: environment.mockAPIURL}),
        AppRoutingModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot(),
        FormsModule,
        NbInputModule,
        NbRadioModule,
        NbStepperModule,
        NbAccordionModule,
        NbIconModule,
        NbAlertModule,
        NbEvaIconsModule,
        NbAuthModule.forRoot({
          strategies: [NbDummyAuthStrategy.setup({
            alwaysFail: false,
            name: 'email'
          })]
        })
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    component.gameServers = loadFakeGameServers();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display game server accordion with at least one entry', () => {
    const selector = 'nb-accordion > nb-accordion-item';
    const accordion = fixture.debugElement.query(By.css(selector));
    const element = accordion.nativeElement;

    expect(element).toBeTruthy(`${selector} could not be found!`);

    const headerSelector = ' > nb-accordion-item-header';
    const header = fixture.debugElement.query(By.css(selector + headerSelector)).nativeElement;

    expect(header).toBeTruthy(`${headerSelector} could not be found`);
  });

  // it('should contain details inside expanded accordion item', () => {
  //   const selector = 'nb-accordion > nb-accordion-item > nb-accordion-item-body';
  //   const accordion = fixture.debugElement.query(By.css(selector));
  //   const element = accordion.nativeElement;
  //
  //   expect(element).toBeTruthy(`${selector} could not be found!`);
  //
  //   const descriptionTitle = fixture.debugElement.query(By.css(selector + 'div table tr td p.title')).nativeElement;
  //   expect(descriptionTitle).toBeTruthy(`${descriptionTitle} could not be found!`);
  //
  //   expect(descriptionTitle.value).toEqual('Description', `${descriptionTitle.value} != description`);
  // });

  // it('should display startup arguments in a disabled text box', () => {
  //   const selector = 'nb-accordion > nb-accordion-item > nb-accordion-item-body';
  //   const accordion = fixture.debugElement.query(By.css(selector));
  //   const element = accordion.nativeElement;
  //
  //   expect(element).toBeTruthy(`${selector} could not be found!`);
  //
  //   const startupArgsInput = fixture.debugElement.query(By.css(selector + ' input[name=startup-args]')).nativeElement;
  //   expect(startupArgsInput).toBeTruthy(`${startupArgsInput} could not be found!`);
  //
  //   //const isDisabled = .toContain(['disabled']);
  //   expect(startupArgsInput.attributes).toContain(['readonly'], `input[name=startup-args] isn't disabled.`)
  //   const expectedContent = 'mytestserver.sh --karma-test';
  //   expect(startupArgsInput.
  //   ).toEqual(expectedContent, `${startupArgsInput.value} != ${expectedContent}`);
  // });
});
