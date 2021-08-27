import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserContextService } from '../services/user-context.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userContextService: UserContextService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.userContextService.user$.getValue();
    if (user) {
      return true;
    } else {
      console.log('AuthGuard',user)
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return null;
    }
  }
}
