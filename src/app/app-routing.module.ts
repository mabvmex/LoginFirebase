import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LoguedGuard } from './guards/logued.guard';


const routes: Routes = [
  { path: 'home'    , component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'registro', component: RegistroComponent, canActivate: [LoguedGuard]},
  { path: 'login'   , component: LoginComponent, canActivate: [LoguedGuard]},
  { path: '**', redirectTo: 'registro' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
