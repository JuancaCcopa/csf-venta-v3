import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//module
import { TomaInventarioRoutingModule } from './modulo-toma-inventario-routing.module';
import { TomaInventarioPrimeNgModule } from './modulo-toma-inventario-primeng.module';

//components
import { PanelTomaInventarioComponent } from './components/panel-toma-inventario/panel-toma-inventario.component';
import { TomaInvetarioCrearComponent } from './components/panel-toma-inventario/toma-inventario-crear/toma-inventario-crear-component';
import { TomaInvetarioGuardarComponent } from './components/panel-toma-inventario/toma-inventario-guardar/toma-inventario-guardar.component';
import { TomaInvetarioEditarComponent } from './components/panel-toma-inventario/toma-inventario-editar/toma-inventario-editar.component';
import { TomaInventarioVerStockComponent } from './components/panel-toma-inventario/toma-inventario-ver-stock/toma-inventario-ver-stock.component';
//compartido
import { RequerimientoCompartidoModule } from '../modulo-compartido/Requerimiento/modulo-requerimiento-compartido.module';


@NgModule({
    declarations: [
        PanelTomaInventarioComponent,
        TomaInvetarioCrearComponent,
        TomaInvetarioGuardarComponent,
        TomaInventarioVerStockComponent,
        TomaInvetarioEditarComponent
    ],
    imports: [ CommonModule, TomaInventarioPrimeNgModule, TomaInventarioRoutingModule, ReactiveFormsModule, FormsModule,RequerimientoCompartidoModule],
    exports: [],
    providers: [],
})
export class TomaInventarioModule {}