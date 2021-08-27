export interface IValeSalida {
  idSolicitudVale: number;
  fecSolicitudVale: string;
  idUsuario: number;
  codCentroCosto: string;
  observacion: string;
  nroEntrega: string;
  idSalidaDraftSAP: number;
  idSalidaRealSAP: number;
  fecSalidaDraftSAP: string;
  fecSalidaRealSAP: string;
  regCreate: string;
  regUpdate: string;
  regCreateIdUsuario: number;
  regUpdateIdUsuario: number;
  idSolicitudValeEstado: number;
  usuario: string;
  desCentroCosto: string;
  desSolicitudValeEstado: string;
  origenSolicitudVale: string;
  lineasSolicitudValeItem: [];
  lineasSolicitudValeAnexo: [];
  lineasSolicitudValeAprobador: [];
}

export interface IEstadoValeSalida {
  idSolicitudValeEstado: number;
  desSolicitudValeEstado: string;
  obsSolicitudValeEstado: string;
  isSolicitudValeEstado: boolean;
}

export interface IDetalleSolicitudValeSalida {
  idSolicitudVale: number;
  fecSolicitudVale: string;
  idUsuario: number;
  codCentroCosto: string;
  observacion: string;
  nroEntrega: string;
  idSalidaDraftSAP: number;
  idSalidaRealSAP: number;
  fecSalidaDraftSAP: string;
  fecSalidaRealSAP: string;
  regCreate: string;
  regUpdate: string;
  regCreateIdUsuario: number;
  regUpdateIdUsuario: number;
  idSolicitudValeEstado: number;
  usuario: string;
  desCentroCosto: string;
  desSolicitudValeEstado: string;
  origenSolicitudVale: string;
  lineasSolicitudValeItem: ILineasSolicitudValeItem[];
  lineasSolicitudValeAnexo: ILineasSolicitudValeAnexo[];
  lineasSolicitudValeAprobador: IlineasSolicitudValeAprobador[];
}

export interface ILineasSolicitudValeItem {
  idSolicitudValeItem: number;
  idSolicitudVale: number;
  numLinea: number;
  codArticulo: string;
  desArticulo: string;
  codUnidadMedida: string;
  cantidad: number;
  cantidadRecibida?: number;
  codCentroCosto: string;
  comentario: string;
  isSolicitudValeItem: boolean;
  idEditForm: number;
}

export interface ILineasSolicitudValeAnexo {
  idSolicitudValeAnexo: number;
  idSolicitudVale: number;
  numLinea: number;
  rutaAnexo: string;
  rutaAnexoLectura: string;
  regCreate: string;
  regUpdate: string;
  regCreateIdUsuario: number;
  regUpdateIdUsuario: number;
  isSolicitudValeAnexo: boolean;
  idEditForm: number;
}
export interface IlineasSolicitudValeAprobador {
  idSolicitudValeAprobador: number;
  idSolicitudVale: number;
  idAprobador: number;
  desAprobador: string;
  obsAprobacion: string;
  fecAprobacion: string;
  idSolicitudValeEstado: number;
}

export interface IRegistroSolicitudValeSalida {
  idSolicitudVale: number;
  fecSolicitudVale: string;
  idUsuario: number;
  codCentroCosto: string;
  observacion: string;
  regCreateIdUsuario: number;
  idSolicitudValeEstado: number;
  lineasSolicitudValeItem: ILineaRegistroSolicitudValeSalida[];
  lineasSolicitudValeAnexo: ILineaRegistroSolicitudValeAnexo[];
}
export interface ILineaRegistroSolicitudValeAnexo {
  idSolicitudValeAnexo: number;
  idSolicitudVale: number;
  numLinea: number;
  rutaAnexo: string;
  rutaAnexoLectura: string;
  regCreateIdUsuario: number;
  isSolicitudValeAnexo: boolean;
  idEditForm: number;
}
export interface ILineaRegistroSolicitudValeSalida {
  idSolicitudValeItem: number;
  idSolicitudVale: number;
  numLinea: number;
  codArticulo: string;
  desArticulo: string;
  codUnidadMedida: string;
  cantidad: number;
  cantidadRecibida?: number;
  codCentroCosto: string;
  comentario: string;
  isSolicitudValeItem: boolean;
  idEditForm: number;
}

export interface IGrillaSolicitudValeSalida {
  indice?: number; // no va al api
  idSolicitudValeItem?: number;
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

  comentario?: string;
  isSolicitudValeItem?: boolean;
}

/* MODIFICAR */
export interface IModificarSolicitudValeSalida {
  idSolicitudVale: number;
  fecSolicitudVale: string;
  idUsuario: number;
  codCentroCosto: string;
  observacion: string;
  regUpdateIdUsuario: number;
  idSolicitudValeEstado: number;
  lineasSolicitudValeItem: ILineaRegistroSolicitudValeSalida[];
  lineasSolicitudValeAnexo: ILineaModificarSolicitudValeAnexo[];
}

export interface ILineaModificarSolicitudValeAnexo {
  idSolicitudValeAnexo: number;
  idSolicitudVale: number;
  numLinea: number;
  rutaAnexo: string;
  regCreateIdUsuario: number;
  regUpdateIdUsuario: number;
  isSolicitudValeAnexo: boolean;
  idEditForm: number;
}

/* ANULAR */
export interface IAnularSolicitudVale {
  idSolicitudVale: number;
  regUpdateIdUsuario: number;
  idSolicitudValeEstado: number;
}
