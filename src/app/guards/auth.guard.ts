import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    if (inject(AuthService).isLoggedIn()) {
        return true;
    } 
    else {
        inject(Router).navigate([('home')]);
        return false;
    }
};