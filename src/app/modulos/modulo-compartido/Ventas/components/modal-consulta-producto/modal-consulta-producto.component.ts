import { Component, Input, OnInit, OnDestroy, OnChanges, Output, EventEmitter } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VentaCompartidoService } from '../../services/venta-compartido.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProducto } from '../../interfaces/producto.interface';
import { IStock } from '../../interfaces/stock.interface';
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';
import swal from'sweetalert2';

@Component({
  selector: 'app-modal-consulta-producto',
  templateUrl: './modal-consulta-producto.component.html',
  styleUrls: ['./modal-consulta-producto.component.css']
})
export class ModalConsultaProductoComponent implements OnInit, OnDestroy, OnChanges {
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  @Input() isCodigoProducto: string;
  @Input() isVisualizarProducto: boolean = false;
  @Output() eventoSalir = new EventEmitter<boolean>();

  modelo: IProducto;
  listStock: IStock[];

  columnas: any;

  formulario: FormGroup;

  loading: boolean;
  subscription$: Subscription;

  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;
  
  constructor(private ventaCompartidoService: VentaCompartidoService,
              private readonly fbc: FormBuilder) { }

  ngOnChanges() {
    if (this.isVisualizarProducto) {
      this.getListProductoPorFiltro();
    }
  }
          
  ngOnInit(): void {
    this.listStock = [];
    this.buildForm();
    this.buildColumnas();
    
  }

  private buildForm() {
    this.formulario = this.fbc.group({
      codigo: [{value: null, disabled: true}],
      nombre: [{value: null, disabled: true}],
      precio: [{value: 0, disabled: true}],
      stock: [{value: 0, disabled: true}],
      solicitado: [{value: 0, disabled: true}],
      reservado: [{value: 0, disabled: true}]
    });
  }

  private buildColumnas() {
    this.columnas = [
      { field: 'whsName', header: 'Almacén' },
      { field: 'onHandALM', header: 'Stock' },
      { field: 'onOrderALM', header: 'Solicitado' },
      { field: 'isCommitedALM', header: 'Reservado' }
    ];
  }

  getListProductoPorFiltro() {
    this.loading = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventaCompartidoService.getProductoyStockAlmacenesPorCodigo(this.isCodigoProducto)
    .pipe(
      map((data: IProducto)=> {
        this.listStock = data.listStockAlmacen;
        if (this.listStock.length > 0) {
          this.goSetDatosProducto(data.listStockAlmacen[0]);
        }
        this.loading = false;
      }
    ))
    .subscribe(()=> {},
    (error) => {
      this.loading = false;
      swal.fire(this.globalConstants.msgInfoSummary,error.error.resultadoDescripcion,'error')
    });
  }

  goSetDatosProducto(value: IStock) {

    if (value !== null) {
      this.formulario.patchValue({
        precio: value.price,
        stock: value.onHand,
        solicitado: value.onOrder,
        reservado: value.isCommited
      });
    }
  }

  goSalir() {
    this.eventoSalir.emit(true);
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
