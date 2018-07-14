import { Component, OnInit } from '@angular/core';
import { Persona } from './../../models/persona';
import { DatosService } from './../../services/datos.service';

@Component({
  selector: 'app-desaparecidos',
  templateUrl: './desaparecidos.component.html',
  styleUrls: ['./desaparecidos.component.scss']
})
export class DesaparecidosComponent implements OnInit {

  personas: Persona[];
  loading: boolean;

  constructor( private _datosService: DatosService ) {

    this.loading = true;

    this._datosService.getPersonasByCategoria( 'desaparecido' )
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
