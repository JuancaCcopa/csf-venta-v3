import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelRequerimientoComponent } from './components/panel-requerimiento/panel-requerimiento.component';
import { PanelAprobacionRequerimientoComponent } from './components/panel-aprobacion-requerimiento/panel-aprobacion-requerimiento.component';
import { RegistrarRequerimientoComponent } from './components/panel-requerimiento/registrar-requerimiento/registrar-requerimiento.component';
import { ModificarRequerimientoComponent } from './components/panel-requerimiento/modificar-requerimiento/modificar-requerimiento.component';
import { VerDetalleRequerimientoComponent } from './components/panel-requerimiento/ver-detalle-requerimiento/ver-detalle-requerimiento.component';
import { PanelUbicacionComponent } from './components/panel-ubicacion/panel-ubicacion.component';
import { RegistrarUbicacionComponent } from './components/panel-ubicacion/registrar-ubicacion/registrar-ubicacion.component';
import { PanelUbicacionPorTipoProductoComponent } from './components/panel-ubicacion/panel-ubicacion-por-tipo-producto/panel-ubicacion-por-tipo-producto.component';
import { RegistrarUbicacionPorTipoProductoComponent } from './components/panel-ubicacion/panel-ubicacion-por-tipo-producto/registrar-ubicacion-por-tipo-producto/registrar-ubicacion-por-tipo-producto.component';
import { PanelUbicacionPorUsuarioComponent } from './components/panel-ubicacion/panel-ubicacion-por-usuario/panel-ubicacion-por-usuario.component';
import { RegistrarUbicacionPorUsuarioComponent } from './components/panel-ubicacion/panel-ubicacion-por-usuario/registrar-ubicacion-por-usuario/registrar-ubicacion-por-usuario.component';
import { PanelUbicacionPorStockComponent } from './components/panel-ubicacion/panel-ubicacion-por-stock/panel-ubicacion-por-stock.component';
import { RegistrarUbicacionPorStockComponent } from './components/panel-ubicacion/panel-ubicacion-por-stock/registrar-ubicacion-por-stock/registrar-ubicacion-por-stock.component';
import { PanelRequerimientoEconomatoComponent } from './components/panel-requerimiento-economato/panel-requerimiento-economato.component';
import { RegistrarRequerimientoEconomatoComponent } from './components/panel-requerimiento-economato/registrar-requerimiento-economato/registrar-requerimiento-economato.component';
import { ModificarRequerimientoEconomatoComponent } from './components/panel-requerimiento-economato/modificar-requerimiento-economato/modificar-requerimiento-economato.component';
import { VerDetalleRequerimientoEconomatoComponent } from './components/panel-requerimiento-economato/ver-detalle-requerimiento-economato/ver-detalle-requerimiento-economato.component';
import { RevisionRequerimientoEconomatoComponent } from './components/panel-requerimiento-economato/revision-requerimiento-economato/revision-requerimiento-economato.component';
import { AprobacionRequerimientoEconomatoComponent } from './components/panel-requerimiento-economato/aprobacion-requerimiento-economato/aprobacion-requerimiento-economato.component';


const routes: Routes = [
  //Requerimientos
  { path: 'panel-requerimiento', component: PanelRequerimientoComponent },
  { path: 'panel-aprobacion-requerimiento', component: PanelAprobacionRequerimientoComponent },
  { path: 'registrar-requerimiento', component: RegistrarRequerimientoComponent },
  { path: 'modificar-requerimiento/:id/:origen',  component: ModificarRequerimientoComponent },
  { path: 'app-ver-detalle-requerimiento', component: VerDetalleRequerimientoComponent },
  //Requerimientos Economatos
  { path: 'panel-requerimiento-economatos', component: PanelRequerimientoEconomatoComponent },
  { path: 'registrar-requerimiento-economatos', component: RegistrarRequerimientoEconomatoComponent },
  { path: 'modificar-requerimiento-economatos/:id/:origen',  component: ModificarRequerimientoEconomatoComponent },
  { path: 'app-ver-detalle-requerimiento-economatos', component: VerDetalleRequerimientoEconomatoComponent },
  { path: 'revision-requerimiento-economatos', component: RevisionRequerimientoEconomatoComponent },
  { path: 'aprobacion-requerimiento-economatos', component: AprobacionRequerimientoEconomatoComponent },
  // Ubicaciones
  { path: 'panel-ubicacion', component: PanelUbicacionComponent },
  { path: 'registrar-ubicacion', component: RegistrarUbicacionComponent },
  { path: 'panel-ubicacion-por-tipo-producto', component: PanelUbicacionPorTipoProductoComponent },
  { path: 'registrar-ubicacion-por-tipo-producto', component: RegistrarUbicacionPorTipoProductoComponent },
  { path: 'panel-ubicacion-por-usuario', component: PanelUbicacionPorUsuarioComponent },
  { path: 'registrar-ubicacion-por-usuario', component: RegistrarUbicacionPorUsuarioComponent },
  { path: 'panel-ubicacion-por-stock', component: PanelUbicacionPorStockComponent },
  { path: 'registrar-ubicacion-por-stock', component: RegistrarUbicacionPorStockComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequerimientoRoutingModule {}
