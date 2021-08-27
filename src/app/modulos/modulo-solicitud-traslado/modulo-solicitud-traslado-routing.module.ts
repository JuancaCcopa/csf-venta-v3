import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//components
 import { PanelSolicitudTraslaComponent } from './components/panel-solicitud-traslado/panel-solicitud-traslado.component';
 import { SolicitudTrasladoCrearComponent } from './components/panel-solicitud-traslado/solicitud-traslado-crear/solicitud-traslado-crear.component';

// import { RegistrarValeSalidaComponent } from './components/panel-vale-salida/vale-salida-crear/registrar-vale-salida.component';
// import { ValeSalidaVerComponent } from './components/panel-vale-salida/vale-salida-ver/vale-salida-ver-component';

const routes: Routes = [
    { path: 'panel-solicitud-traslado', component: PanelSolicitudTraslaComponent },
    { path: 'solicitud-traslado-crear', component: SolicitudTrasladoCrearComponent }
    // { path: 'vale-salida-ver', component: ValeSalidaVerComponent }
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SolicitudTrasladoRoutingModule {}
