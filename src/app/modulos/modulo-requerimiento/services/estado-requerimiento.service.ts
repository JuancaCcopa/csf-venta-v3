import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadoRequerimientoService {
  public estadoSolicitud(estado: string): string {
    switch (estado) {
      case 'ANULADO':
        return 'anulado';
        break;
      case 'APROBADO':
        return 'aprobado';
        break;
      case 'DESAPROBADO':
        return 'desaprobado';
        break;
      case 'PENDIENTE':
        return 'pendiente';
        break;
      case 'PROCESADO SAP':
        return 'procesadoSap';
        break;
      case 'LISTO APROBACIÓN':
          return 'listoAprobar';
          break;
      default:
        return null;
        break;
    }
  }
}
