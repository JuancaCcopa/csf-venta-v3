export interface IAprobador {
    codCentroCosto: string;
    idAprobador: number;
    usuario: string;
    idAprobadorEstado: number;
    idUsuario: number;
    isActivoSistema: boolean;
    regCreate: string;
    regCreateIdUsuario: number;
    regUpdate: string;
    regUpdateIdUsuario: number;
    desCentroCosto: string;
    desAprobadorEstado: string;
}
export interface IModificarAprobador {
    idAprobador: number;
    idUsuario: number;
    regUpdateIdUsuario: number;
}
export interface IGuardarAprobador {
    idAprobador: number;
    idUsuario: number;
    isActivoSistema: boolean;
    regCreateIdUsuario: number;
    idAprobadorEstado: number;
}

export interface IAnularAprobador {
    idAprobador: number;
    idAprobadorEstado: number;
    regUpdateIdUsuario: number;
}
