import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
//import { PanelOrdenCompraComponent } from './components/panel-orden-compra/panel-orden-compra.component';
import { PanelValeSalidaComponent } from './components/panel-vale-salida/panel-vale-salida.component';
import { RegistrarValeSalidaComponent } from './components/panel-vale-salida/vale-salida-crear/registrar-vale-salida.component';
import { ValeSalidaVerComponent } from './components/panel-vale-salida/vale-salida-ver/vale-salida-ver-component';
// import { ModificarOrdenCompraComponent } from './components/panel-orden-compra/modificar-orden-compra/modificar-orden-compra.component';

const routes: Routes = [
    { path: 'panel-vale-salida', component: PanelValeSalidaComponent },
    { path: 'registrar-vale-salida', component: RegistrarValeSalidaComponent },
    { path: 'vale-salida-ver', component: ValeSalidaVerComponent }
    // { path: 'modisficar-orden-compra/:id', component: ModificarOrdenCompraComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ValeSalidaRoutingModule {}
