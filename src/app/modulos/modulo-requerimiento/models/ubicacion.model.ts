export class UbicacionModel {
    idUbicacion?: number;
    desUbicacion?: string;
    codCentroCosto?: string;
    desCentroCosto?: string;
    regIdUsuario?: number;
    regEstacion?: string;

    constructor() {
        this.idUbicacion = 0; 
        this.desUbicacion = '';
        this.codCentroCosto = '';
        this.desCentroCosto = '';
        this.regIdUsuario = 0;
        this.regEstacion = '';
    }
}

export class UbicacionPorStockModel {
    idUbicacionPorStock?: number;
    idUbicacion?: number;
    desUbicacion?: string;
    codCentroCosto?: string;
    desCentroCosto?: string;
    codTipoProducto?: number;
    desTipoProducto?: string;
    codArticulo?: string;
    desArticulo?: string;
    stockMaximo?: number;
    regIdUsuario?: number;
    regEstacion?: string;
    defaultWarehouse?: string;
    salesUnit?: string;

    constructor() {
        this.idUbicacionPorStock = 0; 
        this.idUbicacion = 0;
        this.desUbicacion = '';
        this.codCentroCosto = '';
        this.desCentroCosto = '';
        this.codTipoProducto = 0;
        this.desTipoProducto = '';
        this.codArticulo = '';
        this.desArticulo = '';
        this.stockMaximo = 0;
        this.regIdUsuario = 0;
        this.regEstacion = '';
        this.defaultWarehouse = '';
        this.salesUnit = '';
    }
}

export class UbicacionPorUsuarioModel {
    idUbicacionPorUsuario?: number;
    idUbicacion?: number;
    desUbicacion?: string;
    codCentroCosto?: string;
    desCentroCosto?: string;
    idUsuario?: number;
    nombreCompleto?: string;
    email?: string;
    flgGenera?: boolean;
    flgRevisa?: boolean;
    flgAutoriza?: boolean;
    regIdUsuario?: number;
    regEstacion?: string;

    constructor() {
        this.idUbicacionPorUsuario = 0; 
        this.idUbicacion = 0;
        this.desUbicacion = '';
        this.codCentroCosto = '';
        this.desCentroCosto = '';
        this.idUsuario = 0;
        this.flgGenera = false;
        this.flgRevisa = false;
        this.flgAutoriza = false;
        this.regIdUsuario = 0;
        this.regEstacion = '';
    }
}

export class UbicacionPorTipoProductoModel {
    idUbicacionPorTipoProducto?: number;
    idUbicacion?: number;
    desUbicacion?: string;
    codCentroCosto?: string;
    codTipoProducto?: number;
    desTipoProducto?: string;
    regIdUsuario?: number;
    regEstacion?: string;

    constructor() {
        this.idUbicacionPorTipoProducto = 0; 
        this.idUbicacion = 0;
        this.desUbicacion = '';
        this.codCentroCosto = '';
        this.codTipoProducto = 0;
        this.desTipoProducto = '';
        this.regIdUsuario = 0;
        this.regEstacion = '';
    }
}