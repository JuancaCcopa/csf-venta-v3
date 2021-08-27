import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UbicacionPorStockModel } from 'src/app/modulos/modulo-requerimiento/models/ubicacion.model';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';
import { RequerimientoService } from '../../../../modulo-requerimiento/services/requerimiento.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-modal-busqueda-articulo-por-usuario',
  templateUrl: './modal-busqueda-articulo-por-usuario.component.html',
  styleUrls: ['./modal-busqueda-articulo-por-usuario.component.css']
})
export class ModalBusquedaArticuloPorUsuarioComponent implements OnInit {

  @Input() isDisplayBusquedaArticulo;
  @Input() selectionMode:string = 'multiple';
  @Input() tipoArticulo: number = 0;
  @Input() idUsuario: number = 0;
  @Input() idUbicacion: number = 0;
  @Output() articuloSeleccionado = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  seleccionArticulo: any;
  rowListaArticulos: UbicacionPorStockModel[] = [];
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
      { field: 'codArticulo', header: 'Codigo' },
      { field: 'desArticulo', header: 'Producto' },
      // { field: 'stockMaximo', header: 'Stock Máximo' },
      { field: 'salesUnit', header: 'UM' },
      { field: 'defaultWarehouse', header: 'Almacen' },
    ];
  }

  getArticulos() {
    this.requerimientoService
      .getUbicacionPorStockPorUsuario(this.idUbicacion, this.idUsuario, this.tipoArticulo)
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
