import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { DatosService } from './../../services/datos.service';
import { Persona } from './../../models/persona';
import { FileItem } from '../../models/file-item';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit {

  categorias = [ 'fallecido', 'desaparecido', 'detenido' ];
  sexos = [ 'masculino', 'femenino' ];
  ocupaciones: any[] = [];

  municipios: string[] = [];
  archivos: FileItem[] = [];
  estaSobreElemento = false;

  persona: Persona = {
    nombre: '',
    alias: '',
    edad: 0,
    fecha: '',
    categoria: '',
    ciudad: '',
    biografia: '',
    pictureUrl: '',
    pictureName: '',
    ocupacion: '',
    sexo: ''
  };


  constructor(
    private _datosService: DatosService,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    this.getMunicipios();
    this.getOupaciones();
  }
  getMunicipios() {

    this._datosService.getMunicipios()
      .subscribe( municipios => {
        municipios.map( municipio => {
          return this.municipios.push(municipio.cabecera);
        });
      });

  }

  getOupaciones() {
    this._datosService.getOcupacion()
      .subscribe( data => this.ocupaciones = data );
  }

  limpiarArchivos() {
    this.archivos = [];
  }

  onGuardarRegistro( { value }: { value: Persona } ) {
    value.edad = +value.edad;
    console.log( 'formulario', value );
    if ( this.archivos.length > 0 ) {
      console.log( 'archivos>', this.archivos );
      this._datosService.guardarImagen( this.archivos, value );
    } else {
      console.log( 'No hay archivos' );
      this._datosService.guardarPersona( value );
    }
  }

}

