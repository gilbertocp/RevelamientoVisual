import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
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
    this.afAuth.signOut().then(() => console.log('Deslogado'), () => console.log('Error'));
    localStorage.removeItem('rev_visual_login');
  }

  isLogged(): boolean {
    if(localStorage.getItem('rev_visual_login'))
      return true;

    return false;
  }

  getCurrentUser(): Observable<User> {
    return this.afAuth.authState;
  }
}
