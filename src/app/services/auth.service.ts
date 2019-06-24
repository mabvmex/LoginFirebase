import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { LoginComponent } from '../pages/login/login.component';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // crear nuevo usuario
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]

  // Login
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]


  constructor(private http: HttpClient, private router: Router, /* private logincomp: LoginComponent */) {
    this.leerToken();
  }

  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apikey = 'AIzaSyBn8D9ZIiEbT4gkGvCIOugUSecOfIfiktc';

  userToken: string;

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expira');
    this.userToken = '';
  }

  login(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true,
    };
    return this.http.post(`${this.url}/verifyPassword?key=${this.apikey}`, authData).pipe(
      map(res => {
        // console.log('entró en el pipe del usuario login RXJS');
        this.guardarToken(res['idToken']);
        return res;
      })
    );
  }


  nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      // email: usuario.email, // password: usuario.password, // Las mismas propiedades del usuario con el operador SPREAD (...) es sinonimo de llamarlas uno a uno
      ...usuario,
      returnSecureToken: true,
    };

    // Llamar el servicio http.POST para crear un usuario
    return this.http.post(`${this.url}/signupNewUser?key=${this.apikey}`, authData).pipe(
      map(res => {
        // console.log('entró en el pipe del usuario');
        this.guardarToken(res['idToken']);
        return res;
      })
    );
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600); // Misma fecha actuar, pero una hora en el futuro.
    localStorage.setItem('expira', hoy.getTime().toString()); // La representación en numeros de la fecha actual
  }


  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }


  estaAutenticado(): boolean {

    if (this.userToken.length < 2) { // Ya sabemos que el token no es válido porque no existe.
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }
    // return this.userToken.length > 2; // El token no es válido aunque aun esté presente físicamente
  }

}
