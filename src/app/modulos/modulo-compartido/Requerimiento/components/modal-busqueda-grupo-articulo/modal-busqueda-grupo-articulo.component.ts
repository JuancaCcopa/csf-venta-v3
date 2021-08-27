import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { IGrupoArticulo } from '../../interfaces/grupo-articulo.interface';
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';
import { RequerimientoCompartidoService } from '../../services/requerimiento-compartido.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-modal-busqueda-grupo-articulo',
  templateUrl: './modal-busqueda-grupo-articulo.component.html',
  styleUrls: ['./modal-busqueda-grupo-articulo.component.css']
})
export class ModalBusquedaGrupoArticuloComponent implements OnInit {

  @Input() isDisplayBusqueda;
  @Output() itemSeleccionado = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  listCentroCosto: IGrupoArticulo[] = [];

  modeloSeleccionado: IGrupoArticulo;

  cols: any;
  loading = true;
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;
  constructor(
    private readonly requerimientoCompartidoService: RequerimientoCompartidoService
  ) {}

  ngOnInit(): void {
    this.cabeceraTabla();
    this.datosCentroCosto();
  }

  datosCentroCosto() {
    this.requerimientoCompartidoService
      .getGrupoArticulo(100)
      .pipe(
        map((resp) => {
          this.listCentroCosto = resp;
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
  cabeceraTabla() {
    this.cols = [
      { field: 'number', header: 'Codigo' },
      { field: 'groupName', header: 'Tipo Producto' },
    ];
  }
  clickAceptar() {
    this.itemSeleccionado.emit(this.modeloSeleccionado);
  }
  clickCancelar() {
    this.cancel.emit();
  }
}
