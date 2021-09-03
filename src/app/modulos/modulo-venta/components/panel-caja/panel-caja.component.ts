import { Component, OnInit, OnChanges } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { LanguageService } from '../../../../services/language.service';
import { Router } from '@angular/router';
import { DemoService } from '../../../../services/demo.service';
import { UserContextService } from '../../../../services/user-context.service';

import { VentasCajaService } from '../../services/ventas-caja.service';
import { map } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

import { FormGroup, FormBuilder } from '@angular/forms';
import { MenuItem } from 'primeng';
import { ConfirmationService } from 'primeng/api';
import { SelectItem } from 'primeng';
import swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { FunctionDblocalService } from '../../../modulo-base-datos-local/function-dblocal.service';
import { ConstantsTablasIDB } from '../../../modulo-base-datos-local/constants/constants-tablas-indexdb';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-panel-caja',
  templateUrl: './panel-caja.component.html',
  styleUrls: ['./panel-caja.component.css']
})
export class PanelCajaComponent implements OnInit {
  subscription$: Subscription;
  // Titulo del componente
  titulo = 'Consulta Ventas';
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm;
  items: MenuItem[];

  isDataBlob: Blob;
  isDisplayVisualizar: boolean;


  //variables Globales
  gMontoControl: number = 0;
  gComprobanteCorreoCSF: string = '';
  wCodAtencion: string = '';
  wCodPaciente: string = '';
  wCodAseguradora: string = '';
  wCodCia: string = '';
  gEstacionTrabajo: any[];
  //-------------------
  //entitidad guardar
  confirmacionRegistrar: any;

  isNombreMaquina: string = '';

  isDisplaySave: boolean;
  isDisplayVisualizarDocumento: boolean;

  // Grilla Pagos
  listModeloPago: any[];
  selectPago: any;
  selectPagoIndex: number = 0;
  totalPago: string = '';

  //getEfactTipoCodigoBarrahash
  efactTipoCodigoBarrahash: any;

  //Correlativo consulta
  correlativoConsulta: any;

  //LimiteConsumoPersonal
  limiteConsumoPersonal: any;


  //consulta datos de paciente, contratante y aseguradora
  selectRucConsultav2: any;
  pacienteDocumento: any;


  columnas: any;
  //columnasPago: any;

  // Formulario
  selectCodVenta: string = '';
  formularioCabecera: FormGroup;
  formularioBusqueda: FormGroup;
  formularioTotales: FormGroup;
  isDisableGratuito: boolean = true;
  isDisableCheckElect: boolean = true;
  //isCheckGratuito: boolean=false;
  isDisableTipoAfectacion: boolean = false;

  //formularioTotales: FormGroup;

  // Variables de Venta Caja
  itemCaja: any;
  listVentaDetalle: any[];

  //grilla pagos
  opciones: any = [];

  //tipo pago
  //rowTipoPago: SelectItem[];
  //selectTipoPago: any;

  //tipo afectacion igv
  rowTipoAfectacionIgv: SelectItem[];
  selectTipoAfectacionIgv: any;

  //tipo comprobnate
  rowTipoComprobante: SelectItem[];
  selectTipoComprobante: any;

  //tipo serie
  rowSerieComprobante: SelectItem[];
  selectSerieComprobante: any;

  //tipo comprobnate
  rowParaQuien: SelectItem[];
  selectParaQuien: any;

  //tipo de documento
  rowTipoDocumentoIdentidad: SelectItem[];
  selectTipoDocumentoIdentidad: any;

  //Modal Cliente
  isActivateBusquedaCliente: boolean = false;

  //Modal Tipo Pago
  isActivateBusquedaTPago: boolean = false;

  //Modal Tipo documento de indentidad
  isActivateBusquedaTDIdentidad: boolean = false;

  //Modal Buscar Venta / comprobante
  isActivateBusquedadVenta: boolean = false;
  isTitleBusquedadVenta: string = "";
  isTipoBusquedadVenta: string = "";

  //Modal Banco
  isActivateBusquedaBancos: boolean = false;

  //Modal Tarjeta credito
  isActivateBusquedaTCredito: boolean = false;

  //Modal Terminal
  isActivateBusquedaTerminal: boolean = false;

  //Modal Autenticar
  isAutenticar: boolean = false;

  //Modal Pago Bot
  isActivateGenerarPagoBot: boolean = false;
  tituloGenerarPagoBot: string = "pago Bot";

  constructor(private breadcrumbService: BreadcrumbService,
    public lenguageService: LanguageService,
    private confirmationService: ConfirmationService,
    public router: Router,
    private demoService: DemoService,
    private readonly fb: FormBuilder,
    private messageService: MessageService,
    public userContextService: UserContextService,
    private readonly functionDblocalService: FunctionDblocalService,
    private readonly ventasCajaService: VentasCajaService) {
    this.breadcrumbService.setItems([
      { label: 'Módulo Venta' },
      { label: 'Caja', routerLink: ['module-ve/venta-create'] }
    ]);
  }

  ngOnInit(): void {

    this.itemCaja = { carCode: '', codTipoDocumentoIdentidad: '' }

    this.buildForm();
    this.onObtieneEstacionTrabajo();

    this.onOpcionesCabecera();
    this.onColumnasGrilla();

  }

  metodosInicio() {

    this.getTipoComprobante();
    this.getMontoControl();
    this.getCorreoComprobanteCsf();
    this.getEfactTipoCodigoBarrahash();

  }

  private buildForm() {

    //const fecha = new Date();
    this.formularioCabecera = this.fb.group({
      codVenta: '',
      codPlan: '',
      dsctoPlan: '',
      cardCode: '',
      coaSeguro: '',
      fechaEmision: '',//fecha.toLocaleDateString(),
      cbTipoAfectacionIgv: '',
      cbTipoComprobante: '',
      cbSerie: '',
      cbParaQuien: '',
      codigoCliente: '',
      cliente: '',
      ruc: '',
      comprobante: '',
      totalVenta: '',
      direccion: '',
      correo: '',
      codTipoCliente: '',
      tipoCliente: '',
      codDocumentoIdentidad: '',
      documentoIdentidad: '',
      numdocumentoIdentidad: '',
      estado: '',
      checkElectronico: false
    });

    this.formularioTotales = this.fb.group({
      subTotal: 0.00,
      montoIgv: 0.00,
      montoTotal: 0.00,
      montoSoles: 0.00,
      montoDolares: 0.00,
      vuelto: 0.00,
      gratuito: false,
      checkDolar: false
    });

    this.formularioBusqueda = this.fb.group({
      numVentaBuscar: ''
    });


  }

  private onLimpiarInput() {

    this.formularioCabecera.patchValue({
      codVenta: '',
      cardCode: '',
      totalVenta: '',
      codTipoCliente: '',
      tipoCliente: '',
      codigoCliente: '',
      cliente: '',
      ruc: '',
      comprobante: '',
      direccion: '',
      correo: '',
      estado: '',
      codPlan: '',
      dsctoPlan: '',
      coaSeguro: '',
      formControlName: '',
      codDocumentoIdentidad: '',
      documentoIdentidad: '',
      numdocumentoIdentidad: '',
      subTotal: '',
      montoIgv: '',
      montoSoles: '',
      montoDolares: '',
      vuelto: '',
      montoTotal: '',
      gratuito: false,
    });

    this.listVentaDetalle = [];
    this.listModeloPago = [];

    this.rowTipoAfectacionIgv = [];
    this.selectTipoAfectacionIgv = {};

    this.rowParaQuien = [];
    this.selectParaQuien = {};

  }

