import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { VerDetalleRequerimientoComponent } from '../../panel-requerimiento/ver-detalle-requerimiento/ver-detalle-requerimiento.component';
import { IRequerimiento } from '../../../models/requerimiento.interface';
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';
import { UtilService } from '../../../../../services/util.service';
import { RequerimientoService } from '../../../services/requerimiento.service';
import { MensajePrimeNgService } from '../../../../../services/mensaje-prime-ng.service';
import { IBodyAprobadorReqIndividualOutIn, IAprobacionRequerimientoIndividual } from '../../../models/aprobacionRequerimiento.interface';
import { IMensajeResultadoApi } from '../../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';

@Component({
  selector: 'app-aprobacion-requerimiento-individual',
  templateUrl: './aprobacion-requerimiento-individual.component.html',
  styleUrls: ['./aprobacion-requerimiento-individual.component.css']
})
export class AprobacionRequerimientoIndividualComponent implements OnInit {
  // @Input() idRequerimiento: number;
  @Input() requerimiento: IRequerimiento;
  @Input() isDisplayAprobacion = false;
  @Output() cerrar = new EventEmitter();
  @Output() actualizarTabla = new EventEmitter();
  @ViewChild(VerDetalleRequerimientoComponent)
  
  VerDetalleRequerimiento: VerDetalleRequerimientoComponent;
  tituloVista: string;
  tituloAccion: string;
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;
  isModalAprobar = false;
  isModalDesaprobar = false;
  
  constructor(
    private readonly utils: UtilService,
    public mensajePrimeNgService: MensajePrimeNgService,
    private readonly requerimientoService: RequerimientoService
  ) {}

  ngOnInit() {
    this.tituloVista = `Requerimiento ${this.requerimiento.idRequerimiento}`;
  }

  clickModalAprobarSolicitudIndividual() {
    this.tituloAccion = `Aprobar el requerimiento: ${this.requerimiento.idRequerimiento}`;
    this.isModalAprobar = !this.isModalAprobar;
  }

  clickModalDesaprobarSolicitudIndividual() {
    this.tituloAccion = `Desaprobar el requerimiento: ${this.requerimiento.idRequerimiento}`;
    this.isModalDesaprobar = !this.isModalDesaprobar;
  }

  guardarAprobacion(body: IBodyAprobadorReqIndividualOutIn) {
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
    body: IBodyAprobadorReqIndividualOutIn
  ): IAprobacionRequerimientoIndividual {
    const bodyAprobar: IAprobacionRequerimientoIndividual = {
      idRequerimientoAprobador: 0,
      idRequerimiento: this.requerimiento.idRequerimiento,
      origen: this.requerimiento.origen,
      idAprobador: body.aprobador.idAprobador,
      fecAprobacion: this.utils.fechaApi_POST(new Date()),      
      obsAprobacion: body.descripcion,
      idRequerimientoEstado: tipo,
      regUpdateIdUsuario: 1,
    };
    return bodyAprobar;
  }

  guardarAprobacionFinal(body: IAprobacionRequerimientoIndividual) {
    this.requerimientoService.aprobacionRequerimiento(body).subscribe(
      (resp: IMensajeResultadoApi) => {
        this.VerDetalleRequerimiento.getVerDetalle(this.requerimiento.idRequerimiento, this.requerimiento.origen);
        console.log('llego');
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

  cerrarModalAprobacion() {
    this.isModalAprobar = false;
    this.isModalDesaprobar = false;
  }

}
