export class OpcionPorPerfilModel {
    idOpcionxPerfil?: number;
    idOpcion?: number;
    idPerfil?: number;
    descripcionOpcion: string;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idOpcion = 0;
        this.idPerfil = 0;
        this.idOpcionxPerfil = 0;
        this.descripcionOpcion = '';
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}