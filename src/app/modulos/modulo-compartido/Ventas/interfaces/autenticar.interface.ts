export interface IAutenticarRequest {
    usuario: string;
    clave: string;
}

export interface IAutenticarResponse {
    usuario: string;
    // clave: string;
    valido: boolean;
    observacion: string;
}