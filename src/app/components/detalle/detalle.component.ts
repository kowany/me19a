import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from './../../models/persona';
import { Component, OnInit } from '@angular/core';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { DatosService } from '../../services/datos.service';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  rutaRetorno: string;
  persona: Persona;
  page = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _dataService: DatosService
  ) { }

  ngOnInit() {
    // console.log( this.route.params['value'].page );
    // console.log( this.route.snapshot.url[2] );
    this.route.params
        .subscribe( params => {
            this.page = params['page'];
            this.rutaRetorno = `/${this.page}`;
            this._dataService.getPersona( params['id'] )
                              .subscribe( persona => {
                                this.persona = persona;
                                this.persona.id = params['id'];
                                console.log( this.persona );
                              });
        });
  }
  onClickDelete() {
    const texto = `Estás a punto de borrar el registro de ${ this.persona.nombre }`;
    const botones = [ 'cancelar', 'borrar' ];
    swal({
      title: '¿ Estás seguro ?',
      text: texto,
      icon: 'warning',
      buttons: botones,
      dangerMode: true,
    })
    .then( borrar => {

      if ( borrar ) {
        // this._dataService.borrarImagen( this.persona, this.page );
      }
    });
  }


}
