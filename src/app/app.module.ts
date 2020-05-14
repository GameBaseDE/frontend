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
  NbCardModule,
  NbContextMenuModule,
  NbIconModule, NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule, NbStepperModule,
  NbThemeModule,
  NbUserModule,
  NbFormFieldModule,
  NbRadioModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {NgxEchartsModule} from 'ngx-echarts';
import {ToastrModule} from 'ngx-toastr';
import {ApiModule} from './rest-client/api.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { CreateServerWizardComponent } from './createserver/createserver.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    CreateServerWizardComponent
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
    NbInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
