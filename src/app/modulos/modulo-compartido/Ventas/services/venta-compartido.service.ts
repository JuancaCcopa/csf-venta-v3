import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IWarehouses } from '../interfaces/warehouses.interface';
import { environment } from 'src/environments/environment.prod';
import { IPaciente } from '../interfaces/paciente.interface';
import { ICliente } from '../interfaces/cliente.interface';
import { IPersonalClinica } from '../interfaces/personal-clinica.interface';
import { IMedico } from '../interfaces/medico.interface';
import { IAtencion } from '../interfaces/atencion.interface';
import { IProducto } from '../interfaces/producto.interface';
import { ISeriePorMaquina } from '../interfaces/serie-por-maquina.interface';
import { IPedidoPorAtencion, IDetallePedidoPorPedido, IListarPedido } from '../interfaces/pedido-por-atencion.interface';
import { UtilService } from '../../../../services/util.service';
import { IReceta, IRecetaObservacion, IRecetaObservacionModificar, IRecetaObservacionRegistrar } from '../interfaces/receta.interface';
import { ICentro } from '../interfaces/centro.interface';
import { IStock } from '../interfaces/stock.interface';
import { IVentaDetalle, IVentaDevolucion } from '../../../modulo-venta/interface/venta.interface';
import { IGenerico } from '../interfaces/generico.interface';
import { UserContextService } from '../../../../services/user-context.service';
import { ITabla } from '../../../modulo-venta/interface/tabla.interface';

@Injectable({
  providedIn: 'root'
})
export class VentaCompartidoService {

  constructor(private http: HttpClient,
              private utils: UtilService,
              private userContextService: UserContextService) { }


  getListWarehousesContains(warehouseName: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('warehouseName', warehouseName);
    return this.http.get<IWarehouses[]>
    (`${environment.url_api_venta}Warehouses/GetListWarehousesContains/`, { params: parametros });
  }

  getListGenericoPorProDCI(codprodci: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('codprodci', codprodci);
    return this.http.get<IGenerico[]>
    (`${environment.url_api_venta}Generico/GetListGenericoPorProDCI/`, { params: parametros });
  }

  getListGenericoPorFiltro(name: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('name', name);
    return this.http.get<IGenerico[]>
    (`${environment.url_api_venta}Generico/GetListGenericoPorFiltro/`, { params: parametros });
  }

  getListProductoGenericoPorDCI(codalmacen: string, coddci: string, constock: boolean) {
    let parametros = new HttpParams();
    parametros = parametros.append('codalmacen', codalmacen);
    parametros = parametros.append('coddci', coddci);
    parametros = parametros.append('constock', constock.toString());
    return this.http.get<IStock[]>
    (`${environment.url_api_venta}Stock/GetListProductoGenericoPorDCI/`, { params: parametros });
  }

  getWarehousesPorCodigo(warehouseCode: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('warehouseCode', warehouseCode);
    return this.http.get<IWarehouses>
    (`${environment.url_api_venta}Warehouses/GetWarehousesPorCodigo/`, { params: parametros });
  }

  getListPacientePorFiltros(opcion: string, codpaciente: string, nombres: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', opcion);
    parametros = parametros.append('codpaciente', codpaciente);
    parametros = parametros.append('nombres', nombres);
    return this.http.get<IAtencion[]>
    (`${environment.url_api_venta}Atencion/GetListPacientePorFiltros/`, { params: parametros });
  }

  getPacientePorAtencion(codAtencion: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('codAtencion', codAtencion);
    return this.http.get<IPaciente>
    (`${environment.url_api_venta}Paciente/GetPacientePorAtencion/`, { params: parametros });
  }

  getListClientePorFiltro(opcion: string, ruc: string, nombre: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', opcion);
    parametros = parametros.append('ruc', ruc);
    parametros = parametros.append('nombre', nombre);
    return this.http.get<ICliente[]>
    (`${environment.url_api_venta}Cliente/GetListClientePorFiltro/`, { params: parametros });
  }

  getListPersonalClinicaPorNombre(nombre: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('nombre', nombre);
    return this.http.get<IPersonalClinica[]>
    (`${environment.url_api_venta}PersonalClinica/GetListPersonalClinicaPorNombre/`, { params: parametros });
  }

  
  getListMedicoPorNombre(nombre: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('nombre', nombre);
    return this.http.get<IMedico[]>
    (`${environment.url_api_venta}Medico/GetListMedicoPorNombre/`, { params: parametros });
  }

  getListProductoGenericoPorCodigo(codalmacen: string, codprodci: string, constock: boolean) {
    let parametros = new HttpParams();
    parametros = parametros.append('codalmacen', codalmacen);
    parametros = parametros.append('codprodci', codprodci);
    parametros = parametros.append('constock', constock.toString());
    return this.http.get<IStock[]>
    (`${environment.url_api_venta}Stock/GetListProductoGenericoPorCodigo/`, { params: parametros });
  }

