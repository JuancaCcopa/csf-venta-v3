import { Component, EventEmitter, OnInit, Output, OnDestroy, Input } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { VentaCompartidoService } from '../../services/venta-compartido.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import swal from'sweetalert2';
import { map } from 'rxjs/operators';
import { IStock } from '../../interfaces/stock.interface';
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';

@Component({
  selector: 'app-modal-busqueda-producto',
  templateUrl: './modal-busqueda-producto.component.html',
  styleUrls: ['./modal-busqueda-producto.component.css']
})
export class ModalBusquedaProductoComponent implements OnInit, OnDestroy {
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  listModelo: IStock[];
  listModeloGenerico: IStock[];

  seleccionItem: IStock;
  seleccionModeloItem: IStock;

  isVisualizar: boolean = false;

  columnas: any;
  columnasGenerico: any;

  formularioBusqueda: FormGroup;
  formularioVisor: FormGroup;

  subscription$: Subscription;

  loading: boolean;
  loadingGenerico: boolean;

  @Input() isCodAlmacen: string;
  @Input() isCodAseguradora: string;
  @Input() isCodContratante: string;
  @Input() isHabilitaBotonPedido: boolean;

  @Output() eventoAceptar = new EventEmitter<IStock>();
  @Output() eventoCancelar = new EventEmitter<IStock>();

  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;

  isVisualizarProducto: boolean = false;
  isVisualizarLote: boolean = false;

  constructor(private ventaCompartidoService: VentaCompartidoService,
              private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.seleccionItem = null;
    this.listModeloGenerico = [];
    this.buildForm();
    this.buildFormVisor();
    this.buildColumnas();
  }

  private buildForm() {
    this.formularioBusqueda = this.fb.group({
      codigo: [''],
      nombre: ['']
    });
  }

  private buildFormVisor() {
    this.formularioVisor = this.fb.group({
      nombreVisor: [null],
    });
  }

  private buildColumnas() {
    this.columnas = [
      { field: 'itemCode', header: 'Código' },
      { field: 'lote', header: 'Lote/Ubi' },
      { field: 'itemName', header: 'Nombre' },
      { field: 'u_SYP_CS_LABORATORIO', header: 'Laboratorio' },
      { field: 'price', header: 'Precio' },
      { field: 'onHandALM', header: 'Stock' }
    ];

    this.columnasGenerico = [
      { field: 'itemCode', header: 'Código' },
      { field: 'lote', header: 'Lote/Ubi' },
      { field: 'itemName', header: 'Nombre' },
      { field: 'u_SYP_CS_LABORATORIO', header: 'Laboratorio' },
      { field: 'price', header: 'Precio' },
      { field: 'onHandALM', header: 'Stock' }
    ];
  }

  getProductoPorCodigo() {
    const formBody = this.formularioVisor.value;

    if (this.isCodAlmacen === null) {
      swal.fire(this.globalConstants.msgInfoSummary,`Ingresar Almacén a consultar`,'info')
      return;
    }

    if (formBody.nombreVisor === null) {
      swal.fire(this.globalConstants.msgInfoSummary,`Ingresar Código a consultar`,'info')
      return;
    }

    if (formBody.nombreVisor.length === 0) {
      swal.fire(this.globalConstants.msgInfoSummary,`Ingresar Código a consultar`,'info')
      return;
    }

    if (formBody.nombreVisor.length !== 8) {
      swal.fire(this.globalConstants.msgInfoSummary,`Código a consultar Incorrecto`,'info')
      return;
    }

    this.subscription$ = new Subscription();
    this.subscription$ = this.ventaCompartidoService.getListStockPorProductoAlmacen(this.isCodAlmacen, formBody.nombreVisor)
    .subscribe((data: IStock[]) => {

      if (data.length > 0) {
        this.eventoAceptar.emit(data[0]);
        this.LimpiarFiltroBusqueda();
      }
      else 
      {
        swal.fire(this.globalConstants.msgInfoSummary,'No existe producto y/o stock','error')
      }
    },
    (error) => {
      swal.fire(this.globalConstants.msgInfoSummary,error.error.resultadoDescripcion,'error')
    });
  }

