import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apikey = 'AIzaSyBn8D9ZIiEbT4gkGvCIOugUSecOfIfiktc';

  userToken: string;

  // crear nuevo usuario
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]

  // Login
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]


  constructor(private http: HttpClient) { 
    this.leerToken();
  }

  logout() {

  }

  login(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true,
    };
    return this.http.post(`${this.url}/verifyPassword?key=${this.apikey}`, authData).pipe (
      map( res => {
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
    return this.http.post(`${this.url}/signupNewUser?key=${this.apikey}`, authData).pipe (
      map( res => {
        // console.log('entró en el pipe del usuario');
        this.guardarToken(res['idToken']);
        return res;
      })
    );
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }


  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }



}
