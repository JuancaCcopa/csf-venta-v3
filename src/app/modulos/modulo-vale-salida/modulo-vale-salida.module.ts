import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { PanelOrdenCompraComponent } from './components/panel-orden-compra/panel-orden-compra.component';
import { PanelValeSalidaComponent } 
from './components/panel-vale-salida/panel-vale-salida.component';
import { ValeSalidaPrimeNgModule } from './modulo-vale-salida-primeng.module';
import { ValeSalidaRoutingModule } from './modulo-vale-salida-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrarValeSalidaComponent } from './components/panel-vale-salida/vale-salida-crear/registrar-vale-salida.component';
import  { ValeSalidaVerComponent} from './components/panel-vale-salida/vale-salida-ver/vale-salida-ver-component';
import { RequerimientoCompartidoModule } from '../modulo-compartido/Requerimiento/modulo-requerimiento-compartido.module';

//import { VerDetalleRequerimientoEconomatoComponent } from './components/panel-requerimiento-economato/ver-detalle-requerimiento-economato/ver-detalle-requerimiento-economato.component';

@NgModule({
    declarations: [
        PanelValeSalidaComponent,
        RegistrarValeSalidaComponent,
        ValeSalidaVerComponent
    ],
    imports: [ CommonModule, ValeSalidaPrimeNgModule, ValeSalidaRoutingModule, ReactiveFormsModule, FormsModule, RequerimientoCompartidoModule],
    exports: [],
    providers: [],
})
export class ValeSalidaModule {}