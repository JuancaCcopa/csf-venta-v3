import { IAprobador, IModificarAprobador, IGuardarAprobador, IAnularAprobador } from './../models/aprobador.interface';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interfaceUsuario } from '../models/usuario.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class AdminAprobadorService {
    constructor(private http: HttpClient) {}

    getAprobadorActivo(idAprobador: number) {
        return this.http.get<IAprobador[]>(`${environment.url_api_requerimiento}/Aprobador/GetAprobador?IdAprobador=${idAprobador}&IdAprobadorEstado=0`);
    }

    getAprobador(idAprobador: number) {
      return this.http.get<IAprobador[]>(`${environment.url_api_requerimiento}/Aprobador/GetAprobador?IdAprobador=${idAprobador}&IdAprobadorEstado=0`);
    }

    getUsuario() {
      return this.http.get<interfaceUsuario[]>(`${environment.url_api_requerimiento}/Usuario/get`);
    }

    getUsuarioById(idUsuario: number): Observable<interfaceUsuario> {
      return this.http.get<interfaceUsuario>(`${environment.url_api_requerimiento}/Usuario/GetById/?IdUsuario=${idUsuario}`);
    }

    putAprobador(body: IModificarAprobador) {
      return this.http.put(`${environment.url_api_requerimiento}/Aprobador/Put`, body);
    }

    createAprobador(body: IGuardarAprobador) {
      return this.http.post(`${environment.url_api_requerimiento}/Aprobador/post`, body);
    }

    anularAprobador(body: IAnularAprobador){
      return this.http.put(`${environment.url_api_requerimiento}/Aprobador/Anular/`, body);
    }
    getUsuarioXcentroCosto(param: string){
      return this.http.get<interfaceUsuario[]>(`${environment.url_api_requerimiento}/Usuario/GetParam/?usuario=&codcentrocosto=${param}&descentrocosto=`);
    }
}
