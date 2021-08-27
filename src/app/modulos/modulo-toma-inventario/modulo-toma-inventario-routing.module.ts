import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//components
 import { PanelTomaInventarioComponent } from './components/panel-toma-inventario/panel-toma-inventario.component';
 import { TomaInvetarioCrearComponent } from './components/panel-toma-inventario/toma-inventario-crear/toma-inventario-crear-component';
 import { TomaInvetarioGuardarComponent } from './components/panel-toma-inventario/toma-inventario-guardar/toma-inventario-guardar.component';


const routes: Routes = [
    { path: 'panel-toma-inventario', component: PanelTomaInventarioComponent },
    { path: 'toma-inventario-crear', component: TomaInvetarioCrearComponent },
    { path: 'toma-inventario-guardar', component: TomaInvetarioGuardarComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TomaInventarioRoutingModule {}
