import { HttpClient, HttpParams ,HttpHeaders,HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
  })
  export class TomaInventarioService {
  
    constructor(
      private readonly http: HttpClient
      ) { }
      
      getAlmacenByName(almacen:String='') {
        return this.http.get<any[]>(
          `${environment.url_api_requerimiento}/Almacen/GetTomaInventarioAlmacenByName?warehouseName=${almacen}`
        );
      }

      getGrupoArticulo() {
        return this.http.get<any[]>(`${environment.url_api_requerimiento}/GrupoArticulo/GetNameGroup`);
      }

      setTomaInventarioRegistrar(value: any) {
        return this.http.post(`${environment.url_api_requerimiento}/TomaInventario/Post`, value );
      }

      setTomaInventarioUpdate(value: any) {
        return this.http.put(`${environment.url_api_requerimiento}/TomaInventario/Put`, value );
      }

      // getTomaInventarioSelectParam(item:any) {
      //   return this.http.get<any[]>(
      //     `${environment.url_api_requerimiento}/Articulo/TomaInventarioSelectParam?tipoArticulo=${item.codGrupo}&inicioCodeItem=${item.codArticuloDesde}&finCodeItem=${item.codArticuloHasta}&whsCode=${item.codAlmacen}`
      //   );
      // }

      getTomaInventarioSelectParam(item:any) {
        return this.http.get<any[]>(
          `${environment.url_api_requerimiento}/TomaInventarioItem/GetSapArticulosSelectParam?tipoArticulo=${item.codGrupo}&inicioCodeItem=${item.codArticuloDesde}&finCodeItem=${item.codArticuloHasta}&whsCode=${item.codAlmacen}&idCategoria=${item.idCategoria}`
        );
      }

      getGetParam(fechaInicio:String,fechaFin:String) {
        return this.http.get<any[]>(
          `${environment.url_api_requerimiento}/TomaInventario/GetParam?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
      }

      getAllById(id:number) {
        return this.http.get<any[]>(
          `${environment.url_api_requerimiento}/TomaInventario/GetAllById?id=${id}`
        );
      }

      getUbicacionByItemWhs(itemCode:String='',whsCode:String='') {
        return this.http.get<any[]>(
          `${environment.url_api_requerimiento}/SapUbicacion/getUbicacionByItemWhs?itemCode=${itemCode}&WhsCode=${whsCode}`
        );
      }

      setInventoryCountings(value: any) {
        return this.http.post(`${environment.url_api_requerimiento}/SapInventoryCountings/Post`, value );
      }

      setTomaInventarioItemDel(value: any) {
        return this.http.delete(`${environment.url_api_requerimiento}/TomaInventarioItem/Delete?id=${value.id}&idusuario=${value.idusuario}`);
      }

      getExcel_() {
        return this.http.get<any[]>(
          `${environment.url_api_requerimiento}/TomaInventarioItem/reporteTomaInventario`
        );
      }

      public downloadFile(item:any) {
        return this.http.request(new HttpRequest(
          'GET',
          `${environment.url_api_requerimiento}/TomaInventarioItem/reporteTomaInventario?tipoArticulo=${item.codGrupo}&inicioCodeItem=${item.codArticuloDesde}&finCodeItem=${item.codArticuloHasta}&whsCode=${item.codAlmacen}&idCategoria=${item.idCategoria}`,
          null,
          {
            //reportProgress: true,
            responseType: 'blob'
          })).toPromise();
      }



}