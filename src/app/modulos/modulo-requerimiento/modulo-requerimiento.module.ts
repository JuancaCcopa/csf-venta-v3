import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelRequerimientoComponent } from './components/panel-requerimiento/panel-requerimiento.component';
import { RegistrarRequerimientoComponent } from './components/panel-requerimiento/registrar-requerimiento/registrar-requerimiento.component';
import { PanelAprobacionRequerimientoComponent } from './components/panel-aprobacion-requerimiento/panel-aprobacion-requerimiento.component';
import { VerDetalleRequerimientoComponent } from './components/panel-requerimiento/ver-detalle-requerimiento/ver-detalle-requerimiento.component';
import { ModificarRequerimientoComponent } from './components/panel-requerimiento/modificar-requerimiento/modificar-requerimiento.component';
import { TableListaAprobadoresComponent } from './components/table-lista-aprobadores/table-lista-aprobadores.component';
import { TableListaSelectAprobarComponent } from './components/table-lista-select-aprobar/table-lista-select-aprobar.component';
import { AprobacionRequerimientoIndividualComponent } from './components/panel-aprobacion-requerimiento/aprobacion-requerimiento-individual/aprobacion-requerimiento-individual.component';
import { ModalAprobacionIndividualComponent } from './components/panel-aprobacion-requerimiento/modal-aprobacion-individual/modal-aprobacion-individual.component';
import { ModalAprobacionRequerimientoMasivaComponent } from './components/panel-aprobacion-requerimiento/modal-aprobacion-requerimiento-masiva/modal-aprobacion-requerimiento-masiva.component';
import { RequerimientoRoutingModule } from './modulo-requerimiento-routing.module';
import { RequerimientoCompartidoModule } from '../modulo-compartido/Requerimiento/modulo-requerimiento-compartido.module';
import { NameFileRutaPipe } from './pipes/name-file-ruta.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequerimientoPrimeNgModule } from './modulo-requerimiento-primeng.module';
import { PanelUbicacionComponent } from './components/panel-ubicacion/panel-ubicacion.component';
import { RegistrarUbicacionComponent } from './components/panel-ubicacion/registrar-ubicacion/registrar-ubicacion.component';
import { PanelUbicacionPorStockComponent } from './components/panel-ubicacion/panel-ubicacion-por-stock/panel-ubicacion-por-stock.component';
import { RegistrarUbicacionPorStockComponent } from './components/panel-ubicacion/panel-ubicacion-por-stock/registrar-ubicacion-por-stock/registrar-ubicacion-por-stock.component';
import { PanelUbicacionPorTipoProductoComponent } from './components/panel-ubicacion/panel-ubicacion-por-tipo-producto/panel-ubicacion-por-tipo-producto.component';
import { RegistrarUbicacionPorTipoProductoComponent } from './components/panel-ubicacion/panel-ubicacion-por-tipo-producto/registrar-ubicacion-por-tipo-producto/registrar-ubicacion-por-tipo-producto.component';
import { PanelUbicacionPorUsuarioComponent } from './components/panel-ubicacion/panel-ubicacion-por-usuario/panel-ubicacion-por-usuario.component';
import { RegistrarUbicacionPorUsuarioComponent } from './components/panel-ubicacion/panel-ubicacion-por-usuario/registrar-ubicacion-por-usuario/registrar-ubicacion-por-usuario.component';
import { ControlsModule } from '../modulo-controls/modulo-controls.module';
import { PanelRequerimientoEconomatoComponent } from './components/panel-requerimiento-economato/panel-requerimiento-economato.component';
import { RegistrarRequerimientoEconomatoComponent } from './components/panel-requerimiento-economato/registrar-requerimiento-economato/registrar-requerimiento-economato.component';
import { ModificarRequerimientoEconomatoComponent } from './components/panel-requerimiento-economato/modificar-requerimiento-economato/modificar-requerimiento-economato.component';
import { VerDetalleRequerimientoEconomatoComponent } from './components/panel-requerimiento-economato/ver-detalle-requerimiento-economato/ver-detalle-requerimiento-economato.component';
import { AprobacionRequerimientoEconomatoComponent } from './components/panel-requerimiento-economato/aprobacion-requerimiento-economato/aprobacion-requerimiento-economato.component';
import { RevisionRequerimientoEconomatoComponent } from './components/panel-requerimiento-economato/revision-requerimiento-economato/revision-requerimiento-economato.component';

@NgModule({
  declarations: [
    PanelRequerimientoComponent,
    RegistrarRequerimientoComponent,
    PanelAprobacionRequerimientoComponent,
    VerDetalleRequerimientoComponent,
    ModificarRequerimientoComponent,
    TableListaAprobadoresComponent,
    TableListaSelectAprobarComponent,
    AprobacionRequerimientoIndividualComponent,
    ModalAprobacionIndividualComponent,
    ModalAprobacionRequerimientoMasivaComponent,
    NameFileRutaPipe,
    PanelUbicacionComponent,
    RegistrarUbicacionComponent,
    PanelUbicacionPorStockComponent,
    RegistrarUbicacionPorStockComponent,
    PanelUbicacionPorTipoProductoComponent,
    RegistrarUbicacionPorTipoProductoComponent,
    PanelUbicacionPorUsuarioComponent,
    RegistrarUbicacionPorUsuarioComponent,
    PanelRequerimientoEconomatoComponent,
    RegistrarRequerimientoEconomatoComponent,
    ModificarRequerimientoEconomatoComponent,
    VerDetalleRequerimientoEconomatoComponent,
    AprobacionRequerimientoEconomatoComponent,
    RevisionRequerimientoEconomatoComponent
  ],
  imports: [ CommonModule, RequerimientoRoutingModule, RequerimientoPrimeNgModule ,RequerimientoCompartidoModule, ReactiveFormsModule, FormsModule, ControlsModule],
  exports: [ ],
  providers: [  ]
})
export class ModuloRequerimientoModule {}
