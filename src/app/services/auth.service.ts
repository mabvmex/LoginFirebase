import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apikey = 'AIzaSyBn8D9ZIiEbT4gkGvCIOugUSecOfIfiktc';

// crear nuevo usuario
// https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]

// Login
// https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]


  constructor( private http: HttpClient) { }

logout() {}

login(usuario: UsuarioModel) {

}


nuevoUsuario(usuario: UsuarioModel) {

}

}
