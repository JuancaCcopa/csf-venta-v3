import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './modulos/modulo-login/components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'login',  component: LoginComponent},
  {path: 'main',
    component: LayoutComponent,
    children: [
      { path: 'csfe' , loadChildren:
      () => import('./modulos/modulo-page-bienvenida/modulo-page-bienvenida.module')
      .then(m => m.PageBienvenidaModule),
      canActivate: [AuthGuard]},
      { path: 'dashboard' , loadChildren:
      () => import('./modulos/modulo-dashboard/components/dashboard/dashboard.module')
      .then(m => m.DashboardModule),
      canActivate: [AuthGuard]},
      { path: 'modulo-ve' , loadChildren:
      () => import('./modulos/modulo-venta/modulo-venta.module')
      .then(m => m.VentaModule),
      canActivate: [AuthGuard]},
      { path: 'modulo-se' , loadChildren:
      () => import('./modulos/modulo-seguridad/modulo-seguridad.module')
      .then(m => m.SeguridadModule),
      canActivate: [AuthGuard]},
      { path: 'modulo-re' , loadChildren:
      () => import('./modulos/modulo-requerimiento/modulo-requerimiento.module')
      .then(m => m.ModuloRequerimientoModule),
      canActivate: [AuthGuard]},
      { path: 'modulo-so' , loadChildren:
      () => import('./modulos/modulo-solicitud-vale/modulo-solicitud-vale.module')
      .then(m => m.SolicitudValeModule),
      canActivate: [AuthGuard]},
      { path: 'modulo-ad' , loadChildren:
      () => import('./modulos/modulo-administracion/modulo-administracion.module')
      .then(m => m.ModuloAdministracionModule),
      canActivate: [AuthGuard]},
      { path: 'modulo-oc' , loadChildren:
      () => import('./modulos/modulo-orden-compra/modulo-orden-compra.module')
      .then(m => m.OrdenCompraModule),
      canActivate: [AuthGuard]},
      { path: 'modulo-va' , loadChildren:
      () => import('./modulos/modulo-vale-salida/modulo-vale-salida.module')
      .then(m => m.ValeSalidaModule),
      canActivate: [AuthGuard]},
      { path: 'modulo-cr' , loadChildren:
      () => import('./modulos/modulo-consolidado-requerimiento/modulo-consolidado-requerimiento.module')
      .then(m => m.ConsolidadoRequerimientoModule),
      canActivate: [AuthGuard]},
      { path: 'modulo-st' , loadChildren:
      () => import('./modulos/modulo-solicitud-traslado/modulo-solicitud-traslado.module')
      .then(m => m.SolicitudTrasladoModule),
      canActivate: [AuthGuard]},
      { path: 'modulo-as' , loadChildren:
      () => import('./modulos/modulo-atencion-solicitud-transferencia/modulo-atencion-solicitud-transferencia.module')
      .then(m => m.AtencionSolicitudTransferenciaModule),
      canActivate: [AuthGuard]},
      { path: 'modulo-cs' , loadChildren:
      () => import('./modulos/modulo-confirmacion-solicitud-transferencia/modulo-confirmacion-solicitud-transferencia.module')
      .then(m => m.ConfirmacionSolicitudTransferenciaModule),
      canActivate: [AuthGuard]},
      { path: 'modulo-sx' , loadChildren:
      () => import('./modulos/modulo-solicitud-traslado-ext/modulo-solicitud-traslado-ext.module')
      .then(m => m.SolicitudTrasladoExtModule),
      canActivate: [AuthGuard]},
      { path: 'modulo-ax' , loadChildren:
      () => import('./modulos/modulo-atencion-solicitud-transferencia-ext/modulo-atencion-solicitud-transferencia-ext.module')
      .then(m => m.AtencionSolicitudTransferenciaExtModule),
      canActivate: [AuthGuard]},
      { path: 'modulo-cx' , loadChildren:
      () => import('./modulos/modulo-confirmacion-solicitud-transferencia-ext/modulo-confirmacion-solicitud-transferencia-ext.module')
      .then(m => m.ConfirmacionSolicitudTransferenciaExtModule),
      canActivate: [AuthGuard]},
      { path: 'modulo-ti' , loadChildren:
      () => import('./modulos/modulo-toma-inventario/modulo-toma-inventario.module')
      .then(m => m.TomaInventarioModule),
      canActivate: [AuthGuard]},
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
