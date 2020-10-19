import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VotosService {

  private votos: Observable<any>;

  constructor(private db: AngularFirestore) { 
    this.votos = this.db.collection('votos').valueChanges({idField: 'docId'});
  }

  get getVotos(): Observable<any> {
    return this.votos;
  }

  getByPhoto(path): Observable<any> {
    return this.db.collection('votos', ref => ref.where('fullPath', '==', path)).valueChanges();
  }
}
