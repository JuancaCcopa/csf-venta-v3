export interface IVentaConfiguracion {
    idconfiguracion: number;
    nombre: string;
    flgautomatico: boolean;
    flgreceta: boolean;
    flgpedido: boolean;
    flgmanual: boolean;
    flgimpresionautomatico: boolean;
    codalmacen: string;
    desalmacen: string;
}

export interface IVentaConfiguracionRegistrar {
    nombre: string;
    flgautomatico: boolean;
    flgreceta: boolean;
    flgpedido: boolean;
    flgmanual: boolean;
    codalmacen: string;
    desalmacen: string;
}

export interface IVentaConfiguracionModificar {
    idconfiguracion: number;
    nombre: string;
    flgautomatico: boolean;
    flgreceta: boolean;
    flgpedido: boolean;
    flgmanual: boolean;
}

export interface IVentaConfiguracionEliminar {
    idconfiguracion: number;
}