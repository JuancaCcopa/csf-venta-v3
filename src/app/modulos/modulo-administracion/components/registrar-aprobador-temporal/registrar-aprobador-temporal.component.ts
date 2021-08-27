import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { interfaceUsuario } from '../../models/usuario.interface';
import { InterfaceAprobadorTemporal } from '../../models/aprobadorTemporal.interface';
import { AdminAprobadorTemporalService } from '../../services/aprobador-temporal.service';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../../../services/language.service';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { UtilService } from '../../../../services/util.service';
import { IMensajeResultadoApi } from '../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
@Component({
  selector: 'app-registrar-aprobador-temporal',
  templateUrl: './registrar-aprobador-temporal.component.html',
  styleUrls: ['./registrar-aprobador-temporal.component.scss'],
})
export class RegistrarAprobadorTemporalComponent implements OnInit {
  titulo = 'Aprobador Temporal';
  formularioRegistro: FormGroup;
  isActivateBusquedaUsuario = false;
  usuarioBuscadoEnModal: interfaceUsuario;
  bodyParams: any;
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  constructor(
    private formBuilder: FormBuilder,
    private readonly location: Location,
    public lenguageService: LanguageService,
    public mensajePrimeNgService: MensajePrimeNgService,
    private adminAprobadorTemporalService: AdminAprobadorTemporalService,
    private activeRoute: ActivatedRoute,
    private utils: UtilService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      { label: this.globalConstants.cModuloRequerimiento },
      { label: 'Aprobador Temporal', routerLink: ['modulo-ad/aprobador-temporal'] },
      { label: 'Nuevo'}
    ]);
    this.buildForm();
  }

  ngOnInit() {
    this.activeRoute.queryParamMap
      .pipe(
        map((params) => {
          this.bodyParams = {
            idAprobador: Number(params.get('idAprobador')),
            aprobador: params.get('aprobador'),
            codCentroCosto: params.get('codCentroCosto'),
            desCentroCosto: params.get('desCentroCosto'),
          };
          console.log(this.bodyParams);
        })
      )
      .subscribe();

    this.formularioRegistro.patchValue({
      idAprobador: this.bodyParams.idAprobador,
      aprobador: this.bodyParams.aprobador,
      codCentroCosto: this.bodyParams.codCentroCosto,
      desCentroCosto: this.bodyParams.desCentroCosto,
    });
  }

  onClickRegresar() {
    this.location.back();
  }

  private buildForm() {
    this.formularioRegistro = this.formBuilder.group({
      idAprobador: [{ value: null, disabled: true }],
      numAprobador: [{ value: null, disabled: true }],
      aprobador: [{ value: null, disabled: true }],
      usuario: [null,Validators.compose([Validators.required, Validators.minLength(3)])],
      codCentroCosto: [{ value: null, disabled: true }],
      desCentroCosto: [{ value: null, disabled: true }],
      fechaIn: [],
      fechaFin: [],
    });
  }

  usuarioBuscado(event: interfaceUsuario) {
    this.usuarioBuscadoEnModal = event;
    this.isActivateBusquedaUsuario = false;
    console.log('event', event);
    this.formularioRegistro.patchValue({
      usuario: event.nombresApellidos,
      desCentroCosto: event.desCentroCosto,
    });
  }

  clickBuscarUsuario() {
    this.isActivateBusquedaUsuario = !this.isActivateBusquedaUsuario;
  }

  clickGuardar() {
    const formBody = this.formularioRegistro.value;
    const fechaInicio = this.utils.fechaApi_POST(formBody.fechaIn);
    const fechaFin = this.utils.fechaApi_POST(formBody.fechaFin);
    const body: Partial<InterfaceAprobadorTemporal> = {
      idAprobadorTemporal: 0, // default
      idAprobador: this.bodyParams.idAprobador, // traido por la ruta
      idUsuarioTemporal: this.usuarioBuscadoEnModal.idUsuario,
      fechaInicio,
      fechaFin,
      regCreateIdUsuario: 1, // default
      idAprobadorEstado: 1, // default
    };

    this.adminAprobadorTemporalService.saveAprobadorTemporal(body).subscribe(
      (result: IMensajeResultadoApi) => {
        this.mensajePrimeNgService.onToExitoMsg(null, result);
        this.formularioRegistro.reset();
        this.onClickRegresar();
      },
      (error) => this.mensajePrimeNgService.onToErrorMsg(null, error.error)
    );
  }
}
