import { OpcionModel } from './opcion.model';
export class MenuModel {
    idMenu?: number;
    descripcionTitulo?: string;
    icono?: string;
    url?: string;
    nroNivel?: number;
    flgActivo?: boolean;
    idMenuPadre?: number;
    flgChildren?: boolean;
    nombreFormulario?: string;
    listaOpciones?: OpcionModel[];

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idMenu = 0;
        this.descripcionTitulo = '';
        this.icono = '';
        this.url = '';
        this.nroNivel = 0;
        this.flgActivo = true;
        this.idMenuPadre = 0;
        this.flgChildren = false;
        this.nombreFormulario = '';
        this.listaOpciones = [];
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}