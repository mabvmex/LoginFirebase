import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  login(form: NgForm) {

    if (form.invalid) { return; }

    this.auth.login(this.usuario).subscribe(res => {
      console.log(res);
    }, (e) => {
      console.log(e.error.error.message);
    }
    );






    // console.log('imprimir si el formulario es valido');
    // console.log(form);
    // console.log(this.usuario);
  }
}
