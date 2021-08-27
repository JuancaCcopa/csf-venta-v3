import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { IRequerimiento, IDetalleRequerimieno, IMotivoRequerimiento, IEstadoRequerimiento, IAprobadorFinal, IRequerimientoAnular, IRequerimientoAutorizar, IRequerimientoRevisar, IRequerimientoAprobar } from '../models/requerimiento.interface';
import { IArticulo } from '../models/articulo.interface';
import { IAprobacionRequerimientoIndividual, IRequerimientoAprobador, IAprobarRequerimientoMasivo } from '../models/aprobacionRequerimiento.interface';
import { Observable } from 'rxjs';
import { UserContextService } from '../../../services/user-context.service';
import { UbicacionModel, UbicacionPorUsuarioModel, UbicacionPorTipoProductoModel, UbicacionPorStockModel } from '../models/ubicacion.model';
import { VariablesGlobales } from '../../../interface/variables-globales';

@Injectable({
  providedIn: 'root'
})
export class RequerimientoService {
  // sesion: InterfaceSesion;

  constructor(
    private readonly http: HttpClient,
    private readonly userContextService: UserContextService
  ) {}

  ngOnInit() {
  }

  getBusquedaRequerimientoXUsuario(
    fechaIn,
    fechaFin,
    idUsuario,
    idRequerimientoEstado,
    idTipoRequerimiento
  ) {
    const idPerfil = this.userContextService ? this.userContextService.getPerfil(): 0;
    return this.http.get<IRequerimiento[]>(
      `${environment.url_api_requerimiento}/Requerimiento/GetParam/?fecharequerimientoini=${fechaIn}&fecharequerimientofin=${fechaFin}&idusuario=${idUsuario}&idrequerimientoestado=${idRequerimientoEstado}&idPerfil=${idPerfil}&idTipoRequerimiento=${idTipoRequerimiento}`
    );
  }

  getBusquedaRequerimientoAprobacionXUsuario(    
    fechaIn,
    fechaFin,
    idUsuario,
    idRequerimientoEstado
  ) {
    const idPerfil = this.userContextService ? this.userContextService.getPerfil(): 0;
    return this.http.get<IRequerimiento[]>(
      `${environment.url_api_requerimiento}/Requerimiento/GetAprobacionParam/?fecharequerimientoini=${fechaIn}&fecharequerimientofin=${fechaFin}&idusuario=${idUsuario}&idrequerimientoestado=${idRequerimientoEstado}&idPerfil=${idPerfil}`
    );
  }

  getArticulo(tipoArticulo: number, isInventariable: boolean) {
    return this.http.get<IArticulo[]>(
      `${environment.url_api_requerimiento}/Articulo/GetParam/?tipoArticulo=${tipoArticulo}&isInventariable=${isInventariable}`
    );
  }
  
  saveRequerimiento(body: Partial<IRequerimiento>) {
    return this.http.post(`${environment.url_api_requerimiento}/Requerimiento/Post`, body);
  }

  getDetalleRequerimiento(cod: number, origen: string) {
    return this.http.get<IDetalleRequerimieno[]>(
      `${environment.url_api_requerimiento}/Requerimiento/GetById/?idrequerimiento=${cod}&Origen=${origen}`
    );    
  }
  
  updateRequerimiento(body: Partial<IRequerimiento>) {
    return this.http.put(`${environment.url_api_requerimiento}/Requerimiento/Put`, body);
  }

  aprobacionRequerimiento(body: IAprobacionRequerimientoIndividual) {
    return this.http.put(
      `${environment.url_api_requerimiento}/RequerimientoAprobador/put`,
      body
    );
  }

  getRequerimentoAprobadorList(idRequerimiento: number, origen: string) {
    return this.http.get<IRequerimientoAprobador[]>(
      `${environment.url_api_requerimiento}/RequerimientoAprobador/GetParam?idrequerimiento=${idRequerimiento}&Origen=${origen}`
    );
  }

  getMotivoRequerimiento() {
    return this.http.get<IMotivoRequerimiento[]>(
      `${environment.url_api_requerimiento}/MotivoRequerimiento/get/`
    );
  }

  getEstadoRequerimiento() {
    return this.http.get<IEstadoRequerimiento[]>(
      `${environment.url_api_requerimiento}/RequerimientoEstado/get`
    );
  }

  getAprobadoresFinales(id: number): Observable<IAprobadorFinal[]> {
    return this.http.get<IAprobadorFinal[]>(
      `${environment.url_api_requerimiento}/RequerimientoAprobadorFinal/GetById?idrequerimiento=${id}`
    );
  }

  registrarAprobacionMasivo(body: IAprobarRequerimientoMasivo) {
    return this.http.put(
      `${environment.url_api_requerimiento}/RequerimientoAprobadorMasivo/Put`,
      body
    );
  }

