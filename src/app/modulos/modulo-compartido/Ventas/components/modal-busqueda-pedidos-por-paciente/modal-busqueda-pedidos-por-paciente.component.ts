import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { Subscription } from 'rxjs';
import { VentaCompartidoService } from '../../services/venta-compartido.service';
import { IPedidoPorAtencion, IDetallePedidoPorPedido } from '../../interfaces/pedido-por-atencion.interface';
import { map } from 'rxjs/operators';
import { IHospital } from '../../../../modulo-venta/interface/venta.interface';
import swal from'sweetalert2';

@Component({
  selector: 'app-modal-busqueda-pedidos-por-paciente',
  templateUrl: './modal-busqueda-pedidos-por-paciente.component.html',
  styleUrls: ['./modal-busqueda-pedidos-por-paciente.component.css']
})
export class ModalBusquedaPedidosPorPacienteComponent implements OnInit, OnDestroy {
  
  @Input() isModeloHospital: IHospital;
  @Output() eventoCerrar = new EventEmitter();

  subscription$: Subscription;

  isChildrenNode: any[];
  isNode: TreeNode[];
  isSelectItemPedido: IPedidoPorAtencion;
  listDetallePedido: IDetallePedidoPorPedido[];

  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  columnas: any;

  isVisualizarProducto: boolean = false;
  isSeleccionItem: IDetallePedidoPorPedido;

  // loading
  loadingPedidos: boolean;
  loadingProductos: boolean;

  constructor(private ventaCompartidoService: VentaCompartidoService) { }

  ngOnInit(): void {
    
    this.onListarPedido();

    this.onHeaderGrilla();
  }

  private onHeaderGrilla() {
    this.columnas = [
      { field: 'codproducto', header: 'Código' },
      { field: 'tipoproducto', header: 'Tipo Producto' },
      { field: 'nombreproducto', header: 'Nombre' },
      { field: 'cantidad', header: 'Cantidad' },
      { field: 'codpedido', header: 'Pedido' }
    ];
  }

  private onListarPedido() {
    this.loadingPedidos = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventaCompartidoService.getListPedidosPorAtencion(this.isModeloHospital.codatencion)
    .pipe(
      map((resp: IPedidoPorAtencion[]) => {
        this.loadingPedidos = false;
        this.onBuildTreeNode(resp);
      })
    )
    .subscribe(
      (resp) => {},
      (error) => {
        this.loadingPedidos = false;
        swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion,'error')
      }
    );
  }

  onBuildTreeNode(resp: IPedidoPorAtencion[]) {
    this.isChildrenNode = [];
    for (let item of resp) {
      this.isChildrenNode.push({
        label: item.codpedido,
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

  goSelectNodePedido(data: any) {
    this.goListarDetallePedido(data.node.data.codpedido)
    this.isSelectItemPedido =  data.node.data;
  }

  goListarDetallePedido(codpedido: string) {
    this.loadingProductos = true;
    this.listDetallePedido = [];
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventaCompartidoService.getListPedidoDetallePorPedido(codpedido)
    .pipe(
      map((resp: IDetallePedidoPorPedido[]) => {
        this.listDetallePedido = resp;
        this.loadingProductos = false;
      })
    )
    .subscribe(
      (resp) => {},
      (error) => {
        this.loadingProductos = false;
        swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion,'error')
      }
    );
  }

  goCerrar() {
    this.eventoCerrar.emit();
  }

  goChangeVisibleProducto(event: IDetallePedidoPorPedido) {
    this.isSeleccionItem = event;
    this.isVisualizarProducto =!this.isVisualizarProducto; 
  }

  goSalirProducto() {
    this.isVisualizarProducto =!this.isVisualizarProducto;
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
