export interface InterfaceAprobadorTemporal {
    idAprobadorTemporal: number;
    idAprobador: number;
    usuarioOriginal: string;
    idUsuarioTemporal: number;
    usuarioTemporal: string;
    fechaInicio: string;
    fechaFin: string;
    regCreate: string;
    regUpdate: string;
    regCreateIdUsuario: number;
    regUpdateIdUsuario: number;
    idAprobadorEstado: number;
    desAprobadorEstado: string;
}
