import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { LanguageService } from '../../../../../services/language.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IResultBusquedaVenta, IVentaCabeceraSingle } from '../../../interface/venta.interface';
import { VentasService } from '../../../services/ventas.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from'sweetalert2';

@Component({
  selector: 'app-venta-pendiente',
  templateUrl: './venta-pendiente.component.html',
  styleUrls: ['./venta-pendiente.component.css']
})
export class VentaPendienteComponent implements OnInit {
  // Titulo del componente
  titulo = 'Venta Pendiente';
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  listModelo: IResultBusquedaVenta[];
  modeloItem: IVentaCabeceraSingle;
  columnas: any;

  // Formulario
  formularioBusqueda: FormGroup;
  // Visualizar registro seleccionado
  isVerModalDetalle: boolean;
  isAnular: boolean;
  // PrimeNG
  items: MenuItem[];
  itemSeleccionadoGrilla: IResultBusquedaVenta;
  subscription$: Subscription;

  // loading
  loading: boolean;
  constructor(private breadcrumbService: BreadcrumbService,
              public lenguageService: LanguageService,
              // public mensajePrimeNgService: MensajePrimeNgService,
              private readonly formBuilder: FormBuilder,
              private readonly ventasService: VentasService,
              private readonly router: Router) {
    this.breadcrumbService.setItems([
      { label: 'Módulo Venta' },
      { label: 'Venta Pendiente', routerLink: ['module-ve/panel-venta'] }
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
      fecha: [new Date],
    });
  }

  private onHeaderGrilla(){
    this.columnas = [
      { field: 'codventa', header: 'Cod.Venta' },
      { field: 'tipomovimiento', header: 'T.Mov' },
      { field: 'nombretipocliente', header: 'T.Cliente' },
      { field: 'codatencion', header: 'Cod.Atención' },
      { field: 'nombreestado', header: 'Estado' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'montopaciente', header: 'Monto Pac.' },
      { field: 'montoaseguradora', header: 'Monto Aseg.' },
      { field: 'fechagenera', header: 'F.Generado' },
      { field: 'fechaemision', header: 'F.Emisión' },
      { field: 'codpedido', header: 'Nro.Pedido' },
      { field: 'codcliente', header: 'Cod.Cliente' },
      { field: 'codpaciente', header: 'Cod.Paciente' }
    ];
  }

  private onOpcionesGrilla() {
    this.items = [
      {label: 'Caja', icon: 'fa fa-credit-card-alt', command: () => {
          this.onCaja();
      }}
    ];
  }

  onItemElegido(data: IResultBusquedaVenta) { 
    this.itemSeleccionadoGrilla = data;
  }

  onDetalle(data: IResultBusquedaVenta) {
    this.goGetVentaPorCodVenta(data.codventa,'DETALLE');
  }

  goListar() {
    let body = this.formularioBusqueda.value;
    this.loading = true;
    this.listModelo = [];
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.getVentaCabeceraPendientePorFiltro(body.fecha)
    .pipe(
      map((resp: IResultBusquedaVenta[]) => {
        this.listModelo = resp;
        this.loading = false;
      })
    )
    .subscribe(
      (resp) => {},
      (error) => {
        this.loading = false;
        swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion,'error')
      }
    );
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
    .subscribe(
      (resp) => {},
      (error) => {
        swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion,'error')
      }
    );
  }

  goCerrarDetalle() {
    this.isVerModalDetalle = !this.isVerModalDetalle;
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
}
