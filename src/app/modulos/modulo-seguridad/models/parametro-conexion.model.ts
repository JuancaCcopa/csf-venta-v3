export class ParametroConexionModel {
    idParametroConexion?: number;
    aplicacionServidor: string;
    aplicacionBaseDatos: string;
    aplicacionUsuario: string;
    aplicacionPassword: string;
    aplicacionPasswordOriginal: string;
    sapServidor: string;
    sapBaseDatos: string;
    sapUsuario: string;
    sapPassword: string;
    sapPasswordOriginal: string;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idParametroConexion = 0;
        this.aplicacionServidor = '';
        this.aplicacionBaseDatos = '';
        this.aplicacionUsuario = '';
        this.aplicacionPassword = '';
        this.aplicacionPasswordOriginal = '';
        this.sapServidor = '';
        this.sapBaseDatos = '';
        this.sapUsuario = '';
        this.sapPassword = '';
        this.sapPasswordOriginal = '';
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}