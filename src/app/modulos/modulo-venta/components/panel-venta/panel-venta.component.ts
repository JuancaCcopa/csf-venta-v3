import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { MenuItem } from 'primeng';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { VentasService } from '../../services/ventas.service';
import { IResultBusquedaVenta, IVentaCabeceraSingle } from '../../interface/venta.interface';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../../../services/language.service';
import { Router } from '@angular/router';
import swal from'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-panel-venta',
  templateUrl: './panel-venta.component.html',
  styleUrls: ['./panel-venta.component.css']
})
export class PanelVentaComponent implements OnInit, OnDestroy {
  // Titulo del componente
  titulo = 'Venta Consulta';
  tituloDetalle = "Venta"
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  listModelo: IResultBusquedaVenta[];
  modeloItem: IVentaCabeceraSingle;

  columnas: any;

  // PrimeNG
  items: MenuItem[];
  itemSeleccionadoGrilla: IResultBusquedaVenta;

  // Formulario
  formularioBusqueda: FormGroup;

  // Visualizar registro seleccionado
  isVerModalDetalle: boolean;
  isAnular: boolean;
  isDisplayVisualizar: boolean;
  isDisplayVisualizarDocumento: boolean;
  isDataBlob: Blob;
  subscription$: Subscription;

  constructor(private readonly breadcrumbService: BreadcrumbService,
              private readonly formBuilder: FormBuilder,
              private readonly ventasService: VentasService,
              public lenguageService: LanguageService,
              private readonly router: Router) {
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
      codventa: [''],
      fechaIni: [new Date],
      fechaFin: [new Date]
    });
  }

  private onHeaderGrilla() {
    this.columnas = [
      { field: 'codventa', header: 'Cod.Venta' },
      { field: 'tipomovimiento', header: 'T.Mov' },
      { field: 'nombretipocliente', header: 'T.Cliente' },
      { field: 'codatencion', header: 'Cod.Atención' },
      { field: 'codcomprobante', header: 'Comprobante' },
      { field: 'estado', header: 'Estado' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'montopaciente', header: 'Monto Pac.' },
      { field: 'montoaseguradora', header: 'Monto Aseg.' },
      { field: 'flg_gratuito', header: 'Gratuito' },
      { field: 'fechagenera', header: 'F.Generado' },
      { field: 'fechaemision', header: 'F.Emisión' },
      { field: 'codpedido', header: 'Nro.Pedido' },
      { field: 'codcliente', header: 'Cod.Cliente' },
      { field: 'codpaciente', header: 'Cod.Paciente' }
    ];
  }

  onItemElegido(data: IResultBusquedaVenta) { 
    this.itemSeleccionadoGrilla = data;
  }

  private onOpcionesGrilla() {
    this.items = [
      {label: this.globalConstants.cAnular, icon: this.globalConstants.icoCancelar, command: () => {
        this.onAnular();
      }},
      {separator: true},
      {label: this.globalConstants.cCaja, icon: this.globalConstants.icoCaja, command: () => {
        this.onCaja();
      }},
      {separator: true},
      {label: this.globalConstants.cImprimir, icon: this.globalConstants.icoImprimir, command: () => {
        this.onImprimirVenta();
      }},
      {label: this.globalConstants.cImprimirVencimiento, icon: this.globalConstants.icoImprimir, command: () => {
        this.onImprimirVencimiento();
      }},
      {separator: true},
      {label: this.globalConstants.cImprimirComprobante, icon: this.globalConstants.icoImprimir, command: () => {
        this.onImprimirComprobante();
      }},
      {label: this.globalConstants.cPdfElectronico, icon: this.globalConstants.icoImprimir, command: () => {
        this.onImprimirPDF();
      }}
    ];
  }

  goListar() {
    let body = this.formularioBusqueda.value;
    this.listModelo = [];
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.getVentasPorFiltro(body.codcomprobante, body.codventa, body.fechaIni, body.fechaFin)
    .pipe(
      map((resp: IResultBusquedaVenta[]) => {
        this.listModelo = resp;
      })
    )
    .subscribe(
      (resp) => {},
      (error) => {
        swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion,'error')
      }
    );
  }

  onDetalle(data: IResultBusquedaVenta) {
    this.goGetVentaPorCodVenta(data.codventa,'DETALLE');
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
    .subscribe((resp) => {},
    (error) => {
      swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion,'error')
    });
  }

  goCerrarDetalle() {
    this.isVerModalDetalle = !this.isVerModalDetalle;
  }

  private onAnular() {

    if (this.itemSeleccionadoGrilla.estado === 'C' && this.itemSeleccionadoGrilla.codcomprobante.trim() !== '') {
      swal.fire(this.globalConstants.msgErrorSummary, `No puede anular la venta ${this.itemSeleccionadoGrilla.codventa}, tiene comprobante`,'error');
      return;
    }

    if (this.itemSeleccionadoGrilla.tipomovimiento !== 'DV') {
      swal.fire(this.globalConstants.msgErrorSummary, `No puede anular la venta  ${this.itemSeleccionadoGrilla.codventa}, no es una venta`,'error');
      return;
    }

    if (this.itemSeleccionadoGrilla.usuarioanulacion.trim() !== '') {
      swal.fire(this.globalConstants.msgErrorSummary, `La venta ${this.itemSeleccionadoGrilla.codventa} se encuentra ANULADA`,'error');
      return;
    }

    this.goGetVentaPorCodVenta(this.itemSeleccionadoGrilla.codventa,'ANULAR');
  }

  onCaja() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.getVentaPorCodVenta(this.itemSeleccionadoGrilla.codventa)
    .pipe(
      map((resp: IVentaCabeceraSingle) => {
        this.modeloItem = resp;
        
        if (this.modeloItem.estado === 'C') {
          swal.fire(this.globalConstants.msgErrorSummary, `NO puede hacer comprobante, Venta tiene Comprobante`,'error');
          return;
        }

        if (this.modeloItem.tipomovimiento !== 'DV') {
          swal.fire(this.globalConstants.msgErrorSummary, `NO puede hacer comprobante, verifique venta`,'error');
          return;
        }

        let codatencion = this.modeloItem.codatencion === '' ? null : this.modeloItem.codatencion;
        codatencion = codatencion === undefined ? null : codatencion;

        if (codatencion !== null) {
          if (codatencion.substring(0,1) === 'H') {
            swal.fire(this.globalConstants.msgErrorSummary, `Atenciones de tipo 'H' no se facturan`,'error');
            return;
          }
        }

        let usuarioanulacion = this.modeloItem.usuarioanulacion === '' ? null : this.modeloItem.usuarioanulacion;
        usuarioanulacion = usuarioanulacion === undefined ? null : usuarioanulacion;

        if (usuarioanulacion !== null) {
          swal.fire(this.globalConstants.msgErrorSummary, `La venta se encuentra anulada`,'error');
          return;
        }

        if (this.modeloItem.estado === 'G' && this.modeloItem.tipomovimiento === 'DV') {
          this.router.navigate(['/main/modulo-ve/panel-caja'], {queryParams: {codventa: this.modeloItem.codventa}});
        }
      })
    )
    .subscribe((resp) => {},
    (error) => {
      swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion,'error')
    });
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

  onImprimirVencimiento(){
    this.isDisplayVisualizar =! this.isDisplayVisualizar;

    this.subscription$ = new Subscription();
    this.subscription$  = this.ventasService.getGenerarValeVentaLotePrint( this.itemSeleccionadoGrilla.codventa )
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

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
