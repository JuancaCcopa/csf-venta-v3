import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PanelSolicitudValeComponent } from './components/panel-solicitud-vale/panel-solicitud-vale.component';
import { PanelAProbacionSolicitudComponent } from './components/panel-aprobacion-solicitud/panel-aprobacion-solicitud.component';
import { RegistrarSolicitudValeComponent } from './components/registrar-solicitud-vale/registrar-solicitud-vale.component';
import { ModificarSolicitudValeComponent } from './components/modificar-solicitud-vale/modificar-solicitud-vale.component';
import { VerDetalleSolicitudValeComponent } from './components/ver-detalle-solicitud-vale/ver-detalle-solicitud-vale.component';

const routes: Routes = [
    { path: 'panel-solicitud',component: PanelSolicitudValeComponent },
    { path: 'panel-aprobacion-solicitud', component: PanelAProbacionSolicitudComponent },
    { path: 'registro-solicitud-vale', component: RegistrarSolicitudValeComponent },
    { path: 'modificar-solicitud-vale/:id', component: ModificarSolicitudValeComponent },
    { path: 'ver-detalle-solicitud-vale', component: VerDetalleSolicitudValeComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SolicitudValeRoutingModule {}
