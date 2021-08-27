import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ISocioNegocio } from '../../../../modulo-administracion/models/socio-negocio.interface';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';
import { SocioNegocioServiceLt } from '../../services/socio-negocio-lt.service';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modal-busqueda-socio-negocio-lt',
  templateUrl: './modal-busqueda-socio-negocio-lt.component.html',
  styleUrls: ['./modal-busqueda-socio-negocio-lt.component.css']
})
export class ModalBusquedaSocioNegocioLtComponent implements OnInit {

  @Input() isDisplayBusqueda = false;
  @Output() eventoRegistroSeleccionado = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

   // Formulario de Busqueda
   formularioBusquedaSocio: FormGroup;

  registros: ISocioNegocio[] = [];
  registroSeleccionado: ISocioNegocio;
  cols: any;
  loading = true;
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  constructor(
    private readonly fb: FormBuilder,
    private readonly servicioSociosNegocio: SocioNegocioServiceLt
  ) {}

  ngOnInit() {

    this.buildForm();
    this.cabeceraTabla();
    this.datosSociosNegocio();

  }

  private buildForm() {
    this.formularioBusquedaSocio = this.fb.group({
      nombre:''
    });
  }

  onToBuscar() {
    
    this.loading = true;
    this.datosSociosNegocio();

  }

  datosSociosNegocio() {
    
    
    const formBody = this.formularioBusquedaSocio.value;
   
    this.servicioSociosNegocio
      .getSociosNegocioByNombre(formBody.nombre)
      .pipe(
        map((resp) => {
          this.registros = resp;
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
      { field: 'cardCode', header: 'Código' },
      { field: 'cardName', header: 'Descripción' },
    ];
  }

  clickAceptar() {
    this.eventoRegistroSeleccionado.emit(this.registroSeleccionado);
  }

  clickCancelar() {
    this.cancel.emit();
  }


}