  modificarRequerimientoAprobador(value: string, filesToUpload: any[]) {
    const formData: FormData = new FormData();
    formData.append('value', value);
    filesToUpload.forEach((element) => {
      formData.append('archivo', element);
    });
    return this.http.put(`${environment.url_api_requerimiento}/Requerimiento/Put`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
  
  registrarRequerimientoData(value: string, filesToUpload: any[]) {
    const formData: FormData = new FormData();
    formData.append('value', value);
    filesToUpload.forEach((element) => {
      formData.append('archivo', element);
    });
    console.log(formData);
    return this.http.post(
      `${environment.url_api_requerimiento}/Requerimiento/POST`,
      formData,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }

  anularRequerimiento(body: IRequerimientoAnular) {
    return this.http.put(`${environment.url_api_requerimiento}/Requerimiento/Anular`, body);
  }

  autorizarRequerimiento(body: IRequerimientoAutorizar) {
    if (this.userContextService) {
      body.regUpdateIdUsuario = this.userContextService.getIdUsuario();
    }
    return this.http.put(`${environment.url_api_requerimiento}/Requerimiento/Autorizar`, body);
  }

  revisarRequerimiento(body: IRequerimientoRevisar) {
    return this.http.put(`${environment.url_api_requerimiento}/Requerimiento/Revisar`, body);
  }

  aprobarRequerimiento(body: IRequerimientoAprobar) {
    return this.http.put(`${environment.url_api_requerimiento}/Requerimiento/Aprobar`, body);
  }

  getUbicacionPorCentroCosto(value: UbicacionModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('desUbicacion', value.desUbicacion);

    return this.http.get<UbicacionModel[]>(
      `${environment.url_api_requerimiento}/Ubicacion/Get/` , { params: parametros }
    );
  }

  getUbicacionPorCentroCostoPorUsuario(idUsuario: number) {
    let parametros = new HttpParams();
    parametros = parametros.append('idUsuario', idUsuario.toString());

    return this.http.get<UbicacionModel[]>(
      `${environment.url_api_requerimiento}/Ubicacion/GetPorUsuario/` , { params: parametros }
    );
  }

  setRegistrarUbicacionPorCentroCosto(value: UbicacionModel) {
    value.regIdUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_requerimiento + '/Ubicacion/Post';
    const param: string = JSON.stringify(value);
    return this.http.post(
      url,
      param
    );
  }

  setModificarUbicacionPorCentroCosto(value: UbicacionModel) {
    value.regIdUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_requerimiento + '/Ubicacion/Put';
    const param: string = JSON.stringify(value);
    return this.http.put(
      url,
      param
    );
  }

  setEliminarUbicacionPorCentroCosto(value: UbicacionModel) {
    value.regIdUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_requerimiento + '/Ubicacion/Anular';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  getUbicacionPorUsuario(value: UbicacionPorUsuarioModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('idUbicacion', value.idUbicacion.toString());

    return this.http.get<UbicacionModel[]>(
      `${environment.url_api_requerimiento}/UbicacionPorUsuario/Get/` , { params: parametros }
    );
  }

  setRegistrarUbicacionPorUsuario(value: UbicacionPorUsuarioModel) {
    value.regIdUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_requerimiento + '/UbicacionPorUsuario/Post';
    const param: string = JSON.stringify(value);
    return this.http.post(
      url,
      param
    );
  }

  setModificarUbicacionPorUsuario(value: UbicacionPorUsuarioModel) {
    value.regIdUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_requerimiento + '/UbicacionPorUsuario/Put';
    const param: string = JSON.stringify(value);
    return this.http.put(
      url,
      param
    );
  }

  setEliminarUbicacionPorUsuario(value: UbicacionPorUsuarioModel) {
    value.regIdUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_requerimiento + '/UbicacionPorUsuario/Anular';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  getUbicacionPorTipoProducto(value: UbicacionPorTipoProductoModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('idUbicacion', value.idUbicacion.toString());

    return this.http.get<UbicacionModel[]>(
      `${environment.url_api_requerimiento}/UbicacionPorTipoProducto/Get/` , { params: parametros }
    );
  }

  setRegistrarUbicacionPorTipoProducto(value: UbicacionPorTipoProductoModel) {
    value.regIdUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_requerimiento + '/UbicacionPorTipoProducto/Post';
    const param: string = JSON.stringify(value);
    return this.http.post(
      url,
      param
    );
  }

  setModificarUbicacionPorTipoProducto(value: UbicacionPorTipoProductoModel) {
    value.regIdUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_requerimiento + '/UbicacionPorTipoProducto/Put';
    const param: string = JSON.stringify(value);
    return this.http.put(
      url,
      param
    );
  }

  setEliminarUbicacionPorTipoProducto(value: UbicacionPorTipoProductoModel) {
    value.regIdUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_requerimiento + '/UbicacionPorTipoProducto/Anular';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  getUbicacionPorStock(value: UbicacionPorStockModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('idUbicacion', value.idUbicacion.toString());

    return this.http.get<UbicacionPorStockModel[]>(
      `${environment.url_api_requerimiento}/UbicacionPorStock/Get/` , { params: parametros }
    );
  }

  getUbicacionPorStockPorUsuario(idUbicacion: number, idUsuario: number, tipoArticulo: number) {
    let parametros = new HttpParams();
    parametros = parametros.append('idUbicacion', idUbicacion.toString());
    parametros = parametros.append('idUsuario', idUsuario.toString());
    parametros = parametros.append('tipoArticulo', tipoArticulo.toString());

    return this.http.get<UbicacionModel[]>(
      `${environment.url_api_requerimiento}/UbicacionPorStock/GetPorUsuario/` , { params: parametros }
    );
  }

  setRegistrarUbicacionPorStock(value: UbicacionPorStockModel) {
    value.regIdUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_requerimiento + '/UbicacionPorStock/Post';
    const param: string = JSON.stringify(value);
    return this.http.post(
      url,
      param
    );
  }

  setModificarUbicacionPorStock(value: UbicacionPorStockModel) {
    value.regIdUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_requerimiento + '/UbicacionPorStock/Put';
    const param: string = JSON.stringify(value);
    return this.http.put(
      url,
      param
    );
  }

  setEliminarUbicacionPorStock(value: UbicacionPorStockModel) {
    value.regIdUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_requerimiento + '/UbicacionPorStock/Anular';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  getGetObtieneArchivoById(id: number) {
    return this.http.get
    (`${environment.url_api_requerimiento}/Requerimiento/GetObtieneArchivoById/${id}`, {responseType: 'blob',  observe: 'response', reportProgress: true });
  }

}
