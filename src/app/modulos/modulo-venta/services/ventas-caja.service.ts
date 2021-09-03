import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { IResultBusquedaVenta, IVentaCabeceraSingle, IHospitalDatos, IHospitalExclusiones, IHospital, IConvenios, INewVentaCabecera, ITipoCambio, IVentaCabeceraAnular } from '../interface/venta.interface';
import { UserContextService } from '../../../services/user-context.service';
import { VariablesGlobales } from '../../../interface/variables-globales';
import { PlanesModel } from '../models/planes.model';
import { IMedico } from '../../modulo-compartido/Ventas/interfaces/medico.interface';
import { UtilService } from '../../../services/util.service';
import { IResultBusquedaComprobante } from '../interface/comprobante.interface';
import { IResultBusquedaPedido } from '../interface/pedido.interface';
import { IVentaConfiguracion, IVentaConfiguracionRegistrar, IVentaConfiguracionModificar, IVentaConfiguracionEliminar } from '../interface/venta-configuracion.interface';
import { ISeriePorMaquina, ISeriePorMaquinaEliminar, ISerie, ISerieRegistrar, ISeriePorMaquinaRegistrar, ISeriePorMaquinaModificar } from '../interface/serie-por-maquina.interface';
import { ITabla } from '../interface/tabla.interface';
import { IProducto } from '../../modulo-compartido/Ventas/interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class VentasCajaService {

  constructor(private http: HttpClient,
    private userContextService: UserContextService,
    private utils: UtilService) { }

  // Ventas tipo de commprobante

  getTipoComprobante() {
    return this.http.get<IResultBusquedaVenta[]>
      (`${environment.url_api_venta}TipoComprobante/GetListVentasTipoComprobantes/`);
  }
  // getSerieComprobante(codDocument: string) {
  //   let parametros = new HttpParams();
  //   parametros = parametros.append('codDocument', codDocument);
  //   return this.http.get<IResultBusquedaVenta[]>
  //   (`${environment.url_api_venta}TipoComprobante/getSeriePorCodDocumento/`, { params: parametros });
  // }

  getVentaCabeceraPorCodVenta(codventa: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('codventa', codventa);
    return this.http.get<IVentaCabeceraSingle>
      (`${environment.url_api_venta}VentaCaja/GetVentaCabeceraPorCodVenta/`, { params: parametros });
  }

  getVentaDetallePorCodVenta(codventa: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('codventa', codventa);
    return this.http.get<IVentaCabeceraSingle>
      (`${environment.url_api_venta}VentaCaja/GetVentaDetallePorCodVenta/`, { params: parametros });
  }

  getRucConsultav2PorFiltro(codPaciente: string, codAseguradora: string, codCia: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('codPaciente', codPaciente);
    parametros = parametros.append('codAseguradora', codAseguradora);
    parametros = parametros.append('codCia', codCia);
    return this.http.get<IVentaCabeceraSingle>
      (`${environment.url_api_venta}VentaCaja/GetRucConsultav2PorFiltro/`, { params: parametros });
  }

  getGetMdsynPagosConsulta(codVenta: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('ide_pagos_bot', "0");
    parametros = parametros.append('ide_mdsyn_reserva', "0");
    parametros = parametros.append('ide_correl_reserva', "0");
    parametros = parametros.append('cod_liquidacion', "");
    parametros = parametros.append('cod_venta', codVenta);
    parametros = parametros.append('orden', "4");
    return this.http.get<IVentaCabeceraSingle>
      (`${environment.url_api_venta}VentaCaja/GetMdsynPagosConsulta/`, { params: parametros });
  }

  // Tablas Clinica
  getTablasClinicaPorFiltros(codtabla: string, buscar: string, key: number, numerolineas: number, orden: number) {
    let parametros = new HttpParams();
    parametros = parametros.append('codtabla', codtabla);
    parametros = parametros.append('buscar', buscar);
    parametros = parametros.append('key', key.toString());
    parametros = parametros.append('numerolineas', numerolineas.toString());
    parametros = parametros.append('orden', orden.toString());
    return this.http.get<ITabla>
      (`${environment.url_api_venta}Tabla/GetTablasClinicaPorFiltros/`, { params: parametros });
  }

  // Lista Tablas Clinica
  getListTablaClinicaPorFiltros(codtabla: string, buscar: string, key: number, numerolineas: number, orden: number) {
    let parametros = new HttpParams();
    parametros = parametros.append('codtabla', codtabla);
    parametros = parametros.append('buscar', buscar);
    parametros = parametros.append('key', key.toString());
    parametros = parametros.append('numerolineas', numerolineas.toString());
    parametros = parametros.append('orden', orden.toString());
    return this.http.get<ITabla[]>
      (`${environment.url_api_venta}Tabla/GetListTablaClinicaPorFiltros/`, { params: parametros });
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
  // Tabla Logistica
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
  getLimiteConsumoPersonal(codPersonal: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('codPersonal', codPersonal);
    return this.http.get<ITabla[]>
      (`${environment.url_api_venta}VentaCaja/GetLimiteConsumoPersonalPorCodPersonal/`, { params: parametros });
  }
  //GetLimiteConsumoPersonalPorCodPersonal

  getListSeriePorMaquinaPorNombre(nombremaquina: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('nombremaquina', nombremaquina);
    return this.http.get<ISeriePorMaquina[]>
      (`${environment.url_api_venta}SeriePorMaquina/GetListSeriePorMaquina`, { params: parametros });
  }

  getCorrelativoConsulta() {
    return this.http.get<any>
      (`${environment.url_api_venta}VentaCaja/GetCorrelativoConsulta`);
  }

  goGetDatoCardCode(tipoCliente: string, codCliente: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('tipoCliente', tipoCliente);
    parametros = parametros.append('codCliente', codCliente);
    return this.http.get<any>
      (`${environment.url_api_venta}VentaCaja/GetDatoCardCodeConsulta/`, { params: parametros });
  }

  setGenerarPagar(value: any) {
    const url = environment.url_api_venta + 'VentaCaja/GenerarPagar';
    const param: string = JSON.stringify(value);
    return this.http.post(url, param);
  }

  getComprobante(codcomprobantee: string, codsistema: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('codcomprobantee', codcomprobantee);
    parametros = parametros.append('codsistema', codsistema);
    return this.http.get<any>
      (`${environment.url_api_venta}Comprobante/GetComprobantesElectronico/`, { params: parametros });

  }

  getListConfigDocumentoPorNombreMaquina(nombremaquina: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('nombremaquina', nombremaquina);
    return this.http.get<any[]>
      (`${environment.url_api_venta}Serie/GetListConfigDocumentoPorNombreMaquina/`, { params: parametros });
  }

  getGenerarPreVistaPrint(codventa: string,maquina: string,idusuario: string, orden: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('codventa', codventa);
    parametros = parametros.append('maquina', maquina);
    parametros = parametros.append('idusuario', idusuario);
    parametros = parametros.append('orden', orden);

    return this.http.get
    (`${environment.url_api_venta}VentaCaja/GenerarPreVistaPrint/`,
    {params: parametros,responseType: 'blob',  observe: 'response', reportProgress: true });
  }

  getPreVistaValida(codcomprobante: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('codComprobante', codcomprobante);
    return this.http.get
    (`${environment.url_api_venta}VentaCaja/PreVistaValida/`,
    {params: parametros });
  }

  getComprobanteElectrValida(codcomprobante: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('codComprobante', codcomprobante);
    return this.http.get
    (`${environment.url_api_venta}VentaCaja/ComprobanteElectrValida/`,
    {params: parametros });
  }

  getComprobanteElectronicoPrint(codcomprobante: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('codComprobante', codcomprobante);

    return this.http.get
    (`${environment.url_api_venta}VentaCaja/ComprobanteElectronicoPrint/`,
    {params: parametros,responseType: 'blob',  observe: 'response', reportProgress: true });
  }

  getVistaPrevia(codComprobante: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('codComprobante', codComprobante);
    return this.http.get<any[]>
      (`${environment.url_api_venta}VentaCaja/GetVistaPrevia/`, { params: parametros });
  }

  
  // setValidacionRegistraVentaCabecera(value: INewVentaCabecera) {
  //   value = this.setAsignaValoresAuditabilidad<INewVentaCabecera>(value);
  //   console.log(value);
  //   const url = environment.url_api_venta + 'Venta/ValidacionRegistraVentaCabecera';
  //   const param: string = JSON.stringify(value);
  //   return this.http.post(
  //       url,
  //       param
  //   );
  // }

}
