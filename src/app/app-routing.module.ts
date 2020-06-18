import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PageNotFoundComponent} from './layout/page-not-found/page-not-found.component';
import {AuthGuard} from './auth.guard';
import {LoginComponent} from './auth/login/login.component';

import {ServerConfigurationComponent} from './serverconfiguration/serverconfiguration.component';
import {NbLogoutComponent, NbRegisterComponent} from '@nebular/auth';
import {RegisterComponent} from './auth/register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'logout',
    component: NbLogoutComponent
  },
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'server/configure/:id',
        component: ServerConfigurationComponent,
      },
      {path: 'server/configure', redirectTo: '/dashboard', pathMatch: 'full'}, // Redirect empty path param 'id'
      {path: '**', component: PageNotFoundComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
