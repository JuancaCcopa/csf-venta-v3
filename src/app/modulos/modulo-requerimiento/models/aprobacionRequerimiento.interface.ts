export interface IAprobacionRequerimientoIndividual {
    idRequerimientoAprobador: number;
    idRequerimiento: number;
    idAprobador: number;
    obsAprobacion: string;
    fecAprobacion: string;
    idRequerimientoEstado: number;
    regUpdateIdUsuario: number;
    origen: string;
  }
  
  export interface IListAprobacionRequerimiento
    extends IAprobacionRequerimientoIndividual {
    regCreateIdUsuario: number;
    desRequerimientoEstado: string;
    desAprobador: string;
  }
  export interface IRequerimientoAprobador {
    idAprobador: number;
    desAprobador: string;
    tipoAprobador: string;
    idUsuario: number;
  }
  
  export interface IBodyAprobadorReqIndividualOutIn {
    tipo: string;
    idEstado?: number;
    aprobador: IRequerimientoAprobador;
    descripcion: string;
  }
  export interface IBodyAprobadorReqMasivolOutIn {
    tipo: string;
    idEstado?: number;
    aprobador: IRequerimientoAprobador;
    descripcion: string;
  }
  
  /* MASIVO */
  export interface IAprobarRequerimientoMasivo {
    idRequerimientoAprobadorMasivo: number;
    lineasRequerimientoAprobador: IAprobacionRequerimientoIndividual[];
  }