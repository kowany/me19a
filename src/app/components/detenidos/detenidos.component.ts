import { Component, OnInit } from '@angular/core';
import { DatosService } from './../../services/datos.service';
import { Persona } from './../../models/persona';

@Component({
  selector: 'app-detenidos',
  templateUrl: './detenidos.component.html',
  styleUrls: ['./detenidos.component.scss']
})
export class DetenidosComponent implements OnInit {

  loading: boolean;
  personas: Persona[];

  constructor( private _datosService: DatosService ) {

    this.loading = true;

    this._datosService.getPersonasByCategoria( 'detenido' )
        .subscribe( personas => {
          this.personas = personas;
          this.personas = personas.sort( ( a, b ) => {
            return ( a.nombre.localeCompare( b.nombre ) );
          });

          this.loading = false;
        });

    }


  ngOnInit() {
  }

}
