import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  IAprobacionIndividualSolicitudVale,
  IAprobacionMasivaSolicitudVale,
} from '../models/valeSalidaAprobacion.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AprobacionSolicitudService {
  constructor(private readonly http: HttpClient) {}
  aprobarSolicitudVale(body: IAprobacionIndividualSolicitudVale) {
    return this.http.put(
      `${environment.url_api_requerimiento}/SolicitudValeAprobador/Put/`,
      body
    );
  }
  aprobacionMasivaSolicitud(body: IAprobacionMasivaSolicitudVale) {
    return this.http.put(
      `${environment.url_api_requerimiento}/SolicitudValeAprobadorMasivo/Put`,
      body
    );
  }
}
