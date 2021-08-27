import { Component, OnInit, Input, EventEmitter, Output, OnChanges, DoCheck, OnDestroy } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { UbicacionPorTipoProductoModel } from '../../../../modulo-requerimiento/models/ubicacion.model';
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';
import { RequerimientoService } from '../../../../modulo-requerimiento/services/requerimiento.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-busqueda-articulo-por-grupop',
  templateUrl: './modal-busqueda-articulo-por-grupop.component.html',
  styleUrls: ['./modal-busqueda-articulo-por-grupop.component.css']
})
export class ModalBusquedaArticuloPorGrupopComponent implements OnInit, OnChanges, OnDestroy {

  @Input() isDisplayBusqueda;
  @Input() idUbicacion: number;
  @Output() itemSeleccionado = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  listTipoProducto: UbicacionPorTipoProductoModel[] = [];

  modeloSeleccionado: UbicacionPorTipoProductoModel;

  cols: any;
  loading = true;
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;

  subscription$: Subscription;
  constructor(
    private readonly requerimientoService: RequerimientoService
  ) {}

  ngOnDestroy() {
    this.listTipoProducto = [];
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  ngOnChanges() {
    if (this.isDisplayBusqueda) {
      this.listTipoProducto = [];
      this.loading = true;
      this.datosCentroCosto();
    }
  }

  ngOnInit(): void {
    this.cabeceraTabla();
  }

  cabeceraTabla() {
    this.cols = [
      { field: 'codTipoProducto', header: 'Codigo' },
      { field: 'desTipoProducto', header: 'Tipo Producto' },
    ];
  }

  datosCentroCosto() {
    var modeloFindTipoProducto: UbicacionPorTipoProductoModel = {idUbicacion: this.idUbicacion}
    this.subscription$ = new Subscription;
    this.subscription$ = this.requerimientoService
      .getUbicacionPorTipoProducto(modeloFindTipoProducto)
      .pipe(
        map((resp) => {
          this.listTipoProducto = resp;
        })
      )
      .subscribe(
        (resp) => {
          this.loading = false;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  clickAceptar() {
    this.listTipoProducto = [];
    this.itemSeleccionado.emit(this.modeloSeleccionado);
  }

  clickCancelar() {
    this.listTipoProducto = [];
    this.cancel.emit();
  }
}
