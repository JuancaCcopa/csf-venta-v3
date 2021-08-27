import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../../constants/globals-constants-form';
import { IValeDelivery } from '../../../../../modulo-venta/interface/vale-delivery';
import { Subscription } from 'rxjs';
import { VentaCompartidoService } from '../../../services/venta-compartido.service';
import { UserContextService } from '../../../../../../services/user-context.service';
import { VentasService } from '../../../../../modulo-venta/services/ventas.service';
import { map } from 'rxjs/operators';
import swal from'sweetalert2';

@Component({
  selector: 'app-lista-vale-delivery',
  templateUrl: './lista-vale-delivery.component.html',
  styleUrls: ['./lista-vale-delivery.component.css']
})
export class ListaValeDeliveryComponent implements OnInit, OnDestroy {
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  columnas: any;
  listModelo: IValeDelivery[];
  isModeloValeDelivery: IValeDelivery;

  // loading
  loading: boolean;
  // Subscription
  subscription$: Subscription;

  isVisibleValeDelivery: boolean;

  @Output() eventCancelar = new EventEmitter<boolean>();

  constructor(private readonly ventaService: VentasService,
              private readonly userContextService: UserContextService) { }

  ngOnInit(): void {
    this.buildColumnas();
    this.goValeDeliveryPorCodAtencion();
  }

  private buildColumnas() {
    this.columnas = [
      { field: 'idvaledelivery', header: 'Id' },
      { field: 'codatencion', header: 'Cod.Atencion' },
      { field: 'nombrepaciente', header: 'Nombre Paciente' },
      { field: 'telefono', header: 'Telefono' },
      { field: 'celular', header: 'Celular' },
      { field: 'direccion', header: 'Dirección' },
      { field: 'distrito', header: 'Distrito' },
      { field: 'referencia', header: 'Referencia' }
    ];
  }

  goValeDeliveryPorCodAtencion() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventaService.getListValeDeliveryPorCodAtencion('')
    .pipe(
      map((resp: IValeDelivery[]) => {
        this.listModelo = [];
        this.listModelo = resp;
      })
    )
    .subscribe((resp) => {},
    (error) => {
      swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion,'error')
    });
  }

  goModificar(value: IValeDelivery) {
    this.isModeloValeDelivery = value;
    this.isVisibleValeDelivery = !this.isVisibleValeDelivery;
  }

  goCancelar() {
    this.eventCancelar.emit(false);
  }

  goValeDeliveryAceptar() {
    this.isVisibleValeDelivery = !this.isVisibleValeDelivery;
  }

  goValeDeliveryCancelar() {
    this.isVisibleValeDelivery = !this.isVisibleValeDelivery;
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
