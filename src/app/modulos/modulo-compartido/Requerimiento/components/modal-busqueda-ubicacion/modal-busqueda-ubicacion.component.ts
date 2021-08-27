import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { UbicacionModel } from 'src/app/modulos/modulo-requerimiento/models/ubicacion.model';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';
import { RequerimientoService } from '../../../../modulo-requerimiento/services/requerimiento.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-busqueda-ubicacion',
  templateUrl: './modal-busqueda-ubicacion.component.html',
  styleUrls: ['./modal-busqueda-ubicacion.component.css']
})
export class ModalBusquedaUbicacionComponent implements OnInit, OnChanges {

  @Input() isDisplayBusquedaUbicacion;
  @Input() idUsuario = 0;
  @Output() UbicacionSeleccionado = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  listUbicacion: UbicacionModel[] = [];
  seleccionUbicacion: UbicacionModel = new UbicacionModel();
  cols: any;
  loading = true;
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;

  constructor(private readonly requerimientoService: RequerimientoService) {}

  ngOnChanges() {
    if (this.isDisplayBusquedaUbicacion) {
      console.log('idUsuario', this.idUsuario);
      this.datosUbicacion();
    }
  }

  ngOnInit(): void {
    this.cabeceraTabla();
  }

  datosUbicacion() {

    let observ: Observable<UbicacionModel[]>;
    var modeloUbicacion: UbicacionModel = new UbicacionModel();
    if (this.idUsuario === 0) {
      observ = this.requerimientoService.getUbicacionPorCentroCosto(modeloUbicacion)
    } else {
      observ = this.requerimientoService.getUbicacionPorCentroCostoPorUsuario(this.idUsuario)
    }

    observ
      .pipe(
        map((resp) => {
          this.listUbicacion = resp;
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
      { field: 'idUbicacion', header: 'Codigo' },
      { field: 'desUbicacion', header: 'Ubicación' },
    ];
  }
  clickAceptar() {
    this.UbicacionSeleccionado.emit(this.seleccionUbicacion);
  }
  clickCancelar() {
    this.cancel.emit();
  }
  
}
