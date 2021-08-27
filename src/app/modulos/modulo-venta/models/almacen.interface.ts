export interface IAlmacen {
    codalmacen: string;
    nombre: string;
    ctacont_ventas: string;
    ctacont_costoventas: string;
    ctacont_mercaderia: string;
    ctacont_comprasdebe: string;
    ctacont_comprashaber: string;
    ctacont_existencia: string;
    estado: string;
    ctacont_transferencias: string;
    stockminimo: number;
    stockmaximo: number;
    codlocal: string;
    
    flg_valorizacion: string;
    flg_consignacion: string;
    flg_enviosap: boolean;
    fec_enviosap: Date;
    fec_recepcionsap: Date;
}