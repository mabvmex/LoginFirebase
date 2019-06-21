import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recuerdame = false;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel(); // this.usuario.email = 'mabvmex@gmail.com'; // Linea para forzar el correo electrónico predefinido.
  }

  onSubmit(form: NgForm) {

    if (form.invalid) { return; }
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Registrando'
    });
    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario).subscribe(res => {
      // console.log(res);
      Swal.close();

      if (this.recuerdame) {
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigateByUrl('/home');

    }, (e) => {
      // console.log(e.error.error.message);
      Swal.fire({
        allowOutsideClick: false,
        type: 'error',
        title: 'Error al autenticar',
        text: e.error.error.message
      });
    }
    );

    // Ya es valido, por lo tanto no lo necesito // console.log('Formulario enviado'); // console.log(this.usuario); // console.log(form);
  }

}