  private onLimpiarClientesBase() {

    this.formularioCabecera.patchValue({
      cardCode: '',
      //codigoCliente:'',
      cliente: '',
      direccion: '',
      correo: '',
      ruc: '',
      codDocumentoIdentidad: '',
      documentoIdentidad: '',
      numdocumentoIdentidad: '',
      //comprobante:''
    });
  }


  private onOpcionesCabecera() {
    this.items = [
      {
        label: "Buscar Venta", icon: this.globalConstants.icoCaja,
        command: () => {
          this.isActivateBusquedadVenta = !this.isActivateBusquedadVenta;
          this.isTitleBusquedadVenta = "Ingrese numero de venta";
          this.isTipoBusquedadVenta = "V";
        }
      },
      {
        label: "Buscar Comprobante", icon: this.globalConstants.icoPedido,
        command: () => {
          this.isActivateBusquedadVenta = !this.isActivateBusquedadVenta;
          this.isTitleBusquedadVenta = "Ingrese numero de comprobante";
          this.isTipoBusquedadVenta = "C";
        }
      },
      { separator: true },
      {
        label: "Prevista", icon: this.globalConstants.icoGenerico,
        command: () => {
          this.onPreVistaValida();
        }
      },
      {
        label: "PDF Electronica", icon: this.globalConstants.icoGenerico,
        command: () => {
          this.onComprobanteElectronicoValida();
        }
      },
      { separator: true },
      {
        label: "Generar Pago Bot", icon: this.globalConstants.icoCaja,
        command: () => {
          debugger
          this.activarGenerarPagoBot();
        }
      },
      {
        label: "Obtener Pago Bot", icon: this.globalConstants.icoCaja,
        command: () => {

        }
      },
      {
        label: "Link Bot", icon: this.globalConstants.icoCaja,
        command: () => {

        }
      }
    ];
  }

  private onColumnasGrilla() {

    //{ field: 'precioventaPVP', header: 'P.V.P' },
    this.columnas = [
      { field: 'nombreproducto', header: 'Descripción' },
      { field: 'cnt_unitario', header: 'Can-E' },
      { field: 'cantidad_fraccion', header: 'Can-M' },
      { field: 'precioventaPVP', header: 'P.V.P' },
      { field: 'porcentajedctoproducto', header: 'Dscto.Prd.' },
      { field: 'porcentajedctoplan', header: 'Dscto.Plan' },
      { field: 'montototal', header: 'Total S/IGV' },
      { field: 'montopaciente', header: 'Monto Pac.' },
      { field: 'montoaseguradora', header: 'Monto Aseg.' },
      { field: 'codproducto', header: 'Cod. Prod.' },
      { field: 'prc_unitario', header: 'Costo VVP' },
      //{ field: 'valorVVP', header: 'Costo VVF' },
    ];

    // this.columnasPago = [
    //   { header: 'Tipo Pago' },
    //   { header: 'Entidad' },
    //   { header: 'Nro Operación' },
    //   { header: 'M. Soles' },
    //   { header: 'M. Dolares' },
    //   { header: 'Total' },
    //   { header: 'Terminal' }
    // ];
  }

  onConsultarVenta() {
    this.router.navigate(['/main/modulo-ve/panel-venta'])
  }

  onChangesTComprobante(obj) {

    this.rowSerieComprobante = [];
    this.getSerieComprobante(obj.value);

  }

  getSerieComprobante(value) {

    //factura -> 01
    //boleta -> 03

    this.rowSerieComprobante = [];
    if (value == "03") {
      this.gEstacionTrabajo.forEach(item => this.rowSerieComprobante.push({ value: item.serieboleta, label: item.serieboleta }));
    } else if (value == "01") {
      this.gEstacionTrabajo.forEach(item => this.rowSerieComprobante.push({ value: item.seriefactura, label: item.seriefactura }));
    }

    this.selectSerieComprobante = this.rowSerieComprobante[0];//.find(element=> element.value==value);

    //onObtieneConfiguracionEstacionTrabajo
    // this.ventasCajaService
    //   .getSerieComprobante(value)
    //   .subscribe(
    //     (resp:any) => {

    //       this.rowSerieComprobante=[];
    //       resp.forEach(item => {
    //         this.rowSerieComprobante.push({value:item.code,label:item.u_SYP_NDSD});
    //       });

    //       this.selectSerieComprobante=this.rowSerieComprobante[0];

    //     },
    //     (error) => {
    //       this.messageService.add({key: 'toasVentaCaja', severity:'error', summary: 'Mensaje', detail: ` ERROR DE SERVICE LEYER: AL TRAER LOS COMPROBANTES`});
    //       console.log(error);
    //     }
    //   );

  }

  getParaQuien() {

    this.rowParaQuien = [];
    this.rowParaQuien.push(
      { value: 1, label: 'Paciente' },
      { value: 2, label: 'Aseguradora' },
      { value: 3, label: 'Contratante' }
    );

    this.selectParaQuien = this.rowParaQuien[0];

  }

  getRucConsultav2PorFiltro() {

    this.ventasCajaService
      .getRucConsultav2PorFiltro(this.selectRucConsultav2.codPaciente, this.selectRucConsultav2.codAseguradora, this.selectRucConsultav2.codCia)
      .subscribe(
        (resp: any) => {

          console.log("getRucConsultav2PorFiltro");
          console.log(resp);
          this.selectRucConsultav2 = resp;

          var obj = {};
          if (this.formularioCabecera.value.codTipoCliente == "01") {
            obj = { value: 1, label: 'Paciente' };
          } else if (this.formularioCabecera.value.codTipoCliente == "02") {
            obj = { value: 2, label: 'Aseguradora' };
          }
          else if (this.formularioCabecera.value.codTipoCliente == "03") {
            obj = { value: 3, label: 'Contratante' }; //personal
          }

          this.onChangesParaQuien(obj);

        },
        (error) => {
          this.messageService.add({ key: 'toasVentaCaja', severity: 'error', summary: 'Mensaje', detail: ` ERROR DE SERVICE LEYER: AL TRAER LOS COMPROBANTES` });
          console.log(error);
        }
      );

  }


  goClienteExternoSeleccionado(item: any) {

    //this.itemCaja.carCode=item.cardCode;
    this.formularioCabecera.patchValue({
      codigoCliente: item.cardCode,
      cliente: item.cardName,
      cardCode: item.cardCode,
      direccion: item.address,
      ruc: item.federalTaxID,
      correo: item.mailAddress
    });

  }

  goTipoDocumentoIdentidadSeleccionado(item: any) {

    this.formularioCabecera.patchValue({
      codDocumentoIdentidad: item.codigo,
      documentoIdentidad: item.nombre
    });

  }

  activarModalCliente() {
    this.isActivateBusquedaCliente = !this.isActivateBusquedaCliente;
  }

