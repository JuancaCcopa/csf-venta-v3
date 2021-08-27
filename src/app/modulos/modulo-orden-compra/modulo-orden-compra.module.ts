import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelOrdenCompraComponent } from './components/panel-orden-compra/panel-orden-compra.component';
import { RegistrarOrdenCompraComponent } from './components/panel-orden-compra/registrar-orden-compra/registrar-orden-compra.component';
import { ModificarOrdenCompraComponent } from './components/panel-orden-compra/modificar-orden-compra/modificar-orden-compra.component';
import { OrdenCompraPrimeNgModule } from './modulo-orden-compra-primeng.module';
import { OrdenCompraRoutingModule } from './modulo-orden-compra-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequerimientoCompartidoModule } from '../modulo-compartido/Requerimiento/modulo-requerimiento-compartido.module';

@NgModule({
    declarations: [
        PanelOrdenCompraComponent,
        RegistrarOrdenCompraComponent,
        ModificarOrdenCompraComponent],
    imports: [ CommonModule, OrdenCompraPrimeNgModule, OrdenCompraRoutingModule, ReactiveFormsModule, FormsModule, RequerimientoCompartidoModule],
    exports: [],
    providers: [],
})
export class OrdenCompraModule {}