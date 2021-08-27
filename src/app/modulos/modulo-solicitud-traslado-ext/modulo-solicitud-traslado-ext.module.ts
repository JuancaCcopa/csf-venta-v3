import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//module
import { SolicitudTrasladoExtRoutingModule } from './modulo-solicitud-traslado-ext-routing.module';
import { SolicitudTrasladoExtPrimeNgModule } from './modulo-solicitud-traslado-ext-primeng.module';

//components
import { PanelSolicitudTraslaExtComponent } from './components/panel-solicitud-traslado-ext/panel-solicitud-traslado-ext.component';
import { SolicitudTrasladoExtCrearComponent } from './components/panel-solicitud-traslado-ext/solicitud-traslado-ext-crear/solicitud-traslado-ext-crear.component';
import { SolicitudTraslaExtVerComponent } from './components/panel-solicitud-traslado-ext/solicitud-traslado-ext-ver/solicitud-traslado-ext-ver.component';

import { RequerimientoCompartidoModule } from '../modulo-compartido/Requerimiento/modulo-requerimiento-compartido.module';
    

@NgModule({
    declarations: [
        PanelSolicitudTraslaExtComponent,
        SolicitudTrasladoExtCrearComponent,
        SolicitudTraslaExtVerComponent
        
    ],
    imports: [ CommonModule, SolicitudTrasladoExtPrimeNgModule, SolicitudTrasladoExtRoutingModule, ReactiveFormsModule, FormsModule, RequerimientoCompartidoModule],
    exports: [],
    providers: [],
})
export class SolicitudTrasladoExtModule {}
