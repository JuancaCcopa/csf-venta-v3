import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalBusquedaAlmacenComponent } from './components/modal-busqueda-almacen/modal-busqueda-almacen.component';
import { ModalBusquedaTipoVentaComponent } from './components/modal-busqueda-tipo-venta/modal-busqueda-tipo-venta.component';
import { VentasCompartidoPrimeNgModule } from './modulo-ventas-compartido-primeng.module';
import { ModalBusquedaClienteExternoComponent } from './components/modal-busqueda-cliente-externo/modal-busqueda-cliente-externo.component';
import { ModalBusquedaAtencionPacienteComponent } from './components/modal-busqueda-atencion-paciente/modal-busqueda-atencion-paciente.component';
import { ModalBusquedaMedicoComponent } from './components/modal-busqueda-medico/modal-busqueda-medico.component';
import { ModalBusquedaTipoComprobanteComponent } from './components/modal-busqueda-tipo-comprobante/modal-busqueda-tipo-comprobante.component';
import { ModalBusquedaProductoComponent } from './components/modal-busqueda-producto/modal-busqueda-producto.component';
import { ModalBusquedaRecetaComponent } from './components/modal-busqueda-receta/modal-busqueda-receta.component';
import { ModalBusquedaPedidoComponent } from './components/modal-busqueda-pedido/modal-busqueda-pedido.component';
import { ModalBusquedaPersonalClinicaComponent } from './components/modal-busqueda-personal-clinica/modal-busqueda-personal-clinica.component';
import { ModalBusquedaVentaPorAtencionComponent } from './components/modal-busqueda-venta-por-atencion/modal-busqueda-venta-por-atencion.component';
import { ModalBusquedaPedidosPorPacienteComponent } from './components/modal-busqueda-pedidos-por-paciente/modal-busqueda-pedidos-por-paciente.component';
import { ModalBusquedaGenericoComponent } from './components/modal-busqueda-generico/modal-busqueda-generico.component';
import { ModalBusquedaPedidoDevolucionComponent } from './components/modal-busqueda-pedido-devolucion/modal-busqueda-pedido-devolucion.component';
import { ModalBusquedaNotaCreditoDevolucionComponent } from './components/modal-busqueda-nota-credito-devolucion/modal-busqueda-nota-credito-devolucion.component';
import { ModalConsultaProductoComponent } from './components/modal-consulta-producto/modal-consulta-producto.component';
import { ModalConsultaLoteComponent } from './components/modal-consulta-lote/modal-consulta-lote.component';
import { LabelEstadoComponent } from './components/label-estado/label-estado.component';
import { ModalRecetaObservacionComponent } from './components/modal-receta-observacion/modal-receta-observacion.component';
import { BtnSalirComponent } from './components/btn-salir/btn-salir.component';
import { ModalBusquedaHospitalExclusionesComponent } from './components/modal-busqueda-hospital-exclusiones/modal-busqueda-hospital-exclusiones.component';
import { ModalBusquedaPlanesComponent } from './components/modal-busqueda-planes/modal-busqueda-planes.component';
import { ModalAutenticacionComponent } from './components/modal-autenticacion/modal-autenticacion.component';
import { ModalBusquedaCentroCostoComponent } from './components/modal-busqueda-centro-costo/modal-busqueda-centro-costo.component';
import { ModalBusquedaHistorialVentaComponent } from './components/modal-busqueda-historial-venta/modal-busqueda-historial-venta.component';
import { ModalBusquedaMaestroGenericoComponent } from './components/modal-busqueda-maestro-generico/modal-busqueda-maestro-generico.component';
import { ModalVisorPdfComponent } from './components/modal-visor-pdf/modal-visor-pdf.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { RegistrarRecetaObservacionComponent } from './components/modal-receta-observacion/registrar-receta-observacion/registrar-receta-observacion.component';
import { ModalBusquedaValeDeliveryComponent } from './components/modal-busqueda-receta/modal-busqueda-vale-delivery/modal-busqueda-vale-delivery.component';
import { ListaValeDeliveryComponent } from './components/modal-busqueda-receta/lista-vale-delivery/lista-vale-delivery.component';
import { ModalBusquedaClienteComponent } from './components/modal-busqueda-cliente/modal-busqueda-cliente.component';
import { ModalBusquedaDocIdentidadComponent } from './components/modal-busqueda-doc-identidad/modal-busqueda-doc-identidad.component';
import { ModalBusquedaEntidadComponent } from './components/modal-busqueda-entidad/modal-busqueda-entidad.component';
import { ModalBusquedaTarjetaCreditoComponent } from './components/modal-busqueda-tarjeta-credito/modal-busqueda-tarjeta-credito.component';
import { ModalBusquedaTerminalComponent } from './components/modal-busqueda-terminal/modal-busqueda-terminal.component';
import { ModalBusquedaTipoPagoComponent } from './components/modal-busqueda-tipo-pago/modal-busqueda-tipo-pago.component';

