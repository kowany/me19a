import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { DatosService } from './../../services/datos.service';
import { Persona } from './../../models/persona';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';



@Component({
  selector: 'app-fallecidos',
  templateUrl: './fallecidos.component.html',
  styleUrls: ['./fallecidos.component.scss']
})
export class FallecidosComponent implements OnInit {

  loading: boolean;
 
  personas: Persona[];
  municipios: string[] = [];
  // searchterm: string;

  // startAt = new Subject();
  // endAt = new Subject();

  // startobs$ = this.startAt.asObservable();
  // endobs$ = this.endAt.asObservable();

  // combine$: Observable<any>;
  constructor(
    private _datosService: DatosService,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    // this.getMunicipios();
    this.getFallecidos();
    // Observable.combineLatest(this.startobs$, this.endobs$).subscribe( value => {
    //   this.firequery(value[0], value[1]).subscribe(personas => {
    //     this.personas = personas;
    //   });
    // });
  }
  getMunicipios() {

    this._datosService.getMunicipios()
      .subscribe( municipios => {
        municipios.map( municipio => {
          console.log( municipio.cabecera );
          return this.municipios.push(municipio.cabecera);
        });
      });

  }
  // search( $event ) {

  //   const q = $event.target.value;
  //   if ( q !== '' ) {
  //     this.startAt.next(q);
  //     this.endAt.next(q + '\uf8ff');
  //   } else {
  //     this.getFallecidos();
  //   }

  // }

  getFallecidos() {
    this.loading = true;

    this._datosService.getPersonasByCategoria( 'fallecido' )
    .subscribe( personas => {
      console.log( personas );
      this.personas = personas;
      this.personas = personas.sort( ( a, b ) => {
        return ( a.nombre.localeCompare( b.nombre ) );
      });

      this.loading = false;
    });

  // }
  // firequery( start, end ) {
  //   return this.afs.collection<Persona>('victimas', ref => ref.orderBy('nombre').startAt(start).endAt(end)).valueChanges();
  // }
}
