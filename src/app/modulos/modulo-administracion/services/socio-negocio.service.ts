import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISocioNegocio } from '../models/socio-negocio.interface';

@Injectable({
  providedIn: 'root'
})
export class SocioNegocioService {

  constructor(private http: HttpClient) { }

  getSociosNegocio(): Observable<ISocioNegocio[]> {
    return this.http.get<ISocioNegocio[]>(`${environment.url_api_requerimiento}/SocioNegocio/GetParam`);
    
  }
  
  

}
