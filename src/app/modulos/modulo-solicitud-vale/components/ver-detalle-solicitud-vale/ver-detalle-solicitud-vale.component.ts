import {
  ILineasSolicitudValeAnexo,
  IlineasSolicitudValeAprobador,
} from './../../models/valeSalida.interface';
import { ValeSalidaService } from './../../services/vale-salida.service';
import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { IDetalleSolicitudValeSalida } from '../../models/valeSalida.interface';

@Component({
  selector: 'app-ver-detalle-solicitud-vale',
  templateUrl: './ver-detalle-solicitud-vale.component.html',
  styleUrls: ['./ver-detalle-solicitud-vale.component.scss'],
})
export class VerDetalleSolicitudValeComponent implements OnInit {
  @Input() idSolicitudVale;
  detalleDelItemSeleccionado: IDetalleSolicitudValeSalida;
  cols: any[];
  constructor(private readonly valeSalidaService: ValeSalidaService) {}
  rowLineaSolicitudValeAnexo: ILineasSolicitudValeAnexo[] = [];
  cabeceraTablaListAprobacion: any = [];
  rowLineaSolicitudValeAprobadores: IlineasSolicitudValeAprobador[] = [];
  ngOnInit(): void {
    this.cabeceraTabla();
    this.dataCabeceraListaAprobacionDetalle();
    // if (this.idSolicitudVale) {
    this.getDetalleValeSalida(this.idSolicitudVale);
    // }
  }
  getDetalleValeSalida(id: number) {
    this.valeSalidaService
      .getDetalleValeSalida(id)
      .pipe(
        map((resp) => {
          this.detalleDelItemSeleccionado = resp[0];
          this.rowLineaSolicitudValeAnexo = resp[0].lineasSolicitudValeAnexo;
          this.rowLineaSolicitudValeAprobadores =
            resp[0].lineasSolicitudValeAprobador;
          console.log(this.rowLineaSolicitudValeAprobadores);
        })
      )
      .subscribe();
  }

  cabeceraTabla() {
    this.cols = [
      { field: 'idSolicitudValeItem', header: 'id Solicitud Vale Item' },
      // { field: 'idSolicitudVale', header: 'id Solicitud Vale' },
      // { field: 'numLinea', header: 'num Linea' },
      { field: 'codArticulo', header: 'cod Articulo' },
      { field: 'desArticulo', header: 'des Articulo' },
      { field: 'codUnidadMedida', header: 'cod Unidad Medida' },
      { field: 'cantidad', header: 'cantidad' },
      { field: 'cantidadRecibida', header: 'cantidad Recibida' },
      { field: 'codCentroCosto', header: 'cod Centro Costo' },
      { field: 'comentario', header: 'comentario' },
      // { field: 'isSolicitudValeItem', header: 'is Solicitud Vale Item' },
      // { field: 'idEditForm', header: 'id Edit Form' },
    ];
  }

  dataCabeceraListaAprobacionDetalle() {
    this.cabeceraTablaListAprobacion = [
      // { field: 'fecAprobacion', header: 'fec Aprobacion' },
      // { field: 'idAprobador', header: 'Id Aprobador' },
      {
        field: 'desAprobador',
        header: 'Aprobador',
      },
      { field: 'idSolicitudVale', header: 'Id Solicitud Vale' },
      // {
      //   field: 'idSolicitudValeEstado',
      //   header: 'Id Solicitud Vale Estado',
      // },
      { field: 'desSolicitudValeEstado', header: 'Estado ' },
      // { field: 'idRequerimientoEstado', header: 'idRequerimientoEstado' },
      { field: 'obsAprobacion', header: 'Observación' },
      // { field: 'regCreateIdUsuario', header: 'regCreateIdUsuario' },
      // { field: 'regUpdateIdUsuario', header: 'regUpdateIdUsuario' },
    ];
  }
  estadoSolicitud(estado: string): string {
    switch (estado) {
      case 'PENDIENTE':
        return 'labelEstado_solicitud__pendiente';
        break;
      case 'EN PROCESO':
        return 'labelEstado_solicitud__enProceso';
        break;
      case 'APROBADO':
        return 'labelEstado_solicitud__aprobado';
        break;
      case 'DESAPROBADO':
        return 'labelEstado_solicitud__desaprobado';
        break;
      case 'POR RECOGER':
        return 'labelEstado_solicitud__porRecoger';
        break;
      case 'ENTREGA PARCIAL':
        return 'labelEstado_solicitud__entregaParcial';
        break;
      case 'ENTREGA TOTAL':
        return 'labelEstado_solicitud__entregaTotal';
        break;
      case 'ANULADO':
        return 'labelEstado_solicitud__anulado';
        break;

      default:
        return null;
        break;
    }
  }
  claseEstado(item: string): string {
    switch (item) {
      case 'APROBADO':
        return 'aprobado';
        break;
      case 'DESAPROBADO':
        return 'desaprobado';
        break;
      case 'PENDIENTE':
        return 'pendiente';
        break;
      case 'ANULADO':
        return 'anulado';
        break;
      case 'PROCESADO SAP':
        return 'procesadoSap';
        break;

      default:
        return null;
        break;
    }
  }
}
