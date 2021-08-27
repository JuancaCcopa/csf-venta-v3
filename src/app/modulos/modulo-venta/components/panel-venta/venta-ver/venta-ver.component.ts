import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { LanguageService } from '../../../../../services/language.service';
import { IVentaCabeceraSingle, INewVentaDetalle, IVentaDetalle, IVentaCabeceraAnular } from '../../../interface/venta.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VentasService } from '../../../services/ventas.service';
import { IAutenticarResponse } from '../../../../modulo-compartido/Ventas/interfaces/autenticar.interface';
import { map } from 'rxjs/operators';
import swal from'sweetalert2';
import { ITabla } from '../../../interface/tabla.interface';
import { UserContextService } from '../../../../../services/user-context.service';

@Component({
  selector: 'app-venta-ver',
  templateUrl: './venta-ver.component.html',
  styleUrls: ['./venta-ver.component.css']
})
export class VentaVerComponent implements OnInit, OnDestroy {
  // Titulo del componente
  titulo = 'Consulta Ventas';
  
  @Input() isVisibleAnular: boolean 
  // Venta
  @Input() modeloItem: IVentaCabeceraSingle;
  @Output() eventoCerrar = new EventEmitter();
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm;

  // Formulario
  formularioCabecera: FormGroup;

  columnas: any;

  isVerModalDetalle: boolean

  isSeleccionItemVentaDetalle: IVentaDetalle;
  isIndexItemVentaDetalle: number;
  // Visualizacion
  isVisualizarProducto: boolean = false;
  isVisualizarLote: boolean = false;
  isDisplayValidacion: boolean = false;
  isAutenticar: boolean = false;
  isDisplayAnularVenta: boolean = false;

  subscription$: Subscription;

