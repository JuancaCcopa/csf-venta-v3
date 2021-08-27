import { Component, OnInit } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { InterfaceColumnasGrilla } from '../../../interface/columnas-grilla-interface';
import { interfaceUsuario } from '../../../../modulo-administracion/models/usuario.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IRequerimiento, IRequerimientoAutorizar, IRequerimientoAnular, IRequerimientoRevisar } from '../../../models/requerimiento.interface';
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';
import { Router } from '@angular/router';
import { RequerimientoService } from '../../../services/requerimiento.service';
import { UtilService } from '../../../../../services/util.service';
import { MensajePrimeNgService } from '../../../../../services/mensaje-prime-ng.service';
import { SessionService } from '../../../../../services/session.service';
import { ConfirmationService } from 'primeng/api';
import { LanguageService } from '../../../../../services/language.service';
import { UserContextService } from '../../../../../services/user-context.service';
import { IMensajeResultadoApi } from '../../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-revision-requerimiento-economato',
  templateUrl: './revision-requerimiento-economato.component.html',
  styleUrls: ['./revision-requerimiento-economato.component.css']
})
export class RevisionRequerimientoEconomatoComponent implements OnInit {
  // Titulo del componente
  titulo = 'Revisión - Requerimiento Economato';
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  cabeceraTabla: InterfaceColumnasGrilla[] = [];
  cabeceraTablaVisible: InterfaceColumnasGrilla[] = [];
  opciones: any = [];
  modalRegistroRequerimiento: boolean;
  isActivateBusquedaUsuario = false;
  usuarioSeleccionadoDelModal: interfaceUsuario;
  formularioBusqueda: FormGroup;
  rowBusquedaRequerimiento: IRequerimiento[] = [];
  isVerModalDetalle = false;
  itemSeleccionado: IRequerimiento;
  idEditadoResaltar: number = 0;
  tituloDetalle: string;
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;

  constructor(
              private readonly router: Router,
              private readonly fb: FormBuilder,
              private readonly requerimientoService: RequerimientoService,
              private readonly utils: UtilService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private readonly sessionStorage: SessionService,
              private readonly confirmationService: ConfirmationService,
              public lenguageService: LanguageService,
              private userContextService: UserContextService
  ) {
    this.buildForm();
  }
  ngOnDestroy(){

  }

  ngOnInit() {
    if (this.sessionStorage.getItem('busquedaRequerimientoEconomatoRevision')) {
        const bodyBusqueda = this.sessionStorage.getItem('busquedaRequerimientoEconomatoRevision');
        this.formularioBusqueda.patchValue({
          fechaInicio: new Date(bodyBusqueda.fechaIn),
          fechaFin: new Date(bodyBusqueda.fechaFin),
          usuario: this.userContextService.getIdUsuario()
        });
      this.search(
        bodyBusqueda.fechaIn,
        bodyBusqueda.fechaFin,
        this.userContextService.getIdUsuario(),
        10
      );
    }

    if (this.sessionStorage.getItem('idRequerimiento')) {
      this.idEditadoResaltar = this.sessionStorage.getItem('idRequerimiento');
    }

    this.opcionesTabla();
    this.datosCabecera();
  }

  private buildForm() {
    this.formularioBusqueda = this.fb.group({
      fechaInicio: this.utils.restarDia(
        new Date(),
        ConstantesGenerales.RANGO_DIAS_BUSQUEDA
      ),
      fechaFin: new Date(),
      usuario: [null],
    });
  }

  itemElegido(datosDelSeleccionado) {
    this.itemSeleccionado = datosDelSeleccionado;
  }

  opcionesTabla() {
    this.opciones = [
      {
        label: 'Ver',
        icon: 'pi pi-eye',
        command: () => {
          this.ver();
        },
      }, 
      {
        label: 'Revisar',
        icon: 'pi pi-unlock',
        command: () => {
          this.autorizar();
        },
      },   
    ];
  }

  ver() {
    this.isVerModalDetalle = !this.isVerModalDetalle;
    const { idRequerimiento } = this.itemSeleccionado;
    this.tituloDetalle = `Detalle - Id Requerimiento ${idRequerimiento}`;
  }

  autorizar() {
    this.autorizarRequerimiento();
  }

