import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {NavbarTopComponent} from './navbar-top/navbar-top.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {SidebarComponent} from './navbar-top/sidebar/sidebar.component';
import {BreadcrumpComponent} from './breadcrump/breadcrump.component';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';

const appRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarTopComponent,
    PageNotFoundComponent,
    SidebarComponent,
    BreadcrumpComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
