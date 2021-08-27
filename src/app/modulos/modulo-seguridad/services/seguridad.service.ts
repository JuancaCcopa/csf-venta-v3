import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PerfilModel } from '../models/pefil.model';
import { PersonaModel } from '../models/persona.model';
import { MenuModel } from '../models/menu.model';
import { OpcionModel } from '../models/opcion.model';
import { OpcionPorPerfilModel } from '../models/opcion-por-perfil';
import { environment } from 'src/environments/environment';
import { UserContextService } from '../../../services/user-context.service';
import { EmpresaPorUsuarioModel } from '../models/empresa-por-usuario';
import { SubTipoExplotacionPorUsuarioModel } from '../models/sub-tipo-explotacion-por-usuario.model';
import { ParametroSistemaModel } from '../models/parametro-sistema.model';
import { ParametroConexionModel } from '../models/parametro-conexion.model';
import { AprobarSubTipoExplotacionPorUsuarioModel } from '../models/aprobar-sub-tipo-explotacion-por-usuario';
import { UsuarioModel } from '../models/usuario.model';
import { VariablesGlobales } from '../../../interface/variables-globales';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor(private http: HttpClient, private userContextService: UserContextService) {
  }

  // title:  Metodos para perfil
  // Author: Luis Tasayco
  // Date:   23/09/2020s
  getPerfil(value: PerfilModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('descripcionPerfil', value.descripcionPerfil);
    return this.http.get<PerfilModel[]>
    (`${environment.url_api_seguridad}Perfil/GetAll/`, { params: parametros });
  }

  setInsertPerfil(value: PerfilModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_seguridad + 'Perfil/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdatePerfil(value: PerfilModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_seguridad + 'Perfil/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setDeletePerfil(value: PerfilModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_seguridad + 'Perfil/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  // title:  Metodos para persona
  // Author: Luis Tasayco
  // Date:   23/09/2020
  getPersona(value: PersonaModel) {
    let parametros = new HttpParams();
    parametros = parametros.append('nombre', value.nombre);
    return this.http.get<PersonaModel[]>
    (`${environment.url_api_seguridad}Persona/GetAll/`, { params: parametros });
  }
  getPersonaPorId(id: number) {
    return this.http.get<PersonaModel>
    (`${environment.url_api_seguridad}Persona/GetbyIdPersona/${id}`);
  }
  setInsertPersona(value: PersonaModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_seguridad + 'Persona/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }
  setUpdatePersona(value: PersonaModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_seguridad + 'Persona/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }
  setDeletePersona(value: PersonaModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_seguridad + 'Persona/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  // title:  Metodos para Menu
  // Author: Luis Tasayco
  // Date:   25/09/2020
  getMenuAll() {
    return this.http.get<MenuModel[]>
    (`${environment.url_api_seguridad}Menu/GetAll/`);
  }
  setInsertMenu(value: MenuModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_seguridad + 'Menu/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }
  setUpdateMenu(value: MenuModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_seguridad + 'Menu/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  // title:  Metodos para Opcion
  // Author: Luis Tasayco
  // Date:   23/09/2020
  getOpcion(idMenu: number) {
    let parametros = new HttpParams();
    parametros = parametros.append('idMenu', idMenu.toString());

    return this.http.get<OpcionModel[]>
    (`${environment.url_api_seguridad}Opcion/GetAll/`, { params: parametros });
  }
  setInsertOpcion(value: OpcionModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_seguridad + 'Opcion/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }
  setUpdateOpcion(value: OpcionModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_seguridad + 'Opcion/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }
  setDeleteOpcion(value: OpcionModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_seguridad + 'Opcion/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  // title:  Metodos para Opcion por Perfil
  // Author: Luis Tasayco
  // Date:   23/09/2020
  getSeleccionadoOpcionPorPerfil(idMenu: number, idPerfil: number) {
    let parametros = new HttpParams();
    parametros = parametros.append('idMenu', idMenu.toString());
    parametros = parametros.append('idPerfil', idPerfil.toString());

    return this.http.get<OpcionPorPerfilModel[]>
    (`${environment.url_api_seguridad}OpcionPorPerfil/GetAllSeleccionado/`, { params: parametros });
  }
  getPorSeleccionarOpcionPorPerfil(idMenu: number, idPerfil: number) {
    let parametros = new HttpParams();
    parametros = parametros.append('idMenu', idMenu.toString());
    parametros = parametros.append('idPerfil', idPerfil.toString());

    return this.http.get<OpcionPorPerfilModel[]>
    (`${environment.url_api_seguridad}OpcionPorPerfil/GetAllPorSeleccionar/`, { params: parametros });
  }
  setInsertOpcionPorPerfil(value: OpcionPorPerfilModel[]) {
    const url = environment.url_api_seguridad + 'OpcionPorPerfil/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }
  setDeleteOpcionPorPerfil(value: OpcionPorPerfilModel[]) {
    const url = environment.url_api_seguridad + 'OpcionPorPerfil/Delete';
    const param: string = JSON.stringify(value);
    return this.http.patch(
        url,
        param
    );
  }

  getEmpresaSinAccesoPorUsuario(idUsuario: number) {
    let parametros = new HttpParams();
    parametros = parametros.append('idUsuario', idUsuario.toString());

    return this.http.get<EmpresaPorUsuarioModel[]>
    (`${environment.url_api_seguridad}EmpresaPorUsuario/GetEmpresaSinAccesoPorUsuario/`, { params: parametros });
  }

  getEmpresaConAccesoPorUsuario() {
    let idUsuario = this.userContextService.getIdUsuario();
    let parametros = new HttpParams();
    parametros = parametros.append('idUsuario', idUsuario.toString());

    return this.http.get<EmpresaPorUsuarioModel[]>
    (`${environment.url_api_seguridad}EmpresaPorUsuario/GetEmpresaConAccesoPorUsuario/`, { params: parametros });
  }

  getSubTipoExplotacionSinAccesoPorUsuario(idUsuario: number) {
    let parametros = new HttpParams();
    parametros = parametros.append('idUsuario', idUsuario.toString());

    return this.http.get<SubTipoExplotacionPorUsuarioModel[]>
    (`${environment.url_api_seguridad}SubTipoExplosionPorUsuario/GetAllSinAcceso/`, { params: parametros });
  }

  getAprobarSubTipoExplotacionSinAccesoPorUsuario(idUsuario: number) {
    let parametros = new HttpParams();
    parametros = parametros.append('idUsuario', idUsuario.toString());

    return this.http.get<AprobarSubTipoExplotacionPorUsuarioModel[]>
    (`${environment.url_api_seguridad}AprobarSubTipoExplotacionPorUsuario/GetAllSinAcceso/`, { params: parametros });
  }

  getParametroSistemaPorId() {
    return this.http.get<ParametroSistemaModel>
    (`${environment.url_api_seguridad}ParametroSistema/GetbyIdParametroSistema/${0}`);
  }

  getParametroConexionPorId() {
    return this.http.get<ParametroConexionModel>
    (`${environment.url_api_seguridad}ParametroConexion/GetbyIdParametroConexion/${0}`);
  }

  setInsertParametroConexion(value: ParametroConexionModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_seguridad + 'ParametroConexion/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateParametroConexion(value: ParametroConexionModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_seguridad + 'ParametroConexion/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setInsertParametroSistema(value: ParametroSistemaModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_seguridad + 'ParametroSistema/Create';
    const param: string = JSON.stringify(value);
    return this.http.post(
        url,
        param
    );
  }

  setUpdateParametroSistema(value: ParametroSistemaModel) {
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_seguridad + 'ParametroSistema/Update';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }

  setUpdatePasswordUsuario(value: UsuarioModel) {
    value.idUsuario = this.userContextService.getIdUsuario();
    value.regUsuario = this.userContextService.getIdUsuario();
    value.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo;
    const url = environment.url_api_seguridad + 'Usuario/UpdatePassword';
    const param: string = JSON.stringify(value);
    return this.http.put(
        url,
        param
    );
  }
}
