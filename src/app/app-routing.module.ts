import { NuevoComponent } from './components/nuevo/nuevo.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlantillaComponent } from './components/plantilla/plantilla.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoginComponent } from './components/login/login.component';
import { FallecidosComponent } from './components/fallecidos/fallecidos.component';
import { DesaparecidosComponent } from './components/desaparecidos/desaparecidos.component';
import { DetenidosComponent } from './components/detenidos/detenidos.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { EditComponent } from './components/edit/edit.component';
import { GraficosComponent } from './components/graficos/graficos.component';
import { MapaComponent } from './components/mapa/mapa.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'nuevo', component: NuevoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'graficos', component: GraficosComponent },
  { path: 'mapa', component: MapaComponent },
  { path: 'fallecidos', component: FallecidosComponent },
  { path: 'desaparecidos', component: DesaparecidosComponent },
  { path: 'detenidos', component: DetenidosComponent },
  { path: 'detalle/:id/:page', component: DetalleComponent },
  { path: 'edit/:id/:page', component: EditComponent },
  { path: '**', component: PlantillaComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