  constructor(private breadcrumbService: BreadcrumbService,
              public lenguageService: LanguageService,
              private readonly fb: FormBuilder,
              private readonly ventasService: VentasService,
              private readonly userContextService: UserContextService) {     
    this.breadcrumbService.setItems([
      { label: 'Módulo Venta' },
      { label: 'Venta', routerLink: ['module-ve/venta-create'] }
    ]);
  }
  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.buildColumnas();
    this.buildForm();
    this.buildFormSetValue();
  }

  private buildForm() {
    this.formularioCabecera = this.fb.group({
      codventa: [{value: null, disabled: true}],
      tipomovimiento: [{value: null, disabled: true}],
      codcomprobante: [{value: null, disabled: true}],
      codpresotor: [{value: null, disabled: true}],
      nombrealmacen: [{value: null, disabled: true}],
      fechagenera: [{value: null, disabled: true}],
      observacion: [{value: null, disabled: true}],
      montodctoplan: [{value: null, disabled: true}],
      montototal: [{value: null, disabled: true}],
      montopaciente: [{value: null, disabled: true}],
      montoaseguradora: [{value: null, disabled: true}],
      montoigv: [{value: null, disabled: true}],
      montoneto: [{value: null, disabled: true}],
      tienedevolucion: [{value: false, disabled: true}],
      moneda: [{value: false, disabled: true}],
      flggratuito: [{value: false, disabled: true}]
    });
  }

  private buildFormSetValue() {
      this.formularioCabecera.controls.codventa.setValue(this.modeloItem.codventa);
      this.formularioCabecera.controls.tipomovimiento.setValue(this.modeloItem.tipomovimiento);
      this.formularioCabecera.controls.codcomprobante.setValue(this.modeloItem.codcomprobante);
      this.formularioCabecera.controls.codpresotor.setValue(this.modeloItem.codpresotor);
      this.formularioCabecera.controls.nombrealmacen.setValue(this.modeloItem.nombrealmacen);
      this.formularioCabecera.controls.fechagenera.setValue(new Date(this.modeloItem.fechagenera));
      this.formularioCabecera.controls.observacion.setValue(this.modeloItem.observacion);

      this.formularioCabecera.controls.montodctoplan.setValue(this.modeloItem.montodctoplan);

      this.formularioCabecera.controls.montototal.setValue(this.modeloItem.montototal);
      this.formularioCabecera.controls.montopaciente.setValue(this.modeloItem.montopaciente);
      this.formularioCabecera.controls.montoaseguradora.setValue(this.modeloItem.montoaseguradora);

      this.formularioCabecera.controls.montoigv.setValue(this.modeloItem.montoigv);
      this.formularioCabecera.controls.montoneto.setValue(this.modeloItem.montoneto);
      this.formularioCabecera.controls.tienedevolucion.setValue(this.modeloItem.tienedevolucion);
      this.formularioCabecera.controls.moneda.setValue(this.modeloItem.moneda === "S" ? true: false);
      this.formularioCabecera.controls.flggratuito.setValue(this.modeloItem.flg_gratuito);
  }

  private buildColumnas() {
    this.columnas = [
      { field: 'codproducto', header: 'Cod. Prod.' },
      { field: 'lote', header: 'Lote' },
      { field: 'nombreproducto', header: 'Descripción' },
      { field: 'cantidad', header: 'Cantidad' },
      { field: 'precioventaPVP', header: 'PVP' },
      { field: 'porcentajedctoproducto', header: 'Dscto.Prd.' },
      { field: 'porcentajedctoplan', header: 'Dscto.Plan' },
      { field: 'montototal', header: 'Total' },
      { field: 'montopaciente', header: 'Monto Pac.' },
      { field: 'montoaseguradora', header: 'Monto Aseg.' },
      { field: 'valorVVP', header: 'VVP' },
    ];
  }

  goCerrar() {
    this.eventoCerrar.emit();
  }

  getAnular() {
    // this.isVerModalDetalle = !this.isVerModalDetalle;
    this.onValidacionAnular();
  }

  onValidacionAnular() {
    this.isDisplayValidacion = true;
    const body: IVentaCabeceraAnular = {
      codventa: this.modeloItem.codventa,
      codpresotor: this.modeloItem.codpresotor,
      codatencion: this.modeloItem.codatencion,
      codtipocliente: this.modeloItem.codtipocliente,
      tipomovimiento: this.modeloItem.tipomovimiento,
      tienedevolucion: this.modeloItem.tienedevolucion
    }

    this.subscription$ = new Subscription();
    this.subscription$  = this.ventasService.setValidacionAnularVenta( body )
    .subscribe(() =>  {
      this.isDisplayValidacion = false;
      swal.fire({
        title: 'Anular Venta',
        text: "¿Desea Anular la Venta?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
          this.isAutenticar =!this.isAutenticar;
        }
      })
    },
      (error) => {
        this.isDisplayValidacion = false;
        swal.fire(this.globalConstants.msgErrorSummary,error.error.resultadoDescripcion, 'error')
    });
  }

  goChangeVisibleProducto(event: IVentaDetalle, index: number) {
    this.isSeleccionItemVentaDetalle = event;
    this.isIndexItemVentaDetalle = index;
    this.isVisualizarProducto =!this.isVisualizarProducto; 
  }

  goSalirProducto() {
    this.isVisualizarProducto =!this.isVisualizarProducto; 
    this.isIndexItemVentaDetalle = 0;
  }

  goChangeVisibleLote(event: IVentaDetalle, index: number) {
    debugger;
    this.isSeleccionItemVentaDetalle = event;
    this.isIndexItemVentaDetalle = index;
    this.isVisualizarLote =!this.isVisualizarLote; 
  }

  goSalirLote() {
    this.isVisualizarLote =!this.isVisualizarLote; 
    this.isIndexItemVentaDetalle = 0;
  }

  goAceptarAnular(value: IAutenticarResponse){

    this.isAutenticar =!this.isAutenticar;

    if (!value.valido) {
      swal.fire(this.globalConstants.msgInfoSummary,value.observacion,'error')
      return;
    }
    
    let isCadenaProductoNarcotico: string = '';

    this.modeloItem.listaVentaDetalle.forEach(xFila => {
      if (xFila.flgnarcotico){
        if (isCadenaProductoNarcotico === '') {
          isCadenaProductoNarcotico += `Usted no tiene permiso para anular la venta porque contiene productos de la familia NARCOTICOS <br>`;
          isCadenaProductoNarcotico += `${xFila.nombreproducto} <br>`;
        } 
        else
        {
          isCadenaProductoNarcotico += `${xFila.nombreproducto} <br>`;
        }
      }
    });

    if (isCadenaProductoNarcotico !== '') {

      this.subscription$ = new Subscription();
      this.subscription$ = this.ventasService.getListTablaLogisticaPorFiltros('PERMISOUSER_NARCOTICO_CA', this.userContextService.getIdUsuario().toString(), 50, 0, 2)
      .pipe(
        map((resp: ITabla[]) => {
          
          if (resp.length > 0) {
            
            let permisoNarcotico: ITabla = resp[0];

            if (permisoNarcotico.estado !== 'X') {
              swal.fire({
                title: 'Anular Venta',
                text: "¿Desea anular esta venta que contiene productos de la famila NARCOTICOS?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'No',
                confirmButtonText: 'Si'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.onAnularVenta(value);
                }
                else
                {
                  return;
                }
              })
            } 
            else
            {
              swal.fire(this.globalConstants.msgErrorSummary, isCadenaProductoNarcotico,'error')
              return;
            }

          } else {
            swal.fire(this.globalConstants.msgErrorSummary, isCadenaProductoNarcotico,'error')
            return;
          }
        })
      )
      .subscribe((resp) => {},
      (error) => {
        swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion,'error')
        });
    }
    else {
      this.onAnularVenta(value);
    }
  }

  onAnularVenta(value: IAutenticarResponse) {

    const body: IVentaCabeceraAnular = {
      codventa: this.modeloItem.codventa,
      codpresotor: this.modeloItem.codpresotor,
      codatencion: this.modeloItem.codatencion,
      codtipocliente: this.modeloItem.codtipocliente,
      tipomovimiento: this.modeloItem.tipomovimiento,
      tienedevolucion: this.modeloItem.tienedevolucion,
      usuario: value.usuario,
      motivoanulacion: value.observacion
    }

    this.isDisplayAnularVenta = true;

    this.subscription$ = new Subscription();
    this.subscription$  = this.ventasService.setRegistrarAnularVenta( body )
    .subscribe(() =>  {
      this.isDisplayAnularVenta = false;
      swal.fire(this.globalConstants.msgErrorSummary,'Venta Anulada correctamente', 'success')
    },
      (error) => {
        this.isDisplayAnularVenta = false;
        swal.fire(this.globalConstants.msgErrorSummary,error.error.resultadoDescripcion, 'error')
    });
  }

  goCancelarAnular(){
    this.isAutenticar =!this.isAutenticar;
  }

}
