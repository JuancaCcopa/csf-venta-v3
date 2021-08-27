import { HttpClient , HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ITabla } from '../interface/tabla.interface';

@Injectable({
  providedIn: 'root'
})
export class PlanillaService {

  constructor(private http: HttpClient
              ) { }


  getPlanilla(buscar :string, key : string, numerolineas : string, orden : string,serie : string,codcentro,idusuario: string, numeroPlanilla : string, fechaInicio: string,fechaFin: string ) {
    let parametros = new HttpParams();
    parametros = parametros.append('buscar', buscar);
    parametros = parametros.append('key', key);
    parametros = parametros.append('numerolineas', numerolineas);
    parametros = parametros.append('orden', orden);
    parametros = parametros.append('serie', serie);
    parametros = parametros.append('codcentro', codcentro);
    parametros = parametros.append('idusuario', idusuario);
    parametros = parametros.append('numeroPlanilla', numeroPlanilla);
    parametros = parametros.append('fechaInicio', fechaInicio);
    parametros = parametros.append('fechaFin', fechaFin);
    
    return this.http.get<any[]>
    (`${environment.url_api_venta}Planilla/GetListaPlanillasPorFiltro/`, { params: parametros });
  }

  getConsultar(fecha1 :string, fecha2 : string, coduser : string, codcentro : string,orden : string ) {
    let parametros = new HttpParams();
    parametros = parametros.append('fecha1', fecha1);
    parametros = parametros.append('fecha2', fecha2);
    parametros = parametros.append('coduser', coduser);
    parametros = parametros.append('codcentro', codcentro);
    parametros = parametros.append('orden', orden);
    return this.http.get<any[]>
    (`${environment.url_api_venta}Planilla/GetListaCuadredeCajaGeneralPorFiltro/`, { params: parametros });
  }

  getCentroCosto() {
    console.log(environment.url_api_requerimiento)
    return this.http.get<any[]>(`${environment.url_api_requerimiento}/CentroCosto/Get/`);
  }

  getUsuarioPorFiltro(nombre :string, estadodf : string) {
    let parametros = new HttpParams();
    parametros = parametros.append('nombre', nombre);
    return this.http.get<any[]>
    (`${environment.url_api_venta}Planilla/GetUsuarioPersonaFiltroNombre/`, { params: parametros });
  }

  setProcesar(value: any) {
     console.log(value);
     const url = environment.url_api_venta + 'Planilla/RegistrarPorUsuario';
     const param: string = JSON.stringify(value);
     return this.http.post(
         url,
         param
     );
   }
  
  getCuadredeCaja(documento: string) {
    debugger
    let parametros = new HttpParams();
    parametros = parametros.append('documento', documento);
    return this.http.get<any[]>
    (`${environment.url_api_venta}Comprobante/GetListaCuadreCaja/`, { params: parametros });

  }

  setTipoPagoRegistrar(value: any) {
    const url = environment.url_api_venta + 'Planilla/CuadreCajaRegistrar';
    const param: string = JSON.stringify(value);
    return this.http.post(url, param);
  }

   // Lista Tablas Logistica
   getListTablaLogisticaPorFiltros(codtabla: string, buscar: string, key: number, numerolineas: number, orden: number) {
    let parametros = new HttpParams();
    parametros = parametros.append('codtabla', codtabla);
    parametros = parametros.append('buscar', buscar);
    parametros = parametros.append('key', key.toString());
    parametros = parametros.append('numerolineas', numerolineas.toString());
    parametros = parametros.append('orden', orden.toString());
    return this.http.get<ITabla[]>
    (`${environment.url_api_venta}Tabla/GetListTablaLogisticaPorFiltros/`, { params: parametros });
  }
  getTablaLogisticaPorFiltros(codtabla: string, buscar: string, key: number, numerolineas: number, orden: number) {
    let parametros = new HttpParams();
    parametros = parametros.append('codtabla', codtabla);
    parametros = parametros.append('buscar', buscar);
    parametros = parametros.append('key', key.toString());
    parametros = parametros.append('numerolineas', numerolineas.toString());
    parametros = parametros.append('orden', orden.toString());
    return this.http.get<ITabla>
    (`${environment.url_api_venta}Tabla/GetTablaLogisticaPorFiltros/`, { params: parametros });
  }

  setCambiarFecha(value: any) {
    console.log(value);
    const url = environment.url_api_venta + 'Planilla/cambiarFecha';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setAnularPlanilla(value: any) {
    const url = environment.url_api_venta + 'Planilla/anular';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }


}
