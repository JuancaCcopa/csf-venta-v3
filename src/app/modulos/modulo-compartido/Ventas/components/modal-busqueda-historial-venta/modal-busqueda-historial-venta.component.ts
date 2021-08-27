import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IVentaDetalle } from '../../../../modulo-venta/interface/venta.interface';
import { map } from 'rxjs/operators';
import { VentaCompartidoService } from '../../services/venta-compartido.service';
import { IProductoHistorial } from '../../interfaces/producto.interface';
import swal from'sweetalert2';

@Component({
  selector: 'app-modal-busqueda-historial-venta',
  templateUrl: './modal-busqueda-historial-venta.component.html',
  styleUrls: ['./modal-busqueda-historial-venta.component.css']
})
export class ModalBusquedaHistorialVentaComponent implements OnInit {

  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  subscription$: Subscription;
  // Formulario
  formularioBusqueda: FormGroup;
  seleccionItem: IVentaDetalle;
  columnas: any;
  listModelo: IVentaDetalle[];
  listModeloProducto: IProductoHistorial[];

  isEtiquetaBoton: string;
  isDetalleVentas: boolean;
  loading: boolean;

  @Input() isCodPaciente: string;
  @Output() eventoCancelar = new EventEmitter<IVentaDetalle>();

  constructor(private readonly ventaCompartidoService: VentaCompartidoService,
              private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.listModeloProducto = [];
    this.isEtiquetaBoton = 'Detalle Ventas';
    this.isDetalleVentas = true;

    this.buildForm();
    this.onHeaderGrilla();
  }

  private buildForm() {
    this.formularioBusqueda = this.formBuilder.group({
      cuantosmesesantes: [0]
    });
  }

  private onHeaderGrilla() {
    if (!this.isDetalleVentas) {
      this.columnas = [
        { field: 'codventa', header: 'Cod.Venta' },
        { field: 'tipomovimiento', header: 'Tip.Mov.' },
        { field: 'fechaemision', header: 'Fec.Emisión' },
        { field: 'codproducto', header: 'Código' },
        { field: 'nombreproducto', header: 'Nombre' },
        { field: 'cantidad', header: 'Cantidad' },
        { field: 'stockfraccion', header: 'Stk.Fracción' }
      ];
    } else {
      this.columnas = [
        { field: 'codproducto', header: 'Código' },
        { field: 'nombreproducto', header: 'Nombre' },
        { field: 'cantidad', header: 'Qty.Vta' },
        { field: 'cantidadDevolucion', header: 'Qty.Dev' },
        { field: 'stockfraccion', header: 'Stk.Fracción' }
      ];
    }
    
  }

  goListarHistorialVentaPaciente(){

    const body = this.formularioBusqueda.value;

    let cuantosmesesantes = body.cuantosmesesantes === null ? 0 : body.cuantosmesesantes;
    this.loading = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventaCompartidoService.getVentasChequea1MesAntes(this.isCodPaciente, cuantosmesesantes)
    .pipe(
      map((resp: IVentaDetalle[]) => {
        this.loading = false;
        this.listModelo = resp;

        this.listModelo.forEach(xFila => {
          
          let existe = this.listModeloProducto.filter(xProducto => xProducto.codproducto === xFila.codproducto).length;
          debugger;
          if (existe === 0) {
            if(xFila.tipomovimiento === 'DV') {
              this.listModeloProducto.push({codproducto: xFila.codproducto, nombreproducto: xFila.nombreproducto, cantidad: xFila.cantidad, cantidadDevolucion: 0, stockfraccion: xFila.stockfraccion});
            } else {
              this.listModeloProducto.push({codproducto: xFila.codproducto, nombreproducto: xFila.nombreproducto, cantidad: 0, cantidadDevolucion: xFila.cantidad, stockfraccion: xFila.stockfraccion});
            }
          } else {
            if(xFila.tipomovimiento === 'DV') {
              this.listModeloProducto.find(xProducto => xProducto.codproducto === xFila.codproducto).cantidad += xFila.cantidad;
            } else {
              this.listModeloProducto.find(xProducto => xProducto.codproducto === xFila.codproducto).cantidadDevolucion += xFila.cantidad;
            }
          }
        });

      })
    )
    .subscribe(
      () => {},
      (error) => {
        this.loading = false;
        swal.fire(this.globalConstants.msgInfoSummary,error.error.resultadoDescripcion,'error')
      }
    );
  }

  goCambiarVistar() {
    this.isDetalleVentas =!this.isDetalleVentas;
    if (this.isDetalleVentas) {
      this.isEtiquetaBoton = 'Listar Produtos';
    } else {
      this.isEtiquetaBoton = 'Detalle Ventas';
    }
    
    this.onHeaderGrilla();

  }

  clickCancelar() {
    this.eventoCancelar.emit();
  }

}
