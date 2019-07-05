import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoguedGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }


  canActivate(): boolean {

    if (this.auth.estaAutenticado()) {
    this.router.navigateByUrl('home');
    } else {
      return true;
    }
  }
}