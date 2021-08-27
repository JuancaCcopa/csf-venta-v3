import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//components
 import { PanelConsolidadoRequerimientoComponent } from './components/panel-consolidado-requerimiento/panel-consolidado-requerimiento.component';
 import { ConsolidadoRequerimientoCrearComponent } from './components/panel-consolidado-requerimiento/consolidado-requerimiento-crear/consolidado-requerimiento-crear.component';
import { ConsolidadoRequerimientoEditarComponent } from './components/panel-consolidado-requerimiento/consolidado-requerimiento-editar/consolidado-requerimiento-editar.component';
// import { ValeSalidaVerComponent } from './components/panel-vale-salida/vale-salida-ver/vale-salida-ver-component';

const routes: Routes = [
    { path: 'panel-consolidado-requerimiento', component: PanelConsolidadoRequerimientoComponent },
    { path: 'consolidado-requerimiento-crear', component: ConsolidadoRequerimientoCrearComponent },
    { path: 'editar/:id', component: ConsolidadoRequerimientoEditarComponent }
    //{ path: 'vale-salida-ver', component: ValeSalidaVerComponent }
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConsolidadoRequerimientoRoutingModule {}
