import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AdminAprobadorTemporalService } from '../../services/aprobador-temporal.service';
import { LanguageService } from '../../../../services/language.service';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { UtilService } from '../../../../services/util.service';
import { SessionService } from '../../../../services/session.service';
import { IMensajeResultadoApi } from '../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
@Component({
  selector: 'app-modificar-aprobador-temporal',
  templateUrl: './modificar-aprobador-temporal.component.html',
  styleUrls: ['./modificar-aprobador-temporal.component.scss'],
})
export class ModificarAprobadorTemporalComponent implements OnInit {
  titulo = 'Aprobador Temporal';
  formularioModificar: FormGroup;
  bodyParams: any;
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  constructor(
    public lenguageService: LanguageService,
    private readonly formBuilder: FormBuilder,
    private readonly location: Location,
    private readonly activeRoute: ActivatedRoute,
    public mensajePrimeNgService: MensajePrimeNgService,
    private readonly adminAprobadorTemporalService: AdminAprobadorTemporalService,
    private readonly utils: UtilService,
    private readonly sessionStorage: SessionService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      { label: this.globalConstants.cModuloRequerimiento },
      { label: 'Aprobador Temporal', routerLink: ['modulo-ad/aprobador-temporal'] },
      { label: 'Actualizar'}
    ]);
    this.buildForm();
  }

  ngOnInit() {
    if (this.sessionStorage.getItem('idAprobadorTemp')) {
      this.sessionStorage.removeItem('idAprobadorTemp');
    }
    this.activeRoute.queryParamMap
      .pipe(
        map((params) => {
          this.bodyParams = {
            idAprobadorTemporal: +params.get('idAprobadorTemporal'),
            idAprobador: +params.get('idAprobador'),
            aprobador: params.get('aprobador'),
            usuario: params.get('usuarioTemporal'),
            codCentroCosto: params.get('codCentroCosto'),
            desCentroCosto: params.get('desCentroCosto'),
            fechaInicio: params.get('fechaInicio'),
            fechaFin: params.get('fechaFin'),
            idAprobadorEstado: +params.get('idAprobadorEstado'),
          };
          this.formularioModificar.patchValue({
            nroAproTemp: +this.bodyParams.idAprobadorTemporal,
            idAprobador: +this.bodyParams.idAprobador,
            aprobador: this.bodyParams.aprobador,
            usuario: this.bodyParams.usuario,
            centroCosto: this.bodyParams.codCentroCosto,
            fechaInicio: new Date(this.bodyParams.fechaInicio),
            fechaFin: new Date(this.bodyParams.fechaFin),
          });
        })
      )
      .subscribe();
  }
  private buildForm() {
    this.formularioModificar = this.formBuilder.group({
      nroAproTemp: [{ value: null, disabled: true }],
      numAprobador: [{ value: null, disabled: true }],
      idAprobador: [{ value: null, disabled: true }],
      aprobador: [{ value: null, disabled: true }],
      usuario: [{ value: null, disabled: true }],
      centroCosto: [{ value: null, disabled: true }],
      fechaInicio: [null, Validators.required],
      fechaFin: [null, Validators.required],
    });
  }
  onClickRegresar() {
    this.location.back();
  }
  clickGuardar() {
    const { fechaInicio } = this.formularioModificar.value;
    const { fechaFin } = this.formularioModificar.value;
    const body = {
      idAprobadorTemporal: this.bodyParams.idAprobadorTemporal,
      idAprobador: this.bodyParams.idAprobador,
      fechaInicio: this.utils.fechaApi_POST(fechaInicio),
      fechaFin: this.utils.fechaApi_POST(fechaFin),
      regUpdateIdUsuario: 1,
    };

    this.adminAprobadorTemporalService.updateAprobadorTemporal(body).subscribe(
      (result: IMensajeResultadoApi) => {
        this.mensajePrimeNgService.onToExitoMsg(
          null,
          result
        );
        this.sessionStorage.setItem(
          'idAprobadorTemp',
          this.bodyParams.idAprobadorTemporal
        );
        this.onClickRegresar();
      },
      (error) => {
        console.log(error);
        this.mensajePrimeNgService.onToErrorMsg(null, error.error);
      }
    );
  }
}
