import { StringifyOptions } from "querystring";

export interface IArticulo {
    itemCode: string;
    itemName: string;
    itemsGroupCode: number;
    salesUnit: string;
    defaultWarehouse: string;
  }
  
  export interface INewArticulo {
    codArticulo?: string;
    desArticulo?: string;
    codUnidadMedida?: string;
    codAlmacen?: string;
    fecNecesaria?: string;
    cantidadNecesaria?: number;
    codCentroCosto?: string;
  }