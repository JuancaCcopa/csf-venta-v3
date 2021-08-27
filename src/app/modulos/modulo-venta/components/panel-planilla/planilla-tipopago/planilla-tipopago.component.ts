//libreria
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ConfirmationService } from 'primeng/api';


//constante
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';

//services

import { SessionService } from '../../../../../services/session.service';
import { LanguageService } from '../../../../../services/language.service';
import { MensajePrimeNgService } from '../../../../../services/mensaje-prime-ng.service';
import { UserContextService } from '../../../../../services/user-context.service';
import { UtilService } from '../../../../../services/util.service';
import { PlanillaService } from '../../../services/planilla.service';
// import { VentasService } from '../../../services/ventas.service';
import { VentasCajaService } from '../../../services/ventas-caja.service';

import swal from 'sweetalert2';


@Component({
  selector: 'app-planilla-tipopago',
  templateUrl: './planilla-tipopago.component.html',
  styleUrls: ['./planilla-tipopago.component.css']
})

export class PlanillaTipoPagoComponent implements OnInit {
  formularioTipoPago: FormGroup;
  // Suscripcion [para realizar el unsuscription al cerrar el formulario]
  subscription$: Subscription;

  @Input() isHabilitaControl = false;
  @Input() isHabilitaEdicion = false;

  @Input() obtenerDocumento: string;

  @Output() cancel = new EventEmitter<any>();

  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;

  //Grilla
  indexItemElegidoGrilla = 0;
  // listModelo: any[];
  columnas: any;
  titulo: any;
  totalPago: string = '';
  codventa: string = '';

  //grilla tipo de pagos
  listModeloPago: any[] = [];

  //items: MenuItem[];

  //Modal tipo de pago
  isActivateBusquedaTPago: boolean = false;
  //Modal Banco
  isActivateBusquedaBancos: boolean = false;
  //Modal Tarjeta credito
  isActivateBusquedaTCredito: boolean = false;
  //Modal Terminal
  isActivateBusquedaTerminal: boolean = false;

  bodyParams: any;
  //isActivateBusquedaArticulo = false; //jc
  loading = false;
  constructor(
    private readonly fb: FormBuilder,
    private confirmationService: ConfirmationService,
    public lenguageService: LanguageService,
    public mensajePrimeNgService: MensajePrimeNgService,
    public userContextService: UserContextService,
    private readonly planillaService: PlanillaService,
    private readonly ventasCajaService: VentasCajaService,
    private messageService: MessageService,
    private readonly utilService: UtilService) { }

  ngOnInit(): void {

    this.getCuadredeCaja();
    this.titulo = this.isHabilitaEdicion ? 'MODIFICAR TIPO DE PAGO' : 'VER TIPO DE PAGO';
    this.buildForm();

  }

  private buildForm() {

    this.formularioTipoPago = this.fb.group({
      numeroPlanilla: '',
      documento: '',
      fechaEmision: '',
      fechaCancelacion: '',
      estado: ''
    });

  }

  activarModalTerminal(index) {
    this.indexItemElegidoGrilla = index;
    this.isActivateBusquedaTerminal = !this.isActivateBusquedaTerminal;
  }

  //modal tipo de pago
  activarModalTPago(index) {
    this.indexItemElegidoGrilla = index;
    this.isActivateBusquedaTPago = !this.isActivateBusquedaTPago;
  }

  activarModalTCredito(index) {
    this.indexItemElegidoGrilla = index;
    this.isActivateBusquedaTCredito = !this.isActivateBusquedaTCredito;
  }

  activarModalBancos(index) {

    this.indexItemElegidoGrilla = index;
    this.isActivateBusquedaBancos = !this.isActivateBusquedaBancos;

  }
  quitarItemTipoPago(index) {
    this.listModeloPago.splice(+index, 1);
  }

  getCuadredeCaja() {

    this.loading = true;

    this.planillaService
      .getCuadredeCaja(this.obtenerDocumento)
      .subscribe(
        (resp: any) => {

          this.loading = false;

          console.log("getCuadredeCaja", resp);
          this.listModeloPago = resp;
          var total = 0
          Array.from(this.listModeloPago, item => {
            if (item["moneda"] == "S") {
              item["montoDolar"] = 0;
              total += item["montoSoles"];
            }
            if (item["moneda"] == "D") {
              item["monto"] = 0;
              total += item["montoDolar"];
            }
            //
            //total+=  item["monto"]+item["montoDolar"];
          });

          var dato = this.listModeloPago[0];
          this.codventa = dato.codVenta;

          this.formularioTipoPago.patchValue({
            numeroPlanilla: dato.numeroPlanilla,
            documento: this.obtenerDocumento,
            fechaEmision: dato.strFechaEmision,
            fechaCancelacion: dato.strFechaCancelacion,
            estado: dato.estado
          });

          this.totalPago = total.toString();

        },
        (error) => {
          this.messageService.add({ key: 'toasVentaCaja', severity: 'error', summary: 'Mensaje', detail: error.error.ErrorMessage ? error.error.ErrorMessage : error.error });
        }
      );

  }

  goBancosSeleccionado(dato: any) {
    var obj = this.listModeloPago[this.indexItemElegidoGrilla];
    obj.codEntidad = dato.codigo.trim();
    obj.nombreEntidad = dato.nombre.trim();
    this.isActivateBusquedaBancos = !this.isActivateBusquedaBancos;
  }

