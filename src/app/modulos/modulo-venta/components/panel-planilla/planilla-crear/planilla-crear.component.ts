//libreria
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';//JC
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { SelectItem } from 'primeng';
import { MenuItem } from 'primeng';

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
import swal from 'sweetalert2';

//Interface
import { IMensajeResultadoApi } from '../../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';

@Component({
  selector: 'app-planilla-crear',
  templateUrl: './planilla-crear.component.html',
  styleUrls: ['./planilla-crear.component.css']
})

export class PlanillaCrearComponent implements OnInit {
  formularioSuperior: FormGroup;
  // Suscripcion [para realizar el unsuscription al cerrar el formulario]
  subscription$: Subscription;

  @Input() isHabilitaControl = false;
  @Output() cancel = new EventEmitter<any>();

  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;

  //Grilla
  indexItemElegidoGrilla = 0;
  listModelo: any[];
  columnas: any;

  // centro de costo
  rowCentroCosto: SelectItem[];
  rowCentroCostoSelect: any;

  //modal usuarios
  isActivateUsuario = false;

  // modal ver tipo de pago
  isActivateTipodePago = false;
  isActivateEdicionTipodePago = false;
  selectDocumento: string;

  // PrimeNG
  items: MenuItem[];

  bodyParams: any;//JC

  loading = false;
  constructor(
    private readonly fb: FormBuilder,
    private readonly activeRoute: ActivatedRoute,
    public lenguageService: LanguageService,
    public mensajePrimeNgService: MensajePrimeNgService,
    public userContextService: UserContextService,
    private readonly location: Location,
    private readonly planillaService: PlanillaService,
    private readonly sessionStorage: SessionService,
    private messageService: MessageService,
    private readonly utilService: UtilService) { }

  ngOnInit(): void {

    this.buildFormSuperior();
    this.buildOpciones();

  }

  private buildOpciones() {

    this.items = [
      {
        label: 'Ver Tipo Pago', icon: 'fa fa-list', command: () => {

          var obj = this.listModelo[this.indexItemElegidoGrilla];
          this.selectDocumento = obj.documento;
          this.activarModalTipoPago();
          this.isActivateEdicionTipodePago = false;
        }
      },
      {
        label: 'Modificar Tipo Pagos', icon: 'pi pi-pencil', command: () => {
          var obj = this.listModelo[this.indexItemElegidoGrilla];
          this.selectDocumento = obj.documento;
          this.activarModalTipoPago();
          this.isActivateEdicionTipodePago = true;
        }
      }
    ];

  }

  private obtenerTotal() {
    var totalIngreso = 0;
    Array.from(this.listModelo, item => {
      totalIngreso += item["docmonto"];
    });

    this.formularioSuperior.patchValue({
      totalIngresos: totalIngreso
    });

  }

  private buildFormSuperior() {

    this.formularioSuperior = this.fb.group({
      codCentro: '',
      cbCentroCosto: '',
      fechaDesde: [new Date()],
      fechaHasta: [new Date()],
      montoDolar: 0,
      codCobrador: '',
      nombreCobrador: '',
      seriePlanilla: '',
      numeroPlanilla: '',
      numeroDocumento: '',
      totalIngresos: 0
    });

    this.columnas = [
      //{ field: 'documento', header: 'Documento E' },
      { field: 'documentoe', header: 'Documento E' },
      { field: 'nombres', header: 'A Nombre de' },
      { field: 'docmonto', header: 'Monto' },
      { field: 'movimiento', header: 'Movimiento' }

    ];

  }


  itemElegido(index) {
    this.indexItemElegidoGrilla = index;
  }

  onConsultar() {

    //this.planillaService.getConsultar("04/20/2006","04/20/2021","00000006","078","1").subscribe(
    this.loading = true;

    var {
      codCentro,
      fechaDesde,
      fechaHasta,
      codCobrador,
    } = this.formularioSuperior.value;

    var fechaD = this.utilService.fecha_AAAAMMDD_F112(fechaDesde);
    var fechaH = this.utilService.fecha_AAAAMMDD_F112(fechaHasta);

    //reverse
    this.planillaService.getConsultar(fechaD, fechaH, codCobrador, codCentro, "1").subscribe(
      (resp: any) => {

        this.listModelo = resp;
        this.loading = false;
        this.obtenerTotal();

      },
      (error) => {
        this.loading = false;
        console.log(error);
        swal.fire(this.globalConstants.msgErrorSummary, error.error, 'error')
      }
    );
  }

  usuarioBuscado(event: any) {
    this.formularioSuperior.patchValue({
      codCobrador: event.idUsuario,
      nombreCobrador: event.nombre + " " + event.apellidoPaterno + " " + event.apellidoMaterno
    });
  }

  activarModalUsuario() {
    this.isActivateUsuario = !this.isActivateUsuario;
  }

  goCentroCostoSeleccionado(item: any) {
debugger
    this.formularioSuperior.patchValue({
      codCentro: item.codcentro
    });
    this.onObtenerSeriePlanilla(item.codcentro);
  }


  registrarPlanilla() {

    debugger
    var {
      codCentro,
      codCobrador,
      montoDolar,
      seriePlanilla
    } = this.formularioSuperior.value;

    if (codCentro == "" || codCentro == null) {
      swal.fire(this.globalConstants.msgErrorSummary, "Seleccione un centro", 'error');
      return
    }

    if (codCobrador == "" || codCobrador == null) {
      swal.fire(this.globalConstants.msgErrorSummary, "Seleccione un cobrador", 'error');
      return
    }

    if (seriePlanilla == "" || seriePlanilla == null) {
      swal.fire(this.globalConstants.msgErrorSummary, "El centro de Costo no tiene una serie de planilla asignada", 'error');
      return
    }

    var obj = {
      idusuario: codCobrador,
      codcentro: codCentro,
      montoDolar: montoDolar,
      caja: this.listModelo
    }

    var value = value;
    this.planillaService.setProcesar(obj).subscribe(
      (result: any) => {

        if (result.idRegistro == 0) {
          swal.fire(this.globalConstants.msgExitoSummary, result.resultadoDescripcion + ' ' + result.data, 'success');
          this.formularioSuperior.patchValue({
            numeroPlanilla: result.data
          });
          debugger
          this.sessionStorage.setItemEncrypt('numplanilla', result.data);
          this.onConsultar();
        } else {

          swal.fire(this.globalConstants.msgErrorSummary, result.resultadoDescripcion, 'error');

        }

      },

      (error) => {
        swal.fire(this.globalConstants.msgErrorSummary, `Error al momento de registrar `, 'error');
        return
      }
    );

  }

  activarModalTipoPago() {
    this.isActivateTipodePago = !this.isActivateTipodePago;
  }

  onObtenerSeriePlanilla(codCentro) {

    this.planillaService.getTablaLogisticaPorFiltros("PLANILLAXCENTROCOSTO", codCentro, 0, 0, 3).subscribe(
      (resp: any) => {

        this.formularioSuperior.patchValue({
          seriePlanilla: resp.codigo
        });
      },
      (error) => {
        this.loading = false;
        console.log(error);
        swal.fire(this.globalConstants.msgErrorSummary, error.error, 'error')
      }
    );
  }

  onCerrar() {
    this.cancel.emit();
  }


}
