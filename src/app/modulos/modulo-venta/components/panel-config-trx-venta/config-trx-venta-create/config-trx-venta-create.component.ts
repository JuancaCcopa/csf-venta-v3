import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IVentaConfiguracion, IVentaConfiguracionRegistrar } from '../../../interface/venta-configuracion.interface';
import { Subscription } from 'rxjs';
import { VentasService } from '../../../services/ventas.service';
import { MensajePrimeNgService } from '../../../../../services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { IWarehouses } from '../../../../modulo-compartido/Ventas/interfaces/warehouses.interface';

@Component({
  selector: 'app-config-trx-venta-create',
  templateUrl: './config-trx-venta-create.component.html',
  styleUrls: ['./config-trx-venta-create.component.css']
})
export class ConfigTrxVentaCreateComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Configuración de Transacciones de Ventas';

  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  maestroForm: FormGroup;

  subscription$: Subscription;

  constructor(private fb: FormBuilder,
              private ventasService: VentasService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
        { label: 'Módulo Ventas' },
        { label: 'Configuración de Transacciones de Ventas', routerLink: ['module-ve/panel-trx-venta'] },
        { label: 'Nuevo'}
    ]);
  }

  ngOnInit(): void {
    this.onbuildForm();
  }

  onbuildForm() {
    this.maestroForm = this.fb.group(
      {
        'nombre' : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(4)])),
        'flgautomatico' : new FormControl(false, Validators.compose([Validators.required])),
        'flgreceta' : new FormControl(false, Validators.compose([Validators.required])),
        'flgpedido' : new FormControl(false, Validators.compose([Validators.required])),
        'flgmanual' : new FormControl(false, Validators.compose([Validators.required])),
        'codalmacen' : new FormControl('', Validators.compose([Validators.required])),
        'desalmacen' : new FormControl('', Validators.compose([Validators.required]))
      }
    );
  }

  goAlmacenSeleccionado(item: IWarehouses) {
    this.maestroForm.patchValue({
      codalmacen: item.warehouseCode,
      desalmacen: item.warehouseName
    });
  }

  onClickSave() {
    const body: IVentaConfiguracionRegistrar = {
      nombre: this.maestroForm.controls['nombre'].value,
      flgautomatico: this.maestroForm.controls['flgautomatico'].value,
      flgreceta: this.maestroForm.controls['flgreceta'].value,
      flgpedido: this.maestroForm.controls['flgpedido'].value,
      flgmanual: this.maestroForm.controls['flgmanual'].value,
      codalmacen: this.maestroForm.controls['codalmacen'].value,
      desalmacen: this.maestroForm.controls['desalmacen'].value,
    };

    console.log('this.modelo', body);

    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.setVentaConfiguracionRegistrar(body)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.back(); },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgErrorSummary, error.error);
    });
  }

  back() {
    this.router.navigate(['/main/modulo-ve/panel-trx-venta']);
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
