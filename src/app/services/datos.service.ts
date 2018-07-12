import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection , AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

import { Router } from '@angular/router';

import { FileItem } from '../models/file-item';
import { Persona } from './../models/persona';

import { Observable } from 'rxjs';

import { tap, map } from 'rxjs/operators';

// import * as _swal from 'sweetalert';
// import { SweetAlert } from 'sweetalert/typings/core';
// import { ActionSequence } from 'protractor';
// const swal: SweetAlert = _swal as any;
@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private CARPETA = 'victimas';

  task: AngularFireUploadTask;

  private municipioCollection: AngularFirestoreCollection< any >;
  private personasCollection: AngularFirestoreCollection< Persona >;
  private poblacionCollection: AngularFirestoreCollection< any >;
  private sexoCollection: AngularFirestoreCollection< any >;
  private ocupacionCollection: AngularFirestoreCollection< string >;
  private ciudadCollection: AngularFirestoreCollection< string >;
  personaDoc: AngularFirestoreDocument< Persona >;
  municipios: Observable< any >;
  ciudades: Observable< any >;
  poblacion: Observable< any >;
  sexo: Observable< any >;
  ocupacion: Observable< any >;
  persona: Observable< Persona >;
  personas: Observable< Persona[] >;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private router: Router
  ) { }

  getMunicipios() {

    this.municipioCollection = this.db.collection<any>('municipios', ref => ref.orderBy( 'cabecera' ) )

    return this.municipios =  this.municipioCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.doc.data();
        return data;
      })
    ));
  }

  getCiudades( ) {
    this.ciudadCollection = this.db.collection< any >('estadisticas').doc('ciudades').collection('poblacion');

    return this.ciudades = this.ciudadCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.doc.data() as Object;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    ));
  }
  getPoblacion( ) {
    this.poblacionCollection = this.db.collection< any >('estadisticas').doc('piramide').collection('poblacion');

    return this.poblacion = this.poblacionCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      })
    ));
  }
  getSexo( ) {
    this.sexoCollection = this.db.collection< any >('estadisticas').doc('genero').collection('sexo');

    return this.sexo = this.sexoCollection.valueChanges();
  }
  getEstadisticasOcupacion() {
    this.ocupacionCollection = this.db.collection< string >('estadisticas').doc('ocupaciones').collection('clasificaciones');

    return this.ocupacion = this.ocupacionCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.doc.data() as Object;
        const id = a.payload.doc.id;
        return { id, ...data};
      })
    ));
  }

  getOcupacion() {

    this.ocupacionCollection = this.db.collection< string >('ocupaciones');

    return this.ocupacion = this.ocupacionCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => {
        return a.payload.doc.id;
      })
    ));

  }
  getPersonasByCiudad( query: string ): Observable< Persona[] > {
    this.personasCollection = this.db.collection<Persona>('victimas', ref => ref.where('ciudad', '==', query ));
    return this.personas = this.personasCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      })
    ));
  }

  getPersonasByCategoria( query: string ): Observable< Persona[] > {
    this.personasCollection = this.db.collection<Persona>('victimas', ref => ref.where('categoria', '==', query ));
    return this.personas = this.personasCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      })
    ));
  }

  getPersona( idPersona: string ): Observable< Persona > {

      this.personaDoc = this.db.doc< Persona >(`victimas/${ idPersona }`);
      return this.persona = this.personaDoc.valueChanges();

  }
  getPersonas( ): Observable< Persona[] > {

    this.personasCollection = this.db.collection< Persona >(`victimas`);
    return this.personas = this.personasCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      } )
    ));

}
//   updatePersona( persona: Persona, page: string ) {
//     this.personaDoc = this.db.doc(`victimas/${persona.id}`);
//     this.personaDoc.update( persona ).then( () => {
//       const texto = `Datos de ${persona.nombre} actualizados con éxito!`;
//       swal({
//         title: 'Registro actualizado!',
//         text: texto,
//         icon: 'success'
//       }).then( () => {
//         this.router.navigate([`/detalle/${persona.id}/${page}`]);
//       }) ;

//     }) ;

//   }

//   guardarPersona( persona: Persona ) {
//     this.db.collection( `${this.CARPETA}`)
//             .add( persona ).then( () => {
//               const texto = `Datos de ${persona.nombre} guardados con éxito!`;
//               swal({
//                 title: 'Nuevo registro!',
//                 text: texto,
//                 icon: 'success'
//               });
//             });
//   }

//   borrarImagen( persona: Persona, page: string ) {
//     this.db.collection(`${this.CARPETA}`).doc( persona.id ).delete().then(() => {
//       this.storage.ref( `${this.CARPETA}/${persona.pictureName}` ).delete();
//     }).then( () => {
//       const texto = `Datos de ${persona.nombre} eliminados con éxito!`;
//       swal({
//         title: 'Registro eliminado!',
//         text: texto,
//         icon: 'success'
//       }).then( () => {
//         this.router.navigate( [page] );
//       }) ;

//     });
//   }
//   guardarImagen( imagenes: FileItem[], persona: Persona ) {

//     for ( const item of imagenes ) {
//       item.estaSubiendo = true;

//       if ( item.progreso >= 100 ) {
//         continue;
//       }
//        const nameArchivo = `${ new Date().getTime() }_${ item.nombreArchivo }`;
//        const uploadTask: AngularFireUploadTask =
//        this.storage.upload( `${ this.CARPETA }/${nameArchivo}`, item.archivo );

//        uploadTask.snapshotChanges().subscribe(
//          ( snap => {
//            item.progreso = ( snap.bytesTransferred / snap.totalBytes ) * 100;
//           }
//          ),
//          ( error => console.log( error ) ),
//          () => {
//             persona.pictureUrl = uploadTask.task.snapshot.downloadURL;
//             persona.pictureName = nameArchivo;
//             item.estaSubiendo = false;
//             this.guardarPersona( persona );
//           }
//        );
//     }
//   }
}
