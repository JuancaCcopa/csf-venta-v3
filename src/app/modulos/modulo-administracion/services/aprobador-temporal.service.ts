import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InterfaceAprobadorTemporal } from '../models/aprobadorTemporal.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })

  export class AdminAprobadorTemporalService {
    constructor(private http: HttpClient) {}
    getAprobadorTemporal(param: number) {
      return this.http.get<InterfaceAprobadorTemporal[]>(`${environment.url_api_requerimiento}/AprobadorTemporal/get/${param}`);
    }
    saveAprobadorTemporal(body: Partial<InterfaceAprobadorTemporal>){
      return this.http.post(`${environment.url_api_requerimiento}/AprobadorTemporal/Post/`, body);
    }
    updateAprobadorTemporal(body: Partial<InterfaceAprobadorTemporal>){
      return this.http.put(`${environment.url_api_requerimiento}/AprobadorTemporal/Put`, body);
    }
    anularAprobadorTemporal(body: Partial<InterfaceAprobadorTemporal>) {
      return this.http.put(`${environment.url_api_requerimiento}/AprobadorTemporal/Anular`, body);
    }

  }