@NgModule({
    declarations: [
        ModalBusquedaAlmacenComponent,
        ModalBusquedaTipoVentaComponent,
        ModalBusquedaClienteExternoComponent,
        ModalBusquedaAtencionPacienteComponent,
        ModalBusquedaMedicoComponent,
        ModalBusquedaTipoComprobanteComponent,
        ModalBusquedaProductoComponent,
        ModalBusquedaRecetaComponent,
        ModalBusquedaPedidoComponent,
        ModalBusquedaPersonalClinicaComponent,
        ModalBusquedaVentaPorAtencionComponent,
        ModalBusquedaPedidosPorPacienteComponent,
        ModalBusquedaGenericoComponent,
        ModalBusquedaPedidoDevolucionComponent,
        ModalBusquedaNotaCreditoDevolucionComponent,
        ModalConsultaProductoComponent,
        ModalConsultaLoteComponent,
        LabelEstadoComponent,
        ModalRecetaObservacionComponent,
        BtnSalirComponent,
        ModalBusquedaHospitalExclusionesComponent,
        ModalBusquedaPlanesComponent,
        ModalAutenticacionComponent,
        ModalBusquedaCentroCostoComponent,
        ModalAutenticacionComponent,
        ModalBusquedaHistorialVentaComponent,
        ModalBusquedaMaestroGenericoComponent,
        ModalVisorPdfComponent,
        RegistrarRecetaObservacionComponent,
        ModalBusquedaValeDeliveryComponent,
        ListaValeDeliveryComponent,
        ModalBusquedaClienteComponent,
        ModalBusquedaDocIdentidadComponent,
        ModalBusquedaEntidadComponent,
        ModalBusquedaTarjetaCreditoComponent,
        ModalBusquedaTerminalComponent,
        ModalBusquedaTipoPagoComponent
    ],
    imports: [ 
        CommonModule,
        FormsModule,
        VentasCompartidoPrimeNgModule,
        ReactiveFormsModule,
        NgxDocViewerModule
     ],
    exports: [
        ModalBusquedaAlmacenComponent,
        ModalBusquedaTipoVentaComponent,
        ModalBusquedaClienteExternoComponent,
        ModalBusquedaAtencionPacienteComponent,
        ModalBusquedaMedicoComponent,
        ModalBusquedaTipoComprobanteComponent,
        ModalBusquedaProductoComponent,
        ModalBusquedaRecetaComponent,
        ModalBusquedaPedidoComponent,
        ModalBusquedaPersonalClinicaComponent,
        ModalBusquedaVentaPorAtencionComponent,
        ModalBusquedaPedidosPorPacienteComponent,
        ModalBusquedaGenericoComponent,
        ModalBusquedaPedidoDevolucionComponent,
        ModalBusquedaNotaCreditoDevolucionComponent,
        ModalConsultaProductoComponent,
        ModalConsultaLoteComponent,
        LabelEstadoComponent,
        ModalRecetaObservacionComponent,
        BtnSalirComponent,
        ModalBusquedaHospitalExclusionesComponent,
        ModalBusquedaPlanesComponent,
        ModalAutenticacionComponent,
        ModalBusquedaCentroCostoComponent,
        ModalAutenticacionComponent,
        ModalBusquedaHistorialVentaComponent,
        ModalBusquedaMaestroGenericoComponent,
        ModalVisorPdfComponent,
        ModalBusquedaClienteComponent,
        ModalBusquedaDocIdentidadComponent,
        ModalBusquedaEntidadComponent,
        ModalBusquedaTarjetaCreditoComponent,
        ModalBusquedaTerminalComponent,
        ModalBusquedaTipoPagoComponent
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class VentasCompartidoModule {}