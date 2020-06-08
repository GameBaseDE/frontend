import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {environment} from '../../environments/environment';

import {DashboardComponent} from './dashboard.component';
import {NbAccordionModule, NbAlertModule, NbCardModule, NbIconModule, NbInputModule, NbStepperModule, NbThemeModule} from '@nebular/theme';
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

function loadFakeGameServers(): GameContainerStatus[] {
  return [
    {
      id: 'testm652l',
      status: Status.Running,
      configuration: {
        details: {},
        resources: {
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
      declarations: [DashboardComponent],
      imports: [NbAccordionModule, NbIconModule, NbAlertModule, BrowserAnimationsModule, NbCardModule, NgxEchartsModule,
        NbThemeModule.forRoot(), ToastrModule.forRoot(), NbStepperModule, FormsModule, NbInputModule, HttpClientModule, AppRoutingModule,
        ApiModule.forRoot({rootUrl: environment.mockAPIURL})]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.componentInstance.gameServers = loadFakeGameServers();
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

    const headerSelector = 'nb-accordion-item-header';
    const header = fixture.debugElement.query(By.css(headerSelector)).nativeElement;

    expect(header).toBeTruthy(`${headerSelector} could not be found`);
  });

  it('should expand game server details if corresponding accordion item is clicked', () => {
    const selector = 'nb-accordion > nb-accordion-item > nb-accordion-item-header';
    const accordion = fixture.debugElement.query(By.css(selector));
    const element = accordion.nativeElement;

    expect(element).toBeTruthy(`${selector} could not be found!`);

    element.dispatchEvent(new Event('click'));

    expect(element.expanded).toBeTruthy(`${element} is not expanded although clicked.`);
  });

  it('should contain details inside expanded accordion item', () => {
    const selector = 'nb-accordion > nb-accordion-item > nb-accordion-item-body';
    const accordion = fixture.debugElement.query(By.css(selector));
    const element = accordion.nativeElement;

    expect(element).toBeTruthy(`${selector} could not be found!`);

    const descriptionTitle = element.debugElement.query(By.css('p.title')).nativeElement;
    expect(descriptionTitle).toBeTruthy(`${descriptionTitle} could not be found!`);

    expect(descriptionTitle.value).toEqual('Description', `${descriptionTitle.value} != description`);
  });

  it('should display startup arguments in a disabled text box', () => {
    const selector = 'nb-accordion > nb-accordion-item > nb-accordion-item-body';
    const accordion = fixture.debugElement.query(By.css(selector));
    const element = accordion.nativeElement;

    expect(element).toBeTruthy(`${selector} could not be found!`);

    const descriptionTitle = element.debugElement.query(By.css('input')).nativeElement;
    expect(descriptionTitle).toBeTruthy(`${descriptionTitle} could not be found!`);

    expect(descriptionTitle.readonly).toEqual('', `${descriptionTitle.value} != ''`);
  });
});
