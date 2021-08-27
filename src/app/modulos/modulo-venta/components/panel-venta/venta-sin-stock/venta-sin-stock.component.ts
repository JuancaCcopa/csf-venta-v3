import { Component, OnInit } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { IResultBusquedaVenta, IVentaCabeceraSingle, IVentaCabeceraSinStock } from '../../../interface/venta.interface';
import { MenuItem } from 'primeng';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { MensajePrimeNgService } from '../../../../../services/mensaje-prime-ng.service';
import { ConfirmationService } from 'primeng/api';
import { VentasService } from '../../../services/ventas.service';
import { map } from 'rxjs/operators';
import { LanguageService } from '../../../../../services/language.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-venta-sin-stock',
  templateUrl: './venta-sin-stock.component.html',
  styleUrls: ['./venta-sin-stock.component.css']
})
export class VentaSinStockComponent implements OnInit {
  // Titulo del componente
  titulo = 'Seguimiento de Vale de Ventas - Sin Stock';
  tituloDetalle = "Venta"
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  listModelo: IResultBusquedaVenta[];
  modeloItem: IVentaCabeceraSingle;

  columnas: any;

  // PrimeNG
  items: MenuItem[];
  itemSeleccionadoGrilla: IResultBusquedaVenta;
  itemIndex: number;

  // Formulario
  formularioBusqueda: FormGroup;

  // Visualizar registro seleccionado
  isVerModalDetalle: boolean;
  isAnular: boolean;

  // Generar Entrega
  isDisplaySave: boolean;

  // loading
  loading: boolean;

  subscription$: Subscription;

  constructor(private readonly breadcrumbService: BreadcrumbService,
              private readonly formBuilder: FormBuilder,
              private readonly ventasService: VentasService,
              public lenguageService: LanguageService) {
    this.breadcrumbService.setItems([
      { label: 'Módulo Venta' },
      { label: 'Seguimiento de Vale de Ventas - Sin Stock', routerLink: ['module-ve/panel-venta'] }
    ]);
  }

  ngOnInit(): void {
  
    this.buildForm();    

    this.onHeaderGrilla();

    this.onOpcionesGrilla();
    
    this.goListar();
  }

  private buildForm() {
    this.formularioBusqueda = this.formBuilder.group({
      codcomprobante: [''],
      codventa: [''],
      fechaIni: [new Date],
      fechaFin: [new Date]
    });
  }

  private onHeaderGrilla() {
    this.columnas = [
      { field: 'flg_gratuito', header: 'Gratuito' },
      { field: 'codventa', header: 'Cod.Venta' },
      { field: 'tipomovimiento', header: 'T.Mov' },
      { field: 'nombretipocliente', header: 'T.Cliente' },
      { field: 'codatencion', header: 'Cod.Atención' },
      { field: 'codcomprobante', header: 'Comprobante' },
      { field: 'estado', header: 'Estado' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'montopaciente', header: 'Monto Pac.' },
      { field: 'montoaseguradora', header: 'Monto Aseg.' },
      
      { field: 'fechagenera', header: 'F.Generado' },
      { field: 'fechaemision', header: 'F.Emisión' }
    ];
  }

  onItemElegido(data: IResultBusquedaVenta, index: number) { 
    this.itemSeleccionadoGrilla = data;
    this.itemIndex = index;
  }

  private onOpcionesGrilla() {
    this.items = [
      {label: 'Generar Entrega', icon: 'fa fa-check', command: () => {
          this.onGenerarEntrega();
      }}
    ];
  }

  goListar() {
    let body = this.formularioBusqueda.value;
    this.listModelo = [];

    this.loading = true;

    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.getVentasSinStockPorFiltro(body.codcomprobante, body.codventa, body.fechaIni, body.fechaFin)
    .pipe(
      map((resp: IResultBusquedaVenta[]) => {
        this.listModelo = resp;
        this.loading = false;
      })
    )
    .subscribe(
      () => {},
      (error) => {
        this.loading = false;
        swal.fire(this.globalConstants.msgErrorSummary,error.error.resultadoDescripcion, 'error');
    });
  }

  onDetalle(data: IResultBusquedaVenta) {
    this.goGetVentaPorCodVenta(data.codventa,'DETALLE');
  }

  goCerrarDetalle() {
    this.isVerModalDetalle = !this.isVerModalDetalle;
  }

  goGetVentaPorCodVenta(codventa: string, opcion: string) {
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.getVentaPorCodVenta(codventa)
    .pipe(
      map((resp: IVentaCabeceraSingle) => {
        this.modeloItem = resp;
        this.isVerModalDetalle = !this.isVerModalDetalle;
        if (opcion === 'DETALLE')
          {
            this.isAnular = false;
          }
        if (opcion === 'ANULAR')
        {
          this.isAnular = true;
        }
      })
    )
    .subscribe();
  }

  private onGenerarEntrega() {

    let bodyVenta: IVentaCabeceraSinStock = {
      codventa : this.itemSeleccionadoGrilla.codventa
    }

    this.subscription$ = new Subscription();
    this.subscription$  = this.ventasService.setUpdateSinStockVenta( bodyVenta )
    .subscribe((resp: boolean) =>  {

      this.isDisplaySave = false;
      this.listModelo.splice(+this.itemIndex, 1);

      swal.fire(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail, 'success');
    },
      (error) => {
        this.isDisplaySave = false;
        swal.fire(this.globalConstants.msgErrorSummary,error.error.resultadoDescripcion, 'error');
    });
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
