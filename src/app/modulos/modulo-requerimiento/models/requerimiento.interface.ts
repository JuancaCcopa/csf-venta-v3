export interface IRequerimientoSingle {
    origen: string;
    idRequerimiento: number;
    fecRequerimiento: string;
    fecNecesaria: string;
    fecValidez: string;
    idUsuario: number;
    codCentroCosto: string;
    regCreateIdUsuario: number;
    idRequerimientoEstado: number;
    codMotivoRequerimiento: string;
    observacion: string;
    isAutorizado: Boolean;
    desAutorizado?: Boolean;
    idTipoRequerimiento: number;
    idUbicacion: number;
    desUbicacion?: string;
  }

  export interface IRequerimiento extends IRequerimientoSingle {
    lineasRequerimientoItem: IGrilla[];
    lineasRequerimientoAnexo: IAnexo[];
    lineasRequerimientoAprobador?: ILineaRequerimientoAprobador[];
    requerimientoAprobadorEconomato?: IRequerimientoAprobadorEconomato
  }
  
  export interface IDetalleRequerimieno extends IRequerimiento {
    usuario: string;
    desCentroCosto: string;
    codConformidadSAP: string;
    conformidadSAP: string;
    obsConformidadSAP: string;
    desRequerimientoEstado: string;
    idSolicitudSAP?: number;
  }
  
  export interface IGrilla {
    indice?: number;
    idRequerimientoItem?: number;
    idEditForm?: number;
  
    idRequerimiento?: number;
    nroOrdenTrabajo?: string;
    numLinea?: number;
  
    codArticulo?: string;
    desArticulo?: string;
    codUnidadMedida?: string;
  
    cantidadNecesaria?: number;
    codAlmacen?: string;
    codCentroCosto?: string;
    codSocioNegocio?: string;
  
    fecNecesaria?: string | Date;
    comentario?: string;
    isRequerimientoItem?: boolean;
  }
  
  export interface IAnexo {
    idRequerimientoAnexo: number;
    numLinea: number;
    nombreArchivo?: string;
    archivo?: any;  
    tipoArchivo?: string;
    extension?: string;
    regCreateIdUsuario: number;
    isRequerimientoAnexo: boolean;
    idEditForm: number;
  }
  
  export interface ILineaRequerimientoAprobador {
    idRequerimientoAprobador: number;
    idRequerimiento: number;
    idAprobador: number;
    obsAprobacion: string;
    fecAprobacion: null;
    idRequerimientoEstado: number;
    regCreateIdUsuario: number;
    regUpdateIdUsuario: number;
    desRequerimientoEstado: string;
    desAprobador: string;
  }

  export interface IRequerimientoAprobadorEconomato {
    idRequerimientoAprobador: number;
    idRequerimiento: number;
    idUsuarioRevisado: number;
    nombreCompletoRevisado: string;
    flgRevisado: boolean;
    fecRevisado: Date;
    obsRevisado: string;
    idUsuarioAprobacion: number;
    nombreCompletoAprobacion: string;
    flgAprobacion: boolean;
    fecAprobacion: Date;
    obsAprobacion: string;
  }
  
  export interface IMotivoRequerimiento {
    codMotivoRequerimiento: string;
    desMotivoRequerimiento: string;
  }
  
  export interface IEstadoRequerimiento {
    idRequerimientoEstado: number;
    desRequerimientoEstado: string;
    obsRequerimientoEstado: string;
    isRequerimientoEstado: number;
  }
  
  export interface IRequerimientoModificar extends IRequerimientoSingle {
    lineasRequerimientoItem: IGrilla[];
    lineasRequerimientoAnexo: IRequerimientoAnexoModificar[];
  }
  
  export interface IRequerimientoAnexoModificar {
    idRequerimientoAnexo: number;
    numLinea: number;
    nombreArchivo?: string;
    regUpdateIdUsuario: number;
    isRequerimientoAnexo: boolean;
    idEditForm: number;
  }
  
  export interface IAprobadorFinal {
    idAprobador: number;
    desAprobador: string;
    tipoAprobador: string;
  }
  
  export interface IRequerimientoAnular {
    idRequerimiento: number;
    regUpdateIdUsuario: number;
    idRequerimientoEstado: number;
  }
  
  export interface IRequerimientoAutorizar {
    idRequerimiento: number;
    regUpdateIdUsuario: number;
    isAutorizado: boolean;
  }

  export interface IRequerimientoRevisar {
    idRequerimiento: number;
    regUpdateIdUsuario: number;
    idUsuario: number;
  }

  export interface IRequerimientoAprobar {
    idRequerimiento: number;
    regUpdateIdUsuario: number;
    idUsuario: number;
  }