import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { DemoService } from '../../../../services/demo.service';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { VentasService } from '../../services/ventas.service';
import { IVentaCabeceraSingle } from '../../interface/venta.interface';
import { IResultBusquedaComprobante } from '../../interface/comprobante.interface';
import { LanguageService } from '../../../../services/language.service';
import swal from'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-panel-comprobante',
  templateUrl: './panel-comprobante.component.html',
  styleUrls: ['./panel-comprobante.component.css']
})
export class PanelComprobanteComponent implements OnInit, OnDestroy {
  // Titulo del componente
  titulo = 'Comprobante';
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  listModelo: IResultBusquedaComprobante[];

  columnas: any;
  modeloItem: IVentaCabeceraSingle;
  // Visualizar registro seleccionado
  isVerModalDetalle: boolean;
  isAnular: boolean;
  // PrimeNG
  items: MenuItem[];

  // Formulario
  formularioBusqueda: FormGroup;
  itemSeleccionadoGrilla: IResultBusquedaComprobante;
  subscription$: Subscription;
  loading: boolean;

  // PDF Imprimir Venta
  isDisplayVisualizar: boolean;
  isDisplayVisualizarDocumento: boolean;
  isDataBlob: Blob;

  constructor(private breadcrumbService: BreadcrumbService,
              private readonly formBuilder: FormBuilder,
              private readonly ventasService: VentasService,
              public lenguageService: LanguageService) {
    this.breadcrumbService.setItems([
      { label: 'Módulo Venta' },
      { label: 'Consulta', routerLink: ['module-ve/panel-venta'] }
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
      fechaIni: [new Date],
      fechaFin: [new Date]
    });
  }

  private onHeaderGrilla(){
    this.columnas = [
      { field: 'codcomprobante', header: 'Comprobante' },
      { field: 'nombreestado', header: 'Estado' },
      { field: 'nombretipocliente', header: 'Tipo Cliente' },
      { field: 'codventa', header: 'Cod.Venta' },
      { field: 'codatencion', header: 'Cod.Atención' },
      { field: 'anombrede', header: 'Nombre' },
      { field: 'montototal', header: 'Monto sIGV (S/.).' },
      { field: 'montototaldolares', header: 'Monto sIGV ($).' },
      { field: 'moneda', header: 'Moneda' },
      { field: 'flg_gratuito', header: 'Gratuito' },
      { field: 'numeroplanilla', header: 'Nro Planilla' },
      { field: 'fechagenera', header: 'F.Generado' },
      { field: 'fechacancelacion', header: 'F.Cancelación' },
      { field: 'fechaanulacion', header: 'F.Anulación' }
    ];
  }

  private onOpcionesGrilla() {
    this.items = [
      {label: 'Imp.Venta', icon: 'fa fa-print ', command: () => {
        this.onImprimirVenta();
      }},
      {separator: true},
      {label: 'Imp.Comp', icon: 'fa fa-print ', command: () => {
        this.onImprimirComprobante();
      }},
      {label: 'PDF Electronico', icon: 'fa fa-print ', command: () => {
        this.onImprimirPDF();
      }}
    ];
  }

  onItemElegido(data: IResultBusquedaComprobante) { 
    this.itemSeleccionadoGrilla = data;
  }

  onDetalle(data: IResultBusquedaComprobante) {
    this.goGetVentaPorCodVenta(data.codventa,'DETALLE');
  }

  goListar() {
    let body = this.formularioBusqueda.value;
    this.listModelo = [];
    this.loading = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.getListaComprobantesPorFiltro(body.codcomprobante, body.fechaIni, body.fechaFin, 0)
    .pipe(
      map((resp: IResultBusquedaComprobante[]) => {
          this.listModelo = resp;
          this.loading = false;
        }
      )
    )
    .subscribe(  
    (resp) => {},
    (error) => {
      this.loading = false;
      swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion,'error')
    });
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
      })
    )
    .subscribe( (resp) => {},
    (error) => {
      swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion,'error')
    });
  }

  goCerrarDetalle() {
    this.isVerModalDetalle = !this.isVerModalDetalle;
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  onImprimirVenta() {
    this.isDisplayVisualizar =! this.isDisplayVisualizar;

    this.subscription$ = new Subscription();
    this.subscription$  = this.ventasService.getGenerarValeVentaPrint( this.itemSeleccionadoGrilla.codventa )
    .subscribe((resp: any) =>  {

      switch (resp.type) {
        case HttpEventType.DownloadProgress:
          break;
        case HttpEventType.Response:
          this.isDataBlob = new Blob([resp.body], {type: resp.body.type});
          this.isDisplayVisualizar =! this.isDisplayVisualizar;

          this.isDisplayVisualizarDocumento = !this.isDisplayVisualizarDocumento;
          break;
      }
    },
      (error) => {
        this.isDisplayVisualizar =! this.isDisplayVisualizar;
        swal.fire(this.globalConstants.msgErrorSummary,error.error.resultadoDescripcion, 'error');
    });

  }

  onImprimirComprobante() {

  }

  onImprimirPDF(){

  }
  
}
