export interface IOrdenCompraCabecera {
    idOrdenCompra: number;
    codSocioNegocio: string;
    fecGenerado: string;
    fecVigente: string;
    fecEntrega: string;
    montoTotal?: number;
    montoNeto?: number;
    montoIgv?: number;
    codTipoPago: string;
    idTipoOrdenCompra: number;
    codMoneda: string;
    obsOrdenCompra: string;
    idEstadoOrdenCompra: number;
    flgIgv: boolean;
    codAlmacen: string;
    porcentajeIgv: number;
    lugarEntrega : string;
    idUsuarioSolicitante: number;
    tipoCambio: number;
    personaContacto: number;
    regIdUsuario: number;
}

export interface IOrdenCompraItem {
    idOrdenCompraItem?: number;
    idOrdenCompra?: number;
    numLinea: number;
    codArticulo: string;
    desArticulo: string;
    unidadMedida: string;
    codAlmacen: string;
    // fecNecesaria: string;
    cantidad: number;
    precio: number;
    descuento: number;
    igv: number;
    total: number;
    obsItem: string;
}

export interface IOrdenCompraItemReq {
    idOrdenCompraItemReq: number;
    idOrdenCompraItem: number;
    idRequerimientoItem: number;
    cantidad: number;
}

export interface IOrdenCompraAnexo {
    idOrdenCompraAnexo: number;
    idOrdenCompra: number;
    archivo: string;
}

export interface IOrdenCompra extends IOrdenCompraCabecera {
    listOrdenCompraItem: IOrdenCompraItem[];
    listOrdenCompraItemReq: IOrdenCompraItemReq[];
    listOrdenCompraAnexo: IOrdenCompraAnexo[];
}

export interface IOrdenCompraAnular {
    idOrdenCompra: number;
    idUsuario: number;
    regIdUsuario: number;
}

export interface IEstadoOrdenCompra {
    idEstadoOrdenCompra: number;
    descripcionEstadoOrdenCompra: string;
}

export interface ITipoOrdenCompra {
    idTipoOrdenCompra: number;
    descripcionTipoOrdenCompra: string;
}

export interface IOrdenCompraLista  {
    idOrdenCompra: number;
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

export interface ITipoPago {
    groupNumber: number;
    paymentTermsGroupName: string;
    numberOfAdditionalMonths: number;
    numberOfAdditionalDays: number;
}

export interface IMoneda {
    code: number;
    name: string;
}