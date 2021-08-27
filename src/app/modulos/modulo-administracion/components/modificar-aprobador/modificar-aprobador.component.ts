import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminAprobadorService } from '../../services/aprobador.service';
import { map } from 'rxjs/operators';
import { IModificarAprobador } from '../../models/aprobador.interface';
import { interfaceUsuario } from '../../models/usuario.interface';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { SessionService } from '../../../../services/session.service';
import { IMensajeResultadoApi } from '../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';
import { UserContextService } from '../../../../services/user-context.service';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';

@Component({
  selector: 'app-modificar-aprobador',
  templateUrl: './modificar-aprobador.component.html',
  styleUrls: ['./modificar-aprobador.component.scss'],
})
export class ModificarAprobadorComponent implements OnInit {
  titulo = 'Aprobador';
  formularioModificar: FormGroup;
  isActivateBusquedaUsuario = false;
  bodyParams: any;
  usuarioBuscadoEnModal: interfaceUsuario;
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  constructor(
    private readonly location: Location,
    private activeRoute: ActivatedRoute,
    public mensajePrimeNgService: MensajePrimeNgService,
    private fb: FormBuilder,
    private AprobadorAdminService: AdminAprobadorService,
    private readonly sessionStorage: SessionService,
    private readonly userContextService: UserContextService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      { label: this.globalConstants.cModuloRequerimiento },
      { label: 'Aprobador Principal', routerLink: ['modulo-ad/admin-aprobador'] },
      { label: 'Actualizar'}
    ]);
    this.buildForm();
  }

  ngOnInit() {
    if (this.sessionStorage.getItem('idAprobador')) {
      this.sessionStorage.removeItem('idAprobador');
    }
    this.activeRoute.queryParamMap
      .pipe(
        map((params) => {
          this.bodyParams = {
            codCentroCosto: params.get('codCentroCosto'),
            desCentroCosto: params.get('desCentroCosto'),
            idAprobador: +params.get('idAprobador'),
            usuario: params.get('usuario'),
            idAprobadorEstado: +params.get('idAprobadorEstado'),
          };
          this.formularioModificar.patchValue({
            idAprobador: this.bodyParams.idAprobador,
            usuario: this.bodyParams.usuario,
            codCentroCosto: this.bodyParams.codCentroCosto,
            centroCosto: this.bodyParams.desCentroCosto,
          });
        })
      )
      .subscribe();
  }
  private buildForm() {
    this.formularioModificar = this.fb.group({
      idAprobador: [{value: null, disabled: true}],
      usuario: [{value: null, disabled: true}],
      codCentroCosto: [{value: null, disabled: true}],
      centroCosto: [{value: null, disabled: true}],
    });
  }
  onClickRegresar() {
    this.location.back();
  }

  clickGuardar() {
    const body: IModificarAprobador = {
      idAprobador: this.bodyParams.idAprobador,
      idUsuario: this.usuarioBuscadoEnModal.idUsuario,
      regUpdateIdUsuario: this.userContextService.getIdUsuario(),
    };
    this.AprobadorAdminService.putAprobador(body).subscribe(
      (result: IMensajeResultadoApi) => {
        this.mensajePrimeNgService.onToExitoMsg(null, result);
        this.sessionStorage.setItem('idAprobador', body.idAprobador);
        this.onClickRegresar();
      },
      (error) => this.mensajePrimeNgService.onToErrorMsg(null, error.error)
    );
  }
  
  clickBuscarUsuario() {
    this.isActivateBusquedaUsuario = !this.isActivateBusquedaUsuario;
  }

  usuarioBuscado(event) {
    this.usuarioBuscadoEnModal = event;
    this.isActivateBusquedaUsuario = false;
    this.formularioModificar.patchValue({
      usuario: event.nombresApellidos,
      codCentroCosto: event.codCentroCosto,
      centroCosto: event.desCentroCosto,
    });
  }
}
