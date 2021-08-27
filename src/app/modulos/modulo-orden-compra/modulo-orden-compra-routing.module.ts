import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PanelOrdenCompraComponent } from './components/panel-orden-compra/panel-orden-compra.component';
import { RegistrarOrdenCompraComponent } from './components/panel-orden-compra/registrar-orden-compra/registrar-orden-compra.component';
import { ModificarOrdenCompraComponent } from './components/panel-orden-compra/modificar-orden-compra/modificar-orden-compra.component';

const routes: Routes = [
    { path: 'panel-orden-compra', component: PanelOrdenCompraComponent },
    { path: 'registrar-orden-compra', component: RegistrarOrdenCompraComponent },
    { path: 'modificar-orden-compra/:id', component: ModificarOrdenCompraComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdenCompraRoutingModule {}
