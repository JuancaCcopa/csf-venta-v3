import {
  IResultBusquedaCC,
  ICentroCosto,
} from './../../models/aprobadorCentroCosto.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { AprobadorCentroCostoService } from '../../services/aprobador-centro-costo.service';
import { map } from 'rxjs/operators';
import { ITipoDocumento } from '../../models/tipoDocumento.interface';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { IMensajeResultadoApi } from '../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
@Component({
  selector: 'app-registrar-centro-costo',
  templateUrl: './registrar-centro-costo.component.html',
  styleUrls: ['./registrar-centro-costo.component.scss'],
  providers: [ConfirmationService],
})
export class RegistrarCentroCostoComponent implements OnInit {
  rowTipoDocumento: ITipoDocumento[] = [];
  formularioRegistroCC: FormGroup;
  bodyParams: any;
  isActivateBusquedaCentroCosto = false;
  itemCentroCostoSeleccionado: ICentroCosto;
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  constructor(
    private readonly location: Location,
    private readonly fb: FormBuilder,
    private readonly activeRoute: ActivatedRoute,
    public mensajePrimeNgService: MensajePrimeNgService,
    private readonly aprobadorCentroCostoService: AprobadorCentroCostoService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      { label: this.globalConstants.cModuloRequerimiento },
      { label: 'Aprobador por Centro Costo', routerLink: ['modulo-ad/admin-centro-costo'] },
      { label: 'Nuevo' }
    ]);
    this.buildForm();
  }

  ngOnInit(): void {
    this.activeRoute.queryParamMap
      .pipe(
        map((params) => {
          this.bodyParams = {
            idAprobacion: +params.get('idAprobacion'),
            idAprobador: +params.get('idAprobador'),
            aprobador: params.get('aprobador'),
          };
          this.formularioRegistroCC.patchValue({
            // idAprobacionCC: this.bodyParams.idAprobacionCC,
            idAprobador: this.bodyParams.idAprobador,
            aprobador: this.bodyParams.aprobador,
          });
        })
      )
      .subscribe();
    // this.datosCentroCosto();
    this.datosTipoDocumento();
  }
  private buildForm() {
    this.formularioRegistroCC = this.fb.group({
      idAprobacionCC: [{ value: null, disabled: true }],
      codCentroCosto: [{ value: null, disabled: true }],
      desCentroCosto: [{ value: null, disabled: true }],
      idAprobador: [{ value: null, disabled: true }],
      aprobador: [{ value: null, disabled: true }],
      tipoDocumento: [null, Validators.required],
    });
  }
  datosTipoDocumento() {
    this.aprobadorCentroCostoService
      .getTipoDocumentoCC()
      .pipe(
        map((resp) => {
          this.rowTipoDocumento = resp;
        })
      )
      .subscribe();
  }
  onClickRegresar() {
    this.location.back();
  }
  clickGuardar() {
    if (this.itemCentroCostoSeleccionado) {
      const { codCentroCosto } = this.itemCentroCostoSeleccionado;
      const { tipoDocumento } = this.formularioRegistroCC.value;
      const bodyRegister: Partial<IResultBusquedaCC> = {
        idAprobacionCC: 0,
        idAprobacion: this.bodyParams.idAprobacion,
        codCentroCosto,
        idAprobacionDocumento: tipoDocumento.idAprobacionDocumento,
        idAprobador: this.bodyParams.idAprobador,
        regCreateIdUsuario: 1,
        isAprobacionCC: true,
      };
      // console.log(bodyRegister);

      this.aprobadorCentroCostoService.saveCC(bodyRegister).subscribe(
        (result: IMensajeResultadoApi) => {
          this.mensajePrimeNgService.onToExitoMsg(
            undefined,
            result
          );
          this.onClickRegresar();
        },
        (error) => {
          console.log(error);
          this.mensajePrimeNgService.onToErrorMsg(undefined, error.error);
        }
      );
    } else {
      this.mensajePrimeNgService.onToErrorMsg(
        undefined,
        'Seleccione un Centro de costo'
      );
    }
  }
  centroCostoSeleccionado(event: ICentroCosto) {
    this.itemCentroCostoSeleccionado = event;
    this.formularioRegistroCC.patchValue({
      codCentroCosto: event.codCentroCosto,
      desCentroCosto: event.desCentroCosto,
    });

    this.activarModalCentroCosto();
  }
  activarModalCentroCosto() {
    this.isActivateBusquedaCentroCosto = !this.isActivateBusquedaCentroCosto;
  }
}
