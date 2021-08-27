import { Component, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { DemoService } from '../../../../../services/demo.service';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { Subscription } from 'rxjs';
import { VentaCompartidoService } from '../../services/venta-compartido.service';
import { map } from 'rxjs/operators';
import { IVentaDevolucion, IVentaDevolucionSingle } from '../../../../modulo-venta/interface/venta.interface';
import { UtilService } from '../../../../../services/util.service';
import { IStock } from '../../interfaces/stock.interface';
import swal from'sweetalert2';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-busqueda-venta-por-atencion',
  templateUrl: './modal-busqueda-venta-por-atencion.component.html',
  styleUrls: ['./modal-busqueda-venta-por-atencion.component.css']
})
export class ModalBusquedaVentaPorAtencionComponent implements OnInit, OnDestroy {

  @Input() isCodAtencion: string;

  @Output() eventoAceptar = new EventEmitter<string>();
  @Output() eventoCerrar = new EventEmitter<boolean>();

  // listAtencion: TreeNode[];
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  
  columnas: any;
  listModelo: IVentaDevolucion[];
  listModeloProducto: IVentaDevolucion[];

  isChildrenNode: any[];
  isNode: TreeNode[];
  isSeleccionItem: IVentaDevolucion;

  // Visible
  isVisualizarProducto: boolean;
  isCodVenta: string;

  subscription$: Subscription;

  loading: boolean;
  loadingVentas: boolean;

  constructor(private readonly ventaCompartidoService: VentaCompartidoService,
              private readonly utilService: UtilService) { }

  ngOnInit(): void {
    this.goListar();

    this.onHeaderGrilla();
  }

  onHeaderGrilla() {
    this.columnas = [
      { field: 'codproducto', header: 'Código' },
      { field: 'nombreproducto', header: 'Nombre' },
      { field: 'cantidad', header: 'Cantidad' },
      { field: 'cnt_dev', header: 'Cantidad Dev.' },
      { field: 'nombrelaboratorio', header: 'Laboratorio' }
    ];
  }

  goListar() {
    this.listModelo = [];
    this.loadingVentas = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventaCompartidoService.getVentasPorAtencion(this.isCodAtencion)
    .pipe(
      map((resp: IVentaDevolucion[]) => {
          this.listModelo = resp;
          this.loadingVentas = false;
          this.onBuildTreeNode(resp);
        }
      )
    )
    .subscribe(  
    (resp) => {},
    (error) => {
      this.loadingVentas = false;
      swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion,'error')
    });
  }

  onBuildTreeNode(resp: IVentaDevolucion[]) {

    let listVenta: IVentaDevolucionSingle [] = [];

    for (let item of resp) {

      let exists = listVenta.filter(xFila => xFila.codventa === item.codventa).length;

      if (exists === 0) {
        listVenta.push({codventa: item.codventa, fechaemision: item.fechaemision})
      }
      
    }

    this.isChildrenNode = [];
    for (let item of listVenta) {
      this.isChildrenNode.push({
        label: item.codventa + ' => VENTA ' + this.utilService.fecha_DDMMYYYYHHMM(item.fechaemision),
        data: item,
        expandedIcon: 'fa fa-medkit',
        collapsedIcon: 'fa fa-medkit'
      });
    }

    this.isNode = [];
    this.isNode.push({
      label: 'TODOS',
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder',
      expanded: true,
      children: this.isChildrenNode
    });

  }

  goSelectNodeVenta(data: any) {
    this.onListarDetalleVenta(data.node.data.codventa)
    this.isCodVenta = data.node.data.codventa;
  }

  onListarDetalleVenta(codventa: string) {
    this.loading = true;
    this.listModeloProducto = [];
    this.listModeloProducto = [...this.listModelo].filter(xFila => xFila.codventa === codventa );
    this.loading = false;
  }

  goChangeVisibleProducto(event: IVentaDevolucion) {
    this.isSeleccionItem = event;
    this.isVisualizarProducto =!this.isVisualizarProducto; 
  }

  goLimpiar() {
    this.onBuildTreeNode(this.listModelo);
  }

  goAceptarProducto(event: IStock) {
    
    let data = [...this.listModelo].filter(xFila => xFila.codproducto === event.itemCode);

    this.onBuildTreeNode(data);

  }

  goSalirProducto() {
    this.isVisualizarProducto =!this.isVisualizarProducto;
  }

  goAceptar() {
    if (this.isCodVenta === null || this.isCodVenta === '') {
      swal.fire(this.globalConstants.msgExitoSummary, 'Seleccionar Venta...!!!', 'info')
      return;
    }

    this.eventoAceptar.emit(this.isCodVenta);
  }

  goSalir() {
    this.eventoCerrar.emit(false);
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
