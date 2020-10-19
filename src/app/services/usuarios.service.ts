import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuarios: Observable<any>;

  constructor(private db: AngularFirestore) { 
    this.usuarios = this.db.collection('usuarios').valueChanges({idField: 'docId'});
  }

  get getUsuarios() {
    return this.usuarios;
  }

  getFotosUsuario(docId: string) {
    return this.db.collection('usuarios')
            .doc(docId)
            .collection('fotos')
            .valueChanges({idField: 'docId'});
  }
}
