import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.usuario = new UsuarioModel(); // this.usuario.email = 'mabvmex@gmail.com'; // Linea para forzar el correo electrónico predefinido.
  }

  onSubmit(form: NgForm) {

    if (form.invalid) { return; }

    this.auth.nuevoUsuario(this.usuario).subscribe(res => {
      console.log(res);
    }, (e) => {
      console.log(e.error.error.message);
    }
    );

    // Ya es valido, por lo tanto no lo necesito // console.log('Formulario enviado'); // console.log(this.usuario); // console.log(form);
  }

}
