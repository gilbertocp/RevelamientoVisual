import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Camera, Direction } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  files = [];
  userDir: string;
  sectionDir: string;
  enEspera: boolean = false;
  photosDB = [];

  constructor(
    private camera: Camera,
    private file: File,
    private toastCtlr: ToastController,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private iab: InAppBrowser,
  ) { }

  loadPhotosUser(): void {
    const photos$ = this.db
                    .collection('usuarios')
                    .doc(this.userDir)
                    .collection('fotos')
                    .valueChanges({idField: 'docId'});

    photos$.subscribe(photos => {
      this.photosDB = photos;
    });
  }

  loadFiles(): void {
    this.enEspera = true;
    const storageRef = this.storage.ref(`${this.userDir}/${this.sectionDir}`);

    storageRef.listAll().subscribe(result => {
      this.files = [];

      result.items.forEach(async ref => {
        this.files.push({
          name: ref.name,
          full: ref.fullPath,
          url: await ref.getDownloadURL(),
          metadata: await ref.getMetadata(),
          ref: ref
        });

      });
      this.enEspera = false;
    });
  }

  deleteFile(file: any) {
    const dbFile = this.photosDB.filter(photo => photo.path === file.full);
    
    file.ref.delete().then(() => {
      this.db
            .collection('usuarios')
            .doc(this.userDir)
            .collection('fotos')
            .doc(dbFile[0].docId)
            .delete();

      this.loadFiles();
    });
  }

  openExternal(url) {
    this.iab.create(url);
  }

  takePic(): void {
    this.camera.getPicture({cameraDirection: Direction.BACK})
    .then(imageData => {
      this.uploadImg(imageData);
    })
    .catch(err => {
      console.log(err);
    })
  }

  uploadImg(url: string): void {
    const directory = url.substr(0, url.lastIndexOf('/') + 1);
    const fileName = url.substr(url.lastIndexOf('/') + 1);
    console.log(directory, fileName);

    this.file.readAsArrayBuffer(directory, fileName)
    .then(arrayBuffer => {
      const fileBlob = new Blob(
        [ arrayBuffer ], 
        { type: 'image/jpg' }
      );
      
      const storagePath = `${this.userDir}/${this.sectionDir}/${Math.random().toString(36).substring(2)}`;
      const uploadTask = this.storage.upload(storagePath, fileBlob);

      this.db.collection('usuarios')

      uploadTask.then(async task => {
        this.db.collection('usuarios').doc(this.userDir).collection('fotos').add({
          path: task.ref.fullPath,
          name: task.ref.name,
          metadata: JSON.stringify(await task.ref.getMetadata()),
          url: await task.ref.getDownloadURL(),
          type: this.sectionDir
        });

        this.toastCtlr.create({
          duration: 3000,
          message: 'Archivo Subido Exitosamente'
        })
        .then(toast => {
          this.loadFiles();
          toast.present();
        });
      }).catch(err => {
        console.log(err.message);
      });
    });
  }
}
