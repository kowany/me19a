import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { DatosService } from './../../services/datos.service';
import { Persona } from './../../models/persona';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  categorias = [ 'fallecido', 'desaparecido', 'detenido' ];
  sexos = [ 'masculino', 'femenino' ];

  ocupaciones: any[] = [];

  municipios: string[] = [];
  page: string;
  idPersona: string;
  persona: Persona = {
    nombre: '',
    alias: '',
    edad: 0,
    fecha: new Date(),
    categoria: '',
    ciudad: '',
    biografia: '',
    pictureUrl: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFirestore,
    private _datosService: DatosService
  ) { }

  ngOnInit() {
    // console.log( this.route.parent );
    this.route.params
        .subscribe( params => {
          console.log( params );
          this.idPersona = this.route.snapshot.params['id'];
          this.page = this.route.snapshot.params['page'];
          this.getMunicipios();
          this.getOupaciones();
          this.getDetallePersona();
        });
  }

  getMunicipios( ) {

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
  getDetallePersona() {

    this._datosService.getPersona( this.idPersona )
    .subscribe( persona => {
      this.persona = persona;
      this.persona.id = this.idPersona;
    });

  }

  onActualizarRegistro( { value }: { value: Persona } ) {
    value.id = this.idPersona;
    value.edad = +value.edad;
    this._datosService.updatePersona( value, this.page );
  }

  onCancelar() {
    console.log(`/detalle/${this.idPersona}/${this.page}`);
    this.router.navigate([`/detalle/${this.idPersona}/${this.page}`]);
  }

  onChange() {
    this.page = this.persona.categoria + 's';
  }


}
