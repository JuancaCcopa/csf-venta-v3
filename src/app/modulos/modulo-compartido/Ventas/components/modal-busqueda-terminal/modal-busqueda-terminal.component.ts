import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ISocioNegocio } from '../../../../modulo-administracion/models/socio-negocio.interface';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';
import { VentaCompartidoService } from '../../services/venta-compartido.service';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modal-busqueda-terminal',
  templateUrl: './modal-busqueda-terminal.component.html',
  styleUrls: ['./modal-busqueda-terminal.component.css']
})
export class ModalBusquedaTerminalComponent implements OnInit {

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
    private ventaCompartidoService: VentaCompartidoService
  ) {}

  ngOnInit() {
    this.cabeceraTabla();
    this.datos();
  }

  datos() {

    this.loading = true;
    this.ventaCompartidoService.getTerminal()
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
      { field: 'codterminal', header: 'Código' },
      { field: 'numeroterminal', header: 'Descripción' },
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
