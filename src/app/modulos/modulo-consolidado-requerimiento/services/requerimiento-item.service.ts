import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequerimientoItemService {

  constructor(
    private readonly http: HttpClient
    ) { }

    getByIdRequerimiento(idrq: number,whsCode: string) {
      return this.http.get<any[]>(
        `${environment.url_api_requerimiento}/RequerimientoItem/GetByIdRequerimientoCodAlmacen?idrq=${idrq}&whsCode=${whsCode}`
      );
    }

}
