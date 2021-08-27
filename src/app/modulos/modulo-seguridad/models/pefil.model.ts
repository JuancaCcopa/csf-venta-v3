export class PerfilModel {
    idPerfil?: number;
    descripcionPerfil: string;
    flgActivo?: boolean;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idPerfil = 0;
        this.descripcionPerfil = '';
        this.flgActivo = true;
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}