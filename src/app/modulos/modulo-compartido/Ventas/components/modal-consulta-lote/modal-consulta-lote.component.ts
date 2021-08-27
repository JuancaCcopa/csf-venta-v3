import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import swal from'sweetalert2';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { Subscription } from 'rxjs';
import { IStock } from '../../interfaces/stock.interface';
import { VentaCompartidoService } from '../../services/venta-compartido.service';
import { map } from 'rxjs/operators';
import { IVentaDetalleLote } from '../../../../modulo-venta/interface/venta.interface';

@Component({
  selector: 'app-modal-consulta-lote',
  templateUrl: './modal-consulta-lote.component.html',
  styleUrls: ['./modal-consulta-lote.component.css']
})
export class ModalConsultaLoteComponent implements OnInit, OnDestroy {
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  @Input() isActivoVenta: boolean; // Llama al formulario desde la Venta
  @Input() isActivoDevolucion: boolean; // Lama al formulario desde la devolucion
  @Input() isActivoVerVenta: boolean; // Llama al formulario desde el visor de la venta
  @Input() isActivoProducto: boolean; // Llama al formulario desde el buscador del Producto

  @Input() IsActivaLote: boolean; // Indicador que si el producto trabaja por Lote
  @Input() IsActivaUbicacion: boolean; // Indicador que si el producto trabaja por Ubicacion

  @Input() isCodProducto: string;
  @Input() isCodAlmacen: string;
  @Input() isCantidadInput: number;
  @Input() isListVentaDetalleLote: IVentaDetalleLote[];
  @Input() isListLoteVta: IStock[];

  // Lista
  listModelo: any[];
  columnas: any;
  loading: boolean;

  subscription$: Subscription;

  @Output() eventoAceptar = new EventEmitter<IStock[]>();
  @Output() eventoSalir = new EventEmitter<boolean>();

  constructor(private ventaCompartidoService: VentaCompartidoService) { }

  ngOnInit(): void {
    debugger;
    this.buildColumnas();
    
    if (this.isActivoVenta || this.isActivoProducto) {
      if (this.IsActivaUbicacion){
        this.getListLoteUbicacionPorFiltro();
      } else {
        this.getListLotePorFiltro();
      }
    }

    if (this.isActivoVerVenta || this.isActivoDevolucion) {
      this.onListaDetalleLoteVenta();
    }
  }

  private buildColumnas() {

    if (this.isActivoDevolucion) {
      this.columnas = [
        { field: 'ubicaciondescripcion', header: 'Ubicación' },
        { field: 'cantidad', header: 'Qty. Ubi.' },
        { field: 'lote', header: 'Lote' },
        { field: 'fechavencimiento', header: 'Fecha Vencimiento' },
        { field: 'cantidad', header: 'Qty' },
        { field: 'cantidaddev', header: 'Qty Dev.' },
        { field: 'cantidadxdev', header: 'Qty x Dev.' }
      ];
    }

    if (this.isActivoProducto) {
      this.columnas = [
        { field: 'binCode', header: 'Ubicación' },
        { field: 'onHandQty', header: 'Qty. Ubi.' },
        { field: 'batchNum', header: 'Lote' },
        { field: 'expDate', header: 'Fecha Vencimiento' },
        { field: 'quantityLote', header: 'Qty. Lote' }
      ];
    }
    
    if (this.isActivoVenta) {
      this.columnas = [
        { field: 'binCode', header: 'Ubicación' },
        { field: 'onHandQty', header: 'Qty. Ubi.' },
        { field: 'batchNum', header: 'Lote' },
        { field: 'expDate', header: 'Fecha Vencimiento' },
        { field: 'quantityLote', header: 'Qty. Lote' },
        { field: 'quantityinput', header: 'Qty a vender' }
      ];
    }

    if (this.isActivoVerVenta) {
      this.columnas = [
        { field: 'ubicaciondescripcion', header: 'Ubicación' },
        { field: 'cantidad', header: 'Qty. Ubi.' },
        { field: 'lote', header: 'Lote' },
        { field: 'fechavencimiento', header: 'Fecha Vencimiento' },
        { field: 'cantidad', header: 'Qty' }
      ];
    }
  }

  getListLotePorFiltro() {
    this.loading = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventaCompartidoService.getListStockLotePorFiltro(this.isCodAlmacen, this.isCodProducto, true)
    .pipe(
      map((data: IStock[])=> {
        this.listModelo = data;

        if (this.isActivoVenta) {
          if (this.isListLoteVta !== null) {
            if (this.isListLoteVta !== undefined) {
              if (this.isListLoteVta.length > 0) {
                this.isListLoteVta.forEach( xFila => {
                  this.listModelo.find(xFind => xFind.batchNum === xFila.batchNum).quantityinput = xFila.quantityinput;
                });
              }
              else {
                this.onAsignaCantidadLote();
              }
            }
            else {
              this.onAsignaCantidadLote();
            }
          } else {
            this.onAsignaCantidadLote();
          }
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

  getListLoteUbicacionPorFiltro() {
    this.loading = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventaCompartidoService.getListStockUbicacionPorFiltro(this.isCodAlmacen, this.isCodProducto, true)
    .pipe(
      map((data: IStock[])=> {
        this.listModelo = data;
        if (this.isActivoVenta) {
          if (this.isListLoteVta !== null) {
            if (this.isListLoteVta !== undefined) {
              if (this.isListLoteVta.length > 0) {
                this.isListLoteVta.forEach( xFila => {
                  this.listModelo.find(xFind => xFind.batchNum === xFila.batchNum).quantityinput = xFila.quantityinput;
                });
              }
              else {
                this.onAsignaCantidadLote();
              }
            }
            else {
              this.onAsignaCantidadLote();
            }
          } else {
            this.onAsignaCantidadLote();
          }
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

  onAsignaCantidadLote() {
    this.listModelo.forEach(xFila => {

      xFila.quantityLote = xFila.quantityLote === null ? 0 : xFila.quantityLote;
      xFila.quantityLote = xFila.quantityLote === undefined ? 0 : xFila.quantityLote;

      if (this.isCantidadInput > 0) {

        if (this.isCantidadInput <= xFila.quantityLote) {
          xFila.quantityinput = this.isCantidadInput;
          this.isCantidadInput = 0;
        } else {
          xFila.quantityinput = 0;

          // Obteniendo diferencia
          let newResul = (this.isCantidadInput - xFila.quantityLote)

          xFila.quantityinput = this.isCantidadInput - newResul;
          this.isCantidadInput = newResul;
        }

      }
    });
    this.loading = false;
  }

  onListaDetalleLoteVenta() {
    this.listModelo = this.isListVentaDetalleLote;
  }

  goChangeCantidad(item: IVentaDetalleLote, index: number) {

    let cantidadxdevolver = item.cantidad - item.cantidaddev;

    if (item.cantidadxdev > cantidadxdevolver) {
      swal.fire( this.globalConstants.msgInfoSummary, `Solo puede devolver ${item.cantidad - item.cantidaddev} del producto seleccionado`, 'info');
      this.listModelo[index].cantidadxdev = cantidadxdevolver;
      return;
    }
  }

  goAceptar() {
    this.eventoAceptar.emit(this.listModelo);
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
