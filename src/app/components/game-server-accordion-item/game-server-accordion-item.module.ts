import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameServerAccordionItemComponent} from './game-server-accordion-item.component';
import {
  NbAccordionComponent,
  NbAccordionItemComponent,
  NbAccordionModule, NbActionsModule,
  NbAlertModule, NbButtonModule,
  NbCardModule, NbCheckboxModule, NbContextMenuModule,
  NbIconModule, NbInputModule,
  NbLayoutModule,
  NbMenuModule, NbRadioModule, NbSearchModule,
  NbSidebarModule, NbStepperModule,
  NbThemeModule, NbUserModule
} from '@nebular/theme';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {NgxEchartsModule} from 'ngx-echarts';
import {ToastrModule} from 'ngx-toastr';
import {ApiModule} from '../../rest-client/api.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {NbAuthModule, NbDummyAuthStrategy} from '@nebular/auth';



@NgModule({
  declarations: [
    GameServerAccordionItemComponent,
  ],
  imports: [
    CommonModule,
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
    NbCheckboxModule,
    NbAccordionModule
  ],
  exports: [
    GameServerAccordionItemComponent
  ],
})
export class GameServerAccordionItemModule { }
