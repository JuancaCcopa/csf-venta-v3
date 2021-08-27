import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { SeguridadService } from '../../services/seguridad.service';
import { ParametroConexionModel } from '../../models/parametro-conexion.model';
import { CifrarDataService } from '../../../../services/cifrar-data.service';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';

@Component({
  selector: 'app-panel-conexion',
  templateUrl: './panel-conexion.component.html',
  styleUrls: ['./panel-conexion.component.css']
})
export class PanelConexionComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Parametros de Conexión';
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  modeloForm: FormGroup;

  subscription$: Subscription;

  modelo: ParametroConexionModel = new ParametroConexionModel();


  constructor(private fb: FormBuilder,
              public mensajePrimeNgService: MensajePrimeNgService,
              private breadcrumbService: BreadcrumbService,
              private seguridadService: SeguridadService,
              private cifrarDataService: CifrarDataService) {
    this.breadcrumbService.setItems([
      { label: 'Modulo Seguridad' },
      { label: 'Parametro Conexión', routerLink: ['module-se/panel-parametro-conexion'] }
    ]);
  }

  ngOnInit(): void {
    this.onInicializaFormulario();
    this.onObtieneRegistro();
  }

  onInicializaFormulario() {
    this.modeloForm = this.fb.group({
      aplicacionServidor : new FormControl('', Validators.compose(
      [Validators.required, Validators.maxLength(100), Validators.minLength(5)])),
      aplicacionBaseDatos : new FormControl('', Validators.compose(
      [Validators.required, Validators.maxLength(100), Validators.minLength(5)])),
      aplicacionUsuario : new FormControl('', Validators.compose(
      [Validators.required, Validators.maxLength(100), Validators.minLength(5)])),
      aplicacionPasswordOriginal : new FormControl('', Validators.compose(
      [Validators.required, Validators.maxLength(20), Validators.minLength(5)])),
      sapServidor : new FormControl('', Validators.compose(
      [Validators.required, Validators.maxLength(100), Validators.minLength(5)])),
      sapBaseDatos : new FormControl('', Validators.compose(
      [Validators.required, Validators.maxLength(100), Validators.minLength(5)])),
      sapUsuario : new FormControl('', Validators.compose(
      [Validators.required, Validators.maxLength(100), Validators.minLength(5)])),
      sapPasswordOriginal : new FormControl('', Validators.compose(
      [Validators.required, Validators.maxLength(20), Validators.minLength(5)])),
      });
  }

  onObtieneRegistro() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.seguridadService.getParametroConexionPorId()
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
    this.modeloForm.controls['aplicacionServidor'].setValue(this.modelo.aplicacionServidor);
    this.modeloForm.controls['aplicacionBaseDatos'].setValue(this.modelo.aplicacionBaseDatos);
    this.modeloForm.controls['aplicacionUsuario'].setValue(this.modelo.aplicacionUsuario);
    this.modeloForm.controls['aplicacionPasswordOriginal'].setValue(this.cifrarDataService.decrypt(this.modelo.aplicacionPasswordOriginal));
    this.modeloForm.controls['sapServidor'].setValue(this.modelo.sapServidor);
    this.modeloForm.controls['sapBaseDatos'].setValue(this.modelo.sapBaseDatos);
    this.modeloForm.controls['sapUsuario'].setValue(this.modelo.sapUsuario);
    this.modeloForm.controls['sapPasswordOriginal'].setValue(this.cifrarDataService.decrypt(this.modelo.sapPasswordOriginal));
  }

  onClickSave() {
    this.modelo.aplicacionServidor = this.modeloForm.controls['aplicacionServidor'].value;
    this.modelo.aplicacionBaseDatos = this.modeloForm.controls['aplicacionBaseDatos'].value;
    this.modelo.aplicacionUsuario = this.modeloForm.controls['aplicacionUsuario'].value;
    this.modelo.aplicacionPasswordOriginal = this.cifrarDataService.encrypt(this.modeloForm.controls['aplicacionPasswordOriginal'].value);
    this.modelo.sapServidor = this.modeloForm.controls['sapServidor'].value;
    this.modelo.sapBaseDatos = this.modeloForm.controls['sapBaseDatos'].value;
    this.modelo.sapUsuario = this.modeloForm.controls['sapUsuario'].value;
    this.modelo.sapPasswordOriginal = this.cifrarDataService.encrypt(this.modeloForm.controls['sapPasswordOriginal'].value);
    this.subscription$ = new Subscription();
    var observ = new Observable();
    if (this.modelo.idParametroConexion !== 0) {
      observ = this.seguridadService.setUpdateParametroConexion(this.modelo);
    } else {
      observ = this.seguridadService.setInsertParametroConexion(this.modelo);
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
