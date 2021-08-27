import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAprobacionCentroCosto, IAprobadorCentroCosto, IResultBusquedaCC, ICentroCosto } from '../models/aprobadorCentroCosto.interface';
import { ITipoDocumento } from '../models/tipoDocumento.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AprobadorCentroCostoService {

  constructor(private http: HttpClient) { }

  getAprobacionCentroCosto() {
    return this.http.get<IAprobacionCentroCosto[]>(`${environment.url_api_requerimiento}/Aprobacion/Get`);
  }

  getAprobadorCentroCosto(idAprobador: number) {
    return this.http.get<IAprobadorCentroCosto[]>(`${environment.url_api_requerimiento}/Aprobador/GetAprobador?IdAprobador=${idAprobador}&IdAprobadorEstado=0`);
  }

  getBuscarCC(param: number) {
    return this.http.get<IResultBusquedaCC[]>(`${environment.url_api_requerimiento}/AprobacionCentroCosto/Get/${param}`);
  }
  getCentroCosto() {
    return this.http.get<ICentroCosto[]>(`${environment.url_api_requerimiento}/CentroCosto/Get/`);
  }
  getTipoDocumentoCC() {
    return this.http.get<ITipoDocumento[]>(`${environment.url_api_requerimiento}/AprobacionDocumento/get`);
  }
  saveCC(body: Partial<IResultBusquedaCC>) {
    return this.http.post(`${environment.url_api_requerimiento}/AprobacionCentroCosto/Post`, body);
  }
  updateCC(body: Partial<IResultBusquedaCC>) {
    return this.http.put(`${environment.url_api_requerimiento}/AprobacionCentroCosto/Put`, body);
  }
  anularCC(body: Partial<IResultBusquedaCC>) {
    return this.http.put(`${environment.url_api_requerimiento}/AprobacionCentroCosto/Anular/`, body);
  }
}
