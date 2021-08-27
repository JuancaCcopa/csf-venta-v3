import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//components
 import { PanelSolicitudTraslaExtComponent } from './components/panel-solicitud-traslado-ext/panel-solicitud-traslado-ext.component';
 import { SolicitudTrasladoExtCrearComponent } from './components/panel-solicitud-traslado-ext/solicitud-traslado-ext-crear/solicitud-traslado-ext-crear.component';

// import { RegistrarValeSalidaComponent } from './components/panel-vale-salida/vale-salida-crear/registrar-vale-salida.component';
// import { ValeSalidaVerComponent } from './components/panel-vale-salida/vale-salida-ver/vale-salida-ver-component';

const routes: Routes = [
    { path: 'panel-solicitud-traslado-ext', component: PanelSolicitudTraslaExtComponent },
    { path: 'solicitud-traslado-ext-crear', component: SolicitudTrasladoExtCrearComponent }    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SolicitudTrasladoExtRoutingModule {}
