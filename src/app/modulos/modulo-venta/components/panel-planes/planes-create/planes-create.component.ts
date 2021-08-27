import { Component, OnInit } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VentasService } from '../../../services/ventas.service';
import { MensajePrimeNgService } from '../../../../../services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { PlanesModel } from '../../../models/planes.model';

@Component({
  selector: 'app-planes-create',
  templateUrl: './planes-create.component.html',
  styleUrls: ['./planes-create.component.css']
})
export class PlanesCreateComponent implements OnInit {

  // Titulo del componente
  titulo = 'Planes';

  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  maestroForm: FormGroup;

  modelo: PlanesModel = new PlanesModel();

  subscription$: Subscription;

  constructor(private fb: FormBuilder,
              private ventasService: VentasService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
        { label: 'Módulo Ventas' },
        { label: 'Planes', routerLink: ['modulo-ve/panel-planes'] },
        { label: 'Nuevo'}
    ]);
  }

  ngOnInit(): void {
    this.onbuildForm();
  }

  onbuildForm() {
    this.maestroForm = this.fb.group(
      {
        'nombre' : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(60), Validators.minLength(4)])),
        'porcentajeDescuento' : new FormControl(0, Validators.compose([Validators.required])),
      }
    );
  }
  onClickSave() {
    this.modelo.nombre = this.maestroForm.controls['nombre'].value;
    this.modelo.porcentajeDescuento = this.maestroForm.controls['porcentajeDescuento'].value;
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.setPlanesRegistrar(this.modelo)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.back(); },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgErrorSummary, error.error);
    });
  }

  back() {
    this.router.navigate(['/main/modulo-ve/panel-planes']);
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
