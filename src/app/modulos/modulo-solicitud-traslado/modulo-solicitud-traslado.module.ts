import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//module
import { SolicitudTrasladoRoutingModule } from './modulo-solicitud-traslado-routing.module';
import { SolicitudTrasladoPrimeNgModule } from './modulo-solicitud-traslado-primeng.module';

//components
import { PanelSolicitudTraslaComponent } from './components/panel-solicitud-traslado/panel-solicitud-traslado.component';
import { SolicitudTrasladoCrearComponent } from './components/panel-solicitud-traslado/solicitud-traslado-crear/solicitud-traslado-crear.component';
import { SolicitudTraslaVerComponent } from './components/panel-solicitud-traslado/solicitud-traslado-ver/solicitud-traslado-ver.component';

import { RequerimientoCompartidoModule } from '../modulo-compartido/Requerimiento/modulo-requerimiento-compartido.module';
    

@NgModule({
    declarations: [
        PanelSolicitudTraslaComponent,
        SolicitudTrasladoCrearComponent,
        SolicitudTraslaVerComponent
        
    ],
    imports: [ CommonModule, SolicitudTrasladoPrimeNgModule, SolicitudTrasladoRoutingModule, ReactiveFormsModule, FormsModule, RequerimientoCompartidoModule],
    exports: [],
    providers: [],
})
export class SolicitudTrasladoModule {}
