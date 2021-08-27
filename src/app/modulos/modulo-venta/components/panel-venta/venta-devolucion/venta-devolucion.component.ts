import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { LanguageService } from '../../../../../services/language.service';
import { Router } from '@angular/router';
import { IVentaCabeceraSingle, IVentaDetalle, INewVentaDevolucion, IVentaGenerado, ITipoCambio, INewVentaDetalle, IVentaDetalleLote } from '../../../interface/venta.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IPaciente } from '../../../../modulo-compartido/Ventas/interfaces/paciente.interface';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { VentasService } from '../../../services/ventas.service';
import { UtilService } from '../../../../../services/util.service';
import { FunctionDblocalService } from '../../../../modulo-base-datos-local/function-dblocal.service';
import swal from'sweetalert2';
import { ConstantsTablasIDB } from 'src/app/modulos/modulo-base-datos-local/constants/constants-tablas-indexdb';
import { IAutenticarResponse } from '../../../../modulo-compartido/Ventas/interfaces/autenticar.interface';
import { IResultBusquedaComprobante } from '../../../interface/comprobante.interface';
import { ITabla } from '../../../interface/tabla.interface';
import { ISerieConfig } from '../../../interface/serie-por-maquina.interface';

@Component({
  selector: 'app-venta-devolucion',
  templateUrl: './venta-devolucion.component.html',
  styleUrls: ['./venta-devolucion.component.css']
})
export class VentaDevolucionComponent implements OnInit, OnDestroy {
  // Titulo del componente
  titulo = 'Consulta Ventas';
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm;

  // Modelo
  modeloItem: IVentaCabeceraSingle;
  isSeleccionItemVentaDetalle: IVentaDetalle;
  isSeleccionItemVentaDetalleLote: IVentaDetalle;

  // Variables
  isIndexItemVentaDetalle: number;
  isCodAtencion: string;
  isNombreMaquina: string;
  isIndexTabView: number = 0;

  // From
  formulario: FormGroup;
  formularioTotales: FormGroup;

  items: MenuItem[];

  listModelo: IVentaDetalle[];
  listTipoNotaCredito: SelectItem[];

  columnas: any;

  isVisible: boolean = false;
  isVisiblePedido: boolean = false;
  isVisibleNotaCredito: boolean = false;

  // Visualizacion
  isVisualizarProducto: boolean = false;
  isVisualizarLote: boolean = false;
  isAutenticar: boolean = false;
  isDisplaySave: boolean = false;
  isGrabar: boolean = false;
  isListarPedido: boolean = false;
  isListarVenta: boolean = false;
  loading: boolean = false;

  // Subscription
  subscription$: Subscription;

  constructor(public lenguageService: LanguageService,
              public router: Router,
              private ventasService: VentasService,
              private readonly fb: FormBuilder,
              private readonly utilService: UtilService,
              private readonly functionDblocalService: FunctionDblocalService) {     
  }

  ngOnInit(): void {
    this.onInicializarVariables();
    this.buildForm();
    this.buildFormTotales();
    this.onColumnasGrilla();
    this.onObtieneEstacionTrabajo();
  }

  onInicializarVariables() {
    this.isCodAtencion = '';

    this.onTipoCambio();
    this.onListarTipoNotaCredito();
  }

