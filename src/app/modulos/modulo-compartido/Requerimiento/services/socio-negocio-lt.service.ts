import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { ISocioNegocio } from '../models/socio-negocio.interface';

@Injectable({
  providedIn: 'root'
})
export class SocioNegocioServiceLt {

  constructor(private http: HttpClient) { }

  getSociosNegocioByNombre(nombre:string) {

    return this.http.get<any[]>(
      `${environment.url_api_requerimiento}/SocioNegocio/getByBPCardName?CardName=${nombre}`
    );
        
  }
  
  

}
