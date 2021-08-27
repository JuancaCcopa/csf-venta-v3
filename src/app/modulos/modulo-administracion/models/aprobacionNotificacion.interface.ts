export interface IAprobacionNotificacion {
  idAprobacionNotificacion: number;
  idAprobacionDocumento: number;
  idDocumento: number;
  tipoNotificacion: string;
  desAprobacionNotificacion: string;
  idAprobador: number;
  isAprobadorTemporal: boolean;
  idUsuario: number;
  regCreate: string;
  regCreateIdUsuario: number;
  isAprobacionNotificacion: boolean;
  desAprobacionDocumento: string;
}
