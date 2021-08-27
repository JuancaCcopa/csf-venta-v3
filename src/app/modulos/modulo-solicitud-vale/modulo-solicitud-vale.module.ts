import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudValeRoutingModule } from './modulo-solicitud-vale-routing.module';
import { SolicitudValePrimeNgModule } from './modulo-solicitud-vale-primeng.module';
import { PanelSolicitudValeComponent } from './components/panel-solicitud-vale/panel-solicitud-vale.component';
import { PanelAProbacionSolicitudComponent } from './components/panel-aprobacion-solicitud/panel-aprobacion-solicitud.component';
import { VerDetalleSolicitudValeComponent } from './components/ver-detalle-solicitud-vale/ver-detalle-solicitud-vale.component';
import { RegistrarSolicitudValeComponent } from './components/registrar-solicitud-vale/registrar-solicitud-vale.component';
import { ModificarSolicitudValeComponent } from './components/modificar-solicitud-vale/modificar-solicitud-vale.component';
import { AprobacionSolicitudValeComponent } from './components/aprobacion-solicitud-vale/aprobacion-solicitud-vale.component';
import { ModalAprobacionIndividualComponent } from './components/modal-aprobacion-individual/modal-aprobacion-individual.component';
import { ModalAprobacionMasivaComponent } from './components/modal-aprobacion-masiva/modal-aprobacion-masiva.component';
import { RequerimientoCompartidoModule } from '../modulo-compartido/Requerimiento/modulo-requerimiento-compartido.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NameFileRutaSolicitudValePipe } from './pipes/name-file-ruta-solicitud-vale.pipe';

@NgModule({
    declarations: [PanelSolicitudValeComponent,
        PanelAProbacionSolicitudComponent,
        VerDetalleSolicitudValeComponent,
        RegistrarSolicitudValeComponent,
        ModificarSolicitudValeComponent,
        AprobacionSolicitudValeComponent,
        ModalAprobacionIndividualComponent,
        ModalAprobacionMasivaComponent,
        NameFileRutaSolicitudValePipe],
    imports: [ CommonModule,
        SolicitudValeRoutingModule,
        SolicitudValePrimeNgModule,
        RequerimientoCompartidoModule,
        ReactiveFormsModule,
        FormsModule],
    exports: [],
    providers: [],
})
export class SolicitudValeModule {}