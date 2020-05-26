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

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [NbAccordionModule, NbIconModule, NbAlertModule, BrowserAnimationsModule, NbCardModule, NgxEchartsModule,
        NbThemeModule.forRoot(), ToastrModule.forRoot(), NbStepperModule, FormsModule, NbInputModule, HttpClientModule, AppRoutingModule,
        ApiModule.forRoot({rootUrl: environment.restApiURL})]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
