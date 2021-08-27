export interface IValeSalidaAprobador {
  idAprobador: number;
  desAprobador: string;
  tipoAprobador: string;
  idUsuario: number;
}

export interface IAprobacionIndividualSolicitudVale {
  idSolicitudValeAprobador: number;
  idSolicitudVale: number;
  idAprobador: number;
  fecAprobacion: string;
  obsAprobacion: string;
  idSolicitudValeEstado: number;
  regUpdateIdUsuario: number;
}

export interface IBodyAprobadorIndividualOutIn {
  tipo: string;
  idEstado?: number;
  aprobador: IValeSalidaAprobador;
  descripcion: string;
}
/* APROBACION MASIVA */
export interface IBodyAprobadorMasivoOutIn
  extends IBodyAprobadorIndividualOutIn {}
export interface IAprobacionMasivaSolicitudVale {
  idSolicitudValeAprobadorMasivo: number;
  lineasSolicitudValeAprobador: ILineaSolicitudValeAprobador[];
}
export interface ILineaSolicitudValeAprobador {
  fecAprobacion: string;
  idAprobador: number;
  idSolicitudVale: number;
  idSolicitudValeAprobador: number;
  idSolicitudValeEstado: number;
  obsAprobacion: string;
  regUpdateIdUsuario: number;
}
