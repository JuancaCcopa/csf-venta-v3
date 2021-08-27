import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';
import { FormGroup } from '@angular/forms';
import { VentasService } from '../../../../modulo-venta/services/ventas.service';

@Component({
  selector: 'app-modal-busqueda-tarjeta-credito',
  templateUrl: './modal-busqueda-tarjeta-credito.component.html',
  styleUrls: ['./modal-busqueda-tarjeta-credito.component.css']
})
export class ModalBusquedaTarjetaCreditoComponent implements OnInit {

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
    private ventaService: VentasService
  ) {}

  ngOnInit() {
    debugger
    this.cabeceraTabla();
    this.datosTarjetaCredito();

  }

  datosTarjetaCredito() {
    this.loading = true;
    this.ventaService.getListTablaLogisticaPorFiltros("CREDITCARDS","",0,100,-1)
    .subscribe((data: any[]) => {

      this.registros = [];
      this.registros = data;
      this.loading = false;
    },
    (error) => {
      console.log("datosTarjetaCredito");
      console.log(error);
      this.loading = false;
    });
    
  }
  cabeceraTabla() {
    this.cols = [
      { field: 'codigo', header: 'Código' },
      { field: 'nombre', header: 'Descripción' }
    ];
  }

  clickAceptar() {
    this.eventoAceptar.emit(this.registroSeleccionado);
    this.cancel.emit();
  }

  clickCancelar() {
    this.cancel.emit();
  }


}
