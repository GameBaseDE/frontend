import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {NbAuthModule, NbDummyAuthStrategy} from '@nebular/auth';
import {RouterTestingModule} from '@angular/router/testing';
import {NbCardModule, NbCheckboxModule, NbFocusMonitor, NbIconModule, NbThemeModule} from '@nebular/theme';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [NbAuthModule.forRoot({
        strategies:
          [NbDummyAuthStrategy.setup(
            {name: 'email', alwaysFail: false})]
      }), RouterTestingModule, NbIconModule, NbThemeModule.forRoot(), NbCardModule, NbCheckboxModule],
      providers: [NbFocusMonitor]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
