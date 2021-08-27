import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../../constants/globals-constants-form';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UbicacionPorUsuarioModel, UbicacionModel } from '../../../../models/ubicacion.model';
import { Subscription } from 'rxjs';
import { ICentroCosto } from '../../../../../modulo-administracion/models/aprobadorCentroCosto.interface';
import { RequerimientoService } from '../../../../services/requerimiento.service';
import { MensajePrimeNgService } from '../../../../../../services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../../../services/breadcrumb.service';
import { interfaceUsuario } from '../../../../../modulo-administracion/models/usuario.interface';

@Component({
  selector: 'app-registrar-ubicacion-por-usuario',
  templateUrl: './registrar-ubicacion-por-usuario.component.html',
  styleUrls: ['./registrar-ubicacion-por-usuario.component.css']
})
export class RegistrarUbicacionPorUsuarioComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Ubicación Por Usuario';

  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  maestroForm: FormGroup;

  modelo: UbicacionPorUsuarioModel = new UbicacionPorUsuarioModel();

  subscription$: Subscription;

  //Listas
  
  //Ubicacion
  isActivateBusquedaUbicacion = false;
  itemUbicacionSeleccionado: UbicacionModel;

  // Usuario
  isActivateBusquedaUsuario: boolean;
  itemUsuarioSeleccionado: interfaceUsuario;

  constructor(private fb: FormBuilder,
              private requerimientoService: RequerimientoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
        { label: 'Módulo Requerimiento' },
        { label: 'Ubicación Por Usuario', routerLink: ['modulo-re/panel-ubicacion-por-usuario'] },
        { label: 'Nuevo'}
    ]);
  }

  ngOnInit(): void {
    this.onbuildForm();
  }

  onbuildForm() {
    this.maestroForm = this.fb.group(
      {
        'idUbicacion' : new FormControl({value: null, disabled: true}, Validators.compose([Validators.required])),
        'desUbicacion' : new FormControl('', Validators.compose([Validators.required])),
        'idUsuario' : new FormControl({value: null, disabled: true}, Validators.compose([Validators.required])),
        'nombresApellidos' : new FormControl('', Validators.compose([Validators.required])),
        'genera' : new FormControl(false, Validators.compose([Validators.required])),
        'revisa' : new FormControl(false, Validators.compose([Validators.required])),
        'autoriza' : new FormControl(false, Validators.compose([Validators.required])),
      }
    );
  }

  onClickSave() {

    if (this.itemUbicacionSeleccionado) {
      this.modelo.idUbicacion = this.maestroForm.controls['idUbicacion'].value;
      this.modelo.idUsuario = this.maestroForm.controls['idUsuario'].value;
      this.modelo.flgGenera = this.maestroForm.controls['genera'].value;
      this.modelo.flgRevisa = this.maestroForm.controls['revisa'].value;
      this.modelo.flgAutoriza = this.maestroForm.controls['autoriza'].value;
      this.subscription$ = new Subscription();
      this.subscription$ = this.requerimientoService.setRegistrarUbicacionPorUsuario(this.modelo)
      .subscribe(() =>  {
        this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
        this.back(); },
        (error) => {
          console.log(error);
          this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgErrorSummary, error.error);
      });
    }
  }

  ubicacionSeleccionado(event: UbicacionModel) {
    this.itemUbicacionSeleccionado = event;
    this.maestroForm.patchValue({
      idUbicacion: event.idUbicacion,
      desUbicacion: event.desUbicacion,
    });

    this.activarModalUbicacion();
  }
  activarModalUbicacion() {
    this.isActivateBusquedaUbicacion = !this.isActivateBusquedaUbicacion;
  }

  activarModalUsuario() {
    this.isActivateBusquedaUsuario = !this.isActivateBusquedaUsuario;
  }
  
  usuarioBuscado(event: interfaceUsuario) {
    this.itemUsuarioSeleccionado = event;
    this.isActivateBusquedaUsuario = false;
    this.maestroForm.patchValue({
      idUsuario: event.idUsuario,
      nombresApellidos: event.nombresApellidos
    });
  }

  back() {
    this.router.navigate(['/main/modulo-re/panel-ubicacion-por-usuario']);
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
