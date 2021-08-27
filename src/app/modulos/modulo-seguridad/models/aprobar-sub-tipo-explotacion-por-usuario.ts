export class AprobarSubTipoExplotacionPorUsuarioModel {
    idSubTipoExplotacionPorUsuario?: number;
    idSubTipoExplotacion?: number;
    idTipoExplotacion?: number;
    descripcionSubTipoExplotacion: string;
    idUsuario: number;
    flgAprobar: boolean;
    flgRechazar: boolean;


    constructor(){
        this.idSubTipoExplotacionPorUsuario = 0;
        this.idSubTipoExplotacion = 0;
        this.idTipoExplotacion = 0;
        this.descripcionSubTipoExplotacion = '';
        this.idUsuario = 0;
        this.flgAprobar = false;
        this.flgRechazar = false;
    }
}