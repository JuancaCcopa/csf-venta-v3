import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ISocioNegocio } from '../../../../modulo-administracion/models/socio-negocio.interface';
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';
import { SocioNegocioService } from '../../../../modulo-administracion/services/socio-negocio.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-modal-busqueda-socio-negocio',
  templateUrl: './modal-busqueda-socio-negocio.component.html',
  styleUrls: ['./modal-busqueda-socio-negocio.component.css']
})
export class ModalBusquedaSocioNegocioComponent implements OnInit {

  @Input() isDisplayBusqueda = false;
  @Output() eventoRegistroSeleccionado = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  registros: ISocioNegocio[] = [];
  registroSeleccionado: ISocioNegocio;
  cols: any;
  loading = true;
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;

  constructor(
    private readonly servicioSociosNegocio: SocioNegocioService
  ) {}

  ngOnInit() {



    this.cabeceraTabla();
    this.datosSociosNegocio();
  }

  datosSociosNegocio() {
  

    this.servicioSociosNegocio
      .getSociosNegocio()
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
