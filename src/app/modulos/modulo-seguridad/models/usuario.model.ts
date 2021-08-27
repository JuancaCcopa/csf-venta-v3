export class UsuarioModel {
    idUsuario?: number;
    idPersona?: number;
    idPerfil?: number;
    descripcionPerfil?: string;
    usuario: string;
    claveOrigen: string;
    email: string;
    imagen: string;
    themeDark: boolean;
    themeColor: string;
    typeMenu: string;
    flgActivo: boolean;

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idUsuario = 0;
        this.idPersona = 0;
        this.idPerfil = 0;
        this.descripcionPerfil = '';
        this.usuario = '';
        this.claveOrigen = '';
        this.email = '';
        this.imagen = '';
        this.themeDark = false;
        this.themeColor = '';
        this.typeMenu = '';
        this.flgActivo = true;
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}