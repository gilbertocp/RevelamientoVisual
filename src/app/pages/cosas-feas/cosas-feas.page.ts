import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { AuthService } from '../../services/auth.service';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.page.html',
  styleUrls: ['./cosas-feas.page.scss'],
})
export class CosasFeasPage implements OnInit {

  constructor(public photoSvc: PhotoService, private authSvc: AuthService, private usuariosSvc: UsuariosService) { 
    this.authSvc.getCurrentUser()
    .subscribe(user => {
      this.photoSvc.userDir = user.uid;
      this.photoSvc.sectionDir = 'cosas-feas';
      this.photoSvc.loadFiles();
      this.photoSvc.loadPhotosUser();
    });
  }

  ngOnInit() {
  }

}
