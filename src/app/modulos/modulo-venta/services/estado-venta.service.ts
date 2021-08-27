import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadoVentaService {

  public estadoVenta(estado: string): string {
    switch (estado) {
      case 'CANCELADO':
        return 'estado_venta_cancelado';
        break;
      case 'GENERADO':
        return 'estado_venta_generado';
        break;
      case 'ANULADO':
        return 'estado_venta_anulado';
        break;
      default:
        return null;
        break;
    }
  }
}
