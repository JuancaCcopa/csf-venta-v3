import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  IAprobadorCentroCosto,
  IResultBusquedaCC,
  ICentroCosto,
} from '../../models/aprobadorCentroCosto.interface';
import { AprobadorCentroCostoService } from '../../services/aprobador-centro-costo.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ITipoDocumento } from '../../models/tipoDocumento.interface';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { SessionService } from '../../../../services/session.service';
import { IMensajeResultadoApi } from '../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
@Component({
  selector: 'app-modificar-centro-costo',
  templateUrl: './modificar-centro-costo.component.html',
  styleUrls: ['./modificar-centro-costo.component.scss'],
})
export class ModificarCentroCostoComponent implements OnInit {
  formularioModificar: FormGroup;
  rowCentroCosto: ICentroCosto[] = [];
  rowDatosAprobador: IAprobadorCentroCosto[] = [];
  resultBusqueda: IResultBusquedaCC[] = [];
  rowTipoDocumento: ITipoDocumento[] = [];
  itemCentroCostoSeleccionado: ICentroCosto;
  isActivateBusquedaCentroCosto: boolean = false;
  bodyParams: any;
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly location: Location,
    private readonly activeRoute: ActivatedRoute,
    private readonly aprobadorCentroCostoService: AprobadorCentroCostoService,
    public mensajePrimeNgService: MensajePrimeNgService,
    private readonly sessionStorage: SessionService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      { label: this.globalConstants.cModuloRequerimiento },
      { label: 'Aprobador por Centro Costo', routerLink: ['modulo-ad/admin-centro-costo'] },
      { label: 'Actualizar' }
    ]);
    this.buildForm();
  }

  ngOnInit(): void {
    if (this.sessionStorage.getItem('idAprobacionCC')) {
      this.sessionStorage.removeItem('idAprobacionCC');
    }
    this.activeRoute.queryParamMap
      .pipe(
        map((params) => {
          this.bodyParams = {
            idAprobacion: +params.get('idAprobacion'),
            idAprobacionCC: +params.get('idAprobacionCC'),
            codCentroCosto: params.get('codCentroCosto'),
            desCentroCosto: params.get('desCentroCosto'),
            idAprobacionDocumento: +params.get('idAprobacionDocumento'),
            regUpdateIdUsuario: params.get('regUpdateIdUsuario'),
            idAprobador: params.get('idAprobador'),
            aprobador: params.get('aprobador'),
          };
          console.log(this.bodyParams);

          this.formularioModificar.patchValue({
            idAprobacionCC: this.bodyParams.idAprobacionCC,
            idAprobador: this.bodyParams.idAprobador,
            aprobador: this.bodyParams.aprobador,
            codCentroCosto: this.bodyParams.codCentroCosto,
            desCentroCosto: this.bodyParams.desCentroCosto,
          });

          console.log(this.formularioModificar);
        })
      )
      .subscribe(
        (resp) => resp,
        (error) => error
      );
    this.datosCentroCosto();
    this.datosTipoDocumento();
  }

  private buildForm() {
    this.formularioModificar = this.formBuilder.group({
      idAprobacionCC: [{ value: null, disabled: true }],
      codCentroCosto: [{ value: null }],
      desCentroCosto: [{ value: null, disabled: true }],
      centroCosto: [{ value: null }],
      idAprobador: [{ value: null, disabled: true }],
      aprobador: [{ value: null, disabled: true }],
      tipoDocumento: [null, Validators.required],
    });
  }
  onClickRegresar() {
    this.location.back();
  }

  cambioEnCentroCosto(event) {
    const { codCentroCosto } = event;
    this.formularioModificar.patchValue({ codCentroCosto });
  }
  datosCentroCosto() {
    this.aprobadorCentroCostoService
      .getCentroCosto()
      .pipe(
        map((resp) => {
          this.rowCentroCosto = resp;
          if (resp) {
            const indice = this.rowCentroCosto.findIndex(
              (el) => el.codCentroCosto === this.bodyParams.codCentroCosto
            );

            this.formularioModificar.patchValue({
              codCentroCosto: this.rowCentroCosto[indice].codCentroCosto,
              centroCosto: this.rowCentroCosto[indice],
            });
          }
        })
      )
      .subscribe();
  }

  cambioEnComboAprobador(event) {
    const { idAprobador } = event;
    this.formularioModificar.patchValue({ idAprobador });
  }

  datosTipoDocumento() {
    this.aprobadorCentroCostoService
      .getTipoDocumentoCC()
      .pipe(
        map((resp) => {
          this.rowTipoDocumento = resp;
          const indice = this.rowTipoDocumento.findIndex(
            (el) =>
              el.idAprobacionDocumento ===
              +this.bodyParams.idAprobacionDocumento
          );
          this.formularioModificar.patchValue({
            tipoDocumento: this.rowTipoDocumento[indice],
          });
        })
      )
      .subscribe();
  }
  clickGuardar() {
    // console.log(this.formularioModificar.value);
    // const {aprobador} = this.formularioModificar.value;
    const { centroCosto } = this.formularioModificar.value;
    const { codcentroCosto } = this.formularioModificar.value;
    const { tipoDocumento } = this.formularioModificar.value;

    console.log('centroCosto', centroCosto)
    console.log('codcentroCosto', codcentroCosto)
    console.log('this.itemCentroCostoSeleccionado', this.itemCentroCostoSeleccionado);

    const body = {
      idAprobacionCC: this.bodyParams.idAprobacionCC,
      idAprobacion: this.bodyParams.idAprobacion,
      codCentroCosto: this.itemCentroCostoSeleccionado !== undefined ? this.itemCentroCostoSeleccionado.codCentroCosto : centroCosto.codCentroCosto,
      // codCentroCosto: this.itemCentroCostoSeleccionado !== undefined ? this.itemCentroCostoSeleccionado.codCentroCosto : codcentroCosto,
      idAprobacionDocumento: tipoDocumento.idAprobacionDocumento,
      regUpdateIdUsuario: 1,
    };
    this.aprobadorCentroCostoService.updateCC(body).subscribe(
      (result: IMensajeResultadoApi) => {
        this.mensajePrimeNgService.onToExitoMsg(null, result);
        this.sessionStorage.setItem('idAprobacionCC', body.idAprobacionCC);
        this.onClickRegresar();
      },
      (error) => this.mensajePrimeNgService.onToErrorMsg(null, error.error)
    );
  }
  centroCostoSeleccionado(event: ICentroCosto) {
    this.itemCentroCostoSeleccionado = event;
    this.formularioModificar.patchValue({
      codCentroCosto: event.codCentroCosto,
      desCentroCosto: event.desCentroCosto,
    });

    this.activarModalCentroCosto();
  }
  activarModalCentroCosto() {
    this.isActivateBusquedaCentroCosto = !this.isActivateBusquedaCentroCosto;
  }
}
