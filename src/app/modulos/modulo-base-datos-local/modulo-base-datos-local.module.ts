import { NgModule } from '@angular/core';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { IndiceCrear } from './data-base/estructuraIndices';
import { estructuraBD } from './data-base/estructuraBDLocal';

// Ahead of time compiles requires an exported function for factories
export function migrationFactory() {
    // The animal table was added with version 2 but none of the existing tables or data needed
    // to be modified so a migrator for that version is not included.

    let store;
    let arrayIndices;

    return {
      1: (db, transaction) => {
        try {
            arrayIndices = IndiceCrear.armarIndices(1);

            arrayIndices.forEach( idx => {
                store = transaction.objectStore( idx.tabla );
                store.createIndex(idx.nombreIndice, idx.campoIndice, { unique: idx.unico });
             }
            );
        } catch (e) {
            // console.log('Error al crear los indices', e);
        }
      }
    };
  }

const dbConfig: DBConfig  = {
    name: 'DBCSFE',
    version: 2,
    objectStoresMeta: estructuraBD.BASE_DE_DATOS, migrationFactory
  };

@NgModule({
    declarations: [],
    imports: [ NgxIndexedDBModule.forRoot(dbConfig)
    ]
})
export class ModuloBaseDatosLocalModule {}