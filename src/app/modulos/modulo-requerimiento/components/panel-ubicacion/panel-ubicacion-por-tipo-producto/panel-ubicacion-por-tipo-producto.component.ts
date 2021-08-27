import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UbicacionPorTipoProductoModel, UbicacionModel } from '../../../models/ubicacion.model';
import { Subscription } from 'rxjs';
import { MensajePrimeNgService } from '../../../../../services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { RequerimientoService } from '../../../services/requerimiento.service';
import { IMensajeResultadoApi } from '../../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';

@Component({
  selector: 'app-panel-ubicacion-por-tipo-producto',
  templateUrl: './panel-ubicacion-por-tipo-producto.component.html',
  styleUrls: ['./panel-ubicacion-por-tipo-producto.component.css']
})
export class PanelUbicacionPorTipoProductoComponent implements OnInit, OnDestroy {
  // Titulo del componente
  titulo = 'Ubicación Por Tipo Producto';

  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  // Formulario de Busqueda
  formularioBusqueda: FormGroup;

  // Opcion Buscar
  descripcionFind = '';
  modeloFind: UbicacionPorTipoProductoModel = new UbicacionPorTipoProductoModel() ;
  listModelo: UbicacionPorTipoProductoModel[];

  columnas: any[];

  // Opcion Editar
  modelocloned: { [s: string]: any; } = {};

  // Opcion Eliminar
  modeloEliminar: UbicacionPorTipoProductoModel = new UbicacionPorTipoProductoModel() ;

  // Suscripcion [para realizar el unsuscription al cerrar el formulario]
  subscription$: Subscription;

  //Ubicacion
  isActivateBusquedaUbicacion = false;
  itemUbicacionSeleccionado: UbicacionModel;
  
  constructor(public readonly mensajePrimeNgService: MensajePrimeNgService,
              private readonly router: Router,
              private readonly fb: FormBuilder,
              private readonly confirmationService: ConfirmationService,
              private readonly breadcrumbService: BreadcrumbService,
              private readonly requerimientoService: RequerimientoService) {
                this.breadcrumbService.setItems([
                    { label: this.globalConstants.cModuloRequerimiento },
                    { label: 'Ubicación Por Tipo Producto', routerLink: ['module-re/panel-ubicacion-por-tipo-producto'] }
                ]);
              }

  ngOnInit() {
    this.columnas = [
      { header: 'Id' },
      { header: 'Ubicación' },
      { header: 'Cod. Centro Costo' },
      { header: 'Centro Costo' },
      { header: 'Cod. Tipo Producto' },
      { header: 'Tipo Producto' }
    ];

    this.onbuildForm();

    // this.onListar();
  }

  private onbuildForm() {
    this.formularioBusqueda = this.fb.group({
      idUbicacion: [{value: 0, disabled: true}],
      desUbicacion: [{value: '', disabled: true}],
    });
  }

  ubicacionSeleccionado(event: UbicacionModel) {
    this.itemUbicacionSeleccionado = event;
    this.formularioBusqueda.patchValue({
      idUbicacion: event.idUbicacion,
      desUbicacion: event.desUbicacion,
    });

    this.activarModalUbicacion();
  }
  activarModalUbicacion() {
    this.isActivateBusquedaUbicacion = !this.isActivateBusquedaUbicacion;
  }

  onToBuscar() {
    this.onListar();
  }

  onListar() {

    const formBody = this.formularioBusqueda.value;
    this.modeloFind = {idUbicacion: formBody.idUbicacion};
    this.subscription$ = new Subscription();

    this.subscription$ = this.requerimientoService.getUbicacionPorTipoProducto(this.modeloFind)
    .subscribe(resp => {
      if (resp) {
          this.listModelo = resp;
        }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error.error);
      }
    );
  }

  onRowEditInit(modelo: UbicacionPorTipoProductoModel) {
    this.modelocloned[modelo.idUbicacionPorTipoProducto] = {...modelo};
  }

  onRowEditSave(modelo: UbicacionPorTipoProductoModel) {
    this.subscription$ = new Subscription();
    this.subscription$ = this.requerimientoService.setModificarUbicacionPorUsuario(modelo)
    .subscribe((resp: IMensajeResultadoApi) => {
      delete this.modelocloned[modelo.idUbicacionPorTipoProducto];
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error.error);
      });
  }

  onRowEditCancel(modelo: UbicacionPorTipoProductoModel, index: number) {
    this.listModelo[index] = this.modelocloned[modelo.idUbicacionPorTipoProducto];
    delete this.modelocloned[modelo.idUbicacionPorTipoProducto];
  }

  onToRowSelectDelete(modelo: UbicacionPorTipoProductoModel) {
    this.modeloEliminar = modelo;
    this.onConfirmDelete();
  }

  onToCreate() {
    this.router.navigate(['/main/modulo-re/registrar-ubicacion-por-tipo-producto']);
  }

  onConfirmDelete() {
    this.confirmationService.confirm({
        message: this.globalConstants.subTitleEliminar,
        header: this.globalConstants.titleEliminar,
        icon: 'pi pi-info-circle',
        acceptLabel: 'Si',
        rejectLabel: 'No',
        accept: () => {
          this.onToDelete();
        },
        reject: () => {
          this.mensajePrimeNgService.onToCancelMsg(this.globalConstants.msgCancelSummary, this.globalConstants.msgCancelDetail);
        }
    });
  }

  onToDelete() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.requerimientoService.setEliminarUbicacionPorTipoProducto(this.modeloEliminar)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = this.listModelo.filter(datafilter => datafilter.idUbicacionPorTipoProducto !== this.modeloEliminar.idUbicacionPorTipoProducto );
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error.error);
      });
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
