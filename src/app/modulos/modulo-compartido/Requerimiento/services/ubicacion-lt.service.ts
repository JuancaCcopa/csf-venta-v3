import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UbicacionLtService {

  constructor(
    private readonly http: HttpClient) { }

    getUbicacionByItemWhs(itemCode:String='',whsCode:String='') {
      return this.http.get<any[]>(
        `${environment.url_api_requerimiento}/SapUbicacion/getUbicacionByItemWhs?itemCode=${itemCode}&WhsCode=${whsCode}`
      );
    }
   
}
