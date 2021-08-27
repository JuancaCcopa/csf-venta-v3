import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlmacenLtService {

  constructor(
    private readonly http: HttpClient) { }

    getAlmacenByName(almacen:String='') {
      return this.http.get<any[]>(
        `${environment.url_api_requerimiento}/Almacen/GetByName?warehouseName=${almacen}`
      );
    }
   
}
