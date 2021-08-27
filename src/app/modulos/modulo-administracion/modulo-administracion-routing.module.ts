import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAprobadorComponent } from './components/admin-aprobador/admin-aprobador.component';
import { AdminAprobadorTemporalComponent } from './components/admin-aprobador-temporal/admin-aprobador-temporal.component';
import { PanelAdministradorComponent } from './components/panel-administrador/panel-administrador.component';
import { RegistrarAprobadorComponent } from './components/registrar-aprobador/registrar-aprobador.component';
import { ModificarAprobadorComponent } from './components/modificar-aprobador/modificar-aprobador.component';
import { RegistrarAprobadorTemporalComponent } from './components/registrar-aprobador-temporal/registrar-aprobador-temporal.component';
import { ModificarAprobadorTemporalComponent } from './components/modificar-aprobador-temporal/modificar-aprobador-temporal.component';
import { CentroCostoAprobadorComponent } from './components/centro-costo-aprobador/centro-costo-aprobador.component';
import { RegistrarCentroCostoComponent } from './components/registrar-centro-costo/registrar-centro-costo.component';
import { ModificarCentroCostoComponent } from './components/modificar-centro-costo/modificar-centro-costo.component';

const routes: Routes = [
    {path: 'panel-administrador', component: PanelAdministradorComponent },
    // Aprobador
    {path: 'admin-aprobador', component: AdminAprobadorComponent},
    {path: 'admin-aprobador-temporal', component: AdminAprobadorTemporalComponent},
    {path: 'app-centro-costo-aprobador', component: CentroCostoAprobadorComponent},
    {path: 'registrar-aprobador', component: RegistrarAprobadorComponent},
    {path: 'modificar-aprobador', component: ModificarAprobadorComponent},
    // Aprobador Temporal
    {path: 'aprobador-temporal', component: AdminAprobadorTemporalComponent},
    {path: 'registrar-aprobador-temporal', component: RegistrarAprobadorTemporalComponent},
    {path: 'modificar-aprobador-temporal', component: ModificarAprobadorTemporalComponent},
    // Centro de costo
    {path: 'admin-centro-costo', component: CentroCostoAprobadorComponent},
    {path: 'registrar-centro-costo', component: RegistrarCentroCostoComponent},
    {path: 'modificar-centro-costo', component: ModificarCentroCostoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
