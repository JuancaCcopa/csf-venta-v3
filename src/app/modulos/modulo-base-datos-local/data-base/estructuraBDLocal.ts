import { ConstantsTablasIDB } from '../constants/constants-tablas-indexdb';
export const estructuraBD = {
    BASE_DE_DATOS: [
        {
            store: ConstantsTablasIDB._TABLA_ESTACION_TRABAJO,
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
                { name: 'nombreequipo', keypath: 'nombreequipo', options: { unique: false } }
            ]
        }
    ]
}