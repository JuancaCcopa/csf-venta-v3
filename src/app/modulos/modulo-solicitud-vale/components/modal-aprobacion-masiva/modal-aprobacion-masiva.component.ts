import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  IValeSalidaAprobador,
  IBodyAprobadorMasivoOutIn,
} from '../../models/valeSalidaAprobacion.interface';
import { ValeSalidaService } from '../../services/vale-salida.service';
import { ConstantesGenerales } from '../../../../constants/Constantes-generales';
import { UserContextService } from '../../../../services/user-context.service';

@Component({
  selector: 'app-modal-aprobacion-masiva',
  templateUrl: './modal-aprobacion-masiva.component.html',
  styleUrls: ['./modal-aprobacion-masiva.component.scss'],
})
export class ModalAprobacionMasivaComponent implements OnInit, OnChanges {
  @Input() idSolicitudVale: number;
  @Input() idArraySolicitudes: any[] = [];
  @Input() isModalAprobacionMasiva = false;
  @Input() isModalDesaprobacionMasiva = false;
  @Input() titulo: string;
  @Output() guardarAprobacionMasiva = new EventEmitter();
  @Output() cerrarModalEvent = new EventEmitter();
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;
  dataListaAprobadorFinal: IValeSalidaAprobador[] = [];
  aprobadorSeleccionado: IValeSalidaAprobador;
  desAprobacion: string;
  constructor(private readonly valeSalidaService: ValeSalidaService,
    private readonly userContextService: UserContextService) {}

  ngOnInit() {
    console.log('INIT DE MODAL-APROBACION-MASIVA');
  }

  ngOnChanges(): void {
    this.getListAprobadores(this.idSolicitudVale);
  }
  cambioComboAprobadorFinal(event) {
    this.aprobadorSeleccionado = event;
  }

  getListAprobadores(id: number) {
    // this.valeSalidaService
    //   .getListaAprobadoresSolicitudVale(id)
    //   .pipe(map((resp) => (this.dataListaAprobadorFinal = resp)))
    //   .subscribe();

    this.valeSalidaService
    .getListaAprobadoresSolicitudVale(id)
    .subscribe(
      resp => {
        this.dataListaAprobadorFinal = resp;
        // PONER EL APROBADOR POR DEFECTO
        const aprobador = this.dataListaAprobadorFinal.find(x => x.idUsuario === this.userContextService.getIdEmpleado());
        if (aprobador) {
          this.aprobadorSeleccionado = aprobador;
        }
      }
    );

  }

  clickGuardarAprobacion() {
    if (this.isModalAprobacionMasiva) {
      const bodyGuardar: IBodyAprobadorMasivoOutIn = {
        tipo: 'aprobar',
        idEstado: 3,
        aprobador: this.aprobadorSeleccionado,
        descripcion: this.desAprobacion,
      };
      this.guardarAprobacionMasiva.emit(bodyGuardar);
      this.isModalAprobacionMasiva = !this.isModalAprobacionMasiva;
    }
    if (this.isModalDesaprobacionMasiva) {
      const bodyGuardar: IBodyAprobadorMasivoOutIn = {
        tipo: 'desaprobar',
        idEstado: 4,
        aprobador: this.aprobadorSeleccionado,
        descripcion: this.desAprobacion,
      };
      this.guardarAprobacionMasiva.emit(bodyGuardar);
      this.isModalDesaprobacionMasiva = !this.isModalDesaprobacionMasiva;
    }
  }

  cerrarModal() {
    this.cerrarModalEvent.emit(false);
  }
}
