import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { AuthService } from '../../services/auth.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
})
export class CosasLindasPage implements OnInit {

  constructor(public photoSvc: PhotoService, private authSvc: AuthService, private usuariosSvc: UsuariosService) { 
    this.authSvc.getCurrentUser()
    .subscribe(user => {
      this.photoSvc.userDir = user.uid;
      this.photoSvc.sectionDir = 'cosas-lindas';
      this.photoSvc.loadFiles();
      this.photoSvc.loadPhotosUser();
    });
  }

  ngOnInit() {
  }

}
