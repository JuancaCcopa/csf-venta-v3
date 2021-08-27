import {IIndice} from '../interface/indice.interface';
import { ConstantsTablasIDB } from '../constants/constants-tablas-indexdb';

export class IndiceCrear {

    public static indices: IIndice[] = [];

    public static armarIndices(version: number): IIndice[] {

        this.indices = [];
        let indice: IIndice;

        if ( version === 1 ) {
            indice = { tabla: ConstantsTablasIDB._TABLA_ESTACION_TRABAJO,
                nombreIndice: 'idxnombreequipo', campoIndice: 'nombreequipo', unico: false  };
        }
        
        return this.indices;
    }
}