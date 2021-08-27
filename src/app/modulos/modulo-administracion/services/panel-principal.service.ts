import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAprobacionNotificacion } from '../models/aprobacionNotificacion.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PanelPrincipalService {
  constructor(private http: HttpClient) {}

  getAprobacionNotificacion(idUser: number, idAprobDoc: number) {
    return this.http.get<IAprobacionNotificacion[]>(
      `${environment.url_api_requerimiento}/AprobacionNotificacion/GetParam?idusuario=${idUser}&idaprobaciondocumento=${idAprobDoc}`
    );
  }
}
