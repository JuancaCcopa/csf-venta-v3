import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ISocioNegocio } from '../../../../modulo-administracion/models/socio-negocio.interface';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';
import { VentaCompartidoService } from '../../../Ventas/services/venta-compartido.service';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VentasService } from '../../../../modulo-venta/services/ventas.service';
import swal from'sweetalert2';
@Component({
  selector: 'app-modal-busqueda-entidad',
  templateUrl: './modal-busqueda-entidad.component.html',
  styleUrls: ['./modal-busqueda-entidad.component.css']
})
export class ModalBusquedaEntidadComponent implements OnInit {

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
    private ventasService: VentasService
  ) {}

  ngOnInit() {

    this.cabeceraTabla();
    this.datosEntidad();
  }

  datosEntidad() {
    this.loading = true;
    this.ventasService.getListTablaLogisticaPorFiltros("BANCOS","",0,100,-1)
    .subscribe((data: any[]) => {
      
      this.registros = [];
      this.registros = data;
      this.loading = false;
    },
    (error) => {
      console.log(error);
      this.loading = false;
      //swal.fire(this.globalConstants.msgErrorSummary, "error",'error')

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
