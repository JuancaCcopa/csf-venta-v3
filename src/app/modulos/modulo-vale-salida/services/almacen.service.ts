import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IAlmacen } from '../models/almacen';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

  constructor(
    private readonly http: HttpClient) { }

    getAlmacen() {
      return this.http.get<IAlmacen[]>(
        `${environment.url_api_requerimiento}/Almacen/Get`
        //`${environment.url_api_requerimiento}/Almacen/Get?fechaini=${fecInicio}&fechafin=${fecFin}`
      );
    }
 

}
