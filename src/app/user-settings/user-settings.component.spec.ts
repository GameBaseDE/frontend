import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsComponent } from './user-settings.component';
import {ServerConfigurationComponent} from '../serverconfiguration/serverconfiguration.component';
import {GameserverService} from '../rest-client/services/gameserver.service';
import {GameserverMockService} from '../mock/mockapi/services/gameserver-mock.service';
import {NbCardModule, NbInputModule, NbRadioModule, NbThemeModule, NbUserModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import {MockApiModule} from '../mock/mockapi/mock-api.module';
import {AppRoutingModule} from '../app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbAuthModule, NbDummyAuthStrategy} from '@nebular/auth';
import {By} from '@angular/platform-browser';

describe('UserSettingsComponent', () => {
  let component: UserSettingsComponent;
  let fixture: ComponentFixture<UserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserSettingsComponent],
      providers: [
        { provide: GameserverService, useClass: GameserverMockService }
      ],
      imports: [
        NbCardModule,
        NbUserModule,
        FormsModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        MockApiModule, // Mock Module
        AppRoutingModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot(),
        FormsModule,
        NbInputModule,
        NbRadioModule,
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
    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error if new password and repeated new password does not equal', () => {
    const selectors = {
      newPassword: 'input[name=input-new-password]',
      repeatPassword: 'input[name=input-repeat-password]'
    }

    const inputContent = ['asdf', 'not_asdf'];

    const newPasswordElement = fixture.debugElement.query(By.css(selectors.newPassword)).nativeElement;
    const repeatPasswordElement = fixture.debugElement.query(By.css(selectors.repeatPassword)).nativeElement;

    expect(newPasswordElement).toBeTruthy(`${selectors.newPassword} could not be found!`);
    expect(repeatPasswordElement).toBeTruthy(`${selectors.repeatPassword} could not be found!`);

    dispatchInput(newPasswordElement, inputContent[0]);
    dispatchInput(repeatPasswordElement, inputContent[1]);

    expect(component.generalDetails.password.repeat.error.hasError).toBeTruthy(`Error is not displayed although ${inputContent[0]} and ${inputContent[1]} do not equal`);
  });
});

function dispatchInput(element: any, text: string) {
  element.value = text;
  element.dispatchEvent(new Event('input'));
  element.dispatchEvent(new Event('keyup'));
}
