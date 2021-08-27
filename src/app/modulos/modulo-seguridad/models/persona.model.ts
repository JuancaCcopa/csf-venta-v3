import { UsuarioModel } from './usuario.model';
import { EmpresaPorUsuarioModel } from './empresa-por-usuario';
import { SubTipoExplotacionPorUsuarioModel } from './sub-tipo-explotacion-por-usuario.model';
import { AprobarSubTipoExplotacionPorUsuarioModel } from './aprobar-sub-tipo-explotacion-por-usuario';
export class PersonaModel {
    idPersona?: number;
    nombre: string;
    usuario?: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    nombreCompleto?: string;
    nroDocumento?: string;
    nroTelefono?: string;
    flgActivo?: boolean;
    codCentroCosto?: string;
    desCentroCosto?: string;
    descripcionPerfil?: string;
    entidadUsuario?: UsuarioModel;
    listEmpresaPorUsuario?: EmpresaPorUsuarioModel[];
    listSubTipoExplosionPorUsuario?: SubTipoExplotacionPorUsuarioModel[];
    listAprobarSubTipoExplosionPorUsuario?: AprobarSubTipoExplotacionPorUsuarioModel[];

    // Auditoria
    regUsuario?: number;
    regEstacion?: string;

    constructor(){
        this.idPersona = 0;
        this.nombre = '';
        this.usuario = '';
        this.apellidoPaterno = '';
        this.apellidoMaterno = '';
        this.nombreCompleto = '';
        this.nroDocumento = '';
        this.nroTelefono = '';
        this.codCentroCosto = '';
        this.desCentroCosto = '';
        this.flgActivo = true;
        this.descripcionPerfil = '';
        this.listEmpresaPorUsuario = [];
        this.listSubTipoExplosionPorUsuario = [];
        this.listAprobarSubTipoExplosionPorUsuario = [];
        this.regUsuario = 0;
        this.regEstacion = '';
    }
}