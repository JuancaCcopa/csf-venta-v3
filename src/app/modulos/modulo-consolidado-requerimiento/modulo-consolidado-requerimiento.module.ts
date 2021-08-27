import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//module
import { ConsolidadoRequerimientoRoutingModule } from './modulo-consolidado-requerimiento-routing.module';
import { ConsolidadoRequerimientoPrimeNgModule } from './modulo-consolidado-requerimiento-primeng.module';

//components
import { PanelConsolidadoRequerimientoComponent } from './components/panel-consolidado-requerimiento/panel-consolidado-requerimiento.component';
import { ConsolidadoRequerimientoCrearComponent } from './components/panel-consolidado-requerimiento/consolidado-requerimiento-crear/consolidado-requerimiento-crear.component';
import { RequerimientoListadoComponent } from './components/panel-consolidado-requerimiento/requerimiento-listado/requerimiento-listado.component';
import { CantidadEditarComponent } from './components/panel-consolidado-requerimiento/cantidad-editar/cantidad-editar.component';
import { RequerimientoVerDetalleComponent } from './components/panel-consolidado-requerimiento/requerimiento-ver-detalle/requerimiento-ver-detalle.component';
import { ConsolidadoRequerimientoVerComponent } from './components/panel-consolidado-requerimiento/consolidado-requerimiento-ver/consolidado-requerimiento-ver-component';
import { RequerimientoCompartidoModule } from '../modulo-compartido/Requerimiento/modulo-requerimiento-compartido.module';
import { ConsolidadoRequerimientoEditarComponent } from './components/panel-consolidado-requerimiento/consolidado-requerimiento-editar/consolidado-requerimiento-editar.component';

//import { RequerimientoCompartidoModule } from '../modulo-compartido/Requerimiento/modulo-requerimiento-compartido.module';

@NgModule({
    declarations: [
        PanelConsolidadoRequerimientoComponent,
        ConsolidadoRequerimientoCrearComponent,
        RequerimientoListadoComponent,
        CantidadEditarComponent,
        RequerimientoVerDetalleComponent,
        ConsolidadoRequerimientoVerComponent,
        ConsolidadoRequerimientoEditarComponent
    ],
    imports: [ CommonModule, ConsolidadoRequerimientoPrimeNgModule, ConsolidadoRequerimientoRoutingModule, ReactiveFormsModule, FormsModule,RequerimientoCompartidoModule],
    exports: [],
    providers: [],
})
export class ConsolidadoRequerimientoModule {}