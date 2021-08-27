// export interface IValeSalidaCabecera {
//     idValeSalida: number;
//     fecVale: string;
//     fecVenVale: string;
//     idUsuario: number;
//     codAlmacen: string;
//     codCentroCosto: string;
//     codConformidadSAP: string;
//     obsConformidaSap: string;
//     estadoValeSalida: string;
//     regCreateIdUsuario: number
// }

// export interface IValeSalidaItem {
//     idValeSalidaItem?: number;
//     idValeSalida?: number;
//     numLinea: number;
//     codArticulo: string;
//     desArticulo: string;
//     unidadMedida: string;
//     codAlmacen: string;
//     // fecNecesaria: string;
//     cantidad: number;
//     precio: number;
//     descuento: number;
//     igv: number;
//     total: number;
//     obsItem: string;
// }

// export interface IValeSalidaItemReq {
//     idValeSalidaItemReq: number;
//     idValeSalidaItem: number;
//     idRequerimientoItem: number;
//     cantidad: number;
// }



// export interface IValeSalida extends IValeSalidaCabecera {
//     ////listValeSalidaItem: IValeSalidaItem[];
//     //listValeSalidaItemReq: IValeSalidaItemReq[];
//     ////listValeSalidaAnexo: IValeSalidaAnexo[];
// }

export interface IValeSalidaAnular {
    idValeSalida: number;
    idUsuario: number;
    regIdUsuario: number;
}

// export interface IEstadoValeSalida {
//     idEstadoValeSalida: number;
//     descripcionEstadoValeSalida: string;
// }

// export interface ITipoValeSalida {
//     idTipoValeSalida: number;
//     descripcionTipoValeSalida: string;
// }

export interface IValeSalidaLista  {
    idValeSalida: number;
    desSocioNegocio: string;
    fecGenerado: Date;
    fecVigente: Date;
    fecEntrega: Date;
    montoTotal: number;
    desTipoPago: string;
    descripcionTipoOrdenCompra: string;
    codMoneda: string;
    descripcionEstadoOrdenCompra: string;
}

// export interface IRequerimiento {
//     idRequerimiento:number,
//     fecRequerimiento: string,
//     usuario: string;
//     codCentroCostoUsuario: string;
//     obsConformidadSaP: string;
//   }

// export interface IRequerimientoItem {
//     idRequerimiento:number,
//     fecRequerimiento: string,
//     usuario: string;
//     codCentroCostoUsuario: string;
//     obsConformidadSaP: string;
// }