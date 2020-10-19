import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  logout(): void {
    this.afAuth.signOut();
    localStorage.removeItem('rev_visual_login');
  }

  isLogged(): boolean {
    if(localStorage.getItem('rev_visual_login'))
      return true;

    return false;
  }

  getCurrentUser(): Promise<User> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
