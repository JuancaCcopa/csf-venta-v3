import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IRequerimientoItem} from '../models/requerimiento-item.interface';

@Injectable({
  providedIn: 'root'
})
export class RequerimientoItemService {

  constructor(
    private readonly http: HttpClient
    ) { }

    getByIdRequerimiento(idrq: number) {
      return this.http.get<IRequerimientoItem[]>(
        `${environment.url_api_requerimiento}/RequerimientoItem/GetByIdRequerimiento?idrq=${idrq}`
      );
    }



}
