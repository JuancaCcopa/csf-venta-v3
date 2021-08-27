import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { ValeSalidaService } from '../../services/vale-salida.service';
import { ConstantesGenerales } from '../../../../constants/Constantes-generales';
import { UserContextService } from '../../../../services/user-context.service';
import {
  IValeSalidaAprobador,
  IBodyAprobadorIndividualOutIn,
} from '../../models/valeSalidaAprobacion.interface';


@Component({
  selector: 'app-modal-aprobacion-individual',
  templateUrl: './modal-aprobacion-individual.component.html',
  styleUrls: ['./modal-aprobacion-individual.component.scss'],
})
export class ModalAprobacionIndividualComponent implements OnInit, OnChanges {
  @Input() idSolicitudVale: number;
  @Input() isModalAprobar = false;
  @Input() isModalDesaprobar = false;
  @Input() titulo: string;

  @Output() guardarAprobacionIndividual = new EventEmitter();

  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;
  desAprobacion: string;
  dataListaAprobadorFinal: IValeSalidaAprobador[] = [];
  aprobadorSeleccionado: IValeSalidaAprobador;

  constructor(private readonly valeSalidaService: ValeSalidaService,
              private readonly userContextService: UserContextService) {}

  ngOnInit() {
    console.log('INIT MODAL-APROBACION-INDIVIDUAL');
  }

  ngOnChanges(): void {
    this.getListAprobadores(this.idSolicitudVale);
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
        this.dataListaAprobadorFinal = resp
        console.log('this.dataListaAprobadorFinal', this.dataListaAprobadorFinal);

        // PONER EL APROBADOR POR DEFECTO
        const aprobador = this.dataListaAprobadorFinal.find(x => x.idUsuario === this.userContextService.getIdEmpleado());
        if (aprobador) {
          this.aprobadorSeleccionado = aprobador;
        }

      }
    );
  }

  cambioComboAprobadorFinal(event) {
    this.aprobadorSeleccionado = event;
  }

  clickGuardarAprobacion() {
    if (this.isModalAprobar) {
      const bodyGuardar: IBodyAprobadorIndividualOutIn = {
        tipo: 'aprobar',
        aprobador: this.aprobadorSeleccionado,
        descripcion: this.desAprobacion,
      };
      this.guardarAprobacionIndividual.emit(bodyGuardar);
    }
    if (this.isModalDesaprobar) {
      const bodyGuardar: IBodyAprobadorIndividualOutIn = {
        tipo: 'desaprobar',
        aprobador: this.aprobadorSeleccionado,
        descripcion: this.desAprobacion,
      };
      this.guardarAprobacionIndividual.emit(bodyGuardar);
    }
  }
}
