import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  ruta: string;

  constructor(private auth: AuthService, private router: Router) { }

  canActivate( /* next: ActivatedRouteSnapshot,     state: RouterStateSnapshot*/): boolean {
    // console.log('El guard entró');
    if (this.auth.estaAutenticado()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
    // return this.auth.estaAutenticado();
  }
}