  getProductoPorCodigo(codalmacen: string, codproducto: string, codaseguradora: string, codcia: string, tipomovimiento: string, codtipocliente: string, codcliente: string, codpaciente: string, tipoatencion: number) {
    let parametros = new HttpParams();
    parametros = parametros.append('codalmacen', codalmacen);
    parametros = parametros.append('codproducto', codproducto);
    parametros = parametros.append('codaseguradora', codaseguradora);
    parametros = parametros.append('codcia', codcia);

    parametros = parametros.append('tipomovimiento', tipomovimiento);
    parametros = parametros.append('codtipocliente', codtipocliente);
    parametros = parametros.append('codcliente', codcliente);
    parametros = parametros.append('codpaciente', codpaciente);
    parametros = parametros.append('tipoatencion', tipoatencion.toString());
    return this.http.get<IProducto>
    (`${environment.url_api_venta}Producto/GetProductoPorCodigo/`, { params: parametros });
  }

  getListDetalleProductoPorPedido(codpedido: string, codalmacen: string, codaseguradora: string, codcia: string, tipomovimiento: string, codtipocliente: string, codcliente: string, codpaciente: string, tipoatencion: number) {
    let parametros = new HttpParams();
    parametros = parametros.append('codpedido', codpedido);
    parametros = parametros.append('codalmacen', codalmacen);
    parametros = parametros.append('codaseguradora', codaseguradora);
    parametros = parametros.append('codcia', codcia);
    parametros = parametros.append('tipomovimiento', tipomovimiento);
    parametros = parametros.append('codtipocliente', codtipocliente);
    parametros = parametros.append('codcliente', codcliente);
    parametros = parametros.append('codpaciente', codpaciente);
    parametros = parametros.append('tipoatencion', tipoatencion.toString());
    return this.http.get<IProducto[]>
    (`${environment.url_api_venta}Producto/GetListDetalleProductoPorPedido/`, { params: parametros });
  }

  getListDetalleProductoPorReceta(idereceta: number, codalmacen: string, codaseguradora: string, codcia: string, tipomovimiento: string, codtipocliente: string, codcliente: string, codpaciente: string, tipoatencion: number) {
    let parametros = new HttpParams();
    parametros = parametros.append('idereceta', idereceta.toString());
    parametros = parametros.append('codalmacen', codalmacen);
    parametros = parametros.append('codaseguradora', codaseguradora);
    parametros = parametros.append('codcia', codcia);
    parametros = parametros.append('tipomovimiento', tipomovimiento);
    parametros = parametros.append('codtipocliente', codtipocliente);
    parametros = parametros.append('codcliente', codcliente);
    parametros = parametros.append('codpaciente', codpaciente);
    parametros = parametros.append('tipoatencion', tipoatencion.toString());
    return this.http.get<IProducto[]>
    (`${environment.url_api_venta}Producto/GetListDetalleProductoPorReceta/`, { params: parametros });
  }

  getDatosPedidoPorPedido(codpedido: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('codpedido', codpedido);
    return this.http.get<IListarPedido[]>
    (`${environment.url_api_venta}Pedido/GetDatosPedidoPorPedido/`, { params: parametros });
  }

  getListSeriePorMaquina() {
    return this.http.get<ISeriePorMaquina[]>
    (`${environment.url_api_venta}SeriePorMaquina/GetListSeriePorMaquina`);
  }

  getListSeriePorMaquinaPorNombre(nombremaquina: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('nombremaquina', nombremaquina);
    return this.http.get<ISeriePorMaquina[]>
    (`${environment.url_api_venta}SeriePorMaquina/GetListSeriePorMaquina`, { params: parametros });
  }

  getListPedidosPorAtencion(codatencion: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('codatencion', codatencion);
    parametros = parametros.append('codtercero', '000004');
    return this.http.get<IPedidoPorAtencion[]>
    (`${environment.url_api_venta}Pedido/GetListPedidosPorAtencion/`, { params: parametros });
  }

  getListPedidoDetallePorPedido(codpedido: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('codpedido', codpedido);
    return this.http.get<IDetallePedidoPorPedido[]>
    (`${environment.url_api_venta}Pedido/GetListPedidoDetallePorPedido/`, { params: parametros });
  }

  getListPedidosPorFiltro(codtipopedido: string, fechainicio: Date, fechafin: Date, codpedido: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('fechainicio', this.utils.fecha_AAAAMMDD(fechainicio));
    parametros = parametros.append('fechafin', this.utils.fecha_AAAAMMDD(fechafin));
    parametros = parametros.append('codtipopedido', codtipopedido);
    parametros = parametros.append('codpedido', codpedido);
    return this.http.get<IListarPedido[]>
    (`${environment.url_api_venta}Pedido/GetListPedidosPorFiltro/`, { params: parametros });
  }

