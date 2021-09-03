import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaPrimeNgModule } from './modulo-venta-primeng.module';
import { VentaRoutingModule } from './modulo-venta-routing.module';
import { PanelVentaComponent } from './components/panel-venta/panel-venta.component';
import { VentaCreateComponent } from './components/panel-venta/venta-create/venta-create.component';
import { VentaDevolucionComponent } from './components/panel-venta/venta-devolucion/venta-devolucion.component';
import { VentaPendienteComponent } from './components/panel-venta/venta-pendiente/venta-pendiente.component';
import { PanelComprobanteComponent } from './components/panel-comprobante/panel-comprobante.component';
import { PanelPedidosPorPacienteComponent } from './components/panel-pedidos-por-paciente/panel-pedidos-por-paciente.component';
import { PanelPlanesComponent } from './components/panel-planes/panel-planes.component';
import { PanelSeguimientoComponent } from './components/panel-seguimiento/panel-seguimiento.component';
import { PanelPedidoComponent } from './components/panel-pedido/panel-pedido.component';
import { ControlsModule } from '../modulo-controls/modulo-controls.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlanesCreateComponent } from './components/panel-planes/planes-create/planes-create.component';
import { VentasCompartidoModule } from '../modulo-compartido/Ventas/modulo-ventas-compartido.module';
import { PanelSalaOperacionComponent } from './components/panel-sala-operacion/panel-sala-operacion.component';
import { SalaOperacionCreateComponent } from './components/panel-sala-operacion/sala-operacion-create/sala-operacion-create.component';
import { SalaOperacionLecturaComponent } from './components/panel-sala-operacion/sala-operacion-lectura/sala-operacion-lectura.component';
import { VentaVerComponent } from './components/panel-venta/venta-ver/venta-ver.component';
import { VentaDatosComponent } from './components/panel-venta/venta-datos/venta-datos.component';
import { VentaSinStockComponent } from './components/panel-venta/venta-sin-stock/venta-sin-stock.component';
import { PanelConsolidadoPedidoComponent } from './components/panel-consolidado-pedido/panel-consolidado-pedido.component';
import { PanelVentaAutomaticoComponent } from './components/panel-venta/panel-venta-automatico/panel-venta-automatico.component';
import { PanelConfigTrxVentaComponent } from './components/panel-config-trx-venta/panel-config-trx-venta.component';
import { PanelEstacionTrabajoComponent } from './components/panel-estacion-trabajo/panel-estacion-trabajo.component';
import { ConfigTrxVentaCreateComponent } from './components/panel-config-trx-venta/config-trx-venta-create/config-trx-venta-create.component';
import { EstacionTrabajoCreateComponent } from './components/panel-estacion-trabajo/estacion-trabajo-create/estacion-trabajo-create.component';
import { PanelSeriePorComprobanteComponent } from './components/panel-serie-por-comprobante/panel-serie-por-comprobante.component';
import { SeriePorComprobanteCreateComponent } from './components/panel-serie-por-comprobante/serie-por-comprobante-create/serie-por-comprobante-create.component';
import { EstacionTrabajoUpdateComponent } from './components/panel-estacion-trabajo/estacion-trabajo-update/estacion-trabajo-update.component';
import { PanelSeparacionCuentasComponent } from './components/panel-separacion-cuentas/panel-separacion-cuentas.component';
import { PanelAsigEstacionTrabajoComponent } from './components/panel-asig-estacion-trabajo/panel-asig-estacion-trabajo.component';
import { VentaSimuladorComponent } from './components/panel-venta/venta-simulador/venta-simulador.component';
import { PanelValeDeliveryComponent } from './components/panel-venta/panel-vale-delivery/panel-vale-delivery.component';
import { PlanillaCrearComponent } from './components/panel-planilla/planilla-crear/planilla-crear.component';
import { PlanillaUsuarioComponent } from './components/panel-planilla/planilla-usuario/planilla-usuario.component';
import { PlanillaTipoPagoComponent } from './components/panel-planilla/planilla-tipopago/planilla-tipopago.component';
import { PanelCajaComponent } from './components/panel-caja/panel-caja.component';
import { PanelPlanillaComponent } from './components/panel-planilla/panel-planilla.component';
import { GenerarPagoBotComponent } from './components/panel-caja/generar-pagobot/generar-pagobot.component';

@NgModule({
    declarations: [PanelVentaComponent,
        VentaCreateComponent,
        VentaDevolucionComponent,
        VentaPendienteComponent,
        PanelCajaComponent,
        PanelComprobanteComponent,
        PanelPedidosPorPacienteComponent,
        PanelPlanesComponent,
        PanelPlanillaComponent,
        PanelSeguimientoComponent,
        PanelPedidoComponent,
        PlanesCreateComponent,
        PanelSalaOperacionComponent,
        SalaOperacionCreateComponent,
        SalaOperacionLecturaComponent,
        VentaVerComponent,
        VentaDatosComponent,
        VentaSinStockComponent,
        PanelConsolidadoPedidoComponent,
        PanelVentaAutomaticoComponent,
        PanelConfigTrxVentaComponent,
        ConfigTrxVentaCreateComponent,
        PanelEstacionTrabajoComponent,
        EstacionTrabajoCreateComponent,
        PanelSeriePorComprobanteComponent,
        SeriePorComprobanteCreateComponent,
        EstacionTrabajoUpdateComponent,
        PanelSeparacionCuentasComponent,
        PanelAsigEstacionTrabajoComponent,
        VentaSimuladorComponent,
        PanelValeDeliveryComponent,
        PlanillaCrearComponent,
        PlanillaUsuarioComponent,
        PlanillaTipoPagoComponent,
        GenerarPagoBotComponent
        ],
    imports: [ CommonModule,
        VentaPrimeNgModule,
        VentaRoutingModule,
        ControlsModule,
        FormsModule,
        ReactiveFormsModule,
        VentasCompartidoModule
    ],
    exports: [],
    providers: [],
})
export class VentaModule {}