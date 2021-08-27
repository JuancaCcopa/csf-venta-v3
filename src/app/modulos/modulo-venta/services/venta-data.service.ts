import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITipoAutorizacion } from '../interface/venta.interface';

@Injectable({
  providedIn: 'root'
})
export class VentaDataService {

  constructor(private http: HttpClient) { }

  getTipoAutorizacion() {
    return this.http.get<any>('assets/demo/data/tipo-autorizacion.json')
                .toPromise()
                .then(res => res.data as any[])
                .then(data => data);
  }
}
