export interface IResultBusquedaComprobante {
    codcomprobante: string;
    codcomprobantee: string;
    estado: string;
    codventa: string;
    codtipocliente: string;
    anombrede: string;
    montototal: number;
    montototaldolares: number;
    moneda: string;
    fechagenera: Date;
    fechaemision: Date;
    fechacancelacion: Date;
    fechaanulacion: Date;
    codcliente: string;
    numeroplanilla: string;
    nombreestado: string;
    nombretipocliente: string;
    codatencion: string;
    flg_gratuito: boolean;
    direccion: string;
    ruc: string;
    porcentajeimpuesto: string;
    cardcode: string;
    tipodecambio: number;
}