  cancelarModalCliente() {
    this.isActivateBusquedaCliente = false;
  }

  activarModalTDIdentidad() {
    this.isActivateBusquedaTDIdentidad = !this.isActivateBusquedaTDIdentidad;
  }

  cancelarModalTDIdentidad() {
    this.isActivateBusquedaTDIdentidad = false;
  }

  onBuscarVenta() {
    this.onLimpiarInput();
    var {
      numVentaBuscar
    } = this.formularioBusqueda.value;
    this.selectCodVenta = numVentaBuscar.trim();
    this.formularioBusqueda.reset();
    this.isActivateBusquedadVenta = false;

    //Venta
    if (this.isTipoBusquedadVenta == "V") {
      debugger
      this.goGetVentaCabeceraPorCodVenta(this.selectCodVenta);
      this.goGetVentaDetallePorCodVenta(this.selectCodVenta);

    } else if (this.isTipoBusquedadVenta == "C") {
      //Comprobante
      this.goGetComprobante(numVentaBuscar, "L");
    }

  }

  goGetComprobante(codcomprobantee, codsistema) {

    this.ventasCajaService
      .getComprobante(codcomprobantee, codsistema)
      .subscribe(
        (resp: any) => {

          console.log("obj.data", resp);
          const montototal = Number((resp.montototal + resp.montoigv).toFixed(2));

          this.formularioCabecera.patchValue({
            codVenta: resp.codventa,
            comprobante: resp.codcomprobante,
            estado: resp.estado,
            codTipoCliente: resp.codtipocliente,
            codigoCliente: resp.codcliente,
            cliente: resp.cliente,
            direccion: resp.direccion,
            ruc: resp.ruc,
            correo: resp.correo,
            codDocumentoIdentidad: resp.tipdocidentidad,
            documentoIdentidad: resp.nombretipdocidentidad,
            numdocumentoIdentidad: resp.docidentidad,

            fechaEmision: resp.fechaemision.substring(0, 10),
            tipoCliente: resp.nombretipocliente,
            codPlan: resp.codplan,
            //codPlan:resp.nombreplan, toltip
            dsctoPlan: resp.porcentajedctoplan,
            coaSeguro: resp.porcentajecoaseguro,
            subTotal: resp.montototal,
            montoIgv: resp.montoigv,
            montoTotal: montototal,//resp.montototal + resp.montoigv,
            totalVenta: montototal,//resp.montototal + resp.montoigv,
            cardCode: resp.cardcode,
            checkElectronico: resp.flgElectronico
          });
          //Number(numb.toFixed(2))
          this.formularioTotales.patchValue({
            subTotal: resp.montototal,
            montoIgv: resp.montoigv,
            montoTotal: montototal,//resp.montototal + resp.montoigv,
            vuelto: 0,
            gratuito: resp.flg_gratuito
          });

          if (resp.flg_gratuito) {
            //montoTotal:0,
            this.getTipoAfectacionIGV(resp.porcentajeimpuesto);
            this.isDisableTipoAfectacion = true;
          }

          this.listModeloPago = resp.cuadredecaja;
          this.selectCodVenta = resp.codventa;
          this.goGetVentaDetallePorCodVenta(this.selectCodVenta);

        },
        (error) => {
          //console.log(error);
          this.messageService.add({ key: 'toasVentaCaja', severity: 'error', summary: 'Mensaje', detail: error.error.ErrorMessage ? error.error.ErrorMessage : error.error });
        }
      );

  }

  goGetVentaCabeceraPorCodVenta(codventa: string) {
    debugger
    this.ventasCajaService.getVentaCabeceraPorCodVenta(codventa)
      .pipe(
        map((resp: any) => {
          console.log("goGetVentaCabeceraPorCodVenta", resp)
          var {
            checkDolar
          } = this.formularioTotales.value;
          debugger
          this.wCodAtencion = resp.codatencion;
          this.wCodAseguradora = resp.codaseguradora;

          this.pacienteDocumento = {
            codDocumentoIdentidad: resp.tipdocidentidad,
            documentoIdentidad: resp.nombretipdocidentidad,
            numdocumentoIdentidad: resp.docidentidad
          };

          this.selectRucConsultav2 = {
            codPaciente: resp.codpaciente,
            codAseguradora: resp.codaseguradora,
            codCia: resp.codcia
          };


          this.formularioCabecera.patchValue({
            codVenta: resp.codventa,
            fechaEmision: resp.fechaemision.substring(0, 10),
            codPlan: resp.codplan,
            dsctoPlan: resp.porcentajedctoplan,
            coaSeguro: resp.porcentajecoaseguro,
            totalVenta: resp.montototal,
            cardCode: resp.cardcode,
            codigoCliente: resp.codcliente,
            cliente: resp.nombre,
            direccion: resp.dircliente,
            correo: resp.correocliente,
            ruc: resp.ruccliente,
            codTipoCliente: resp.codtipocliente,
            tipoCliente: resp.nombretipocliente,
            codDocumentoIdentidad: resp.tipdocidentidad,
            documentoIdentidad: resp.nombretipdocidentidad,
            numdocumentoIdentidad: resp.docidentidad,
            estado: resp.estado,
            comprobante: resp.codcomprobante
          });

          //this.isCheckGratuito=resp.flg_gratuito;
          this.formularioTotales.patchValue({
            subTotal: resp.montoneto,
            montoIgv: resp.montoigv,
            montoTotal: resp.montototal,
            montoSoles: checkDolar == true ? 0 : resp.montototal,
            montoDolares: checkDolar == true ? resp.montototal : 0,
            vuelto: 0,
            gratuito: resp.flg_gratuito
          });

          if (resp.flg_gratuito) {

            this.getTipoAfectacionIGV(resp.porcentajeimpuesto);
          }

          if (resp.codtipocliente == '01') {
            this.wCodPaciente = resp.codPaciente;
            this.wCodAseguradora = resp.codaseguradora;
            this.wCodCia = resp.codCia;

            this.getParaQuien();
            this.getRucConsultav2PorFiltro();
          }

          this.getGrillaPagosPorDefecto();

          /*
            01 = paciente
            02 = externo
            03 = personal
            04 = medico
          */
          // '<I-GRUGGIA>03/09/2017 - busqueda del CardCode segun tipo de cliente
          if (resp.codtipocliente == '01') {
            //     cmbParaQuien.ListIndex = 0
          } else {

            this.goGetDatoCardCode(resp.codtipocliente, resp.codcliente).subscribe({

              next: data => {
                this.formularioCabecera.patchValue({
                  cardCode: data.data
                });
              },
              error: error => {

                this.messageService.add({ key: 'toasVentaCaja', severity: 'error', summary: 'Mensaje', detail: error.message });
              }

            });

          }

        })
      )
      .subscribe((resp) => { },
        (error) => {
          console.log(error);
          swal.fire(this.globalConstants.msgErrorSummary, error.error, 'error')
        });
  }

  goGetDatoCardCode(tipoCliente: string, codCliente: string) {
    return this.ventasCajaService.goGetDatoCardCode(tipoCliente, codCliente);
  }

