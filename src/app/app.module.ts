import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {environment} from '../environments/environment';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutComponent} from './layout/layout.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FooterComponent} from './layout/footer/footer.component';
import {HeaderComponent} from './layout/header/header.component';
import {PageNotFoundComponent} from './layout/page-not-found/page-not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  NbAccordionModule,
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule, NbCheckboxModule,
  NbContextMenuModule,
  NbIconModule, NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule, NbStepperModule,
  NbThemeModule,
  NbUserModule,
  NbRadioModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {NgxEchartsModule} from 'ngx-echarts';
import {ToastrModule} from 'ngx-toastr';
import {ApiModule} from './rest-client/api.module';
import {HttpClientModule} from '@angular/common/http';
import {ServerConfigurationComponent} from './serverconfiguration/serverconfiguration.component';
import {ErrorContainerComponent} from './components/errorcontainer/errorcontainer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  NbAuthJWTToken,
  NbAuthModule,
  NbDummyAuthStrategy,
  NbPasswordAuthStrategy
} from '@nebular/auth';
import {AuthGuard} from './auth.guard';
import {LoginComponent} from './auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    ServerConfigurationComponent,
    ErrorContainerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'dark'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbActionsModule,
    NbSearchModule,
    NbUserModule,
    NbContextMenuModule,
    NbAccordionModule,
    NbAlertModule,
    NbRadioModule,
    NgxEchartsModule,
    ToastrModule.forRoot({positionClass: 'toast-bottom-right'}),
    ApiModule.forRoot({rootUrl: environment.restApiURL}),
    HttpClientModule,
    NbStepperModule,
    FormsModule,
    NbInputModule,
    NbAuthModule.forRoot({
      strategies: [
        NbDummyAuthStrategy.setup({
          name: 'email',
          alwaysFail: false
        })
        /*NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
            key: 'token' // this parameter tells where to look for the token
          },

          // baseEndpoint: 'https://virtserver.swaggerhub.com/GameBase9/gamebase_communication_api/2.0.0',
          baseEndpoint: environment.restApiURL,
          login: {
            endpoint: '/auth/login',
            method: 'post',
            redirect: {
              success: '/dashboard',
              failure: null // stay on the same page
            }
          },
          register: {
            endpoint: '/auth/register',
            method: 'post'
          }
        })*/
      ],
      forms: {
        login: {
          redirectDelay: 0, // delay before redirect after a successful login, while success message is shown to the user
          strategy: 'email',  // strategy id key.
          rememberMe: true,   // whether to show or not the `rememberMe` checkbox
          showMessages: {     // show/not show success/error messages
            success: false,
            error: true
          }
        },
      },
    }),
    ReactiveFormsModule,
    NbCheckboxModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
