import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { DemoService } from '../../../../../services/demo.service';
import { LanguageService } from '../../../../../services/language.service';
import { IGenerico } from '../../interfaces/generico.interface';
import { IStock } from '../../interfaces/stock.interface';
import { Subscription } from 'rxjs';
import { VentaCompartidoService } from '../../services/venta-compartido.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-modal-busqueda-generico',
  templateUrl: './modal-busqueda-generico.component.html',
  styleUrls: ['./modal-busqueda-generico.component.css']
})
export class ModalBusquedaGenericoComponent implements OnInit {

  @Input() isCodProDCI: string;
  @Input() isCodDCI: string;
  @Input() isCodAlmacen: string;

  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  isVisualizar: boolean = false;
  columnas: any;
  listModelo: IStock[];
  loading: boolean;
  subscription$: Subscription;
  isDescripcion: string;

  @Output() eventoCancelar = new EventEmitter<boolean>();

  constructor(public lenguageService: LanguageService,
              private readonly ventaCompartidoService: VentaCompartidoService) { }

  ngOnInit(): void {
    this.isDescripcion = '';
    this.buildColumnas();

    this.isCodProDCI = this.isCodProDCI === null ? '' : this.isCodProDCI;
    this.isCodProDCI = this.isCodProDCI === undefined ? '' : this.isCodProDCI;

    if (this.isCodProDCI !== ''){
      this.goListGenericoPorProDCI();
    }

  }

  private buildColumnas() {
    this.columnas = [
      { field: 'itemCode', header: 'Código' },
      { field: 'itemName', header: 'Nombre' },
      { field: 'u_SYP_CS_LABORATORIO', header: 'Laboratorio' },
      { field: 'price', header: 'Precio' },
      { field: 'onHandALM', header: 'Stock' },
      { field: 'onHand', header: 'Stock Total' }
    ];
  }

  goListGenericoPorProDCI() {
    // this.loading = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventaCompartidoService.getListGenericoPorProDCI(this.isCodProDCI)
    .subscribe((data: IGenerico[]) => {
      if (data.length > 0){
        this.isDescripcion = data[0].name;

        this.getListProductoGenerico(data[0]);
      }
    },
    (error) => {
      swal.fire(this.globalConstants.msgInfoSummary,error.error.resultadoDescripcion,'error')
    });
  }


  goGenericoSeleccionado(value: IGenerico) {
    this.getListProductoGenerico(value);
  }

  goGenericoCancelar(){

  }

  getListProductoGenerico(value: IGenerico) {
    this.loading = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventaCompartidoService.getListProductoGenericoPorDCI(this.isCodAlmacen, value.code, true)
    .subscribe((data: IStock[]) => {
      this.listModelo = [];
      this.listModelo = data;
      this.loading = false;
    },
    (error) => {
      this.loading = false;
      swal.fire(this.globalConstants.msgInfoSummary,error.error.resultadoDescripcion,'error')
    });
  }

  goCancelar() {
    this.eventoCancelar.emit(false);
  }

}
