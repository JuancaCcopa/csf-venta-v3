import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ICentroCosto } from '../../../../modulo-administracion/models/aprobadorCentroCosto.interface';
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';
import { AprobadorCentroCostoService } from '../../../../modulo-administracion/services/aprobador-centro-costo.service';
import { map } from 'rxjs/operators';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';

@Component({
  selector: 'app-modal-busqueda-centro-costo',
  templateUrl: './modal-busqueda-centro-costo.component.html',
  styleUrls: ['./modal-busqueda-centro-costo.component.css']
})
export class ModalBusquedaCentroCostoComponent implements OnInit {

  @Input() isDisplayBusquedaCentroCosto;
  @Output() CentroCostoSeleccionado = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  rowCentroCosto: ICentroCosto[] = [];
  seleccionCentroDeCosto: any;
  cols: any;
  loading = true;
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;
  constructor(
    private readonly aprobadorCentroCostoService: AprobadorCentroCostoService
  ) {}

  ngOnInit(): void {
    this.cabeceraTabla();
    this.datosCentroCosto();
  }

  datosCentroCosto() {
    this.aprobadorCentroCostoService
      .getCentroCosto()
      .pipe(
        map((resp) => {
          this.rowCentroCosto = resp;
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
      { field: 'codCentroCosto', header: 'Codigo' },
      { field: 'desCentroCosto', header: 'Centro Costo' },
    ];
  }
  clickAceptar() {
    this.CentroCostoSeleccionado.emit(this.seleccionCentroDeCosto);
  }
  clickCancelar() {
    this.cancel.emit();
  }

}
