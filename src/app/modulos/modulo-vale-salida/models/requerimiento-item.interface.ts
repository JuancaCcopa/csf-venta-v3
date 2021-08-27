export interface IRequerimientoItem {
    idRequerimiento:number;
    idRequerimientoItem: number;
    nroOrdenTrabajo: string;
    numLinea: number;
    codArticulo: string;
    desArticulo: string;
    codAlmacen: string;
    codUnidadMedida: string;
    cantidadNecesaria: number;
    codCentroCosto: string;
    fecNecesaria: Date;
    comentario: string;
    desCentroCosto: string;
    obsConformidadSAP: string;
    desRequerimientoEstado: string;
}