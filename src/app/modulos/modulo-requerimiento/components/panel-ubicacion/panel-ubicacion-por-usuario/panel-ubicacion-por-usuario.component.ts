import { Component, OnInit } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UbicacionModel, UbicacionPorUsuarioModel } from '../../../models/ubicacion.model';
import { Subscription } from 'rxjs';
import { MensajePrimeNgService } from '../../../../../services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { RequerimientoService } from '../../../services/requerimiento.service';
import { IMensajeResultadoApi } from '../../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';

@Component({
  selector: 'app-panel-ubicacion-por-usuario',
  templateUrl: './panel-ubicacion-por-usuario.component.html',
  styleUrls: ['./panel-ubicacion-por-usuario.component.css']
})
export class PanelUbicacionPorUsuarioComponent implements OnInit {
  // Titulo del componente
  titulo = 'Ubicación Por Usuario';

  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  // Formulario de Busqueda
  formularioBusqueda: FormGroup;

  // Opcion Buscar
  descripcionFind = '';
  modeloFind: UbicacionPorUsuarioModel = new UbicacionPorUsuarioModel() ;
  listModelo: UbicacionPorUsuarioModel[];

  columnas: any[];

  // Opcion Editar
  modelocloned: { [s: string]: any; } = {};

  // Opcion Eliminar
  modeloEliminar: UbicacionPorUsuarioModel = new UbicacionPorUsuarioModel() ;

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
                    { label: 'Ubicación Por Usuario', routerLink: ['module-re/panel-ubicacion-por-usuario'] }
                ]);
              }

  ngOnInit() {
    this.columnas = [
      { header: 'Id' },
      { header: 'Ubicación' },
      { header: 'Centro Costo' },
      { header: 'Centro Costo' },
      { header: 'Usuario' },
      { header: 'Correo' },
      { header: 'Generar' },
      { header: 'Revisar' },
      { header: 'Aprobar' }
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

    console.log('this.formularioBusqueda', this.formularioBusqueda);

    const formBody = this.formularioBusqueda.value;
    this.modeloFind = {idUbicacion: formBody.idUbicacion};
    this.subscription$ = new Subscription();

    this.subscription$ = this.requerimientoService.getUbicacionPorUsuario(this.modeloFind)
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

  onRowEditInit(modelo: UbicacionPorUsuarioModel) {
    this.modelocloned[modelo.idUbicacionPorUsuario] = {...modelo};
  }

  onRowEditSave(modelo: UbicacionPorUsuarioModel) {
    this.subscription$ = new Subscription();
    this.subscription$ = this.requerimientoService.setModificarUbicacionPorUsuario(modelo)
    .subscribe((resp: IMensajeResultadoApi) => {
      delete this.modelocloned[modelo.idUbicacionPorUsuario];
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error.error);
      });
  }

  onRowEditCancel(modelo: UbicacionPorUsuarioModel, index: number) {
    this.listModelo[index] = this.modelocloned[modelo.idUbicacionPorUsuario];
    delete this.modelocloned[modelo.idUbicacionPorUsuario];
  }

  onToRowSelectDelete(modelo: UbicacionPorUsuarioModel) {
    this.modeloEliminar = modelo;
    this.onConfirmDelete();
  }

  onToCreate() {
    this.router.navigate(['/main/modulo-re/registrar-ubicacion-por-usuario']);
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
    this.subscription$ = this.requerimientoService.setEliminarUbicacionPorUsuario(this.modeloEliminar)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = this.listModelo.filter(datafilter => datafilter.idUbicacionPorUsuario !== this.modeloEliminar.idUbicacionPorUsuario );
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
