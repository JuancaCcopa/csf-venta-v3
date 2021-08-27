import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  constructor(private http: HttpClient) { }

  getCarsSmall() {
    return this.http.get<any>('assets/demo/data/cars-small.json')
                .toPromise()
                .then(res => res.data as any[])
                .then(data => data);
  }

  getComprobante() {
    return this.http.get<any>('assets/demo/data/comprobante.json')
                .toPromise()
                .then(res => res.data as any[])
                .then(data => data);
  }
  
  getCarsMedium() {
      return this.http.get<any>('assets/demo/data/cars-medium.json')
                  .toPromise()
                  .then(res => res.data as any[])
                  .then(data => data);
  }
  
  getCarsLarge() {
      return this.http.get<any>('assets/demo/data/cars-large.json')
                  .toPromise()
                  .then(res => res.data as any[])
                  .then(data => data);
  }

  getPago() {
    return this.http.get<any>('assets/demo/data/pago.json')
                .toPromise()
                .then(res => res.data as any[])
                .then(data => data);
}

  getDemoLarge() {
    return this.http.get<any>('assets/demo/data/planes.json')
                .toPromise()
                .then(res => res.data as any[])
                .then(data => data);
  }

  getPlanilla() {
    return this.http.get<any>('assets/demo/data/planilla.json')
                .toPromise()
                .then(res => res.data as any[])
                .then(data => data);
  }

  getAlmacen() {
    return this.http.get<any>('assets/demo/data/almacen.json')
                .toPromise()
                .then(res => res.data as any[])
                .then(data => data);
  }

  getBusquedaProducto() {
    return this.http.get<any>('assets/demo/data/busquedaProducto.json')
                .toPromise()
                .then(res => res.data as any[])
                .then(data => data);
  }

  getLote() {
    return this.http.get<any>('assets/demo/data/lote.json')
                .toPromise()
                .then(res => res.data as any[])
                .then(data => data);
  }

  getSala() {
    return this.http.get<any>('assets/demo/data/sala.json')
                .toPromise()
                .then(res => res.data as any[])
                .then(data => data);
  }

  getAtencion() {
    return this.http.get<any>('assets/demo/data/busquedaAtencion.json')
                .toPromise()
                .then(res => res.data as any[])
                .then(data => data);
  }

  getReceta() {
    return this.http.get<any>('assets/demo/data/receta.json')
                .toPromise()
                .then(res => res.data as any[])
                .then(data => data);
  }

  getPedido() {
    return this.http.get<any>('assets/demo/data/pedido.json')
                .toPromise()
                .then(res => res.data as any[])
                .then(data => data);
  }

  getVentaPorAtencion() {
    return this.http.get<any>('assets/demo/data/ventaPorAtencion.json')
                .toPromise()
                .then(res => res.data as any[])
                .then(data => data);
  }

  getPedidoPorAtencion() {
    return this.http.get<any>('assets/demo/data/pedidoPorAtencion.json')
                .toPromise()
                .then(res => res.data as any[])
                .then(data => data);
  }

  getRecetaObservacion() {
    return this.http.get<any>('assets/demo/data/receta-observacion.json')
                .toPromise()
                .then(res => res.data as any[])
                .then(data => data);
  }

  gettrx() {
    return this.http.get<any>('assets/demo/data/trx.json')
                .toPromise()
                .then(res => res.data as any[])
                .then(data => data);
  }

}
