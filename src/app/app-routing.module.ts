import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PageNotFoundComponent} from './layout/page-not-found/page-not-found.component';
import {ServerConfigurationComponent} from './serverconfiguration/serverconfiguration.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  //{path: 'createserver', component: ServerConfigurationComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
