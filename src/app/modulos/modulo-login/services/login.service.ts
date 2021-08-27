import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { environment } from '../../../../environments/environment.prod';
import { IAutenticarRequest } from '../../modulo-compartido/Ventas/interfaces/autenticar.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  autentica(login: LoginModel) {
    const url = environment.url_api_seguridad + 'Autenticar/Autenticar';
    const param: string = JSON.stringify(login);
    return this.http.post(
        url,
        param
    );
  }

  obtienePermisosPorUsuario(login: LoginModel) {
    const url = environment.url_api_seguridad + 'Autenticar/ObtienePermisosPorUsuario';
    const param: string = JSON.stringify(login);
    return this.http.post(
        url,
        param
    );
  }

  RecuperarPassword(login: LoginModel) {
    const url = environment.url_api_seguridad + 'Autenticar/RecuperarPassword';
    const param: string = JSON.stringify(login);
    return this.http.put(
        url,
        param
    );
  }

  autenticaUsuario(login: IAutenticarRequest) {
    const url = environment.url_api_seguridad + 'Autenticar/AutenticarCredenciales';
    const param: string = JSON.stringify(login);
    return this.http.post(
        url,
        param
    );
  }
}
