import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

  constructor(
    private readonly http: HttpClient) { }

    getAlmacen() {
      return this.http.get<any[]>(
        `${environment.url_api_requerimiento}/Almacen/Get`
      );
    }
    getStockByCodArtCodAlmacen(itemCode:string,whsCode:string) {
      return this.http.get<any[]>(
        `${environment.url_api_requerimiento}/Almacen/GetStockPorCodArt_CodAlmacen?itemCode=${itemCode}&whsCode=${whsCode}`
      );
    }

    getAlmacenByid(id:string) {
      return this.http.get<any>(
        `${environment.url_api_requerimiento}/Almacen/GetById?WarehouseCode=${id}`
      );
    }
 

}
