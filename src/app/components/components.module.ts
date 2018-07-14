import { NgModule } from '@angular/core';
import { AppRoutingModule } from './../app-routing.module';
import { CommonModule } from '../../../node_modules/@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts';


// components
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ContactoComponent } from './contacto/contacto.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { LoginComponent } from './login/login.component';
import { GraficosComponent } from './graficos/graficos.component';
import { MapaComponent } from './mapa/mapa.component';
import { FallecidosComponent } from './fallecidos/fallecidos.component';
import { DesaparecidosComponent } from './desaparecidos/desaparecidos.component';
import { DetenidosComponent } from './detenidos/detenidos.component';
import { DetalleComponent } from './detalle/detalle.component';
import { EditComponent } from './edit/edit.component';
import { PlantillaComponent } from './plantilla/plantilla.component';
import { LoadingComponent } from './loading/loading.component';
import { GraficoComponent } from './grafico/grafico.component';

// Pipe
import { NoimagePipe } from '../pipes/noimage.pipe';

// directive
import { NgDropFilesDirective } from './../directives/ng-drop-files.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AppRoutingModule,
        ChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCrwIfz5nhCKhG-Vn6fazSGx_6m4rmIDRU'
        })
    ],
    exports: [
        NavbarComponent,
        AppRoutingModule,
        NoimagePipe,
        NgDropFilesDirective,
        AgmCoreModule
    ],
    declarations: [
        NavbarComponent,
        HomeComponent,
        ContactoComponent,
        NuevoComponent,
        LoginComponent,
        GraficosComponent,
        MapaComponent,
        FallecidosComponent,
        DesaparecidosComponent,
        DetenidosComponent,
        DetalleComponent,
        EditComponent,
        PlantillaComponent,
        LoadingComponent,
        NoimagePipe,
        NgDropFilesDirective,
        GraficoComponent
    ],
    providers: [],
})
export class ComponentsModule { }
