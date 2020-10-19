import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  spinner = false;
  email: string;
  password: string;

  constructor(
    private toastCtlr: ToastController,
    private authSvc: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogin(): void {
    this.spinner = true;

    this.authSvc.login(this.email, this.password)
    .then(() => {
      localStorage.setItem('rev_visual_login', Math.random().toString(36).slice(-8));
      this.router.navigate(['/tabs']);
    })
    .catch(() => {
      this.toastCtlr.create({
        message: 'No se pudo iniciar sesión, verifique que el email y la clave sean correctos',
        duration: 3000
      })
      .then(toast => {
        toast.present()
      });
    })
    .finally(() => {
      this.spinner = false
    });
  } 

  loginUsersButtons(e: Event): void {
    switch((e.currentTarget as HTMLButtonElement).id) {
      case 'tester':
        this.email = 'tester@tester.com';
        this.password = '555555';
      break;

      case 'administrador':
        this.email = 'admin@admin.com';
        this.password = '111111';
      break;

      case 'invitado':
        this.email = 'invitado@invitado.com';
        this.password = '222222';
      break;

      case 'anonimo':
        this.email = 'anonimo@anonimo.com';
        this.password = '444444';
      break;

      case 'usuario':
        this.email = 'usuario@usuario.com';
        this.password = '333333';
      break;
    }

    (<HTMLButtonElement>document.querySelector('#submit')).click();
  }

}
