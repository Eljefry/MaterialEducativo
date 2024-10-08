import { Component, OnInit } from '@angular/core';//no se usa pero que quede por si acaso
import { MaterialService } from 'src/app/services/service.service';
import { AlertService } from 'src/app/services/alertas/alert.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  //user es un objeto que declaro, este objeto tendra los campos 4 campos que defino, uso este objeto para luego cargarlo al form
  user = {
    username: '',
    email: '',
    password: '',
    certificado: null as File | null
  };

  certificadoError = false;

  constructor(
    private _Materialservice: MaterialService,
    private _alertService: AlertService,
    private router: Router) { }

  ngOnInit(): void {

  }

  SelectFile(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.user.certificado = file;
      this.certificadoError = false;
    } else {
      this.user.certificado = null;
      this.certificadoError = true;
      this._alertService.error('Selecciona un archivo PDF y no haga perder tiempo');
    }
  }

  Registro(form: NgForm) {

    //pregunto por separado las validaciones ya que ng model no se puede enlazar con un input de tipo file. Si algunos de los campos no se completo entra a la funcion
    if (form.invalid || !this.user.certificado) {
      //Basicamente recorremos todos los controles y seteamos que fueron tocados, de esta manera el cartel se va a mostrar cuando el usuario haga el registro y no antes.
      Object.keys(form.controls).forEach(field => {
        const control = form.control.get(field);
        control?.markAsTouched({ onlySelf: true });
      });

      //verifico el certificado, necesario esta comprobacion porque no sabemos si entramos a la funcion porque el usuario ingreso el nombre,email,contraseña o por el certificado
      if (!this.user.certificado) {
        this.certificadoError = true;
      }
      //retornamos, ya que el formulario fue invalido
      return;
    }

    const dataUser = new FormData();
    dataUser.append('username', this.user.username);
    dataUser.append('email', this.user.email);
    dataUser.append('password', this.user.password);
    dataUser.append('certificado', this.user.certificado, this.user.certificado.name);
    this._Materialservice.registrarUsuario(dataUser).subscribe({
      next: () => { this._alertService.customDialog('Registro exitoso').then(() => { this.router.navigate(['/login']); }) },
      error: (err) => {
        console.log(err);
        console.log(err.error.username);
        if (err.status === 400)
          if (err.error.username)
            this._alertService.error('El usuario ya existe');
          else if (err.error.email)
            this._alertService.error('email incorecto');
          else
            this._alertService.error('Registro fallido');
      }
    });
  }
}