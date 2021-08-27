import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { AdminAprobadorService } from '../../services/aprobador.service';
import { interfaceUsuario } from '../../models/usuario.interface';
import { IGuardarAprobador } from '../../models/aprobador.interface';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { IMensajeResultadoApi } from '../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';
import { UserContextService } from '../../../../services/user-context.service';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
@Component({
  selector: 'app-registrar-aprobador',
  templateUrl: './registrar-aprobador.component.html',
  styleUrls: ['./registrar-aprobador.component.scss'],
  providers: [MessageService],
})
export class RegistrarAprobadorComponent implements OnInit {
  titulo = 'Aprobador';
  rowResultUsuario: interfaceUsuario[] = [];
  formularioRegistro: FormGroup;
  usuarioBuscadoEnModal: interfaceUsuario;
  isActivateBusquedaUsuario = false;
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  constructor(
    private readonly location: Location,
    public mensajePrimeNgService: MensajePrimeNgService,
    private readonly AprobadorAdminService: AdminAprobadorService,
    private readonly fb: FormBuilder,
    private readonly userContextService: UserContextService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      { label: this.globalConstants.cModuloRequerimiento },
      { label: 'Aprobador Principal', routerLink: ['modulo-ad/admin-aprobador'] },
      { label: 'Nuevo'}
    ]);
    this.buildForm();
  }
  ngOnInit() {}
  private buildForm() {
    this.formularioRegistro = this.fb.group({
      idAprobador: [{value: null, disabled: true}],
      usuario: [{value: null, disabled: false}, Validators.compose([Validators.required])],
      codCentroCosto: [{value: null, disabled: true}],
      centroCosto: [{value: '', disabled: true}],
    });
  }
  onClickRegresar() {
    this.location.back();
  }
  clickGuardar() {
    const body: IGuardarAprobador = {
      idAprobador: 0,
      idUsuario: this.usuarioBuscadoEnModal.idUsuario,
      isActivoSistema: true,
      regCreateIdUsuario: this.userContextService.getIdUsuario(),
      idAprobadorEstado: 1,
    };
    this.AprobadorAdminService.createAprobador(body).subscribe(
      (result: IMensajeResultadoApi) => {
        this.mensajePrimeNgService.onToExitoMsg(null, result);
        this.onClickRegresar();
      },
      (error) => this.mensajePrimeNgService.onToErrorMsg(null, error.error)
    );
  }
  clickBuscarUsuario() {
    this.isActivateBusquedaUsuario = !this.isActivateBusquedaUsuario;
  }
  
  usuarioBuscado(event: interfaceUsuario) {
    this.usuarioBuscadoEnModal = event;
    this.isActivateBusquedaUsuario = false;
    this.formularioRegistro.patchValue({
      usuario: event.nombresApellidos,
      codCentroCosto: event.codCentroCosto,
      centroCosto: event.desCentroCosto,
    });
  }
}
