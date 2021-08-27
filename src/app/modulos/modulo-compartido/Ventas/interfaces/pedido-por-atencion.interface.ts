export interface IPedidoPorAtencion {
    codpedido: string;
    fechaatencion: Date;
    estado: string;
    listado: string;
}

export interface IDetallePedidoPorPedido {
    codproducto: string;
    nombreproducto: string;
    cantidadpedida: number;
    tipoproducto: string;
    codpedido: string;
}

export interface IListarPedido {
    estimpresion: string;
    tiplistado: string;
    estimpresiondsc: string;
    tiplistadodsc: string;
    codventa: string;
    codpedido: string;
    codcentro: string;
    codalmacen: string;
    codatencion: string;
    cama: string;
    fechagenera: Date;
    fechaatencion: Date;
    nompaciente: string;
    nomobservacion: string;
    nomusuario: string;
    nomcentro: string;
    nomalmacen: string;
    orden: string;
    codtipopedido: string;
    tipopedido: string;
    tipomovimiento: string;
    estado: string;
    codmedico: string;
    flg_paquete: string;
    // codmedido: string;
    codalmacenventa: string;
    key: string;
}

