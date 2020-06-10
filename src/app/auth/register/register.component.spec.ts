import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {NbAuthModule, NbAuthService, NbDummyAuthStrategy} from '@nebular/auth';
import {RouterTestingModule} from '@angular/router/testing';
import {NbCardModule, NbCheckboxModule, NbIconModule, NbThemeModule} from '@nebular/theme';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [NbAuthModule.forRoot({
        strategies:
          [NbDummyAuthStrategy.setup(
            {name: 'email', alwaysFail: false})]
      }), RouterTestingModule, NbIconModule, NbThemeModule.forRoot(), NbCardModule, NbCheckboxModule],
      providers: [NbAuthService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
