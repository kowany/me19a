import { Component, OnInit } from '@angular/core';
import { Persona } from './../../models/persona';
import { DatosService } from './../../services/datos.service';

import { MapsAPILoader, GoogleMapsAPIWrapper, AgmMap, LatLngBounds } from '@agm/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  title = 'Mapa de ciudades con fallecidos';
  subtitle = 'haga click sobre la ciudad para ver listado';
  marcadores: any[] = [];
  personas: Persona[] = [];
  poblacion: Persona[] = [];
  ciudadSelected = '';
  lat = 12.435083;
  lng = -86.87867;
  styledMapType: any[] = [];
  mapBounds: LatLngBounds = null;
  lastInfoWindowOpen = null;
  loading = true;

  constructor(  private _dataService: DatosService, private mapsApiLoader: MapsAPILoader  ) {
            this.getStyles();
            this.getCiudades();
            // this.getPoblacion();

  }

  getPoblacion() {
    this._dataService.getPersonasByCiudad( 'Managua' )
        .subscribe( poblacion => {
          this.poblacion = poblacion;
          console.log( this.poblacion );
          this.poblacion = poblacion.sort( ( a, b ) => {
            return ( a.edad - b.edad );
          });
        } );
    }

  getCiudades() {
    this._dataService.getCiudades()
    .subscribe( data => {
      // console.log( data );
      data.map( ciudad => {
        console.log(ciudad);
        const nuevoMarcador = {
          lat: ciudad.location.latitude,
          lng: ciudad.location.longitude,
          titulo: ciudad.id,
          fallecidos: ciudad.cantidad
        };
        this.marcadores.push( nuevoMarcador );
      });
      this.getBound();
      });
  }
  getBound() {

    this.mapsApiLoader.load().then( () => {
      const bounds: LatLngBounds = new window['google'].maps.LatLngBounds();
      this.marcadores.map( ( marker ) => {
        bounds.extend( new window['google'].maps.LatLng( marker.lat, marker.lng ) );
    });
    this.mapBounds = bounds;
    this.loading = false;
    } );
  }

  getListado( ciudad ) {
    this.personas = [];
    this.ciudadSelected = ciudad;
    this._dataService.getPersonasByCiudad( ciudad )
    .subscribe( personas => {

      let filtrado = [];
      filtrado = personas.filter( persona => persona.categoria === 'fallecido' );
      this.personas = filtrado.sort( ( a, b ) => {
        return ( a.nombre.localeCompare( b.nombre ) );
      });
      this.lastInfoWindowOpen.close();
    });

  }
  clickMarcador( iw ) {

      if ( this.lastInfoWindowOpen ) {
        this.lastInfoWindowOpen.close();
      }
      this.lastInfoWindowOpen = iw;
  }

  getStyles() {
  this.styledMapType =  [
      {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
      {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{color: '#c9b2a6'}]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'geometry.stroke',
        stylers: [{color: '#dcd2be'}]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [{color: '#ae9e90'}]
      },
      {
        featureType: 'landscape.natural',
        elementType: 'geometry',
        stylers: [{color: '#dfd2ae'}]
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{color: '#dfd2ae'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#93817c'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [{color: '#a5b076'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#447530'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#f5f1e6'}]
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{color: '#fdfcf8'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#f8c967'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#e9bc62'}]
      },
      {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry',
        stylers: [{color: '#e98d58'}]
      },
      {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry.stroke',
        stylers: [{color: '#db8555'}]
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [{color: '#806b63'}]
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{color: '#dfd2ae'}]
      },
      {
        featureType: 'transit.line',
        elementType: 'labels.text.fill',
        stylers: [{color: '#8f7d77'}]
      },
      {
        featureType: 'transit.line',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#ebe3cd'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [{color: '#dfd2ae'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{color: '#97FFFF'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6495ED'}]
      }
    ];
    // {name: 'Styled Map'});

  }
}


}
