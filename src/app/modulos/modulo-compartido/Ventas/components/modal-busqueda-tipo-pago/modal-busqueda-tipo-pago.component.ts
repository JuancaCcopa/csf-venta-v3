import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';
import { VentasCajaService } from '../../../../modulo-venta/services/ventas-caja.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-busqueda-tipo-pago',
  templateUrl: './modal-busqueda-tipo-pago.component.html',
  styleUrls: ['./modal-busqueda-tipo-pago.component.css']
})
export class ModalBusquedaTipoPagoComponent implements OnInit {

  @Input() isHabilitaControl = false;
  @Output() eventoAceptar = new EventEmitter<any>();
  @Output() cancel = new EventEmitter();

  // Formulario de Busqueda
  formularioBusquedaSocio: FormGroup;

  registros: any = [];
  registroSeleccionado: any;
  cols: any;
  loading = false;
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  constructor(
    private ventasCajaService: VentasCajaService
  ) { }

  ngOnInit() {

    this.cabeceraTabla();
    this.datosTipoPagos();

  }

  datosTipoPagos() {

    this.loading = true;
    this.ventasCajaService.getListTablaLogisticaPorFiltros("TIPOPAGO", "", 34, 0, -1)
      .subscribe((data: any[]) => {
        this.registros = [];
        this.registros = data;
        this.loading = false;
      },
        (error) => {
          console.log(error);
          this.loading = false;
        });

  }
  cabeceraTabla() {
    this.cols = [
      { field: 'codigo', header: 'Código' },
      { field: 'nombre', header: 'Descripción' },
    ];
  }

  clickAceptar() {
    this.eventoAceptar.emit(this.registroSeleccionado);
    this.cancel.emit();
  }

  clickCancelar() {
    debugger
    this.cancel.emit();
  }

}
