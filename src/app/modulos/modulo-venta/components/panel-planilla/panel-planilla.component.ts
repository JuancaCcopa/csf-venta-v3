import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { PlanillaService } from '../../services/planilla.service';
//constantes
import { ConstantesGenerales } from '../../../../constants/Constantes-generales';
import { FormGroup, FormBuilder } from '@angular/forms';

import { LanguageService } from '../../../../services/language.service';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { ConfirmationService } from 'primeng/api';
import swal from 'sweetalert2';
import { SelectItem } from 'primeng';
import { SessionService } from '../../../../services/session.service';
import { UtilService } from '../../../../services/util.service';

@Component({
  selector: 'app-panel-planilla',
  templateUrl: './panel-planilla.component.html',
  styleUrls: ['./panel-planilla.component.css']
})
export class PanelPlanillaComponent implements OnInit {
  // Titulo del componente
  titulo = 'Planilla';
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;

  formularioCambioFecha: FormGroup;
  formularioSuperior: FormGroup;

  // Select
  rowSerie: SelectItem[];
  rowSerieSelect: any;

  //Grilla
  indexItemElegidoGrilla = 0;
  listModelo: any[];
  columnas: any;
  loading = false;

  //variables
  gCodcentro = "";
  gIdUsuario = 0;


  //modal usuarios
  isActivateUsuario = false;

  //Modal Crear
  isActivatePlanillaCrear = false;
  tituloModalPlanilla = " Planilla Crear";

  // Modal Cambio de fecha
  tituloNumeroPlanilla = "";
  isActivateBusquedadFecha = false;

  idResaltar: string = "";


  // PrimeNG
  items: MenuItem[];

  itemsImprimir: MenuItem[];

  constructor(private breadcrumbService: BreadcrumbService,
    public lenguageService: LanguageService,
    public mensajePrimeNgService: MensajePrimeNgService,
    private confirmationService: ConfirmationService,
    private readonly fb: FormBuilder,
    private readonly sessionStorage: SessionService,
    private readonly utilService: UtilService,
    private planillaService: PlanillaService) {
    this.breadcrumbService.setItems([
      { label: 'Módulo Venta' },
      { label: 'Consulta', routerLink: ['module-ve/panel-venta'] }
    ]);
  }

  ngOnInit(): void {

    this.buildFormSuperior();
    this.buildFormFechaCambio();
    this.buildOpciones();

    this.obtenerSeriePlanilla();


  }

  ObtenerPlanilla() {
    debugger
    const {
      cbplanillaserie
    } = this.formularioSuperior.value;

    this.idResaltar = (this.sessionStorage.getItemDecrypt('numplanilla')) ? this.sessionStorage.getItemDecrypt('numplanilla') : "";


    var {
      numeroPlanilla,
      fechaInicio,
      fechaFin
    } = this.formularioSuperior.value;

    var fechaD = "";
    var fechaH = "";

    if (fechaInicio != "") {
      fechaD = this.utilService.fecha_AAAAMMDD_F112(fechaInicio);
      fechaH = this.utilService.fecha_AAAAMMDD_F112(fechaFin);
    }

    this.planillaService.getPlanilla("²", "33", "20", "-1", cbplanillaserie.value.substring(0, 2), this.gCodcentro, this.gIdUsuario.toString(), numeroPlanilla, fechaD, fechaH).subscribe(
      (resp: any) => {
        this.listModelo = resp;
      },
      (error) => {
        console.log(error);
        swal.fire(this.globalConstants.msgErrorSummary, error.message, 'error')
      }
    );

  }

  actualizarCambioFecha() {

    const {
      fechaCambio
    } = this.formularioCambioFecha.value;

    var obj = {
      numeroplanilla: this.tituloNumeroPlanilla,
      strfecha: fechaCambio.replaceAll("/", "-")
    };

    this.planillaService.setCambiarFecha(obj).subscribe(
      (resp: any) => {

        if (resp.resultadoCodigo > 0) {
          swal.fire(this.globalConstants.msgExitoSummary, resp.resultadoDescripcion, 'success');
          debugger

          this.ObtenerPlanilla();
        } else {
          swal.fire(this.globalConstants.msgErrorSummary, resp.resultadoDescripcion, 'error');
        }

      },
      (error) => {
        console.log(error);
        swal.fire(this.globalConstants.msgErrorSummary, error.message, 'error')
      }
    );

  }

