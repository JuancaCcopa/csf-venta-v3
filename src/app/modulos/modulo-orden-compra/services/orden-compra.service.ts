import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserContextService } from '../../../services/user-context.service';
import { environment } from 'src/environments/environment';
import { IOrdenCompraAnular, IOrdenCompraCabecera, IOrdenCompraLista, ITipoOrdenCompra, ITipoPago, IMoneda } from '../models/orden-compra';

@Injectable({
  providedIn: 'root'
})
export class OrdenCompraService {

  constructor(
    private readonly http: HttpClient,
    private readonly userContextService: UserContextService) { }

  getOrdenCompraPorFiltro(fecInicio: any, fecFin: any, idOrdenCompra: number, codSocioNegocio: string) {
    return this.http.get<IOrdenCompraLista[]>(
      `${environment.url_api_requerimiento}/OrdenCompra/GetParam?fecInicio=${fecInicio}&fecFin=${fecFin}&idOrdenCompra=${idOrdenCompra}&codSocioNegocio=${codSocioNegocio}`
    );
  }

  getOrdenCompraPorId(idOrdenCompra: number) {
    return this.http.get<IOrdenCompraCabecera[]>(
      `${environment.url_api_requerimiento}/OrdenCompra/GetById?idOrdenCompra=${idOrdenCompra}`
    );
  }

  setOrdenCompraRegistrar(value: string, filesToUpload: any[]) {
    const formData: FormData = new FormData();
    formData.append('value', value);
    filesToUpload.forEach((element) => {
      formData.append('archivo', element);
    });
    console.log(formData);
    return this.http.post(
      `${environment.url_api_requerimiento}/OrdenCompra/Post`,
      formData,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }

  setOrdenCompraModificar(value: string, filesToUpload: any[]) {
    const formData: FormData = new FormData();
    formData.append('value', value);
    filesToUpload.forEach((element) => {
      formData.append('archivo', element);
    });
    return this.http.put(`${environment.url_api_requerimiento}/OrdenCompra/Put`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  setOrdenCompraAnular(body: IOrdenCompraAnular) {
    return this.http.put(`${environment.url_api_requerimiento}/OrdenCompra/Anular`, body);
  }

  getTipoPago() {
    return this.http.get<ITipoPago[]>(
      `${environment.url_api_requerimiento}/TipoPago/Get`
    );
  }
  getTipoOrdenCompra() {
    return this.http.get<ITipoOrdenCompra[]>(
      `${environment.url_api_requerimiento}/Tipo/Get`
    );
  }
  getMoneda() {
    return this.http.get<IMoneda[]>(
      `${environment.url_api_requerimiento}/Moneda/Get`
    );
  }

}
