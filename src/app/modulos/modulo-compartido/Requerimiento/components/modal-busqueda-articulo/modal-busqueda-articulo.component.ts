import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { IArticulo } from '../../../../modulo-requerimiento/models/articulo.interface';
import { RequerimientoService } from '../../../../modulo-requerimiento/services/requerimiento.service';
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';
import { map } from 'rxjs/operators';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';

@Component({
  selector: 'app-modal-busqueda-articulo',
  templateUrl: './modal-busqueda-articulo.component.html',
  styleUrls: ['./modal-busqueda-articulo.component.css']
})
export class ModalBusquedaArticuloComponent implements OnInit, OnChanges {
  @Input() isDisplayBusquedaArticulo;
  @Input() selectionMode:string = 'multiple';
  @Input() tipoArticulo: number = 0;
  @Input() isInventariable: boolean = false;
  @Output() articuloSeleccionado = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  seleccionArticulo: any;
  rowListaArticulos: IArticulo[] = [];
  cols: any;
  loading = true;
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;

  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  constructor(private requerimientoService: RequerimientoService) {}

  ngOnInit(): void {
    this.cabeceraTabla();
    
  }

  ngOnChanges() {
    if (this.isDisplayBusquedaArticulo) {
      this.getArticulos();
    }
  }

  cabeceraTabla() {
    this.cols = [
      { field: 'itemCode', header: 'Codigo' },
      { field: 'itemName', header: 'Producto' },
      { field: 'itemsGroupCode', header: 'Tipo' },
      { field: 'salesUnit', header: 'UM' },
      { field: 'defaultWarehouse', header: 'Almacen' },
    ];
  }

  getArticulos() {
    this.requerimientoService
      .getArticulo(this.tipoArticulo, this.isInventariable)
      .pipe(map((resp) => (this.rowListaArticulos = resp)))
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
    
    this.articuloSeleccionado.emit(this.seleccionArticulo);
  }
  clickCancelar() {
    this.cancel.emit();
  }
}
