export class SubTipoExplotacionPorUsuarioModel {
    idSubTipoExplotacionPorUsuario?: number;
    idSubTipoExplotacion?: number;
    idTipoExplotacion?: number;
    descripcionSubTipoExplotacion: string;
    idUsuario: number;

    constructor(){
        this.idSubTipoExplotacionPorUsuario = 0;
        this.idSubTipoExplotacion = 0;
        this.idTipoExplotacion = 0;
        this.descripcionSubTipoExplotacion = '';
        this.idUsuario = 0;
    }
}