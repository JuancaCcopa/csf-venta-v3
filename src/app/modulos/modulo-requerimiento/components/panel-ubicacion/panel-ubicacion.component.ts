import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UbicacionModel } from '../../models/ubicacion.model';
import { Subscription } from 'rxjs';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { RequerimientoService } from '../../services/requerimiento.service';
import { IMensajeResultadoApi } from '../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';

@Component({
  selector: 'app-panel-ubicacion',
  templateUrl: './panel-ubicacion.component.html',
  styleUrls: ['./panel-ubicacion.component.css']
})
export class PanelUbicacionComponent implements OnInit, OnDestroy {
  // Titulo del componente
  titulo = 'Ubicación';

  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  // Formulario de Busqueda
  formularioBusqueda: FormGroup;

  // Opcion Buscar
  descripcionFind = '';
  modeloFind: UbicacionModel = new UbicacionModel() ;
  listModelo: UbicacionModel[];

  columnas: any[];

  // Opcion Editar
  modelocloned: { [s: string]: any; } = {};

  // Opcion Eliminar
  modeloEliminar: UbicacionModel = new UbicacionModel() ;

  // Suscripcion [para realizar el unsuscription al cerrar el formulario]
  subscription$: Subscription;
  
  constructor(public readonly mensajePrimeNgService: MensajePrimeNgService,
              private readonly router: Router,
              private readonly fb: FormBuilder,
              private readonly confirmationService: ConfirmationService,
              private readonly breadcrumbService: BreadcrumbService,
              private readonly requerimientoService: RequerimientoService) {
                this.breadcrumbService.setItems([
                    { label: this.globalConstants.cModuloRequerimiento },
                    { label: 'Ubicación', routerLink: ['module-re/panel-ubicacion'] }
                ]);
              }

  ngOnInit() {
    this.columnas = [
      { header: 'Codigo' },
      { header: 'Descripcion' },
      { header: 'Centro Costo' },
      { header: 'Centro Costo' }
    ];

    this.onbuildForm();

    this.onListar();
  }

  private onbuildForm() {
    this.formularioBusqueda = this.fb.group({
      nombre: [''],
    });
  }

  onToBuscar() {
    this.onListar();
  }

  onListar() {
    const formBody = this.formularioBusqueda.value;
    this.modeloFind = {desUbicacion: formBody.nombre};
    this.subscription$ = new Subscription();

    this.subscription$ = this.requerimientoService.getUbicacionPorCentroCosto(this.modeloFind)
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

  onRowEditInit(modelo: UbicacionModel) {
    this.modelocloned[modelo.idUbicacion] = {...modelo};
  }

  onRowEditSave(modelo: UbicacionModel) {
    this.subscription$ = new Subscription();
    this.subscription$ = this.requerimientoService.setModificarUbicacionPorCentroCosto(modelo)
    .subscribe((resp: IMensajeResultadoApi) => {
      delete this.modelocloned[modelo.idUbicacion];
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error.error);
      });
  }

  onRowEditCancel(modelo: UbicacionModel, index: number) {
    this.listModelo[index] = this.modelocloned[modelo.idUbicacion];
    delete this.modelocloned[modelo.idUbicacion];
  }

  onToRowSelectDelete(modelo: UbicacionModel) {
    this.modeloEliminar = modelo;
    this.onConfirmDelete();
  }

  onToCreate() {
    this.router.navigate(['/main/modulo-re/registrar-ubicacion']);
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
    this.subscription$ = this.requerimientoService.setEliminarUbicacionPorCentroCosto(this.modeloEliminar)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = this.listModelo.filter(datafilter => datafilter.idUbicacion !== this.modeloEliminar.idUbicacion );
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
