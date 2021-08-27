export class EmpresaPorUsuarioModel {
    idEmpresaPorUsuario?: number;
    codigoEmpresa: string;
    descripcionEmpresa: string;
    idUsuario?: number;

    constructor(){
        this.idEmpresaPorUsuario = 0;
        this.codigoEmpresa = '';
        this.descripcionEmpresa = '';
        this.idUsuario = 0;
    }
}