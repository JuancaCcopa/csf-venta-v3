import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EstadoSolicitudService {
  // constructor() { }

  public estadoSolicitud(estado: string): string {
    switch (estado.trim()) {
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
}
