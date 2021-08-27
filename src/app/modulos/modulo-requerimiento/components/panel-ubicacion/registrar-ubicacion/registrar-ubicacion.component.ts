import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UbicacionModel } from '../../../models/ubicacion.model';
import { Subscription } from 'rxjs';
import { RequerimientoService } from '../../../services/requerimiento.service';
import { MensajePrimeNgService } from '../../../../../services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { AprobadorCentroCostoService } from '../../../../modulo-administracion/services/aprobador-centro-costo.service';
import { ICentroCosto } from '../../../../modulo-administracion/models/aprobadorCentroCosto.interface';

@Component({
  selector: 'app-registrar-ubicacion',
  templateUrl: './registrar-ubicacion.component.html',
  styleUrls: ['./registrar-ubicacion.component.css']
})
export class RegistrarUbicacionComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Ubicación';

  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  maestroForm: FormGroup;

  modelo: UbicacionModel = new UbicacionModel();

  subscription$: Subscription;

  //Listas
  
  // Centro de Costo
  isActivateBusquedaCentroCosto = false;
  itemCentroCostoSeleccionado: ICentroCosto;

  constructor(private fb: FormBuilder,
              private requerimientoService: RequerimientoService,
              private aprobadorCentroCostoService: AprobadorCentroCostoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
        { label: 'Módulo Requerimiento' },
        { label: 'Ubicación', routerLink: ['modulo-re/panel-ubicacion'] },
        { label: 'Nuevo'}
    ]);
  }

  ngOnInit(): void {
    this.onbuildForm();
  }

  onbuildForm() {
    this.maestroForm = this.fb.group(
      {
        'desUbicacion' : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(4)])),
        'codCentroCosto' : new FormControl('', Validators.compose([Validators.required])),
        'desCentroCosto' : new FormControl({value: null, disabled: true}, Validators.compose([Validators.required]))
      }
    );
  }

  onClickSave() {

    if (this.itemCentroCostoSeleccionado) {
      this.modelo.desUbicacion = this.maestroForm.controls['desUbicacion'].value;
      this.modelo.codCentroCosto = this.maestroForm.controls['codCentroCosto'].value;
      this.subscription$ = new Subscription();
      this.subscription$ = this.requerimientoService.setRegistrarUbicacionPorCentroCosto(this.modelo)
      .subscribe(() =>  {
        this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
        this.back(); },
        (error) => {
          console.log(error);
          this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgErrorSummary, error.error);
      });
    }
  }

  centroCostoSeleccionado(event: ICentroCosto) {
    this.itemCentroCostoSeleccionado = event;

    this.maestroForm.controls['codCentroCosto'].setValue(this.itemCentroCostoSeleccionado.codCentroCosto);
    this.maestroForm.controls['desCentroCosto'].setValue(this.itemCentroCostoSeleccionado.desCentroCosto);

    this.activarModalCentroCosto();
  }

  activarModalCentroCosto() {
    this.isActivateBusquedaCentroCosto = !this.isActivateBusquedaCentroCosto;
  }

  back() {
    this.router.navigate(['/main/modulo-re/panel-ubicacion']);
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
