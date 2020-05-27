import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PageNotFoundComponent} from './layout/page-not-found/page-not-found.component';
import {AuthGuard} from './auth.guard';
import {LoginComponent} from './auth/login/login.component';


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
