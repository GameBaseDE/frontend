import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsComponent } from './user-settings.component';
import {ServerConfigurationComponent} from '../serverconfiguration/serverconfiguration.component';
import {GameserverService} from '../rest-client/services/gameserver.service';
import {GameserverMockService} from '../mock/mockapi/services/gameserver-mock.service';
import {NbCardModule, NbInputModule, NbRadioModule, NbThemeModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import {MockApiModule} from '../mock/mockapi/mock-api.module';
import {AppRoutingModule} from '../app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbAuthModule, NbDummyAuthStrategy} from '@nebular/auth';

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
});
