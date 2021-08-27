import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../../constants/globals-constants-form';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UbicacionPorTipoProductoModel, UbicacionModel } from '../../../../models/ubicacion.model';
import { Subscription } from 'rxjs';
import { RequerimientoService } from '../../../../services/requerimiento.service';
import { MensajePrimeNgService } from '../../../../../../services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../../../services/breadcrumb.service';
import { IGrupoArticulo } from '../../../../../modulo-compartido/Requerimiento/interfaces/grupo-articulo.interface';

@Component({
  selector: 'app-registrar-ubicacion-por-tipo-producto',
  templateUrl: './registrar-ubicacion-por-tipo-producto.component.html',
  styleUrls: ['./registrar-ubicacion-por-tipo-producto.component.css']
})
export class RegistrarUbicacionPorTipoProductoComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Ubicación Por Tipo Producto';

  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  maestroForm: FormGroup;

  modelo: UbicacionPorTipoProductoModel = new UbicacionPorTipoProductoModel();

  subscription$: Subscription;

  //Listas
  
  //Ubicacion
  isActivateBusquedaUbicacion = false;
  itemUbicacionSeleccionado: UbicacionModel;

  // Tipo Producto
  isActivateBusquedaTipoProducto = false;
  itemTipoProductoSeleccionado: IGrupoArticulo;

  constructor(private fb: FormBuilder,
              private requerimientoService: RequerimientoService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
        { label: 'Módulo Requerimiento' },
        { label: 'Ubicación Por Tipo Producto', routerLink: ['modulo-re/panel-ubicacion-por-tipo-producto'] },
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
        'desTipoProducto' : new FormControl('', Validators.compose([Validators.required]))
      }
    );
  }

  onClickSave() {

    if (this.itemUbicacionSeleccionado) {
      this.modelo.idUbicacion = this.maestroForm.controls['idUbicacion'].value;
      this.modelo.codTipoProducto = this.maestroForm.controls['codTipoProducto'].value;
      this.subscription$ = new Subscription();
      this.subscription$ = this.requerimientoService.setRegistrarUbicacionPorTipoProducto(this.modelo)
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

  tipoProductoSeleccionado(event: IGrupoArticulo) {
    this.itemTipoProductoSeleccionado = event;
    this.maestroForm.patchValue({
      codTipoProducto: event.number,
      desTipoProducto: event.groupName,
    });

    this.activarModalTipoProducto();
  }
  
  activarModalTipoProducto() {
    this.isActivateBusquedaTipoProducto = !this.isActivateBusquedaTipoProducto;
  }

  back() {
    this.router.navigate(['/main/modulo-re/panel-ubicacion-por-tipo-producto']);
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