  goGetVentaDetallePorCodVenta(codventa: string) {

    this.ventasCajaService.getVentaDetallePorCodVenta(codventa)
      .pipe(
        map((resp: any) => {
          this.listVentaDetalle = resp;
        })
      )
      .subscribe((resp) => { },
        (error) => {
          swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion, 'error')
        });
  }

  getGrillaPagosPorDefecto() {

    var { montoTotal } = this.formularioTotales.value;

    if (this.listModeloPago.length == 0) {
      this.listModeloPago = [];
      this.totalPago = montoTotal;
    } else {
      montoTotal = 0;
    }

    this.listModeloPago.push(
      {
        codTipoPago: 'E',
        // tipoPago:'EFECTIVO',
        nombreTipoPago: 'EFECTIVO',
        codEntidad: '',
        nombreEntidad: '', //(VACIO)
        nroOperacion: '',//(VACIO)
        montoSoles: montoTotal,
        montoDolar: 0,
        montoMn: montoTotal,
        codTerminal: '',
        terminal: ''
      }
    );

  }

  actualizarTotalPago(event: any, index) {

    if (event.key == ".") event.preventDefault();

    var objPagos = this.listModeloPago[index];
    objPagos.montoMn = Number(objPagos.montoSoles);

    //montoMn
    var montoSoles = 0;
    this.listModeloPago.forEach((item) => {
      montoSoles += Number(item.montoSoles);
    });

    //this.totalPago=parseFloat(montoSoles.toString()).toFixed(2);
    this.totalPago = Number(montoSoles).toString();

  }

  soloNumeros(e) {
    var key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57) {
      if (key != 46) e.preventDefault(); //return true
      //Usando la definición del DOM level 2, "return" NO funciona.
    }
  }

  onChangesParaQuien(obj) {

    this.onLimpiarClientesBase();

    if (obj.value == 1) {
      //paciente
      this.formularioCabecera.patchValue({
        cardCode: this.selectRucConsultav2.pacienteCardCode,
        cliente: this.selectRucConsultav2.pacienteNombre,
        direccion: this.selectRucConsultav2.pacienteDireccion,
        correo: this.selectRucConsultav2.pacienteCorreo,
        ruc: this.selectRucConsultav2.pacienteRuc,
        codDocumentoIdentidad: this.pacienteDocumento.codDocumentoIdentidad,
        documentoIdentidad: this.pacienteDocumento.documentoIdentidad,
        numdocumentoIdentidad: this.pacienteDocumento.numdocumentoIdentidad
      });

    } else if (obj.value == 2) {
      //aseguradora
      this.formularioCabecera.patchValue({
        cardCode: this.selectRucConsultav2.seguradoraCardCode,
        cliente: this.selectRucConsultav2.seguradoraNombre,
        direccion: this.selectRucConsultav2.seguradoraDireccion,
        correo: this.selectRucConsultav2.seguradoraCorreo,
        ruc: this.selectRucConsultav2.seguradoraRuc,
      });
    } else if (obj.value == 3) {
      //contratante ->PERSONAL
      this.formularioCabecera.patchValue({
        cardCode: this.selectRucConsultav2.contratanteCardCode,
        cliente: this.selectRucConsultav2.contratanteNombre,
        direccion: this.selectRucConsultav2.contratanteDireccion,
        correo: this.selectRucConsultav2.contratanteCorreo,
        ruc: this.selectRucConsultav2.contratanteRuc,
      });
    }

  }

  getTipoAfectacionIGV(xIgv) {

    var sTabla;
    if (xIgv == 0) {
      //INAFECTO
      sTabla = 'EFACT_TIPOAFECTACIONIGV_T07_I';
    } else if (xIgv > 0) {
      //AFECTO
      sTabla = 'EFACT_TIPOAFECTACIONIGV_T07_A';
    }

    this.ventasCajaService.getListTablaClinicaPorFiltros(sTabla, '', 34, 0, -1)
      .pipe(
        map((resp: any) => {

          this.rowTipoAfectacionIgv = [];
          resp.forEach(item => {
            this.rowTipoAfectacionIgv.push({ value: item.codigo.trim(), label: item.nombre.trim() });
          });

        })
      )
      .subscribe();

  }

  validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  generarPagar() {

    if (this.gEstacionTrabajo == undefined) {
      swal.fire(this.globalConstants.msgErrorSummary, "DEBE CONFIGURAR UNA ESTACION DE TRABAJO", 'error')
      return
    }

    if (this.gEstacionTrabajo.length == 0) {
      swal.fire(this.globalConstants.msgErrorSummary, "NO TIENE CONFIGURADOS LAS SERIE EN LA ESTACION DE TRABAJO", 'error')
      return
    }

    /*

    01 -> PACIENTE
    02 -> EXTERNO
    03 -> MEDICO
    04 -> PLANILLA

    */
    var {
      comprobante,
      cardCode,
      codigoCliente,
      cliente,
      cbTipoAfectacionIgv,
      cbTipoComprobante,
      cbSerie,
      correo,
      ruc,
      codDocumentoIdentidad,
      documentoIdentidad,
      numdocumentoIdentidad,
      codTipoCliente,
      direccion,
      nombreEntidad
    } = this.formularioCabecera.value;

    var {
      gratuito,
      montoTotal,
      checkDolar
    } = this.formularioTotales.value;

    //this.getLimiteConsumoPersonal(codigoCliente);

    var tipoComprobante = (cbTipoComprobante == null) ? '' : cbTipoComprobante.label;
    var codTipoComprobante = (cbTipoComprobante == null) ? '' : cbTipoComprobante.value;
    var codSerie = (cbSerie == null) ? '' : cbSerie.value;
    var codTipoAfectacionIgv = (cbTipoAfectacionIgv == null) ? '' : cbTipoAfectacionIgv.value;

    ruc = (ruc == null) ? '' : ruc.trim();
    codDocumentoIdentidad = (codDocumentoIdentidad == null) ? '' : codDocumentoIdentidad;
    documentoIdentidad = (documentoIdentidad == null) ? '' : documentoIdentidad;
    numdocumentoIdentidad = (numdocumentoIdentidad == null) ? '' : numdocumentoIdentidad;
    correo = (correo == null) ? '' : correo;
    codTipoCliente = (codTipoCliente == null) ? '' : codTipoCliente;

    comprobante = (comprobante == null) ? '' : comprobante;
    cardCode = (cardCode == null) ? '' : cardCode;

    if (tipoComprobante == "") {
      swal.fire(this.globalConstants.msgErrorSummary, "SELECCIONE UN TIPO DE COMPROBANTE", 'error')
      return;
    }

    if (codTipoComprobante == "") {
      swal.fire(this.globalConstants.msgErrorSummary, "SELECCIONE UN TIPO DE COMPROBANTE", 'error')
      return;
    }

    //totales
    montoTotal = (montoTotal == null) ? 0 : montoTotal;
    montoTotal = Number(montoTotal);

    //code 02
    if (comprobante != "") {
      swal.fire(this.globalConstants.msgErrorSummary, "Venta ya tiene Comprobante", 'error')
      return;
    }

    //code 03
    if (cardCode == "") {
      swal.fire(this.globalConstants.msgErrorSummary, "El CardCode se encuentra vacio, escoja Para Quien es el comprobante...", 'error')
      return;
    }

    //code 04
    if (cardCode.substring(0.1) == "M" || cardCode.substring(0.1) == "T") {
      swal.fire(this.globalConstants.msgErrorSummary, "No puede generar un comprobante a cardcode MED o TRC (Medico o Tercero). Consulte un cliente.", 'error')
      return;
    }

    //code 05
    if (gratuito) {

      if (montoTotal > 0) {
        swal.fire(this.globalConstants.msgErrorSummary, "El comprobante GRATUITO no puede ser generado por un monto. Debe ser igual a cero", 'error')
        return;
      }

      if (cbTipoAfectacionIgv.substring(0, 2) == "") {
        // If RTrim(Mid(Me.cboTipoAfectacionIgv.Text, 1, 2)) = "" Then 'AGARCIA.18/08/2016
        swal.fire(this.globalConstants.msgErrorSummary, "Elija el tipo de afectación de igv", 'error')
        return;
      }

    } else {
      //NO-Gratuito
      if (montoTotal <= 0) {
        swal.fire(this.globalConstants.msgErrorSummary, "El comprobante no puede ser generado por monto cero", 'question')
        return;
      }

    }

    //code 06 -> cargamos los valores al iniciar el programa
    //zFarmacia.Sp_Correlativo_Consulta


    //code 07
    if (tipoComprobante.substring(0, 1) == "F" && this.correlativoConsulta.factura.length != 11) {
      swal.fire(this.globalConstants.msgErrorSummary, "Usted NO tiene serie de Factura", 'error')
      return;
    }

    //code 08
    if (tipoComprobante.substring(0, 1) == "B" && this.correlativoConsulta.boleta.length != 11) {
      swal.fire(this.globalConstants.msgErrorSummary, "Usted NO tiene serie de Boletas", 'error')
      return;
    }

    //code 09
    if (comprobante != "") {
      swal.fire(this.globalConstants.msgErrorSummary, "Comprobante ya existe", 'error')
      return;
    }

    //code 10
    if (correo != "") {
      if (!this.validateEmail(correo)) {
        swal.fire(this.globalConstants.msgErrorSummary, "El campo de correo es invalido", 'error')
        return;
      }
    }

    //code 11
    if (correo == "") {
      //zFarmacia2.Sp_Tablas_Consulta "EFACT_CORREOENVIOCOMPROBANTE", "01", 50, 1, -1
      correo = this.gComprobanteCorreoCSF;
    }

    //code 12
    var wFlg_electronico = false;
    if (this.correlativoConsulta.flg_electronico == "S") {
      wFlg_electronico = true;
      if (this.correlativoConsulta.generar_e != "S") {
        swal.fire(this.globalConstants.msgErrorSummary, "Solicite asignar a la serie si es electrónico o no", 'error')
        return;
      }

    }

    var wMensajeG = '';
    var wMensajeE = '';
    var wFlg_otorgar = 0;

    //code 13
    //se valida en el bakcned
    if (wFlg_electronico == true) {
      wMensajeE = "Electrónico";

      if (tipoComprobante.substring(0, 1) == "B") {
        wFlg_otorgar = this.correlativoConsulta.flg_otorgarb;
      }
      if (tipoComprobante.substring(0, 1) == "F") {
        wFlg_otorgar = this.correlativoConsulta.flg_otorgarf;
      }

      //tremos los datos por defecto
      // zFarmacia2.Sp_Tablas_Consulta "EFACT_TIPOCODIGO_BARRAHASH", "01", 50, 1, -1

      if (this.efactTipoCodigoBarrahash.valor == "" && wFlg_electronico == true) {
        swal.fire(this.globalConstants.msgErrorSummary, "Solicite asignar se se imprimirá Codigo de Barras o Codigo Hash", 'error')
        return;
      }

      if (this.efactTipoCodigoBarrahash.valor != 0 && this.efactTipoCodigoBarrahash.valor != 1) {
        swal.fire(this.globalConstants.msgErrorSummary, "Solicite asignar se se imprimirá Codigo de Barras o Codigo Hash", 'error')
        return;
      }

      //sacaremos la informacion a travez del bakend con la variable de wFlg_electronico=true
      // zFarmacia2.Sp_TCI_WebService_Consulta "EFACT_TCI_WS"
      // Set wAdoEfacWS = zFarmacia2.LastQueryResults
      // If Not wAdoEfacWS.EOF Then
      //     wStrURL = Trim(wAdoEfacWS!Nombre)
      // End If

    }

    //code 14
    if (cliente == "") {
      swal.fire(this.globalConstants.msgErrorSummary, "Elija a nombre de quien se emitirá el documento", 'error');
      return;
    }

    //code 15
    if (montoTotal >= this.gMontoControl) {

      var wGrabarDNI = false;
      if (tipoComprobante.substring(0, 1) == "B") {
        wGrabarDNI = true;
        if (ruc === "" && codDocumentoIdentidad === "") {
          swal.fire(this.globalConstants.msgErrorSummary, "Ingrese el RUC o el Doc. de Identidad para esta venta", 'error');
          return;
        }

        if (ruc !== "" && ruc.length !== "11") {
          swal.fire(this.globalConstants.msgErrorSummary, "Ingrese el Numero de Ruc", 'error');
          return;
        }

        //if (numdocumentoIdentidad.length = !"8" && codDocumentoIdentidad == "0") {
        if (numdocumentoIdentidad.length !== 8 && codDocumentoIdentidad === "0") {
          swal.fire(this.globalConstants.msgErrorSummary, "Campo Doc. Identidad (DNI) no es correcto, debe ingresar 8 números", 'error')
        }

        if (!Number(numdocumentoIdentidad) && codDocumentoIdentidad === "0") {
          swal.fire(this.globalConstants.msgErrorSummary, "Campo Doc. Identidad (DNI) no es correcto, debe ingresar 8 números", 'error')
        }

        if (codDocumentoIdentidad == "0" && numdocumentoIdentidad == "") {
          swal.fire(this.globalConstants.msgErrorSummary, "El campo Número de Doc. de Identidad es un dato requerido", 'error')
        }

        //validar que el codigo de documento de dni exista -> getValidarDocumento
        //oviamos esta validacion porque nuestro campo tipo de documento esta bloqueado y no hay forma de editarlo
        // zFarmacia.Sp_Tablas_Consulta "TIPOIDENTIDAD", TxtTipDocIdentidad, 50, 1, -1
        //       Set wAdo2 = zFarmacia.LastQueryResults
        //       If Not wAdo2.EOF Then
        //           Beep
        //       Else
        //           MsgBox "El campo Tipo Doc. Identidad no es válido", vbCritical, cSistema
        //           Exit Sub
        //       End If

        if (codDocumentoIdentidad != "" && numdocumentoIdentidad == "") {
          swal.fire(this.globalConstants.msgErrorSummary, "El campo Número de Doc. de Identidad es un dato requerido", 'error')
        }

        if (codDocumentoIdentidad == "" && numdocumentoIdentidad != "") {
          swal.fire(this.globalConstants.msgErrorSummary, "El campo Tipo Doc. de Identidad es un dato requerido", 'error')
        }

      }

    }

    Array.from(this.listModeloPago, el => el.montoSoles = Number(el.montoSoles));

    //code 16 y code 17
    //Se agrega la validacion para cuando se elija el pago x tarjeta, sea necesario poner el numero de tarjeta

    var mensajeValidaModeloPago = "";
    this.listModeloPago.forEach((item) => {

      // A-> ABONO -> C->CHEQUE ->TARJETA
      if (item.codTipoPago == "A" || item.codTipoPago == "C" || item.codTipoPago == "T") {

        if (item.codEntidad == "" || item.nombreEntidad == "" || item.nombreEntidad == null || item.nombreEntidad == "SELECCIONE") mensajeValidaModeloPago = "Ingrese la entidad de la tarjeta y/o cheque....";

        if (item.nroOperacion == "" || item.nroOperacion == null) mensajeValidaModeloPago = "Ingrese el numero de la tarjeta (mínimo 4 numeros) y/o cheque ....";

      }

      //validacion extra no puede ver monto 0
      if (item.montoMn <= 0 || item.montoMn == null || item.montoMn == "") mensajeValidaModeloPago = "el monto no puede estar vacio / ser un valor 0 ....";

    });

    if (mensajeValidaModeloPago) {
      swal.fire(this.globalConstants.msgErrorSummary + " Pagos", mensajeValidaModeloPago, 'error');
      return;
    }

    //code 18 -> Verifica TipoMovimiento de Venta
    // en el code 18 se validara en el backend

    //code 19 
    if (codTipoCliente == "01") {

      if (this.wCodAtencion.substring(0, 1) == "H") {
        swal.fire(this.globalConstants.msgErrorSummary, "Atenciones de tipo 'H' no se facturan", 'error')
        return
      }

      if (this.wCodAtencion.substring(0, 1) == "E" && this.wCodAseguradora.substring(0, 4) == "0001") {
        swal.fire(this.globalConstants.msgErrorSummary, "No se genera venta / Comprobante a atención particular de emergencia.", 'error')
        return
      }

    }

    //code 20
    // no pagan al credito; Solo aplica a Personal
    if (codTipoCliente == "01" || codTipoCliente == "02" || codTipoCliente == "04") {
      var validacionCredito = false;
      this.listModeloPago.forEach((item) => {
        // D => credito
        if (item.codTipoPago == "D") validacionCredito = true;
      });

      if (validacionCredito) {
        swal.fire(this.globalConstants.msgErrorSummary, "Venta a paciente, externos, médicos, terceros  no se pagan al credito", 'error')
        return
      }

    }

    //code 21 la validacion se puso en el backend   

    //code 22
    var flagValida = false;
    this.listModeloPago.forEach((item) => {
      if (item.codTipoPago == "T") {
        if (item.codTerminal == "" || item.terminal == "" || item.terminal == "SELECCIONE") {
          flagValida = true;
        }
      }
    });


    if (flagValida) {
      swal.fire(this.globalConstants.msgErrorSummary, `Ingrese los teminales para los pagos con tarjeta.... `, 'error');
      return
    }

    //code 23 ->por verificar
    //validacion de monto totales deben ser iguales
    //ojo verificar multiples pagos hacer pruebas en vb



    var totalLineas = 0;
    this.listModeloPago.forEach((item) => {
      //Round(CDbl(wTotal), 2) <> Round(CDbl(Me.txtMontoNeto.Text), 2)

      totalLineas += item.montoMn;
    });

    if (parseFloat(totalLineas.toString()).toFixed(2) != parseFloat(montoTotal.toString()).toFixed(2)) {
      swal.fire(this.globalConstants.msgErrorSummary, `Los suma de tipos de pago debe ser igual al monto total de la venta....`, 'error');
      return
    }

    //code 24 -> se validad en el backend
    //code 25

    //code 01
    if (gratuito) {
      wMensajeG = "GRATUITO"
    }

    if (wFlg_electronico == true) {
      wMensajeE = "Electrónico";
    }

    //code 26
    var wGrabarDNI = false;

    if (tipoComprobante.substring(0, 1) == "B") {

      //'<I-JCAICEDO> 02/07/2015 - Para verificar el dni de las personas
      if (codDocumentoIdentidad == "0") { //DNI VALOR 0

        if (numdocumentoIdentidad == "0" || numdocumentoIdentidad.length == 8) {
          if (numdocumentoIdentidad != "0") {
            wGrabarDNI = true;
          }
          this.confirmationService.confirm({
            message: `Desea Generar este Documento ${wMensajeE} ${wMensajeG} ?: <br> <br> BOLETA ${this.correlativoConsulta.boleta} `,
            header: 'Graba el Documento',
            icon: 'pi pi-info-circle',
            acceptLabel: 'Si',
            rejectLabel: 'No',
            accept: () => {

              this.isAutenticar = !this.isAutenticar;

            },
            reject: () => {

            }
          });

        } else {

          swal.fire(this.globalConstants.msgErrorSummary, `Ingrese correctamente el dni del cliente.`, 'error');
          return
        }

      } else {

        if (codDocumentoIdentidad == "1" && numdocumentoIdentidad.length == 0) {
          swal.fire(this.globalConstants.msgErrorSummary, `Ingrese el nro de documento seleccionado.`, 'error');
          return
        } else {

          if (numdocumentoIdentidad.length != 0) {
            wGrabarDNI = true;
          }

          this.confirmationService.confirm({
            message: `Desea Generar este Documento ${wMensajeE} ${wMensajeG} ?: <br> <br> BOLETA ${this.correlativoConsulta.boleta} `,
            header: 'Graba el Documento',
            icon: 'pi pi-info-circle',
            acceptLabel: 'Si',
            rejectLabel: 'No',
            accept: () => {

              this.isAutenticar = !this.isAutenticar;

            },
            reject: () => {

            }
          });

        }

      }

    } else {

      if (ruc == "" || ruc.length < 11) {
        swal.fire(this.globalConstants.msgErrorSummary, `Ingrese el Numero de Ruc`, 'error');
        return
      } else {

        this.confirmationService.confirm({
          message: `Desea Generar este Documento ${wMensajeE} ${wMensajeG} ?: <br> <br> FACTURA ${this.correlativoConsulta.factura} `,
          header: 'Graba el Documento',
          icon: 'pi pi-info-circle',
          acceptLabel: 'Si',
          rejectLabel: 'No',
          accept: () => {
            this.isAutenticar = !this.isAutenticar;
          },
          reject: () => {

          }
        });

      }

    }


    var value = {
      maquina: this.isNombreMaquina,
      codVenta: this.selectCodVenta,
      codTipoComprobante: codTipoComprobante,
      tipoComprobante: tipoComprobante,
      aNombreDe: cliente,
      ruc: ruc,
      direccion: direccion,
      wFlg_electronico: wFlg_electronico,
      moneda: checkDolar == true ? 'D' : 'S',
      montoTotal: montoTotal,
      cardCode: cardCode,
      idUsuario: this.userContextService.getIdUsuario(),
      //coduser:this.userContextService.getIdUsuario(),
      codCentroCOsto: this.userContextService.getCodigoCentroCosto(),
      correo: correo,
      codTipoAfectacionIgv: codTipoAfectacionIgv,
      tipdocidentidad: codDocumentoIdentidad,
      numdocumentoIdentidad: numdocumentoIdentidad,
      codTipoCliente: codTipoCliente,
      tipoPagos: this.listModeloPago
    }
    //wFlg_electronico
    this.confirmacionRegistrar = value;

    //code 27 verificacion de venta-> se valid en el backend
    //code 28 transaccion

  }

  confirmacionGuadar(value) {

    this.isDisplaySave = true;
    var value = value;
    this.ventasCajaService.setGenerarPagar(value).subscribe(
      (result: any) => {

        this.isDisplaySave = false;

        if (result.exito) {

          this.formularioCabecera.patchValue({
            comprobante: result.comprobante,
            estado: 'C'
          });

          swal.fire(this.globalConstants.msgErrorSummary, result.mensaje, 'success');
        } else {
          swal.fire(this.globalConstants.msgErrorSummary, result.mensaje, 'error');
        }
      },

      (error) => {
        this.isDisplaySave = false;
        swal.fire(this.globalConstants.msgErrorSummary, `Error al momento de registrar `, 'error');
        return
      }
    );

  }



  validarPagoOrdenBot() {

    var flgSeguiPago = false;

    this.ventasCajaService
      .getGetMdsynPagosConsulta(this.selectCodVenta)
      .subscribe(
        (resp: any) => {


          if (resp.cod_venta == null) {
            flgSeguiPago = false;

          } else {
            flgSeguiPago = true;
          }

          var result = true;
          if (flgSeguiPago == false) {
            this.confirmationService.confirm({
              message: `Esta venta tiene una orden de pago. <br> <br> ¿Esta seguro que no desea utilizar el pago del bot?`,
              header: 'Advertencia - Orden de pago (BOT)',
              icon: 'pi pi-info-circle',
              acceptLabel: 'Si',
              rejectLabel: 'No',
              accept: () => {
                result = true;
              },
              reject: () => {
                debugger
                result = false;
              }
            });
            return result;
          }

        },
        (error) => {
          this.messageService.add({ key: 'toasVentaCaja', severity: 'error', summary: 'Mensaje', detail: error.error.resultadoDescripcion });
          console.log(error);
        }
      );
  }

  quitar(index) {
    this.listModeloPago.splice(+index, 1);
  }

  //#region INCIO MODAL ACTIVAR

  activarModalTCredito(item, index) {
    this.selectPago = item;
    this.selectPagoIndex = index;
    this.isActivateBusquedaTCredito = !this.isActivateBusquedaTCredito;
  }

  cancelarModalTCredito() {
    this.isActivateBusquedaTCredito = false;
  }

  activarModalTerminal(item, index) {
    this.selectPagoIndex = index;
    this.selectPago = item;
    this.isActivateBusquedaTerminal = !this.isActivateBusquedaTerminal;
  }

  cancelarModalTerminal() {
    this.isActivateBusquedaTerminal = false;
  }

  activarModalTPago(item, index) {
    this.selectPago = item;
    this.selectPagoIndex = index;
    this.isActivateBusquedaTPago = !this.isActivateBusquedaTPago;
  }

  cancelarModalTPago() {
    this.isActivateBusquedaTPago = false;
  }

  activarModalBancos(item, index) {
    this.selectPagoIndex = index;
    this.selectPago = item;
    this.isActivateBusquedaBancos = !this.isActivateBusquedaBancos;
  }

  cancelarModalBancos() {
    this.isActivateBusquedaBancos = false;
  }

  //#endregion FIN MODAL ACTIVAR

  //#region INCIO MODAL EVENT (eventoAceptar)

  goTipoPagoSeleccionado(dato: any) {

    var id = this.selectPago.codTipoPago;
    var objPago = this.listModeloPago[this.selectPagoIndex];

    if (objPago.codTipoPago == id) {
      objPago.codTipoPago = dato.codigo.trim(),
        objPago.nombreTipoPago = dato.nombre.trim()
    }
    if (objPago.codTipoPago == 'D' || objPago.codTipoPago == 'E') {
      objPago.codEntidad = '';
      objPago.nombreEntidad = '';//(VACIO)
      objPago.nroOperacion = '';//(VACIO)
    } else {
      objPago.nroOperacion = '';
      objPago.codEntidad == '';
      objPago.nombreEntidad = 'SELECCIONE';
    }

    if (objPago.codTipoPago == 'T') {
      objPago.codTerminal = '';
      objPago.terminal = 'SELECCIONE';
    } else {
      objPago.codTerminal = '';
      objPago.terminal = '';
    }

  }

  goBancosSeleccionado(dato: any) {
    var obj = this.listModeloPago[this.selectPagoIndex];
    obj.codEntidad = dato.codigo.trim();
    obj.nombreEntidad = dato.nombre.trim();
  }

  goTCreditoSeleccionado(dato: any) {
    var obj = this.listModeloPago[this.selectPagoIndex];
    obj.codEntidad = dato.codigo.trim();
    obj.nombreEntidad = dato.nombre.trim();
  }

  goTerminalSeleccionado(dato: any) {
    var obj = this.listModeloPago[this.selectPagoIndex];
    obj.codTerminal = dato.codterminal.trim();
    obj.terminal = dato.numeroterminal.trim();
  }



  goAceptarGrabar(value: any) {

    this.goCancelarGrabar();

    if (!value.valido) {
      swal.fire(this.globalConstants.msgInfoSummary, value.observacion, 'error')
      return;
    }

    this.confirmacionGuadar(this.confirmacionRegistrar);
  }

  goCancelarGrabar() {
    this.isAutenticar = !this.isAutenticar;
  }
  //#endregion FIN MODAL EVENT (eventoAceptar)

  //#region INICIO LOAD CARGA DEFAULT

  onObtieneEstacionTrabajo() {
    this.functionDblocalService.getByKey(ConstantsTablasIDB._TABLA_ESTACION_TRABAJO, 1)
      .subscribe((res: any) => {
        if (res !== undefined) {
          this.isNombreMaquina = res.nombreequipo;
          this.onObtieneConfiguracionEstacionTrabajo(res.nombreequipo);
        }
      },
        (error) => {
          swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion, 'error')
        }
      );
    //this.onObtieneConfiguracionEstacionTrabajo("DESKTOP-JB75D7O");
  }

  onObtieneConfiguracionEstacionTrabajo(nombremaquina: string) {
    this.ventasCajaService.getListSeriePorMaquinaPorNombre(nombremaquina)
      .subscribe((res: any[]) => {

        if (res.length > 0) {
          this.gEstacionTrabajo = res;
          this.metodosInicio();
          this.getCorrelativoConsulta(nombremaquina);
        } else {
          this.messageService.add({ key: 'toasVentaCaja', severity: 'error', summary: 'Mensaje', detail: ` NO TIENE CONFIGURADO LAS SERIES PARA LA ESTACION DE TRABAJO: ${nombremaquina}` });
        }

      },
        (error) => {
          swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion, 'error');
        }
      );
  }


  getTipoComprobante() {

    this.ventasCajaService
      .getTipoComprobante()
      .subscribe(
        (resp: any) => {
          this.rowTipoComprobante = [];
          resp.forEach(item => {
            this.rowTipoComprobante.push({ value: item.code, label: item.u_SYP_TDDD });
          });

          //var aa = this.rowTipoComprobante.find(x => x.value == "03");
          this.selectTipoComprobante = this.rowTipoComprobante.find(x => x.value == "03");
          this.getSerieComprobante(this.selectTipoComprobante.value);
        },
        (error) => {
          console.log(error);
          this.messageService.add({ key: 'toasVentaCaja', severity: 'error', summary: 'Mensaje', detail: ` ERROR AL TRAER EL TIPO DE COMPROBNATE` });
        }
      );
  }

  getMontoControl() {
    //zFarmacia.Sp_Tablas_Consulta "MONTOCONTROL", "01", 50, 0, 4
    this.ventasCajaService
      .getTablaLogisticaPorFiltros("MONTOCONTROL", '01', 50, 0, 4)
      .subscribe(
        (resp: any) => {
          if (resp !== null) {
            if (resp.valor) {
              this.gMontoControl = resp.valor;
            }
          }
        },
        (error) => {
          console.log(error);
          this.messageService.add({ key: 'toasVentaCaja', severity: 'error', summary: 'Mensaje', detail: ` ERROR: AL TRAER EL MONTO DE CONTROL` });
        }
      );
  }

  getCorreoComprobanteCsf() {
    this.ventasCajaService
      .getTablasClinicaPorFiltros("EFACT_CORREOENVIOCOMPROBANTE", "01", 50, 1, -1)
      .subscribe(
        (resp: any) => {
          this.gComprobanteCorreoCSF = resp.nombre;
        },
        (error) => {
          this.messageService.add({ key: 'toasVentaCaja', severity: 'error', summary: 'Mensaje', detail: ` ERROR: AL TRAER EL CORREO DE LA CLINICA -> ComprobanteCorreoCSF` });
        }
      );
  }

  getLimiteConsumoPersonal(codPersonal) {
    //zFarmacia.Sp_LimiteConsumoPersonal RTrim(wCodCliente)  '"0660"
    this.ventasCajaService
      .getLimiteConsumoPersonal(codPersonal)
      .subscribe(
        (resp: any) => {
          this.limiteConsumoPersonal = resp;
        },
        (error) => {
          console.log(error);
          this.messageService.add({ key: 'toasVentaCaja', severity: 'error', summary: 'Mensaje', detail: ` ERROR: AL TRAER LIMITE DE CONSUMO` });
        }
      );
  }

  getCorrelativoConsulta(nombreMaquina) {

    this.ventasCajaService
      .getListConfigDocumentoPorNombreMaquina(nombreMaquina)
      .subscribe(
        (resp: any) => {
          this.correlativoConsulta = resp[0];
        },
        (error) => {
          console.log(error);
          this.messageService.add({ key: 'toasVentaCaja', severity: 'error', summary: 'Mensaje', detail: ` ERROR: AL TRAER CORRELATIVO CONSULTA` });
        }
      );
  }

  //EFACT_TIPOCODIGO_BARRAHASH
  getEfactTipoCodigoBarrahash() {
    //zFarmacia2.Sp_Tablas_Consulta "EFACT_TIPOCODIGO_BARRAHASH", "01", 50, 1, -1
    this.ventasCajaService
      .getTablasClinicaPorFiltros("EFACT_TIPOCODIGO_BARRAHASH", "01", 50, 1, -1)
      .subscribe(
        (resp: any) => {
          this.efactTipoCodigoBarrahash = resp;
        },
        (error) => {
          console.log(error);
          this.messageService.add({ key: 'toasVentaCaja', severity: 'error', summary: 'Mensaje', detail: ` ERROR: AL TRAER EL EFACT_TIPOCODIGO_BARRAHASH DE LA CLINICA` });
        }
      );
  }

  IsInputComprobanteValida(): boolean {
    var valida = false;
    const { comprobante } = this.formularioCabecera.value;
    if (comprobante === undefined || comprobante === "") {
      swal.fire(this.globalConstants.msgErrorSummary, "DEBES PRIMERO BUSCAR EL COMPROBNATE", 'warning');
      valida = true;
    }
    return valida;
  }

  IsInputMaquinaValida(): boolean {
    var valida = false;
    if (this.isNombreMaquina == '') {
      swal.fire(this.globalConstants.msgErrorSummary, "DEBES ASIGNAR UNA MAQUINA", 'error');
      valida = true;
    }
    return valida;
  }

  onPreVistaValida() {

    if (this.IsInputMaquinaValida()) return;
    if (this.IsInputComprobanteValida()) return;

    const { comprobante } = this.formularioCabecera.value;
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasCajaService.getPreVistaValida(comprobante)
      .subscribe(() => {
        debugger
        this.onPreVista(comprobante);
      },
        (error) => {
          debugger
          var error = error.error.resultadoDescripcion ? error : error.error.resultadoDescripcion;
          swal.fire(this.globalConstants.msgErrorSummary, error, 'error');
        });

  }

  onPreVista(comprobante) {

    debugger

    this.isDisplayVisualizar = !this.isDisplayVisualizar;

    //var codcomprobante = "05563376";
    //comprobante = "B4100000025";
    // const { comprobante } = this.formularioCabecera.value;

    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasCajaService.getGenerarPreVistaPrint(comprobante, this.isNombreMaquina, "1", "0")
      .subscribe((resp: any) => {

        switch (resp.type) {
          case HttpEventType.DownloadProgress:
            break;
          case HttpEventType.Response:
            this.isDataBlob = new Blob([resp.body], { type: resp.body.type });
            this.isDisplayVisualizar = !this.isDisplayVisualizar;

            this.isDisplayVisualizarDocumento = !this.isDisplayVisualizarDocumento;
            break;
        }
      },
        (error) => {
          this.isDisplayVisualizar = !this.isDisplayVisualizar;
          swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion, 'error');
        });

  }

  onComprobanteElectronicoValida() {

    if (this.IsInputMaquinaValida()) return;
    if (this.IsInputComprobanteValida()) return;

    //const { comprobante } = this.formularioCabecera.value;
    //B4100000025
    var comprobante = "B4100046208";
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasCajaService.getComprobanteElectrValida(comprobante)
      .subscribe(() => {
        this.onPDfComprobanteElectronico(comprobante);
      },
        (error) => {
          swal.fire(this.globalConstants.msgErrorSummary, error.error, 'error');
        });

  }

  onPDfComprobanteElectronico(codcomprobante) {

    this.isDisplayVisualizar = !this.isDisplayVisualizar;

    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasCajaService.getComprobanteElectronicoPrint(codcomprobante)
      .subscribe((resp: any) => {

        switch (resp.type) {
          case HttpEventType.DownloadProgress:
            break;
          case HttpEventType.Response:
            this.isDataBlob = new Blob([resp.body], { type: resp.body.type });
            this.isDisplayVisualizar = !this.isDisplayVisualizar;

            this.isDisplayVisualizarDocumento = !this.isDisplayVisualizarDocumento;
            break;
        }
      },
        (error) => {
          this.isDisplayVisualizar = !this.isDisplayVisualizar;
          swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion, 'error');
        });

  }

  activarGenerarPagoBot() {
    this.isActivateGenerarPagoBot = !this.isActivateGenerarPagoBot;
  }

}
