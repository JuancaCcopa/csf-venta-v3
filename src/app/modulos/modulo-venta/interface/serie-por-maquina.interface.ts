export interface ISeriePorMaquina {
    id: number;
    nombremaquina: string;
    seriefactura: string;
    serieboleta: string;
    serienotacredito: string;
    serienotadebito: string;
    serieguia: string;
    codcentro: string;
    descentro: string;
    codalmacen: string;
    desalmacen: string;
    serienotacreditofactura: string;
    serienotadebitofactura: string;
}

export interface ISeriePorMaquinaRegistrar {
    nombremaquina: string;
    seriefactura: string;
    serieboleta: string;
    serienotacredito: string;
    serienotadebito: string;
    serieguia: string;
    codcentro: string;
    codalmacen: string;
}

export interface ISeriePorMaquinaModificar {
    id: number;
    seriefactura: string;
    serieboleta: string;
    serienotacredito: string;
    serienotadebito: string;
    serieguia: string;
    codcentro: string;
    codalmacen: string;
}

export interface ISeriePorMaquinaEliminar {
    id: number;
}

export interface ISerie {
    tiposerie: string;
    tiposerienombre: string;
    serie: string;
    correlativo: string;
    flg_electronico: boolean;
    flg_otorgar: boolean;
    formato_electronico: string;
    key: string;
}

export interface ISerieRegistrar {
    tiposerie: string;
    serie: string;
    correlativo: string;
}

export interface ISerieEliminar {
    tiposerie: string;
    serie: string;
}


export interface ISerieConfig {
    boleta: string;
    factura: string;
    creditob: string;
    creditof: string;
    debitob: string;
    debitof: string;
    guiaxlocal: string;
    flg_electronicof: string;
    flg_electronicob: string;
    flg_electronicocb: string;
    flg_electronicocf: string;
    flg_electronicodb: string;
    flg_electronicodf: string;
    flg_otorgarf: number;
    flg_otorgarb: number;
    flg_otorgarcb: number;
    flg_otorgarcf: number;
    flg_otorgardb: number;
    flg_otorgardf: number;
    flg_electronico: number;
    generar_e: string;
}