  aprobadores() {}

  autorizarRequerimiento() {
    this.confirmationService.confirm({
      message: `Seguro de revisar el requerimiento con el Id ${this.itemSeleccionado.idRequerimiento} ?`,
      header: 'Confirmación de Revisión',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        const reqRevisar: IRequerimientoRevisar = {
          idRequerimiento: this.itemSeleccionado.idRequerimiento,
          regUpdateIdUsuario: this.userContextService.getIdUsuario(),
          idUsuario: this.userContextService.getIdUsuario()
        };
        this.requerimientoService.revisarRequerimiento(reqRevisar).subscribe(
          (resp: IMensajeResultadoApi) => {
            this.mensajePrimeNgService.onToExitoMsg(null, resp.resultadoDescripcion);
            this.clickBusqueda();
          },
          (error) => {
            this.mensajePrimeNgService.onToErrorMsg(null, error.error);
          }
        );
      },
    });
  }

  datosCabecera() {
    this.cabeceraTabla = [
      { field: 'idRequerimiento', header: 'Id Requerimiento', visibility: true, tipoFlag: "", formatoFecha: ""  },
      { field: 'origen', header: 'Origen', visibility: false, tipoFlag: "", formatoFecha: ""  },
      { field: 'fecRequerimiento', header: 'Fecha Req.', visibility: true, tipoFlag: "", formatoFecha: ""  },
      { field: 'idUsuario', header: 'idUsuario', visibility: false, tipoFlag: "", formatoFecha: ""  },
      { field: 'usuario', header: 'Solicitante', visibility: true, tipoFlag: "", formatoFecha: ""  },
      { field: 'codCentroCosto', header: 'Cod. Centro de Costo', visibility: false, tipoFlag: "", formatoFecha: ""  },
      { field: 'desCentroCosto', header: 'Centro de Costo', visibility: true, tipoFlag: "", formatoFecha: ""  },
      { field: 'idSolicitudSAP', header: 'Solicitud SAP', visibility: true, tipoFlag: "", formatoFecha: ""  },
      { field: 'conformidadSAP', header: 'Conformidad SAP', visibility: true, tipoFlag: "", formatoFecha: ""  },
      { field: 'obsConformidadSAP', header: 'Obs. Conformidad SAP', visibility: true, tipoFlag: "", formatoFecha: ""  },
      { field: 'desRequerimientoEstado', header: 'Estado', visibility: true, tipoFlag: "", formatoFecha: ""  },
      { field: 'isAutorizado', header: 'IsAutorizado', visibility: false, tipoFlag: "", formatoFecha: ""  },
      { field: 'desAutorizado', header: 'Autorizado', visibility: false, tipoFlag: "", formatoFecha: ""  },
    ];
    
    this.cabeceraTablaVisible = this.cabeceraTabla.filter(x => x.visibility == true);
    
  }

  clickBusqueda() {
    const formBody = this.formularioBusqueda.value;
    const fechaIn = this.utils.fecha_AAAAMMDD(formBody.fechaInicio);
    const fechaFin = this.utils.fecha_AAAAMMDD(formBody.fechaFin);
    const idUsuario = this.userContextService.getIdUsuario();

    const idRequerimientoEstado = 10;
    this.search(fechaIn, fechaFin, idUsuario, idRequerimientoEstado);
  }

  search(fechaIn, fechaFin, idUsuario, idRequerimientoEstado) {

    this.rowBusquedaRequerimiento = [];
    this.requerimientoService
      .getBusquedaRequerimientoXUsuario(
        fechaIn,
        fechaFin,
        idUsuario,
        idRequerimientoEstado,
        2
      )
      .pipe(
        map((resp) => {
          if (resp.length === 0) {
            // this.mensajePrimeNgService.onToExitoMsg();
          } else if (resp.length > 0) {
            this.rowBusquedaRequerimiento = resp;
            const bodyBusqueda = {
              fechaIn,
              fechaFin,
              idUsuario,
            };
            // TODO SE GUARDA LA BUSQUEDA EN EL STORAGE
            this.sessionStorage.setItem('busquedaRequerimientoEconomatoRevision', bodyBusqueda);
          }
        })
      )
      .subscribe();
  }
}
