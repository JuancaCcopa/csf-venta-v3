import { VerDetalleSolicitudValeComponent } from './../ver-detalle-solicitud-vale/ver-detalle-solicitud-vale.component';
import { AprobacionSolicitudService } from './../../services/aprobacion-solicitud.service';
import { ConstantesGenerales } from '../../../../constants/Constantes-generales';
import { UtilService } from '../../../../services/util.service';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { IMensajeResultadoApi } from '../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';
import {
  IValeSalidaAprobador,
  IAprobacionIndividualSolicitudVale,
  IBodyAprobadorIndividualOutIn,
} from './../../models/valeSalidaAprobacion.interface';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-aprobacion-solicitud-vale',
  templateUrl: './aprobacion-solicitud-vale.component.html',
  styleUrls: ['./aprobacion-solicitud-vale.component.scss'],
})
export class AprobacionSolicitudValeComponent implements OnInit {
  @Input() idSolicitudVale: number;
  @Input() isDisplayAprobacion = false;
  @Output() actualizarTabla = new EventEmitter();
  @Output() cerrar = new EventEmitter();
  @ViewChild(VerDetalleSolicitudValeComponent)
  verDetalleSolicitud: VerDetalleSolicitudValeComponent;
  titulo: string;
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;
  isModalAprobar = false;
  isModalDesaprobar = false;

  constructor(
    private readonly aprobacionSolicitudService: AprobacionSolicitudService,
    private readonly utils: UtilService,
    public mensajePrimeNgService: MensajePrimeNgService
  ) {}

  ngOnInit() {
    console.log('INIT APROBACION-SOLICITUD-VALE');
  }

  clickModalAprobarSolicitudIndividual() {
    this.isModalAprobar = !this.isModalAprobar;
    this.titulo = `Aprobar el requerimiento con el ID ${this.idSolicitudVale}`;
  }

  clickModalDesaprobarSolicitudIndividual() {
    this.titulo = `Desaprobar el requerimiento con el ID ${this.idSolicitudVale}`;
    this.isModalDesaprobar = !this.isModalDesaprobar;
  }

  guardarAprobacion(body: IBodyAprobadorIndividualOutIn) {
    switch (body.tipo) {
      case 'aprobar':
        this.guardarAprobacionFinal(this.armarBodyAprobacion(3, body));
        this.isModalAprobar = !this.isModalAprobar;

        break;
      case 'desaprobar':
        this.guardarAprobacionFinal(this.armarBodyAprobacion(4, body));
        this.isModalDesaprobar = !this.isModalDesaprobar;
        break;

      default:
        break;
    }
  }

  armarBodyAprobacion(
    tipo: number,
    body: IBodyAprobadorIndividualOutIn
  ): IAprobacionIndividualSolicitudVale {
    const bodyAprobar: IAprobacionIndividualSolicitudVale = {
      idSolicitudValeAprobador: 0,
      idSolicitudVale: this.idSolicitudVale,
      idAprobador: body.aprobador.idAprobador,
      fecAprobacion: this.utils.fechaApi_POST(new Date()),
      obsAprobacion: body.descripcion,
      idSolicitudValeEstado: tipo,
      regUpdateIdUsuario: 1,
    };
    return bodyAprobar;
  }

  guardarAprobacionFinal(body: IAprobacionIndividualSolicitudVale) {
    this.aprobacionSolicitudService.aprobarSolicitudVale(body).subscribe(
      (resp: IMensajeResultadoApi) => {
        this.verDetalleSolicitud.getDetalleValeSalida(this.idSolicitudVale);
        this.mensajePrimeNgService.onToExitoMsg(
          undefined,
          resp
        );
        this.actualizarTabla.emit();
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(undefined, error.error);
      }
    );
  }

  cerrarDialog() {
    this.cerrar.emit(false);
  }
}