  getListRecetasPorFiltro(fechainicio: Date, fechafin: Date, codtipoconsultamedica: string, ide_receta: number, nombrespaciente: string, sbaestadoreceta: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('fechainicio', this.utils.fecha_AAAAMMDD(fechainicio));
    parametros = parametros.append('fechafin', this.utils.fecha_AAAAMMDD(fechafin));
    parametros = parametros.append('codtipoconsultamedica', codtipoconsultamedica);
    parametros = parametros.append('ide_receta', ide_receta.toString());
    parametros = parametros.append('nombrespaciente', nombrespaciente);
    parametros = parametros.append('sbaestadoreceta', sbaestadoreceta);
    return this.http.get<IReceta[]>
    (`${environment.url_api_venta}Receta/GetListRecetasPorFiltro/`, { params: parametros });
  }

  getListRecetasObservacionPorReceta(ide_receta: number) {
    let parametros = new HttpParams();
    parametros = parametros.append('ide_receta', ide_receta.toString());
    return this.http.get<IRecetaObservacion[]>
    (`${environment.url_api_venta}Receta/GetListRecetasObservacionPorReceta/`, { params: parametros });
  }

  getListCentroContains(nombre: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('nombre', nombre);
    return this.http.get<ICentro[]>
    (`${environment.url_api_venta}Centro/GetListCentroContains/`, { params: parametros });
  }

  getCentroPorCodigo(codcentro: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('codcentro', codcentro);
    return this.http.get<ICentro>
    (`${environment.url_api_venta}Centro/GetCentroPorCodigo/`, { params: parametros });
  }

  getListStockPorFiltro(codalmacen: string, nombre: string, codproducto: string, constock: boolean) {
    let parametros = new HttpParams();
    parametros = parametros.append('codalmacen', codalmacen);
    parametros = parametros.append('nombre', nombre);
    parametros = parametros.append('codproducto', codproducto);
    parametros = parametros.append('constock', constock.toString());
    return this.http.get<IStock[]>
    (`${environment.url_api_venta}Stock/GetListStockPorFiltro/`, { params: parametros });
  }

  getListStockPorProductoAlmacen(codalmacen: string, codproducto: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('codalmacen', codalmacen);
    parametros = parametros.append('codproducto', codproducto);
    return this.http.get<IStock[]>
    (`${environment.url_api_venta}Stock/GetListStockPorProductoAlmacen/`, { params: parametros });
  }

  getListStockLotePorFiltro(codalmacen: string, codproducto: string, constock: boolean) {
    let parametros = new HttpParams();
    parametros = parametros.append('codalmacen', codalmacen);
    parametros = parametros.append('codproducto', codproducto);
    parametros = parametros.append('constock', constock.toString());
    return this.http.get<IStock[]>
    (`${environment.url_api_venta}Stock/GetListStockLotePorFiltro/`, { params: parametros });
  }

  getListStockUbicacionPorFiltro(codalmacen: string, codproducto: string, constock: boolean) {
    let parametros = new HttpParams();
    parametros = parametros.append('codalmacen', codalmacen);
    parametros = parametros.append('codproducto', codproducto);
    parametros = parametros.append('constock', constock.toString());
    return this.http.get<IStock[]>
    (`${environment.url_api_venta}Stock/GetListStockUbicacionPorFiltro/`, { params: parametros });
  }

  getProductoyStockAlmacenesPorCodigo(codproducto: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('codproducto', codproducto);
    return this.http.get<IProducto>
    (`${environment.url_api_venta}Producto/GetProductoyStockAlmacenesPorCodigo/`, { params: parametros });
  }

  getVentasChequea1MesAntes(codpaciente: string, cuantosmesesantes: number) {
    let parametros = new HttpParams();
    parametros = parametros.append('codpaciente', codpaciente);
    parametros = parametros.append('cuantosmesesantes', cuantosmesesantes.toString());
    return this.http.get<IVentaDetalle[]>
    (`${environment.url_api_venta}Venta/GetVentasChequea1MesAntes/`, { params: parametros });
  }

  getVentasPorAtencion(codatencion: string) {
    let parametros = new HttpParams();
    parametros = parametros.append('codatencion', codatencion);
    return this.http.get<IVentaDevolucion[]>
    (`${environment.url_api_venta}VentaDevolucion/GetVentasPorAtencion/`, { params: parametros });
  }

  registrarRecetaObservacion(value: IRecetaObservacionRegistrar) {
    value = this.setAsignaValoresAuditabilidad<IRecetaObservacionRegistrar>(value);
    console.log(value);
    const url = environment.url_api_venta + 'Receta/RegistrarRecetaObservacion';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  modificarRecetasObservacion(value: IRecetaObservacionModificar) {
    value = this.setAsignaValoresAuditabilidad<IRecetaObservacionModificar>(value);
    console.log(value);
    const url = environment.url_api_venta + 'Receta/ModificarRecetasObservacion';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  getTerminal() {
    return this.http.get<ITabla[]>
    (`${environment.url_api_venta}Terminal/GetTerminal`);
  }

  private setAsignaValoresAuditabilidad<T>(data: any): T{
    data.regIdUsuario = this.userContextService.getIdUsuario();
    // data.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    return data;
  }
}
