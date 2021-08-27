import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ParametroSistemaModel } from '../../models/parametro-sistema.model';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { SeguridadService } from '../../services/seguridad.service';
import { CifrarDataService } from '../../../../services/cifrar-data.service';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';

@Component({
  selector: 'app-panel-sistema',
  templateUrl: './panel-sistema.component.html',
  styleUrls: ['./panel-sistema.component.css']
})
export class PanelSistemaComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Parametros de Sistema';
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  modeloForm: FormGroup;

  subscription$: Subscription;

  modelo: ParametroSistemaModel = new ParametroSistemaModel();


  constructor(private fb: FormBuilder,
              public mensajePrimeNgService: MensajePrimeNgService,
              private breadcrumbService: BreadcrumbService,
              private seguridadService: SeguridadService,
              private cifrarDataService: CifrarDataService) {
    this.breadcrumbService.setItems([
      { label: 'Modulo Seguridad' },
      { label: 'Parametro Sistema', routerLink: ['module-se/panel-parametro-sistema'] }
    ]);
  }

  ngOnInit(): void {
    this.onInicializaFormulario();
    this.onObtieneRegistro();
  }

  onInicializaFormulario() {
    this.modeloForm = this.fb.group({
      sendEmail : new FormControl('', Validators.compose(
      [Validators.required, Validators.maxLength(100), Validators.minLength(5)])),
      sendEmailPasswordOrigen : new FormControl('', Validators.compose(
      [Validators.required, Validators.maxLength(30), Validators.minLength(5)])),
      sendEmailPort : new FormControl(0, Validators.compose(
      [Validators.required,])),
      sendEmailEnabledSSL : new FormControl(false, Validators.compose(
      [Validators.required])),
      sendEmailHost : new FormControl('', Validators.compose(
      [Validators.required, Validators.maxLength(100), Validators.minLength(5)])),
      emailGoogleDrive : new FormControl('', Validators.compose(
        [Validators.required, Validators.maxLength(100), Validators.minLength(5)])),
      emailPassword : new FormControl('', Validators.compose(
        [Validators.required, Validators.maxLength(30), Validators.minLength(3)])),
      });
  }



  onObtieneRegistro() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.seguridadService.getParametroSistemaPorId()
    .subscribe(resp => {
      if (resp) {
        this.modelo = resp;
        this.setRegistroObtenido();
        }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  setRegistroObtenido() {
    this.modeloForm.controls['sendEmail'].setValue(this.modelo.sendEmail);
    this.modeloForm.controls['sendEmailPasswordOrigen'].setValue(this.cifrarDataService.decrypt(this.modelo.sendEmailPasswordOrigen));
    this.modeloForm.controls['sendEmailPort'].setValue(this.modelo.sendEmailPort);
    this.modeloForm.controls['sendEmailEnabledSSL'].setValue(this.modelo.sendEmailEnabledSSL);
    this.modeloForm.controls['sendEmailHost'].setValue(this.modelo.sendEmailHost);
    this.modeloForm.controls['emailGoogleDrive'].setValue(this.modelo.emailGoogleDrive);
    this.modeloForm.controls['emailPassword'].setValue(this.cifrarDataService.decrypt(this.modelo.emailPassword));
  }

  onClickSave() {
    this.modelo.sendEmail = this.modeloForm.controls['sendEmail'].value;
    this.modelo.sendEmailPasswordOrigen = this.cifrarDataService.encrypt(this.modeloForm.controls['sendEmailPasswordOrigen'].value);
    this.modelo.sendEmailPort = this.modeloForm.controls['sendEmailPort'].value;
    this.modelo.sendEmailEnabledSSL = this.modeloForm.controls['sendEmailEnabledSSL'].value;
    this.modelo.sendEmailHost = this.modeloForm.controls['sendEmailHost'].value;

    this.modelo.emailGoogleDrive = this.modeloForm.controls['emailGoogleDrive'].value;
    this.modelo.emailPassword = this.cifrarDataService.encrypt(this.modeloForm.controls['emailPassword'].value);

    this.subscription$ = new Subscription();
    let observ = new Observable();
    if (this.modelo.idParametrosSistema === 0) {
      observ = this.seguridadService.setInsertParametroSistema(this.modelo);
    } else {
      observ = this.seguridadService.setUpdateParametroSistema(this.modelo);
    }
    this.subscription$ = observ
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
    
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
