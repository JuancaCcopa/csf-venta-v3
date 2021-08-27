export interface IStock {
    itemCode: string;
    itemName: string;
    manBtchNum: string; // Indicador de Lote
    manSerNum: string; // Indicador de Serie
    binActivat: string; // Indicador ubicacion
    u_SYP_CS_FAMILIA: string;
    u_SYP_CS_PRODCI: string;
    u_SYP_CS_EABAS: string;
    u_SYP_CS_CLASIF: string;
    u_SYP_CS_LABORATORIO: string;
    priceList: number; // Lista de Precio
    price: number; // Precio
    whsCode: string; // Codigo de Almacen
    whsName: string; // Descripción de Almacen
    // Stock por Almacen Producto
    onHand: number;
    onOrder: number;
    isCommited: number;
    //Stock Almacén
    onHandALM: number;
    onOrderALM: number;
    isCommitedALM: number;
    //Stock Lote
    batchNum: string;
    quantityLote: number;
    isCommitedLote: number;
    onOrderLote: number;
    expDate: Date;

    //Ubicacion
    binAbs: number;
    binCode: string;
    onHandQty: number;
    //Cantidad Inputada por el Usuario
    quantityinput: number;
}