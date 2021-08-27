import { InterfaceDispositivo } from './device.interface';
import { Subject } from 'rxjs';

export class VariablesGlobales {
    public static ESTADO_INTERNET: boolean;
    public static _DISPOSITIVO: InterfaceDispositivo;
    public static _FLAG_ENVIANDO_DATOS_A_SERVIDOR = false;
    public static _FLAG_OBSERVADOR_ENVIANDO_DATOS_A_SERVIDOR$ = new Subject<boolean>();
}