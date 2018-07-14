import { DatosService } from './../../services/datos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {

   // tipo de gráfico
   public doughnutChartType = 'doughnut';
  
   // para gráfico de población
   public doughnutChartLabelsPoblacion: string[] = ['< 18 años', '> 40 años', 'entre 19 y 29 años', 'entre 30 y 39 años'];
   public doughnutChartDataPoblacion: number[] = [350, 450, 100, 88];
   doughnutChartColorsPoblacion: any[] = [{ backgroundColor: ['#FFE29A', '#FF8BA4', '#86C7F3', '#a4add3'] }];
   titlePoblacion = 'Gráfico de muertes por edades';
   cargadoPoblacion = false;
   
   // para gráfico de sexo
   public doughnutChartLabelsSexo: string[] = ['Hombres', 'Mujeres'];
   public doughnutChartDataSexo: number[] = [350, 450];
   doughnutChartColorsSexo: any[] = [{ backgroundColor: ['#FFE29A', '#FF8BA4'] }];
   titleSexo = 'Gráfico de muertes por género';
   cargadoSexo = false;
 
 
   // para gráfico de ocupación
   public doughnutChartColorsOcupacion: any[] = [{ backgroundColor: ['#FFE29A', '#FF8BA4', '#a4add3', '#86C7F3'] }];
   public doughnutChartLabelsOcupacion: string[] = ['desconocidas', 'estudiantes', 'policías', 'trabajadores'];
   public doughnutChartDataOcupacion: number[] = [350, 450, 100, 88];
   titleOcupacion = 'Gráfico de muertes por ocupaciones';
   cargadoOcupacion = false;
 
   // para gráfico de ciudades cdc8b1
   public doughnutChartColorsCiudades: any[] = [{ backgroundColor: ['#D8BFD8', '#A0CFEC', '#FF8BA4', '#7BCCB5', '#EDC9AF',
   '#86C7F3', '#DCDCDC', '#669999', '#cdc1c5', '#b0c4de', '#87AFC7', '#FFE29A', '#c1ffc1', '#FFEBCD', '#add8e6', '#b4cdcd',
   '#b0c4de', '#FCF6CF', '#6495ED', '#cc6666', '#FF4500', '#DB7093', '#F0E68C', '#9370DB', '#6B8E23'] }];
   public doughnutChartLabelsCiudades: string[] = ['Bilwi', 'Bluefields', 'Chinandega', 'Ciudad Sandino', 'Diriamba',
   'Estelí', 'Granada', 'Jinotega', 'Jinotepe', 'La Trinidad', 'León', 'Managua', 'Masaya', 'Matagalpa', 'Mateare',
   'Mulukukú', 'Nagarote', 'Sébaco', 'Ticuantepe', 'Tipitapa'];
   public doughnutChartDataCiudades: number[] = [350, 450, 100, 88, 350, 450, 100, 88, 350, 450, 100, 88, 55];
   titleCiudades = 'Gráfico de muertes por ciudades';
   cargadoCiudades = false;
   datosCiudad: any;
 
   constructor( private _dataService: DatosService ) {
     this.getPoblacion();
     this.getSexo();
     this.getOcupacion();
     this.getCiudades();
   }
 
   getPoblacion() {
 
     this._dataService.getPoblacion()
     .subscribe( data => {
       this.doughnutChartDataPoblacion = [];
       this.doughnutChartLabelsPoblacion = [];
         data.map( registro => {
           this.doughnutChartLabelsPoblacion.push( registro.id );
           this.doughnutChartDataPoblacion.push( registro.cantidad );
           this.cargadoPoblacion = true;
         });
       } );
 
   }
   getSexo() {
     this._dataService.getSexo()
         .subscribe( sexo => {
             this.doughnutChartDataSexo = [];
             sexo.map ( sex => {
               this.doughnutChartDataSexo.push( sex.cantidad );
               this.cargadoSexo = true;
             });
           }
         );
   }
 
   getOcupacion() {
     this._dataService.getEstadisticasOcupacion()
         .subscribe( data => {
           this.doughnutChartDataOcupacion = [];
           this.doughnutChartLabelsOcupacion = [];
           data.map( ocupacion => {
             this.doughnutChartDataOcupacion.push( ocupacion.cantidad );
             this.doughnutChartLabelsOcupacion.push( ocupacion.id );
             this.cargadoOcupacion = true;
           });
         });
   }

   getCiudades() {
     this._dataService.getCiudades()
         .subscribe( data => {
           this.datosCiudad = data.filter( ciudad => ciudad.cantidad !== 0 );
           this.doughnutChartDataCiudades = [];
           this.doughnutChartLabelsCiudades = [];
           this.datosCiudad.map( ciudad => {
             this.doughnutChartDataCiudades.push( ciudad.cantidad );
             this.doughnutChartLabelsCiudades.push( ciudad.id );
             this.cargadoCiudades = true;
           });
         });
   }

   ngOnInit() {}

}
