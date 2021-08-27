import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserContextService } from '../../../services/user-context.service';
import { environment } from 'src/environments/environment';
import { IValeSalidaLista } from '../models/vale-salida';


@Injectable({
  providedIn: 'root'
})
export class ValeSalidaService {

  constructor(
    private readonly http: HttpClient,
    private readonly userContextService: UserContextService) { }

    getValeSalidaPorFiltro(fecInicio: any, fecFin: any) {
      return this.http.get<IValeSalidaLista[]>(
        `${environment.url_api_requerimiento}/ValeSalida/GetParam?fechaini=${fecInicio}&fechafin=${fecFin}`
      );
    }

    getValeSalidaPorId(idValeSalida:number) {
      return this.http.get<IValeSalidaLista>(
        `${environment.url_api_requerimiento}/ValeSalida/GetById?idValeSalida=${idValeSalida}`
      );
    }

    getValeSalidaAllPorId(idValeSalida:number) {
      return this.http.get<IValeSalidaLista>(
        `${environment.url_api_requerimiento}/ValeSalida/GetAllById?idValeSalida=${idValeSalida}`
      );
    }

  setValeSalidaRegistrar(value: any) {

    return this.http.post(`${environment.url_api_requerimiento}/valesalida/Post`, value    
    );
    
  }

  //setOrdenCompraAnular
  setValeSalidaAnular(body: any) {
    return this.http.put(`${environment.url_api_requerimiento}/valesalida/Put`, body);
  }

 

}
