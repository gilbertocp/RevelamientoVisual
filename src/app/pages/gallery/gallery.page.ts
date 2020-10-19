import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, take } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { UsuariosService } from '../../services/usuarios.service';
import { VotosService } from '../../services/votos.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  sectionDir: string = 'cosas-lindas';
  currentUser: string;
  files = [];
  votos = [];
  enEspera = false;

  constructor(
    private db: AngularFirestore, 
    private authSvc: AuthService, 
    private usuariosSvc: UsuariosService,
    private votosSvc: VotosService
  ) { 
    this.authSvc.getCurrentUser()
    .then(user => this.currentUser = user.uid);

    this.votosSvc.getVotos.subscribe(
      votos => {
        this.votos = votos;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.loadFiles();
  }

  changeSection(): void {
    if(this.sectionDir === 'cosas-lindas') {
      this.sectionDir = 'cosas-feas';
    }else {
      this.sectionDir = 'cosas-lindas';
    }

    this.loadFiles();
  }

  refresh(e): void {
    e.target.complete();
    this.loadFiles();
  }

  getVotesCurrentPhoto(fullPath): number {
    const votesCurrPhoto = this.votos.filter(vote => vote.fullPath === fullPath);
    return votesCurrPhoto.length;
  }

  checkIfCurrentUserVoted(file): boolean | string {
    for(const vote of this.votos) {
      if(file.path === vote.fullPath && this.currentUser === vote.userId) {
        return vote.docId;
      }
    }

    return false;
  }

  vote(file: any): void {
    const voteId : boolean | string = this.checkIfCurrentUserVoted(file);

    // dislike
    if(typeof voteId === 'string') {
      this.db.collection('votos').doc(voteId).delete();
      return;
    }

    // like
    this.db.collection('votos').add({
      userId: this.currentUser,
      fullPath: file.path
    });
  }

  loadFiles(): void {
    this.enEspera = true;
    this.files = [];
    this.usuariosSvc.getUsuarios.subscribe(
      usuarios => {
        usuarios.forEach(usuario => {
          let usuarios$ = this.usuariosSvc.getFotosUsuario(usuario.docId).subscribe(
            fotos => {
              fotos.filter(foto => foto.type === this.sectionDir)
              .forEach(foto => {
                this.files.push({
                  ...foto,
                  correo: usuario.correo,
                  subido: new Date(JSON.parse(foto.metadata).timeCreated),
                });
                
              
                this.enEspera = false;
              });

              this.files.sort((file1, file2) => {
                return file2.subido.getTime() - file1.subido.getTime() ;
              });
              usuarios$.unsubscribe();
            }
          );
        });        
      }
    );
  }
}
