import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequerimientoCompartidoPrimeNgModule } from './modulo-requerimiento-compartido-primeng.module';
import { ModalBusquedaUsuarioComponent } from './components/modal-busqueda-usuario/modal-busqueda-usuario.component';
import { ModalBusquedaArticuloComponent } from './components/modal-busqueda-articulo/modal-busqueda-articulo.component';
import { ModalBusquedaCentroCostoComponent } from './components/modal-busqueda-centro-costo/modal-busqueda-centro-costo.component';
import { ModalBusquedaSocioNegocioComponent } from './components/modal-busqueda-socio-negocio/modal-busqueda-socio-negocio.component';
import { LoadingComponent } from './components/loading/loading.component';
import { TableCompartidoComponent } from './components/table-compartido/table-compartido.component';
import { ModalBusquedaUbicacionComponent } from './components/modal-busqueda-ubicacion/modal-busqueda-ubicacion.component';
import { ModalBusquedaGrupoArticuloComponent } from './components/modal-busqueda-grupo-articulo/modal-busqueda-grupo-articulo.component';
import { ModalBusquedaArticuloPorGrupopComponent } from './components/modal-busqueda-articulo-por-grupop/modal-busqueda-articulo-por-grupop.component';
import { ModalBusquedaServicioComponent } from './components/modal-busqueda-servicio/modal-busqueda-servicio.component';
import { ModalBusquedaArticuloPorUsuarioComponent } from './components/modal-busqueda-articulo-por-usuario/modal-busqueda-articulo-por-usuario.component';
import { ModalBusquedaRequerimientoComponent } from './components/modal-busqueda-requerimiento/modal-busqueda-requerimiento.component';
import { ModalBusquedaArticuloStockComponent } from './components/modal-busqueda-articulo-stock/modal-busqueda-articulo-stock.component';
import { ModalBusquedaAlmacenLtComponent } from './components/modal-busqueda-almacenes-lt/modal-busqueda-almacenes-lt.component';
import { ModalBusquedaSocioNegocioLtComponent } from './components/modal-busqueda-socio-negocio-lt/modal-busqueda-socio-negocio-lt.component';
import { ModalBusquedaUbicacionLtComponent } from './components/modal-busqueda-ubicaciones-lt/modal-busqueda-ubicacion-lt.component';


@NgModule({
    declarations: [ModalBusquedaUsuarioComponent,
        ModalBusquedaArticuloComponent,
        ModalBusquedaCentroCostoComponent,
        ModalBusquedaSocioNegocioComponent,
        ModalBusquedaUbicacionComponent,
        ModalBusquedaGrupoArticuloComponent,
        ModalBusquedaArticuloPorGrupopComponent,
        ModalBusquedaServicioComponent,
        ModalBusquedaArticuloPorUsuarioComponent,
        ModalBusquedaRequerimientoComponent,
        ModalBusquedaArticuloStockComponent,
        ModalBusquedaAlmacenLtComponent,
        ModalBusquedaSocioNegocioLtComponent,
        ModalBusquedaUbicacionLtComponent,
        LoadingComponent,
        TableCompartidoComponent],
    imports: [ CommonModule, 
               RequerimientoCompartidoPrimeNgModule, 
               FormsModule,
               ReactiveFormsModule],
    exports: [ ModalBusquedaUsuarioComponent,
        ModalBusquedaArticuloComponent,
        ModalBusquedaCentroCostoComponent,
        ModalBusquedaSocioNegocioComponent,
        ModalBusquedaUbicacionComponent,
        ModalBusquedaGrupoArticuloComponent,
        ModalBusquedaArticuloPorGrupopComponent,
        ModalBusquedaServicioComponent,
        ModalBusquedaArticuloPorUsuarioComponent,
        ModalBusquedaRequerimientoComponent,
        ModalBusquedaArticuloStockComponent,
        ModalBusquedaAlmacenLtComponent,
        ModalBusquedaSocioNegocioLtComponent,
        ModalBusquedaUbicacionLtComponent,
        LoadingComponent,
        TableCompartidoComponent],
    providers: [ ],
})
export class RequerimientoCompartidoModule {}