  private buildFormSuperior() {

    this.formularioSuperior = this.fb.group({
      fechaInicio: [new Date()],
      fechaFin: [new Date()],
      cobrador: '',
      numeroPlanilla: '',
      cbplanillaserie: ''
    });

  }

  private buildFormFechaCambio() {

    this.formularioCambioFecha = this.fb.group({
      fechaCambio: ''
    });

  }

  private buildOpciones() {

    this.items = [

      {
        label: 'Borrar Planilla', icon: 'pi pi-trash', command: () => {
          this.anularNumeroPlanilla();
        }
      },
      {
        label: 'Cambiar Fecha', icon: 'pi pi-pencil', command: () => {
          this.activarCambioFecha();
        }
      },
      { separator: true },
      {
        label: 'Imprimir Planilla', icon: 'fa fa-print', command: () => {
        }
      },
      {
        label: 'Imprimir Detalle', icon: 'fa fa-print', command: () => {
        }
      }
    ];

    this.itemsImprimir = [
      {
        label: 'Imprimir Detalle', icon: 'fa fa-print', command: () => {
        }
      },
      {
        label: 'Consultar Planilla', icon: 'fa fa-print', command: () => {
        }
      }
    ];

    this.columnas = [
      { field: 'numeroplanilla', header: 'N. Planilla' },
      { field: 'numerogrupo', header: 'Grupo' },
      { field: 'coduser', header: 'Cod User' },
      { field: 'nombreusuario', header: 'Nombre Usuario' },
      { field: 'monto', header: 'Monto' },
      { field: 'strFecha', header: 'Fecha' },
      { field: 'estado', header: 'Estado' }

    ];
  }

  itemElegido(index) {
    this.indexItemElegidoGrilla = index;
  }

  activarPlanillaCrear() {
    debugger
    this.isActivatePlanillaCrear = !this.isActivatePlanillaCrear;
    this.ObtenerPlanilla();
  }

  activarCambioFecha() {

    var obj = this.listModelo[this.indexItemElegidoGrilla];
    this.tituloNumeroPlanilla = obj.numeroplanilla;

    this.formularioCambioFecha.patchValue({
      fechaCambio: obj.strFecha
    });

    this.isActivateBusquedadFecha = !this.isActivateBusquedadFecha;

  }

  anularNumeroPlanilla() {

    this.confirmationService.confirm({
      message: `Estas Seguro que deseas eliminar el numero de planilla <strong>${this.listModelo[this.indexItemElegidoGrilla].numeroplanilla}</strong>`,
      header: 'Anular Planilla',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.anunlarPlanilla();
      },
      reject: () => {
      }
    });

  }

  activarModalUsuario() {
    this.isActivateUsuario = !this.isActivateUsuario;
  }

  usuarioBuscado(event: any) {
    this.gIdUsuario = event.idUsuario;
    this.formularioSuperior.patchValue({
      cobrador: event.nombre
    });
  }

  anunlarPlanilla() {

    debugger
    var objenty = this.listModelo[this.indexItemElegidoGrilla];

    var obj = {
      numeroplanilla: objenty.numeroplanilla
    };


    this.loading = true;
    this.planillaService.setAnularPlanilla(obj).subscribe(
      (resp: any) => {

        this.loading = false;
        if (resp.resultadoCodigo >= 0) {
          swal.fire(this.globalConstants.msgExitoSummary, resp.resultadoDescripcion, 'success');
          debugger
          this.ObtenerPlanilla();
        } else {
          swal.fire(this.globalConstants.msgErrorSummary, resp.resultadoDescripcion, 'error');
        }

      },
      (error) => {
        this.loading = false;
        console.log(error);
        swal.fire(this.globalConstants.msgErrorSummary, error.message, 'error')
      }
    );

  }

  obtenerSeriePlanilla() {

    this.planillaService.getListTablaLogisticaPorFiltros("PLANILLANOMBRELOCAL", '', 34, 0, -1).subscribe(
      (resp: any) => {

        this.rowSerie = [];
        resp.forEach(element => {
          this.rowSerie.push({ 'value': element.codigo, 'label': element.nombre });
        });

        this.rowSerieSelect = this.rowSerie[0];
        setTimeout(() => {
          this.ObtenerPlanilla();

        }, 10);

      },
      (error) => {
        console.log(error);
        swal.fire(this.globalConstants.msgErrorSummary, error.message, 'error')
      }
    );

  }

  // cerrarPlanillacrear() {
  //   this.isActivatePlanillaCrear = !this.isActivatePlanillaCrear;
  // }

  changeSerie(obj) {

    this.ObtenerPlanilla()
  }

}
