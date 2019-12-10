import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardComponent} from './dashboard.component';
import {NbAccordionModule, NbAlertModule, NbCardModule, NbIconModule, NbInputModule, NbStepperModule, NbThemeModule} from '@nebular/theme';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxEchartsModule} from 'ngx-echarts';
import {ToastrModule} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ApiModule} from '../rest-client/api.module';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [NbAccordionModule, NbIconModule, NbAlertModule, BrowserAnimationsModule, NbCardModule, NgxEchartsModule,
        NbThemeModule.forRoot(), ToastrModule.forRoot(), NbStepperModule, FormsModule, NbInputModule, HttpClientModule,
        ApiModule.forRoot({rootUrl: 'https://backend.dev.gahr.dev'})]
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
