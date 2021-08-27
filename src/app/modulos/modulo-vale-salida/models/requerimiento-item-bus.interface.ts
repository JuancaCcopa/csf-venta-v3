export interface IRequerimientoItemBus {
    idRequerimiento: number;
    fecRequerimiento: Date;
    nombreCompleto: string;
    codCentroCosto: string;
    desCentroCosto: string;
    obsConformidadSAP: string;
    desRequerimientoEstado: string;
}