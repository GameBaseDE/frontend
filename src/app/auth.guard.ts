import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {NbAuthService} from '@nebular/auth';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: NbAuthService, private router: Router) {
  }

  private activate() {
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['login']);
          }
        }),
      );
  }

  canActivateChild() {
    return this.activate();
  }

  canActivate() {
    return this.activate();
  }

}
