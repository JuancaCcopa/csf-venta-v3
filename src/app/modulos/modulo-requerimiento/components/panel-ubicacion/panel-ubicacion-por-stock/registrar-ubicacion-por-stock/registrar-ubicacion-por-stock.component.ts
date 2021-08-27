import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../../constants/globals-constants-form';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UbicacionPorStockModel, UbicacionModel, UbicacionPorTipoProductoModel } from '../../../../models/ubicacion.model';
import { Subscription } from 'rxjs';
import { IArticulo } from '../../../../models/articulo.interface';
import { RequerimientoService } from '../../../../services/requerimiento.service';
import { MensajePrimeNgService } from '../../../../../../services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../../../services/breadcrumb.service';

@Component({
  selector: 'app-registrar-ubicacion-por-stock',
  templateUrl: './registrar-ubicacion-por-stock.component.html',
  styleUrls: ['./registrar-ubicacion-por-stock.component.css']
})
export class RegistrarUbicacionPorStockComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Ubicación Por Stock';

  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  maestroForm: FormGroup;

  modelo: UbicacionPorStockModel = new UbicacionPorStockModel();

  subscription$: Subscription;

  //Listas
  
  //Ubicacion
  isActivateBusquedaUbicacion = false;
  itemUbicacionSeleccionado: UbicacionModel = new UbicacionModel();

  // Articulo
  isActivateBusquedaArticulo: boolean;
  itemArticuloSeleccionado: IArticulo;

  // Tipo Producto
  isActivateBusquedaTipoProducto = false;
  itemTipoProductoSeleccionado: UbicacionPorTipoProductoModel = new UbicacionPorTipoProductoModel();

  constructor(private fb: FormBuilder,
              private requerimientoService: RequerimientoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
        { label: 'Módulo Requerimiento' },
        { label: 'Ubicación Por Stock', routerLink: ['modulo-re/panel-ubicacion-por-stock'] },
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
        'codTipoProducto' : new FormControl({value: null, disabled: true}, Validators.compose([Validators.required])),
        'desTipoProducto' : new FormControl('', Validators.compose([Validators.required])),
        'codArticulo' : new FormControl({value: null, disabled: true}, Validators.compose([Validators.required])),
        'desArticulo' : new FormControl('', Validators.compose([Validators.required])),
        'stockMaximo' : new FormControl(0, Validators.compose([Validators.required, Validators.min(1)])),
      }
    );
  }

  onClickSave() {

    if (this.itemUbicacionSeleccionado) {
      this.modelo.idUbicacion = this.maestroForm.controls['idUbicacion'].value;
      this.modelo.codArticulo = this.maestroForm.controls['codArticulo'].value;
      this.modelo.stockMaximo = this.maestroForm.controls['stockMaximo'].value;
      this.subscription$ = new Subscription();
      this.subscription$ = this.requerimientoService.setRegistrarUbicacionPorStock(this.modelo)
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

  tipoProductoSeleccionado(event: UbicacionPorTipoProductoModel) {
    this.itemTipoProductoSeleccionado = event;
    this.maestroForm.patchValue({
      codTipoProducto: event.codTipoProducto,
      desTipoProducto: event.desTipoProducto,
    });

    this.activarModalTipoProducto();
  }
  activarModalTipoProducto() {
    if (this.itemUbicacionSeleccionado) {
      this.isActivateBusquedaTipoProducto = !this.isActivateBusquedaTipoProducto;
    }
  }

  articuloBuscado(event: IArticulo) {
    this.itemArticuloSeleccionado = event;
    console.log('event', event);
    this.maestroForm.patchValue({
      codArticulo: event.itemCode,
      desArticulo: event.itemName
    });

    this.activarModalArticulo();
  }

  activarModalArticulo() {
    if (this.itemTipoProductoSeleccionado) {
      this.isActivateBusquedaArticulo = !this.isActivateBusquedaArticulo;
    }
  }

  back() {
    this.router.navigate(['/main/modulo-re/panel-ubicacion-por-stock']);
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
