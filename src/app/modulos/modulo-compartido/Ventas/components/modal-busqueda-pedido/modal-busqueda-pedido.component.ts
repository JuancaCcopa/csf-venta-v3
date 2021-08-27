import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { LanguageService } from '../../../../../services/language.service';
import { ITabla } from '../../../../modulo-venta/interface/tabla.interface';
import { Subscription } from 'rxjs';
import { VentasService } from '../../../../modulo-venta/services/ventas.service';
import { map } from 'rxjs/operators';
import { SelectItem } from 'primeng';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VentaCompartidoService } from '../../services/venta-compartido.service';
import { IListarPedido } from '../../interfaces/pedido-por-atencion.interface';
import swal from'sweetalert2';

@Component({
  selector: 'app-modal-busqueda-pedido',
  templateUrl: './modal-busqueda-pedido.component.html',
  styleUrls: ['./modal-busqueda-pedido.component.css']
})
export class ModalBusquedaPedidoComponent implements OnInit, OnDestroy {
  
  @Input() append: any;

  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  listTablaTipoPedido: SelectItem[];

  subscription$: Subscription;
  // Formulario
  formularioBusqueda: FormGroup;
  seleccionItem: IListarPedido;
  columnas: any;
  listModelo: IListarPedido[];
  loading: boolean;

  @Output() eventoAceptar = new EventEmitter<IListarPedido>();
  @Output() eventoCancelar = new EventEmitter<IListarPedido>();

  constructor(public lenguageService: LanguageService,
              private readonly ventasService: VentasService,
              private readonly ventaCompartidoService: VentaCompartidoService,
              private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.onHeaderGrilla();
    this.onListarTipoPedido();
    this.buildForm();
    this.goListarPedido();
  }
  
  onListarTipoPedido(){
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.getListTablaClinicaPorFiltros('TIPOPEDIDO', '', 34, 0, 5)
    .pipe(
      map((resp: ITabla[]) => {
        this.listTablaTipoPedido = [];
        for (let item of resp) {
          this.listTablaTipoPedido.push({ value: item.codigo.trim(), label: item.nombre.trim() })
        }
      })
    )
    .subscribe();
  }

  private buildForm() {
    this.formularioBusqueda = this.formBuilder.group({
      tipopedido: [null],
      fechainicio: [new Date()],
      fechafin: [new Date()],
      codpedido: ['']
    });
  }

  private onHeaderGrilla() {
    this.columnas = [
      { field: 'estimpresiondsc', header: 'Estado Desc.' },
      { field: 'tiplistadodsc', header: 'Listado Desc.' },
      { field: 'codventa', header: 'codVenta' },
      { field: 'codpedido', header: 'codPedido' },
      { field: 'codatencion', header: 'codAtencion' },
      { field: 'fechagenera', header: 'Fec. Genera' },
      { field: 'fechaatencion', header: 'Fec. Atención' },
      { field: 'nompaciente', header: 'Nombre Paciente' },
      { field: 'cama', header: 'Cama' },
      { field: 'nomcentro', header: 'Centro Costo' },
      { field: 'nomobservacion', header: 'Observación' },
      { field: 'nomusuario', header: 'Usuario' },
      { field: 'nomalmacen', header: 'Almacen' }
    ];
  }

  goListarPedido(){

    const body = this.formularioBusqueda.value;

    let tipoPedido = body.tipopedido === null ? '' : body.tipopedido.value

    this.loading = true;

    this.subscription$ = new Subscription();
    this.subscription$ = this.ventaCompartidoService.getListPedidosPorFiltro(tipoPedido, body.fechainicio, body.fechafin, body.codpedido)
    .pipe(
      map((resp: IListarPedido[]) => {

        this.loading = false;
        this.listModelo = resp;
      })
    )
    .subscribe(() => {},
    (error) => {
      this.loading = false;
      swal.fire(this.globalConstants.msgInfoSummary,error.error.resultadoDescripcion,'error')
    });
  }

  clickAceptar() {
    this.LimpiarFiltroBusqueda();

    if (this.seleccionItem.tipomovimiento === 'CD') {
      swal.fire(this.globalConstants.msgInfoSummary,'Nro. de pedido es devolución','info')
      return;
    }

    if (this.seleccionItem.tipomovimiento !== 'DV') {
      swal.fire(this.globalConstants.msgInfoSummary,'Nro. de pedido no es de venta','info')
      return;
    }

    if (this.seleccionItem.estimpresion !== 'G') {
      swal.fire(this.globalConstants.msgInfoSummary,'Verifique el estado del Pedido','info')
      return;
    }

    this.eventoAceptar.emit(this.seleccionItem);
  }

  clickCancelar() {
    this.LimpiarFiltroBusqueda();
    this.eventoCancelar.emit();
  }

  private LimpiarFiltroBusqueda() {
    this.formularioBusqueda.patchValue({
      tipopedido: '',
      fechainicio: new Date(),
      fechafin: new Date(),
      codpedido: ''
    });
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
