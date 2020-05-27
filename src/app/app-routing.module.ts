import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PageNotFoundComponent} from './layout/page-not-found/page-not-found.component';
import {AuthGuard} from './auth.guard';
import {LoginComponent} from './auth/login/login.component';

import {ServerConfigurationComponent} from './serverconfiguration/serverconfiguration.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'server/configure/:id',
    component: ServerConfigurationComponent,
    canActivate: [AuthGuard]
  },
  {path: 'server/configure', redirectTo: '/dashboard', pathMatch: 'full'}, // Redirect empty path param 'id'
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
