import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StringifyOptions } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class SolicitudTrasladoService {

  constructor(
    private readonly http: HttpClient) { }

    getAlmacen() {
      return this.http.get<any[]>(
        `${environment.url_api_requerimiento}/Almacen/Get`
      );
    }

    getById(id: number) {
      return this.http.get<any[]>(
        `${environment.url_api_requerimiento}/GetById/Get?idSolicitudTraslado=${id}`
      );
    }

    setSolicitudTrasladoRegistrar(value: any) {
      return this.http.post(`${environment.url_api_requerimiento}/SolicitudTraslado/Post`, value );
    }

    getMotivoRequerimiento() {
        return this.http.get<any[]>(
          `${environment.url_api_requerimiento}/MotivoRequerimiento/get/`
        );
      }

    getTipoArticulo() {
      return this.http.get<any[]>(
        `${environment.url_api_requerimiento}/TipoArticulo/Get`
      );
    }

    
    getArticuloStock(tipoArticulo: string,codAlmacen: string, nomart : string) {
      return this.http.get<any[]>(
        `${environment.url_api_requerimiento}/Articulo/GetArticuloStock?tipoArticulo=${tipoArticulo}&codAlmacen=${codAlmacen}&itemName=${nomart}`
      );
    }
    getParam(fechaInicio: any,fechaFin: any, idSolicitudTraslado: number,idMotivoSolicitudTraslado : number,codAlmacenOrigen: string,codAlmacenDestino: string) {
      return this.http.get<any[]>(
        `${environment.url_api_requerimiento}/SolicitudTraslado/GetParam?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&idSolicitudTraslado=${idSolicitudTraslado}&idMotivoSolicitudTraslado=${idMotivoSolicitudTraslado}&codAlmacenOrigen=${codAlmacenOrigen}&codAlmacenDestino=${codAlmacenDestino}&interno=SI`);
    }

    getDetalle(idSolicitudTraslado: number) {
      return this.http.get<any[]>(
        `${environment.url_api_requerimiento}/SolicitudTrasladoItem/GetByIdSolicitudTraslado?idSolicitudTraslado=${idSolicitudTraslado}`);
    }
    
    setSolicitudTrasladoAnular(value: any) {
      return this.http.put(`${environment.url_api_requerimiento}/SolicitudTraslado/Anular`, value );
    }


}
