import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
  })
  export class ConsolidadoRequerimientoService {
  
    constructor(
      private readonly http: HttpClient
      ) { }
      
      getVerPorId(id: any) {
        return this.http.get<any[]>(
          `${environment.url_api_requerimiento}/Consolidado/getVerPorId?idConsolidado=${id}`
        );
      }

      getAllById(id: any) {
        return this.http.get<any[]>(
          `${environment.url_api_requerimiento}/Consolidado/GetAllById?idConsolidado=${id}`
        );
      }
      
      getGetParamPorFiltro(fecInicio: any, fecFin: any) {
        return this.http.get<any[]>(
          `${environment.url_api_requerimiento}/Consolidado/GetParam?fecInicio=${fecInicio}&fecFin=${fecFin}`
        );
      }

      getGetParamFecMotivo(fecInicio,fecFin,idmotivo) {
        return this.http.get<any[]>(
          `${environment.url_api_requerimiento}/Requerimiento/GetParamFecMotivo?fechaini=${fecInicio}&fechafin=${fecFin}&idmotivo=${idmotivo}`
        );
      }

      getMotivoRequerimiento() {
        return this.http.get<any[]>(
          `${environment.url_api_requerimiento}/MotivoRequerimiento/get/`
        );
      }

      setConsolidadoRegistrar(value: any) {
        return this.http.post(`${environment.url_api_requerimiento}/Consolidado/Post`, value );
      }

      consolidadoAnular(value: any) {
        debugger;
        return this.http.put(`${environment.url_api_requerimiento}/Consolidado/Anular`, value );
      }

      setConsolidadoActualizar(value: any) {
        return this.http.put(`${environment.url_api_requerimiento}/Consolidado/Put`, value );
      }

      consolidadoSap(value: any) {
        return this.http.post(`${environment.url_api_requerimiento}/PurchaseOrders/Sap`, value );
      }

      // anularRequerimiento(body: IRequerimientoAnular) {
      //   return this.http.put(`${environment.url_api_requerimiento}/Requerimiento/Anular`, body);
      // }

}