import { NgModule } from '@angular/core';
import { AdministracionRoutingModule } from './modulo-administracion-routing.module';
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
import { RequerimientoCompartidoModule } from '../modulo-compartido/Requerimiento/modulo-requerimiento-compartido.module';
import { AdministracionPrimeNgModule } from './modulo-administracion-primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations: [
        AdminAprobadorComponent,
        AdminAprobadorTemporalComponent,
        PanelAdministradorComponent,
        RegistrarAprobadorComponent,
        ModificarAprobadorComponent,
        RegistrarAprobadorTemporalComponent,
        ModificarAprobadorTemporalComponent,
        CentroCostoAprobadorComponent,
        RegistrarCentroCostoComponent,
        ModificarCentroCostoComponent],
    imports: [
        CommonModule,
        AdministracionRoutingModule,
        RequerimientoCompartidoModule,
        AdministracionPrimeNgModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [],
    exports: [
        RequerimientoCompartidoModule
    ]
})
export class ModuloAdministracionModule {}
