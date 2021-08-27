export class ButtonAcces {
    btnNuevo: boolean;
    btnEditar: boolean;
    btnEliminar: boolean;
    btnGrabar: boolean;
    btnCerrar: boolean;
    btnPDF: boolean;
    btnDownload: boolean;
    btnVisualizar: boolean;

    btnNuevoDetalle: boolean;
    btnEditarDetalle: boolean;
    btnEliminarDetalle: boolean;

    btnMenuPadre: boolean;
    btnMenuHijo: boolean;
    btnAdicionarEliminarMantenimiento: boolean;
    btnAdicionarEliminarRepuesto: boolean;
    btnAdicionarEliminar: boolean;

    constructor() {
        this.btnNuevo = false;
        this.btnEditar = false;
        this.btnEliminar = false;
        this.btnGrabar = false;
        this.btnCerrar = false;
        this.btnPDF = false;
        this.btnDownload = false;
        this.btnVisualizar = false;

        this.btnNuevoDetalle = false;
        this.btnEditarDetalle = false;
        this.btnEliminarDetalle = false;

        this.btnMenuPadre = false;
        this.btnMenuHijo = false;
        this.btnAdicionarEliminar = false;
        this.btnAdicionarEliminarMantenimiento = false;
        this.btnAdicionarEliminarRepuesto = false;
    }
}