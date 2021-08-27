export interface IAprobacionCentroCosto  {
  idAprobacion: number;
  desAprobacion: string;
  regCreate: string;
  regUpdate: string;
  regCreateIdUsuario: number;
  regUpdateIdUsuario: number;
  isAprobacion: boolean;
}
export interface ICentroCosto {
  codCentroCosto: string;
  desCentroCosto: string;
}

export interface IDimension {
  centerCode: string;
  centerName: string;
}

export interface IAprobadorCentroCosto {
  idAprobador: number;
  idUsuario: number;
  isActivoSistema: boolean;
  regCreate: string;
  regUpdate: string;
  regCreateIdUsuario: number;
  regUpdateIdUsuario: number;
  idAprobadorEstado: number;
  usuario: string;
  codCentroCosto: string;
}
export interface IResultBusquedaCC {
  idAprobacionCC: number;
  idAprobacion: number;
  codCentroCosto: string;
  desCentroCosto: string;
  idAprobacionDocumento: number;
  desAprobacionDocumento: string;
  idAprobador: number;
  regCreate: string;
  regUpdate: string;
  regCreateIdUsuario: number;
  regUpdateIdUsuario: number;
  isAprobacionCC: boolean;
  estadoAprobacionCC: string;
}