  goTipoPagoSeleccionado(dato: any) {

    // var id =this.selectPago.codTipoPago;
    var objPago = this.listModeloPago[this.indexItemElegidoGrilla];

    //if(objPago.codTipoPago==id){
    objPago.codTipoPago = dato.codigo.trim(),
      objPago.nombreTipoPago = dato.nombre.trim()
    //}
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

    this.isActivateBusquedaTPago = !this.isActivateBusquedaTPago;

  }

  goTCreditoSeleccionado(dato: any) {

    var obj = this.listModeloPago[this.indexItemElegidoGrilla];
    obj.codEntidad = dato.codigo.trim();
    obj.nombreEntidad = dato.nombre.trim();
    this.isActivateBusquedaTCredito = !this.isActivateBusquedaTCredito;

  }

  goTerminalSeleccionado(dato: any) {

    var obj = this.listModeloPago[this.indexItemElegidoGrilla];
    obj.codTerminal = dato.codterminal.trim();
    obj.terminal = dato.numeroterminal.trim();
    this.isActivateBusquedaTerminal = !this.isActivateBusquedaTerminal;

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

    this.totalPago = Number(montoSoles).toString();
  }

  soloNumeros(e) {
    var key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57) {
      if (key != 46) e.preventDefault(); //return true
      //Usando la definición del DOM level 2, "return" NO funciona.
    }
  }

  guadarTipoPago() {

    var total = 0
    if (this.listModeloPago.length < 1) {
      swal.fire(this.globalConstants.msgErrorSummary + "No ingreso ningún tipo de pago...", 'error');
      return;
    }

    Array.from(this.listModeloPago, x => {
      total += x["montoMn"]
    });

    if (total == 0) {
      swal.fire(this.globalConstants.msgErrorSummary, "Error el importe no puede ser 0", 'error')
      return;
    }

    if (this.totalPago != total.toString()) {
      swal.fire(this.globalConstants.msgErrorSummary, "La suma de los montos deben ser iguales al total de la factura", 'error')
      return;
    }

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

    this.govalidarVentaCabeceraPorCodVenta();

  }

  govalidarVentaCabeceraPorCodVenta() {

    debugger
    this.ventasCajaService
      .getVentaCabeceraPorCodVenta(this.codventa)
      .subscribe(
        (resp: any) => {
          debugger
          console.log("govalidarVentaCabeceraPorCodVenta", resp);

          var {
            numeroPlanilla
          } = this.formularioTipoPago.value;

          if (resp.estado == "C" && numeroPlanilla == "") {

            this.confirmationService.confirm({
              message: `Desea Modificar el Tipo de Pago?`,
              header: 'Tipo de venta',
              icon: 'pi pi-info-circle',
              acceptLabel: 'Si',
              rejectLabel: 'No',
              accept: () => {

                Array.from(this.listModeloPago, item => {
                    item["montoSoles"]=Number(item["montoSoles"]);
                    item["montoDolar"]=Number(item["montoDolar"]);
                });

                var obj = {
                  tipoPagos: this.listModeloPago
                };
                this.setTipoPagoRegistrar(obj);

                //grabamos
                //this.isAutenticar = !this.isAutenticar;

              },
              reject: () => {
                debugger
                //result=false;
              }
            });

          } else {
            swal.fire(this.globalConstants.msgErrorSummary + " Farmacia", "Verifique el estado del Comprobante o que no pertenezca a una planilla", 'error');
            return;
          }

        },
        (error) => {
          console.log(error);
          swal.fire(this.globalConstants.msgErrorSummary + " Farmacia", error.message, 'error');
          return;
        }
      );

  }

  setTipoPagoRegistrar(obj) {

    this.planillaService
      .setTipoPagoRegistrar(obj)
      .subscribe(
        (resp: any) => {
          console.log("setTipoPagoRegistrar", resp);
          
          //if (resp.resultadoCodigo == 0) {
            if (resp.resultadoCodigo == 0) {
            swal.fire(this.globalConstants.msgExitoSummary + " Pagos", resp.resultadoDescripcion, 'success');
            this.isHabilitaControl = !this.isHabilitaControl;
          } else {
            swal.fire(this.globalConstants.msgErrorSummary + " Pagos", resp.resultadoDescripcion, 'error');
          }

        },
        (error) => {
          
          console.log(error)
          swal.fire(this.globalConstants.msgErrorSummary + " Pagos", error.resultadoDescripcion, 'error');
        }
      );

  }

  isActivateTipoPago(){
    this.isHabilitaControl=!this.isHabilitaControl;
  }

  getGrillaPagosPorDefecto(){
    
    var {documento,fechaCancelacion} =this.formularioTipoPago.value;  
    
    this.listModeloPago.push(
      {
        documento:documento,
        strFechaCancelacion:fechaCancelacion,
        codTipoPago:'E',
        nombreTipoPago:'EFECTIVO',
        codEntidad:'',
        nombreEntidad:'',
        nroOperacion:'',
        montoSoles:0,
        montoDolar:0,
        montoMn:0,
        codTerminal:'',
        terminal:''
      }
    );

  }

}