  onObtieneEstacionTrabajo() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.functionDblocalService.getByKey(ConstantsTablasIDB._TABLA_ESTACION_TRABAJO, 1)
    .subscribe((res: any) => {
        if (res !== undefined) {
          this.isNombreMaquina = res.nombreequipo;
        }
      },
      (error) => {
        swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion ,'error')
      }
    );
  }

  onTipoCambio(){
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.getGetObtieneTipoCambio()
    .subscribe((res: ITipoCambio[]) => {
      
      if (res.length === 0) {
        swal.fire(this.globalConstants.msgErrorSummary, 'Ingresar el tipo de cambio: Bancario Venta','error');
        return;
      }
      
      this.formulario.patchValue({
        tipocambio: res[0].rate
      });

      },
      (error) => {
        swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion ,'error')
      }
    );
  }

  private buildForm() {
    this.formulario = this.fb.group({
      //Devolución
      coddevolucion: [{value: null, disabled: true}],
      fecdevolucion: [{value: new Date(), disabled: true}],
      codventadevolucion: [{value: null, disabled: true}],
      codalmacen: [{value: null, disabled: true}],
      nombrealmacen: [{value: null, disabled: true}],
      fecventa: [{value: null, disabled: true}],
      flggratuito: [{value: false, disabled: true}],
      tipocambio: [{value: null, disabled: true}],

      //Datos
      tipodevolucion: [{value: '01', disabled: false}],
      codTipoCliente: [{value: null, disabled: true}],
      nombreTipoCliente: [{value: null, disabled: true}],
      codAtencion: [{value: null, disabled: true}],
      paciente: [{value: null, disabled: true}],
      nombreClientePaciente: [{value: null, disabled: true}],
      direccion: [{value: null, disabled: true}],
      codAseguradora: [{value: null, disabled: true}],
      aseguradora: [{value: null, disabled: true}],
      codmedico: [{value: null, disabled: true}],
      nombremedico: [{value: null, disabled: true}],
      plan: [{value: null, disabled: true}],
      descuentoPlan: [{value: null, disabled: true}],
      coaseguro: [{value: null, disabled: true}],
      observacion: [{value: null, disabled: true}],
      descripcionpaquete: [{value: null, disabled: true}],
      //Detalle
      codContratante: [{value: null, disabled: true}],
      contratante: [{value: null, disabled: true}],
      titular: [{value: null, disabled: true}],
      cama: [{value: null, disabled: true}],
      telefono: [{value: null, disabled: true}],
      codEmpresa: [{value: null, disabled: true}],
      empresa: [{value: null, disabled: true}],
      poliza: [{value: null, disabled: true}],
      planPoliza: [{value: null, disabled: true}],
      deducible: [{value: null, disabled: true}],

      //Nota
      anombredenc: [{value: null, disabled: true}],
      direccionnc: [{value: null, disabled: false}],
      rucnc: [{value: null, disabled: true}],
      fechaemisionnc: [{value: new Date(), disabled: true}],
      cardcodenc: [{value: null, disabled: true}],
      codcomprobantenc: [{value: null, disabled: true}],
      porcentajeimpuestonc: [{value: null, disabled: true}],
      monedanc: [{value: null, disabled: true}],
      tipodecambionc:[{value: null, disabled: true}],
      flg_gratuitonc: [{value: null, disabled: true}],
      codcomprobanteemitirnc: [{value: null, disabled: true}],
      tiponc: [{value: null, disabled: false}],
      conceptonc: [{value: null, disabled: false}],
    });
  }

  private buildFormTotales() {
    this.formularioTotales = this.fb.group({
      montoDescuentoPlan: [{value:0, disabled: true}],
      montoGNC: [{value:0, disabled: true}],
      montoSubTotal: [{value:0, disabled: true}],
      montoSubTotalPaciente: [{value:0, disabled: true}],
      montoSubTotalAseguradora: [{value:0, disabled: true}],
      montoIGV: [{value:0, disabled: true}],
      montoIGVPaciente: [{value:0, disabled: true}],
      montoIGVAseguradora: [{value:0, disabled: true}],
      montoTotal: [{value:0, disabled: true}],
      montoTotalPaciente: [{value:0, disabled: true}],
      montoTotalAseguradora: [{value:0, disabled: true}],
    });
  }

  private onColumnasGrilla() {
    this.columnas = [
      { field: 'codproducto', header: 'Código' },
      { field: 'lote', header: 'Lote' },
      { field: 'nombreproducto', header: 'Descripción' },
      { field: 'cantidad', header: 'Cantidad' },
      { field: 'cnt_dev', header: 'Cant. Dev' },
      { field: 'cntxdev', header: 'Cant. a Dev' },
      { field: 'precioventaPVP', header: 'PVP' },
      { field: 'porcentajedctoproducto', header: 'Dscto. Prd.' },
      { field: 'porcentajedctoplan', header: 'Dscto. Plan' },
      { field: 'montopaciente', header: 'Monto Pac.' },
      { field: 'montoaseguradora', header: 'Monto Aseg.' },
      { field: 'valorVVP', header: 'VVP' },
      { field: 'totalsinigv', header: 'Total S/IGV' },
      { field: 'totalconigv', header: 'Total C/IGV' },
      { field: 'gnc', header: 'No Cubierto' }
    ];
  }

  private onListarTipoNotaCredito(){
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.getListTablaLogisticaPorFiltros('TIPONOTACREDITO', '', 34, 0, -1)
    .pipe(
      map((resp: ITabla[]) => {
        this.listTipoNotaCredito = [];
        for (let item of resp) {
          this.listTipoNotaCredito.push({ value: item.codigo.trim(), label: item.nombre.trim() })
        }
      })
    )
    .subscribe();
  }

  goPedido() {
    this.router.navigate(['/main/modulo-ve/panel-pedido'])
  }

  goAtencionSeleccionado(item: IPaciente) {

    this.onLimpiarForm('01');

    if (item.codatencion.substring(0,1) === 'J') {
      swal.fire(this.globalConstants.msgInfoSummary,'A Pacientes con tipo de atención J, se vende como tipo cliente EXTERNO ','info');
      this.onLimpiarForm('01');
      return;
    }

    if (item.activo !== 1) {
      swal.fire(this.globalConstants.msgInfoSummary,'Atención desactivada','info');
      this.onLimpiarForm('01');
      return;
    }

    if (item.familiar === "S") {
      swal.fire(this.globalConstants.msgInfoSummary,'No puede generar una venta a una atención familiar','info');
      this.onLimpiarForm('01');
      return;
    }

    if (item.traslado === "S") {
      swal.fire(this.globalConstants.msgInfoSummary,'No puede generar una venta a una atención que ha sido trasladada a otra. Consultar nueva atención...!!!','info');
      this.onLimpiarForm('01');
      return;
    }

    this.isCodAtencion = item.codatencion;

    this.formulario.patchValue({
      codAtencion: item.codatencion,
      paciente: item.codpaciente,
      nombreClientePaciente: item.nombrepaciente,
      direccion: item.direccion,
      coaseguro: item.coaseguro,
      codAseguradora: item.codaseguradora,
      aseguradora: item.nombreaseguradora,
      codContratante: item.codcia,
      contratante: item.nombrecontratante,
      titular: item.titular,
      poliza: item.poliza,
      plan: item.codplan,
      descuentoPlan: item.porcentajeplan,
      cama: item.cama,
      telefono: item.telefono,
      planPoliza: item.planpoliza,
      deducible: item.deducible,
      medicoAtencion: item.nombremedico,
      observacionPaciente: item.observacionespaciente,
      observacionAtencion: item.observacionatencion,
      idegctipoatencionmae: item.idegctipoatencionmae,
      observacion: item.observacionatencion,
      descripcionpaquete: item.descripcionpaquete
    });
  }

  onLimpiarForm(tipoCliente: string, sinStock: boolean = false) {

    this.formulario.patchValue({
      fecha: new Date(),
      sinStock: sinStock,
      estado: 'GENERADO',
      codTipoCliente: tipoCliente,
      nombreTipoCliente: 'Paciente',
      codAtencion: null,
      codClienteExterno: null,
      codPersonal: null,
      codMedico: null,
      listMedico: null,
      paciente: null,
      nombreClientePaciente: null,
      direccion: null,
      codAseguradora: null,
      aseguradora: null,
      plan: null,
      descuentoPlan: 0,
      coaseguro: 0,
      titular: null,
      poliza: null,
      planPoliza: null,
      codContratante: null,
      contratante: null,
      cama: null,
      telefono: null,
      codEmpresa: null,
      empresa: null,
      deducible: 0,
      observacionPaciente: null,
      observacionAtencion: null,
      diagnostico: null,
      medicoOtros: null,
      observacionGeneral: null,
      codpedido: null,
      //Nota
      // anombredenc: null,
      // direccionnc: null,
      // rucnc: null,
      // fechaemisionnc: new Date(),
      // cardcodenc: null,
      // codcomprobantenc: null,
      // porcentajeimpuestonc: null,
      // monedanc: null,
      // tipodecambionc: null,
      // flg_gratuitonc: false,
      // codcomprobanteemitirnc: null,
      // tiponc: 'C',
      // conceptonc: null,
    });

    this.formularioTotales.patchValue({
      montoDescuentoPlan: 0,
      montoGNC: 0,
      montoSubTotal: 0,
      montoSubTotalPaciente: 0,
      montoSubTotalAseguradora: 0,
      montoIGV: 0,
      montoTotal: 0
    });
  
    // habilita varibles
    this.formulario.controls.tipodevolucion.enable();

    // LIMPIAMOS VARIABLES
    this.isCodAtencion = '';
    this.listModelo = [];
    
    this.isGrabar = false;
  }

  goVisibleVenta(){
    if (this.isCodAtencion.length === 0) {
      swal.fire(this.globalConstants.msgInfoSummary, 'Ingresar Atención', 'info');
      return;
    }

    this.isVisible = !this.isVisible;
  }

  goVisiblePedido () {
    this.isVisiblePedido = !this.isVisiblePedido;
  }

  goVentaPorAtencionAceptar(codventa: string) {
    this.isVisible =!this.isVisible;
    this.goGetVentaPorCodVenta(codventa, false);
  }

  goGetVentaPorCodVenta(codventa: string, flgnotacredito: boolean) {
    this.loading = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.getVentaPorCodVenta(codventa)
    .pipe(
      map((resp: IVentaCabeceraSingle) => {
        this.modeloItem = resp;
        this.loading = false;
        this.buildFormSetValue(flgnotacredito);
        this.listModelo = [];
        this.modeloItem.listaVentaDetalle.map(xFila => {
          xFila.montoaseguradora = 0;  
          xFila.montopaciente = 0;
          xFila.montototal = 0;
          xFila.stockalmacen = 0;
          xFila.cntxdev = 0;
          xFila.tipomovimiento = 'CD';
        });
        this.listModelo = this.modeloItem.listaVentaDetalle;
      })
    )
    .subscribe((resp) => {},
    (error) => {
      this.loading = false;
      swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion,'error')
    });
  }

  private buildFormSetValue(flgnotacredito: boolean) {

    this.formulario.patchValue({
      codventadevolucion: this.modeloItem.codventa,
      codalmacen: this.modeloItem.codalmacen,
      nombrealmacen: this.modeloItem.nombrealmacen,
      fecventa: this.utilService.fecha_DDMMYYYYHHMM(this.modeloItem.fechaemision)
    });

    if (!flgnotacredito) {
      this.formulario.patchValue({
        codventadevolucion: this.modeloItem.codventa,
        codalmacen: this.modeloItem.codalmacen,
        nombrealmacen: this.modeloItem.nombrealmacen,
        fecventa: this.utilService.fecha_DDMMYYYYHHMM(this.modeloItem.fechaemision),
        codTipoCliente: this.modeloItem.codtipocliente,
        nombreTipoCliente: this.modeloItem.nombretipocliente,
        codAtencion: this.modeloItem.codatencion,
        paciente: this.modeloItem.codpaciente,
        codmedico: this.modeloItem.codmedico,
        nombremedico: this.modeloItem.nombremedico,
        nombreClientePaciente: this.modeloItem.nombre,
        direccion: this.modeloItem.dircliente,
        codAseguradora: this.modeloItem.codaseguradora,
        aseguradora: this.modeloItem.nombreaseguradora,
        plan: this.modeloItem.codplan,
        descuentoPlan: this.modeloItem.porcentajedctoplan,
        coaseguro: this.modeloItem.porcentajecoaseguro,
        codContratante: this.modeloItem.codcia,
        contratante: this.modeloItem.nombrecia,
        cama: this.modeloItem.cama,
        poliza: this.modeloItem.codpoliza,
        codEmpresa: this.modeloItem.codempresa,
        planPoliza: this.modeloItem.planpoliza,
        deducible: this.modeloItem.deducible
      });
    }
    
}

  goVentaPorAtencionSalir() {
    this.isVisible =!this.isVisible;
  }

  goChangeCantidad(item: IVentaDetalle, index: number) {
    // Obtenermos los datos de la cabecera
    if (item.cntxdev > (item.cantidad - item.cnt_dev)) {
      swal.fire(this.globalConstants.msgInfoSummary, 'Cantidad a devolver no puede ser mayor a cantidad por devolver', 'info');
      this.listModelo[index].cntxdev = 0;
      return;
    }

    const bodyCabecera = this.formulario.getRawValue();

    let isCoaseguro = bodyCabecera.coaseguro === null ? 0 : bodyCabecera.coaseguro;

    let isPrecioUnidadConDscto: number = 0;
    let isTemp: number = 0;
    let isMontoTotal: number = 0;
    let isMontoCoaseguro: number = 0;
    let isMontoSeguro: number = 0;
    let isMontoTotalIGV: number = 0;

    isPrecioUnidadConDscto = item.valorVVP - ((item.porcentajedctoproducto/100) * item.valorVVP);

    // Solo para farmacos
    if (item.codtipoproducto === 'A') {
      isPrecioUnidadConDscto = isPrecioUnidadConDscto - ((item.porcentajedctoplan/100) * isPrecioUnidadConDscto);
    } else {
      isPrecioUnidadConDscto = isPrecioUnidadConDscto - ((item.porcentajedctoplan/100) * isPrecioUnidadConDscto);
    }

    if (item.valorVVP > 0) {
      if (item.codtipoproducto === 'A') {
        isTemp = item.cntxdev * isPrecioUnidadConDscto;
      } else {
        isTemp = item.cntxdev * isPrecioUnidadConDscto;
      }
    }

    isMontoTotal = isTemp;

    isMontoCoaseguro = isMontoTotal * (isCoaseguro/100);
    isMontoSeguro = isMontoTotal - isMontoCoaseguro;

    isMontoTotalIGV = isMontoTotal * (1 + (item.igvproducto/100));

    this.listModelo[index].preciounidadcondcto = this.utilService.onRedondearDecimal(isPrecioUnidadConDscto,2);
    this.listModelo[index].montototal = this.utilService.onRedondearDecimal(isMontoTotal,2);
    this.listModelo[index].montoaseguradora = this.utilService.onRedondearDecimal(isMontoSeguro,2);
    this.listModelo[index].montopaciente = this.utilService.onRedondearDecimal(isMontoCoaseguro,2);
    this.listModelo[index].totalsinigv = this.utilService.onRedondearDecimal(isMontoTotal,2);
    this.listModelo[index].totalconigv = this.utilService.onRedondearDecimal(isMontoTotalIGV,2);

    this.onCalcularTotales();

  }

  private onCalcularTotales() {

    const bodyCabecera = this.formulario.getRawValue();

    let isIGVTemp: number = 0;
    let isIGV: number = 0;
    let isSubTotal: number = 0;
    let isTotalPaciente: number = 0;
    let isTotalAseguradora: number = 0;

    let isSubTotal_0: number = 0;
    let isTotalPaciente_0: number = 0;
    let isTotalAseguradora_0: number = 0;

    if (this.listModelo.length > 0) {
      this.listModelo.forEach(xfila => {
        isIGV = xfila.igvproducto;

        if (isIGV > isIGVTemp) {
          isIGVTemp = isIGV; 0
        }

        if (isIGV === 0) {
          isSubTotal_0 = isSubTotal_0 + xfila.totalsinigv;
          isTotalPaciente_0 = isTotalPaciente_0 + xfila.montopaciente;
          isTotalAseguradora_0 = isTotalAseguradora_0 + xfila.montoaseguradora;
        } else {
          isSubTotal = isSubTotal + xfila.totalsinigv;
          isTotalPaciente = isTotalPaciente + xfila.montopaciente;
          isTotalAseguradora = isTotalAseguradora + xfila.montoaseguradora;
        }
      })

      isIGV = isIGVTemp;

      this.formularioTotales.patchValue({

        montoDescuentoPlan: this.utilService.onRedondearDecimal(((isSubTotal + isSubTotal_0) * (bodyCabecera.descuentoPlan/100)) ,2),

        montoSubTotal: this.utilService.onRedondearDecimal(isSubTotal + isSubTotal_0,2),
        montoIGV: this.utilService.onRedondearDecimal(isSubTotal * (isIGV/100),2),
        montoTotal: this.utilService.onRedondearDecimal(isSubTotal + isSubTotal_0 + (isSubTotal * (isIGV/100)),2),

        montoSubTotalPaciente: this.utilService.onRedondearDecimal(isTotalPaciente + isTotalPaciente_0,2),
        montoSubTotalAseguradora: this.utilService.onRedondearDecimal(isTotalAseguradora + isTotalAseguradora_0,2)
      });

    } else {
      this.formularioTotales.patchValue({

        montoDescuentoPlan: this.utilService.onRedondearDecimal((isSubTotal + isSubTotal_0) * (bodyCabecera.descuentoPlan/100),2),

        montoSubTotal: this.utilService.onRedondearDecimal(isSubTotal + isSubTotal_0,2),
        montoIGV: this.utilService.onRedondearDecimal(isSubTotal * (isIGV/100),2),
        montoTotal: this.utilService.onRedondearDecimal((isSubTotal + isSubTotal_0) + (isSubTotal * (isIGV/100)),2),

        montoSubTotalPaciente: this.utilService.onRedondearDecimal(isTotalPaciente + isTotalPaciente_0,2),
        montoSubTotalAseguradora: this.utilService.onRedondearDecimal(isTotalAseguradora + isTotalAseguradora_0,2)
      });
    }
  }
  
  goEliminarItemDetalleVenta(index: number) {
    this.listModelo.splice(+index, 1);
    this.onCalcularTotales();
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
    this.isSeleccionItemVentaDetalleLote = event;
    this.isIndexItemVentaDetalle = index;
    this.isVisualizarLote =!this.isVisualizarLote; 
  }

  goAceptarLote(value: IVentaDetalleLote[]) {
    debugger;
    this.isVisualizarLote =!this.isVisualizarLote; 

    this.listModelo[this.isIndexItemVentaDetalle].listVentasDetalleLotes = value;
    this.listModelo[this.isIndexItemVentaDetalle].cntxdev = 0;
    
    let isCantidadTotal: number = 0;

    value.forEach(xFila => {
      if (xFila.cantidadxdev > 0) {
        isCantidadTotal += xFila.cantidadxdev;
      }
    });

    this.listModelo[this.isIndexItemVentaDetalle].cntxdev = isCantidadTotal;

    if (isCantidadTotal === 0) {
      this.listModelo[this.isIndexItemVentaDetalle].flgbtchnum = false;
      this.listModelo[this.isIndexItemVentaDetalle].flgbin = false;
    } else {
      this.listModelo[this.isIndexItemVentaDetalle].flgbtchnum = true;
      this.listModelo[this.isIndexItemVentaDetalle].flgbin = true;
    }
    
    this.goChangeCantidad(this.listModelo[this.isIndexItemVentaDetalle], this.isIndexItemVentaDetalle);
  }

  goSalirLote() {
    this.isVisualizarLote =!this.isVisualizarLote; 
    this.isIndexItemVentaDetalle = 0;
  }

  goConfirmGrabar() {
    this.onValidacionGrabarVenta();
  }

  onValidacionGrabarVenta() {
    const bodyCabecera = this.formulario.getRawValue();
    const bodyTotales = this.formularioTotales.getRawValue();

    if (bodyCabecera.tipocambio === 0 || bodyCabecera.tipocambio <= 0) {
      swal.fire(this.globalConstants.msgInfoSummary,'Ingresar el tipo de cambio: Bancario Venta','error')
      return;
    }

    let cadenaProductoCantidadCero: string = '';

    let cadenaProductoMontoCero: string = '';

    // Validamos que la cantidad y el monto del detalle no sean 0
    this.listModelo.forEach(xFila => {
      if (xFila.cntxdev === 0) {
        cadenaProductoCantidadCero = cadenaProductoCantidadCero + `Producto: ${xFila.codproducto} - ${xFila.nombreproducto} <br>`;
      }
    });

    if (cadenaProductoCantidadCero !== '') {
      swal.fire("Productos con Cantidad 0", cadenaProductoCantidadCero,'error')
      return;
    }

    //NOTA DE CREDITO
    if (bodyCabecera.tipodevolucion === '02') {
      if (this.modeloItem.codalmacen === '' || this.modeloItem.codalmacen === null) {
        swal.fire(this.globalConstants.msgInfoSummary, 'Error... no tiene el almacén', 'info')
        return;
      }
  
      if (bodyCabecera.codcomprobanteemitirnc !== null) {
        if (bodyCabecera.codcomprobanteemitirnc.length === 11) {
          swal.fire(this.globalConstants.msgInfoSummary, 'Error... no tiene el almacén', 'info')
          return;
        }
      }

      if (bodyTotales.montoSubTotalPaciente === 0) {
        swal.fire(this.globalConstants.msgInfoSummary, 'No puede generar una Nota con monto CERO. Por favor verificar el % coaseguro', 'info')
        return;
      }

      if (bodyCabecera.cardcodenc === '' || bodyCabecera.cardcodenc === null) {
        swal.fire(this.globalConstants.msgInfoSummary, 'El CardCode se encuentra vacio, verifique y vuelva a intentar.', 'info')
        return;
      }

      if (bodyCabecera.cardcodenc.substring(0,1) === 'M' || bodyCabecera.cardcodenc.substring(0,1) === 'T') {
        swal.fire(this.globalConstants.msgInfoSummary,`No se puede generar nota para cardcode MED o TRC (Medico o Tercero) <br> CardCode : ${bodyCabecera.cardcodenc}, Verifique Datos`, 'info')
        return;
      }

      // Validamos la configuracion de la serie
      if (this.listModelo.length > 0) {

      }

      let isProximaNota: string = '';
      let isFlg_otorgar: number = 0;
      let isFlg_electronicoPC: String = '';
      let isFlg_GeneraE: string = '';
      let isFlg_electronico: boolean = false;
      let isMensajeE = "";
      let isStrURL = '';
      let isTipoCodigo_BarraHash: number = 0;
      // Obtenemos configuracion de Nota de credito
      this.subscription$ = new Subscription();
      this.subscription$ = this.ventasService.getListConfigDocumentoPorNombreMaquina(this.isNombreMaquina)
      .subscribe((res: ISerieConfig[]) => {
debugger;
        if (res.length !== 0) {
          let configuracion = res[0];

          if (bodyCabecera.codcomprobantenc.substring(0,1) === 'B') {
            isProximaNota = configuracion.creditob;
            isFlg_otorgar = configuracion.flg_otorgarcb;
          }

          if (bodyCabecera.codcomprobantenc.substring(0,1) === 'F') {
            isProximaNota = configuracion.creditof;
            isFlg_otorgar = configuracion.flg_otorgarcf;
          }

          isFlg_electronicoPC = configuracion.flg_electronico.toString();
          isFlg_GeneraE = configuracion.generar_e;
         
          if (isProximaNota === '') {
            swal.fire(this.globalConstants.msgInfoSummary,`No tiene asignada la serie de Notas`, 'info')
            return;
          }

          if (!this.onValidacionNotaCredito()){
            return;
          }

          this.subscription$ = new Subscription();
          this.subscription$ = this.ventasService.getListTablaClinicaPorFiltros('EFACT_SUNAT_MAXDIAS_GENERAR', '01', 50, 1, -1)
          .pipe(
            map((resp: ITabla[]) => {

              let isMaxDias: number = 0;

              if (resp.length === 0) {
                isMaxDias = 0;
              } else {
                
                isMaxDias = resp[0].valor;

                let fechaEmitiComprobante = new Date(bodyCabecera.fechaemisionnc);
                let fechaActual = new Date()

                let newFecha = this.utilService.restarDia(fechaActual, isMaxDias);

                if (fechaEmitiComprobante < newFecha) {
                  swal.fire(this.globalConstants.msgInfoSummary, `La Fecha De emisión no puede ser de hace ${isMaxDias} días`,'info')
                  return;
                } else {

                  if (isFlg_electronicoPC === 'S') {
                    isFlg_electronico = true;

                    if (isFlg_GeneraE !== 'S') {
                      swal.fire(this.globalConstants.msgInfoSummary,`Solicite asignar a la serie si es electrónico o no`, 'info')
                      return;
                    }
                  }

                  if (isFlg_electronico) { 
                    isMensajeE = "ELECTRONICA";


                    this.subscription$ = new Subscription();
                    this.subscription$ = this.ventasService.getListComprobanteElectronicoPorFiltro('0001', bodyCabecera.codcomprobante , '', 'L', '', 3)
                    .pipe(
                      map((resp: any[]) => {
          
                        if (resp.length !== 0) {
                          if (resp[0].generarnota !== 'S') {
                            swal.fire(this.globalConstants.msgInfoSummary,`Verifique el CDR, Otorgamiento y el estado de FT/BV" <br> ${resp[0].mensaje}`, 'info')
                            return;
                          }
                        } else {
                          swal.fire(this.globalConstants.msgInfoSummary,`Error con los datos de la FT/BV...`, 'info')
                          return;
                        }

                        // Obtiene Web service
                        this.subscription$ = new Subscription();
                        this.subscription$ = this.ventasService.getListTablaClinicaPorFiltros('EFACT_TCI_WS', 'PREP', 50, 1, -1)
                        .pipe(
                          map((resp: ITabla[]) => {
              
                            if (resp.length !== 0) {
                              isStrURL = resp[0].nombre;
                            } 
                            
                            this.subscription$ = new Subscription();
                            this.subscription$ = this.ventasService.getListTablaClinicaPorFiltros('EFACT_TIPOCODIGO_BARRAHASH', '01', 50, 1, -1)
                            .pipe(
                              map((respHash: ITabla[]) => {
                  
                                if (respHash.length !== 0) {
                                  isTipoCodigo_BarraHash = respHash[0].valor;
                                } 
                                
                                if ((isTipoCodigo_BarraHash === null || isTipoCodigo_BarraHash === undefined) && isFlg_electronico ) {
                                  swal.fire(this.globalConstants.msgInfoSummary,`Solicite asignar se se imprimirá Codigo de Barras o Codigo Hash`, 'info')
                                  return;
                                }

                                if ((isTipoCodigo_BarraHash !== 1 && isTipoCodigo_BarraHash !== 0)) {
                                  swal.fire(this.globalConstants.msgInfoSummary,`Solicite asignar se se imprimirá Codigo de Barras o Codigo Hash`, 'info')
                                  return;
                                }
                                this.onHabilitarAutenticacion('Generar Nota Crédito', `¿Desea Generar Nota Crédito? ${isMensajeE} : ${isProximaNota}`);
                              })
                            )
                            .subscribe(
                              (resp) => {},
                              (error) => {
                                swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion,'error')
                              }
                            );
                          })
                        )
                        .subscribe(
                          (resp) => {},
                          (error) => {
                            swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion,'error')
                          }
                        );
                      })
                    )
                    .subscribe(
                      (resp) => {},
                      (error) => {
                        swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion,'error')
                      }
                    );

                  } else {
                    this.onHabilitarAutenticacion('Generar Nota Crédito', `¿Desea Generar Nota Crédito? ${isMensajeE} : ${isProximaNota}`);
                  }
                }
              }
            })
          )
          .subscribe(
            (resp) => {},
            (error) => {
              swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion,'error')
            }
          );
        } else {
          if (isProximaNota === '') {
            swal.fire(this.globalConstants.msgInfoSummary,`No tiene asignada la serie de Notas`, 'info')
            return;
          }
        }
        },
        (error) => {
          swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion ,'error')
        }
      );
    } else {
      this.onHabilitarAutenticacion('Generar Devolución', "¿Desea Generar la Devolución?");
    }
  }

  onHabilitarAutenticacion(title: string, details: string) {
    swal.fire({
      title: title,
      text: details,
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
    });
  }

  onValidacionNotaCredito (): boolean {
    const bodyCabecera = this.formulario.getRawValue();

    if (bodyCabecera.codcomprobantenc.length === 0) {
      swal.fire(this.globalConstants.msgInfoSummary, 'Registrar el comprobante al que hará la Nota', 'info')
      return false;
    }

    if (bodyCabecera.conceptonc === null) {
      swal.fire(this.globalConstants.msgInfoSummary, 'Ingresar el concepto, Sunat - Dato Obligatorio', 'info')
      return false;
    }

    if (bodyCabecera.conceptonc.length === 0) {
      swal.fire(this.globalConstants.msgInfoSummary, 'Ingresar el concepto, Sunat - Dato Obligatorio', 'info')
      return false;
    }

    if (bodyCabecera.tiponc === null) {
      swal.fire(this.globalConstants.msgInfoSummary, 'Seleccionar Motivo', 'info');
      return false;
    } else {
      if (bodyCabecera.tiponc.value === '02' || bodyCabecera.tiponc.value === '03' ) {
        swal.fire(this.globalConstants.msgInfoSummary, 'Por favor elija otro motivo', 'info');
        return false;
      }
    }

    if (bodyCabecera.monedanc === 'D' && bodyCabecera.tipodecambionc === 0) {
      swal.fire(this.globalConstants.msgInfoSummary, 'El comprobante no tiene un tipo de cambio válido', 'info')
      return false;
    }

    return true;
  }

  onGeneroBodyVenta(usuario: string): INewVentaDevolucion {

    const bodyCabecera = this.formulario.getRawValue();
    const bodyTotales = this.formularioTotales.getRawValue();

    const bodyVenta: INewVentaDevolucion = {
      tipodevolucion: bodyCabecera.tipodevolucion,
      codalmacen: bodyCabecera.codalmacen,
      tipomovimiento: 'CD',
      codempresa: bodyCabecera.codempresa,
      codtipocliente: bodyCabecera.codTipoCliente,
      codcliente: bodyCabecera.codClienteExterno,
      codpaciente: bodyCabecera.paciente,
      nombre: bodyCabecera.nombreClientePaciente,
      cama: bodyCabecera.cama,
      codmedico: bodyCabecera.codmedico,
      codatencion: bodyCabecera.codAtencion,
      codpoliza: bodyCabecera.poliza,
      planpoliza: bodyCabecera.planPoliza,
      deducible: bodyCabecera.deducible,
      codaseguradora: bodyCabecera.codAseguradora,
      codcia:  bodyCabecera.codContratante,
      porcentajecoaseguro: bodyCabecera.coaseguro,
      porcentajeimpuesto: 18,
      montodctoplan: bodyTotales.montoDescuentoPlan,
      porcentajedctoplan: bodyCabecera.descuentoPlan,
      moneda: 'S',
      montototal: bodyTotales.montoSubTotal,
      montoigv: bodyTotales.montoIGV,
      montoneto: bodyTotales.montoTotal,
      codplan:  bodyCabecera.plan,
      montopaciente: bodyTotales.montoSubTotalPaciente,
      montoaseguradora: bodyTotales.montoSubTotalAseguradora,
      observacion:  bodyCabecera.observacion,
      codcentro:  '078',
      nombremedico:  bodyCabecera.nombremedico,
      nombreaseguradora:  bodyCabecera.aseguradora,
      nombrecia: bodyCabecera.contratante,
      codventadevolucion: bodyCabecera.codventadevolucion,
      tipocambio: bodyCabecera.tipocambio,
      codpedido: bodyCabecera.codpedido,
      nombrediagnostico: bodyCabecera.nombrediagnostico,
      flagpaquete: 'N',
      flg_gratuito: bodyCabecera.flggratuito,
      nombremaquina: this.isNombreMaquina,
      listaVentaDetalle: this.listModelo,
      usuario: usuario,
      flgsinstock: bodyCabecera.sinStock,
      listVentasDetalleUbicacion: [],
      //Nota de creditp
      codcomprobante: bodyCabecera.codcomprobantenc,
      tipo: 'C',
      anombredequien: bodyCabecera.anombredenc,
      concepto: bodyCabecera.conceptonc,
      direccion: bodyCabecera.direccionnc,
      ruc: bodyCabecera.rucnc,
      codmotivo: bodyCabecera.tiponc === null ? '' : bodyCabecera.tiponc.value,
      cardcode: bodyCabecera.cardcodenc
    }

    return bodyVenta;
  }

  goAutenticarAceptar(value: IAutenticarResponse) {
    this.isAutenticar =!this.isAutenticar;

    const bodyVenta = this.onGeneroBodyVenta(value.usuario);

    bodyVenta.listaVentaDetalle.forEach(xFila => {
      if (xFila.binactivat) {
        xFila.listVentasDetalleLotes.forEach(xLineaDetalleLote => {
          if (xLineaDetalleLote.cantidadxdev > 0) {

            let xExisteUbicacion = [...bodyVenta.listVentasDetalleUbicacion].filter(xLineaUbicacionExiste => 
              xLineaUbicacionExiste.ubicacion === xLineaDetalleLote.ubicacion && xLineaUbicacionExiste.codproducto === xLineaDetalleLote.codproducto 
            ).length;

            if (xExisteUbicacion > 0) {
              bodyVenta.listVentasDetalleUbicacion.find(xLineaUbicacionFind => 
                xLineaUbicacionFind.ubicacion === xLineaDetalleLote.ubicacion && xLineaUbicacionFind.codproducto === xLineaDetalleLote.codproducto 
              ).cantidad += xLineaDetalleLote.cantidadxdev;
            } else {
              bodyVenta.listVentasDetalleUbicacion.push({
                ubicacion: xLineaDetalleLote.ubicacion,
                codproducto: xFila.codproducto,
                ubicaciondescripcion: xLineaDetalleLote.ubicaciondescripcion,
                cantidad: xLineaDetalleLote.cantidadxdev
              });
            }
          }
        });
      }
    });

    let isCadenaVentaGenerado: string = '';
    let isCodVenta: string = '';
    let isCodVentaSingle: string = '';

    this.isDisplaySave = true;
    this.subscription$ = new Subscription();
    this.subscription$  = this.ventasService.setRegistrarVentaDevolucion( bodyVenta )
    .subscribe((resp: IVentaGenerado[]) =>  {

      this.isDisplaySave = false;

      this.isGrabar = true;
      this.isListarPedido = true;
      this.isListarVenta = true;
      isCodVenta = '';

      this.goDeshabilitarControles();

      resp.forEach(xFila => {
        isCadenaVentaGenerado = isCadenaVentaGenerado + `Ud. Genero correctamente la Devolución ${xFila.codventa} <br>`;
        if (isCodVenta === '') {
          isCodVenta = xFila.codventa;
          isCodVentaSingle = xFila.codventa;
        } else {
          isCodVenta = isCodVenta +' , ' + xFila.codventa;
        }
        
      });

      this.formulario.patchValue({
        coddevolucion: isCodVentaSingle
      });
     
      swal.fire(this.globalConstants.msgInfoSummary, isCadenaVentaGenerado, 'success');
    },
      (error) => {
        this.isDisplaySave = false;
        swal.fire(this.globalConstants.msgErrorSummary,error.error.resultadoDescripcion, 'error');
    });

  }

  goDeshabilitarControles(){
    this.formulario.controls.tipodevolucion.disable();
  }

  goAutenticarCancelar() {
    this.isAutenticar =!this.isAutenticar;
  }
  
  goVisibleNotaCredito () {
    this.isVisibleNotaCredito = !this.isVisibleNotaCredito;
  }

  goAceptarNotaCredito(modelo: IResultBusquedaComprobante){
    this.isVisibleNotaCredito = !this.isVisibleNotaCredito;
    this.isCodAtencion = modelo.codatencion;
    this.formulario.patchValue({
      anombredenc: modelo.anombrede,
      direccionnc: modelo.direccion,
      rucnc: modelo.ruc,
      cardcodenc: modelo.cardcode,
      codcomprobantenc: modelo.codcomprobante,
      porcentajeimpuestonc: modelo.porcentajeimpuesto,
      monedanc: modelo.moneda,
      tipodecambionc: modelo.tipodecambio,
      flg_gratuitonc: modelo.flg_gratuito
    });

    this.goGetVentaPorCodVenta(modelo.codventa, true);

    this.isListarPedido = true;
    this.isListarVenta = true;
    this.isIndexTabView = 2;
  }

  goCancelarNotaCredito() {
    this.isVisibleNotaCredito = !this.isVisibleNotaCredito;

    this.formulario.patchValue({
      tipodevolucion: '01'
    });
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
