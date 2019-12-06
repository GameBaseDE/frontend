import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardComponent} from './dashboard.component';
import {NbAccordionModule, NbAlertModule, NbCardModule, NbIconModule, NbThemeModule} from '@nebular/theme';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxEchartsModule} from 'ngx-echarts';
import {ToastrModule} from 'ngx-toastr';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [NbAccordionModule, NbIconModule, NbAlertModule, BrowserAnimationsModule, NbCardModule, NgxEchartsModule,
        NbThemeModule.forRoot(), ToastrModule.forRoot()]
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
