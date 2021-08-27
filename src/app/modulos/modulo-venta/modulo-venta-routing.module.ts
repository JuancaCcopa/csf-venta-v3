import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PanelVentaComponent } from './components/panel-venta/panel-venta.component';
import { VentaCreateComponent } from './components/panel-venta/venta-create/venta-create.component';
import { VentaPendienteComponent } from './components/panel-venta/venta-pendiente/venta-pendiente.component';
import { VentaDevolucionComponent } from './components/panel-venta/venta-devolucion/venta-devolucion.component';
import { PanelComprobanteComponent } from './components/panel-comprobante/panel-comprobante.component';
import { PanelCajaComponent } from './components/panel-caja/panel-caja.component';
import { PanelPedidosPorPacienteComponent } from './components/panel-pedidos-por-paciente/panel-pedidos-por-paciente.component';
import { PanelPlanesComponent } from './components/panel-planes/panel-planes.component';
import { PanelPlanillaComponent } from './components/panel-planilla/panel-planilla.component';
import { PanelSeguimientoComponent } from './components/panel-seguimiento/panel-seguimiento.component';
import { PanelPedidoComponent } from './components/panel-pedido/panel-pedido.component';
import { PlanesCreateComponent } from './components/panel-planes/planes-create/planes-create.component';
import { PanelSalaOperacionComponent } from './components/panel-sala-operacion/panel-sala-operacion.component';
import { SalaOperacionCreateComponent } from './components/panel-sala-operacion/sala-operacion-create/sala-operacion-create.component';
import { SalaOperacionLecturaComponent } from './components/panel-sala-operacion/sala-operacion-lectura/sala-operacion-lectura.component';
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

const routes: Routes = [
    {path: 'panel-venta', component: PanelVentaComponent},
    {path: 'venta-create', component: VentaCreateComponent},
    {path: 'venta-pendiente', component: VentaPendienteComponent},
    {path: 'venta-devolucion', component: VentaDevolucionComponent},
    {path: 'venta-sin-stock', component: VentaSinStockComponent},
    {path: 'panel-comprobante', component: PanelComprobanteComponent},
    {path: 'panel-caja', component: PanelCajaComponent},
    {path: 'panel-pedido-paciente', component: PanelPedidosPorPacienteComponent},
    {path: 'panel-planes', component: PanelPlanesComponent},
    {path: 'planes-create', component: PlanesCreateComponent},
    {path: 'panel-planillas', component: PanelPlanillaComponent},
    {path: 'panel-seguimiento', component: PanelSeguimientoComponent},
    {path: 'panel-pedido', component: PanelPedidoComponent},
    {path: 'panel-consolidado-pedido', component: PanelConsolidadoPedidoComponent},
    {path: 'panel-venta-automatico', component: PanelVentaAutomaticoComponent},
    {path: 'panel-trx-venta', component: PanelConfigTrxVentaComponent},
    {path: 'trx-venta-create', component: ConfigTrxVentaCreateComponent},
    {path: 'panel-estacion-trabajo', component: PanelEstacionTrabajoComponent},
    {path: 'estacion-trabajo-create', component: EstacionTrabajoCreateComponent},
    {path: 'estacion-trabajo-update/:id', component: EstacionTrabajoUpdateComponent},
    {path: 'panel-serie-comprobante', component: PanelSeriePorComprobanteComponent},
    {path: 'serie-comprobante-create', component: SeriePorComprobanteCreateComponent},
    {path: 'panel-separacion-cuenta', component: PanelSeparacionCuentasComponent},
    {path: 'panel-asig-estacion-trabajo', component: PanelAsigEstacionTrabajoComponent},
    
    // Sala de Operación
    {path: 'panel-sala-operacion', component: PanelSalaOperacionComponent},
    {path: 'sala-operacion-create', component: SalaOperacionCreateComponent},
    {path: 'sala-operacion-lectura', component: SalaOperacionLecturaComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VentaRoutingModule {}
