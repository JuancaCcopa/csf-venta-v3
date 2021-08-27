import {
  IValeSalida,
  IEstadoValeSalida,
  IDetalleSolicitudValeSalida,
  IAnularSolicitudVale,
} from './../models/valeSalida.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IValeSalidaAprobador } from '../models/valeSalidaAprobacion.interface';

@Injectable({
  providedIn: 'root',
})
export class ValeSalidaService {
  constructor(private readonly http: HttpClient) {}

  getBusqueda(fechaIni, fechaFin, idUsuario, idSolicitudEstado) {
    return this.http.get<IValeSalida[]>(
      `${environment.url_api_requerimiento}/SolicitudVale/GetParam?fechasolicitudvaleini=${fechaIni}&fechasolicitudvalefin=${fechaFin}&idusuario=${idUsuario}&idsolicitudvaleestado=${idSolicitudEstado}`
    );
  }
  getEstadoValeSalida() {
    return this.http.get<IEstadoValeSalida[]>(
      `${environment.url_api_requerimiento}/SolicitudValeEstado/Get/`
    );
  }
  getDetalleValeSalida(id: number) {
    return this.http.get<IDetalleSolicitudValeSalida>(
      `${environment.url_api_requerimiento}/SolicitudVale/GetById?idsolicitudvale=${id}`
    );
  }
  registrarSolicitudValeSalida(value: string, filesToUpload: any[]) {
    const formData: FormData = new FormData();
    formData.append('value', value);
    filesToUpload.forEach((element) => {
      formData.append('archivo', element);
    });
    return this.http.post(
      `${environment.url_api_requerimiento}/SolicitudVale/Post`,
      formData,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }
  anularSolicitudVale(body: IAnularSolicitudVale) {
    return this.http.put(`${environment.url_api_requerimiento}/SolicitudVale/Anular`, body);
  }
  modificarSolicitudValeSalida(value: string, filesToUpload: any[]) {
    const formData: FormData = new FormData();
    formData.append('value', value);
    filesToUpload.forEach((element) => {
      formData.append('archivo', element);
    });
    return this.http.put(`${environment.url_api_requerimiento}/SolicitudVale/Put`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  getListaAprobadoresSolicitudVale(id: number) {
    return this.http.get<IValeSalidaAprobador[]>(
      `${environment.url_api_requerimiento}/SolicitudValeAprobadorFinal/GetById?idsolicitudvale=${id}`
    );
  }
}