  getListProductoPorFiltro() {
    const formBody = this.formularioBusqueda.value;

    if (this.isCodAlmacen === undefined) {
      swal.fire({
       title: this.globalConstants.msgInfoSummary,
        text: `Ingresar Almacén a consultar`,
        icon: 'error'
      })
      return;
    }

    if (this.isCodAlmacen === null) {
      swal.fire(this.globalConstants.msgInfoSummary,`Ingresar Almacén a consultar`,'info')
      return;
    }

    if (formBody.codigo.length === 0 && formBody.nombre.length === 0) {
      swal.fire(this.globalConstants.msgInfoSummary,`Ingresar Código a consultar`,'info')
      return;
    }

    if (formBody.codigo.length === 0 && formBody.nombre.length < 3) {
      swal.fire(this.globalConstants.msgInfoSummary,`Nombre debe de tener 3 caracteres como minímo`,'info')
      return;
    }

    if (formBody.codigo.length > 0 && formBody.codigo.length < 8) {
      swal.fire(this.globalConstants.msgInfoSummary,`Código tiene 8 caracteres`,'info')
      return;
    }

    // Enviar Almacen
    // isCodAlmacen

    this.loading = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventaCompartidoService.getListStockPorFiltro(this.isCodAlmacen, formBody.nombre, formBody.codigo, true)
    .pipe(
      map((data: IStock[])=> {
        this.listModelo = [];
        debugger;
        this.listModelo = data;

        this.listModeloGenerico = [];
        this.loading = false;
      }
    ))
    .subscribe(()=> {},
    (error) => {
      this.loading = false;
      swal.fire(this.globalConstants.msgInfoSummary,error.error.resultadoDescripcion,'error')
    });
  }

  getListProductoGenericoPorCodigo() {
    if (this.seleccionItem === null) {
      return;
    }

    if (this.seleccionItem.u_SYP_CS_PRODCI === null) {
      swal.fire(this.globalConstants.msgInfoSummary, 'Código Prod.DCI en Blanco','error')
      return;
    }

    if (this.seleccionItem.u_SYP_CS_PRODCI === undefined) {
      swal.fire(this.globalConstants.msgInfoSummary, 'Código Prod.DCI en Blanco','error')
      return;
    }

    this.loadingGenerico = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventaCompartidoService.getListProductoGenericoPorCodigo(this.isCodAlmacen, this.seleccionItem.u_SYP_CS_PRODCI, true)
    .subscribe((data: IStock[]) => {
      this.listModeloGenerico = [];
      this.listModeloGenerico = data;
      this.loadingGenerico = false;
    },
    (error) => {
      this.loadingGenerico = false;
      swal.fire(this.globalConstants.msgInfoSummary,error.error.resultadoDescripcion,'error')
    });
  }

  goClearGenerico() {
    this.listModeloGenerico = [];
  }

  clickAceptar() {
    this.isVisualizar = false;
    this.eventoAceptar.emit(this.seleccionItem);

    if (this.isCodAlmacen === '*')
    {
      this.formularioVisor.patchValue({
        nombreVisor: this.seleccionItem.itemName,
      });
    }

    this.LimpiarFiltroBusqueda();
  }

  clickCancelar() {
    this.LimpiarFiltroBusqueda();
    this.isVisualizar = false;
    this.eventoCancelar.emit();
  }

  private LimpiarFiltroBusqueda() {
    this.formularioBusqueda.patchValue({
      codigo: '',
      nombre: ''
    });

    this.listModelo = [];
    this.goClearGenerico();
  }

  goChangeVisibleProducto(event: IStock) {
    this.seleccionModeloItem = event;
    this.isVisualizarProducto =!this.isVisualizarProducto; 
  }

  goSalirProducto() {
    this.isVisualizarProducto =!this.isVisualizarProducto; 
  }

  goSalirLote() {
    this.isVisualizarLote =!this.isVisualizarLote; 
  }

  goChangeVisibleLote(event: IStock) {
    this.seleccionModeloItem = event;
    this.isVisualizarLote =!this.isVisualizarLote; 
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
