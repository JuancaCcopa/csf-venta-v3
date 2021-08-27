import { Component, OnInit } from '@angular/core';
import { ConstantesGenerales } from '../../../../constants/Constantes-generales';
import { LanguageService } from '../../../../services/language.service';
import { interfaceUsuario } from '../../../modulo-administracion/models/usuario.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IRequerimiento, IRequerimientoAutorizar, IRequerimientoAnular } from '../../models/requerimiento.interface';
import { Router } from '@angular/router';
import { RequerimientoService } from '../../services/requerimiento.service';
import { UtilService } from '../../../../services/util.service';
import { SessionService } from '../../../../services/session.service';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { ConfirmationService } from 'primeng/api';
import { IMensajeResultadoApi } from '../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';
import { map } from 'rxjs/operators';
import { UserContextService } from '../../../../services/user-context.service';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { InterfaceColumnasGrilla } from '../../interface/columnas-grilla-interface';

@Component({
  selector: 'app-panel-requerimiento',
  templateUrl: './panel-requerimiento.component.html',
  styleUrls: ['./panel-requerimiento.component.css']
})
export class PanelRequerimientoComponent implements OnInit {
  // Titulo del componente
  titulo = 'Requerimiento Bienes y Servicios';
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

  ngOnInit() {

    if (this.sessionStorage.getItem('busquedaRequerimiento')) {
      const bodyBusqueda = this.sessionStorage.getItem('busquedaRequerimiento');
      this.formularioBusqueda.patchValue({
        fechaInicio: new Date(bodyBusqueda.fechaIn),
        fechaFin: new Date(bodyBusqueda.fechaFin),
        usuario: this.userContextService.getIdUsuario()
      });

      this.search(
        bodyBusqueda.fechaIn,
        bodyBusqueda.fechaFin,
        this.userContextService.getIdUsuario(),
        0
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
        label: 'Editar',
        icon: 'pi pi-pencil',
        command: () => {
          this.modificar();
        },
      },
      {
        label: 'Anular',
        icon: 'pi pi-times',
        command: () => {
          this.quitar();
        },
      },
      {
        label: 'Autorizar',
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

  quitar() {
    this.confirmarAnulacion();
  }

  autorizar() {
    this.autorizarRequerimiento();
  }

  aprobadores() {}

  autorizarRequerimiento() {
    this.confirmationService.confirm({
      message: `Desea autorizar el requerimiento con el Id ${this.itemSeleccionado.idRequerimiento} ?`,
      header: 'Confirmación de Autorización',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        const reqAutorizar: IRequerimientoAutorizar = {
          idRequerimiento: this.itemSeleccionado.idRequerimiento,
          regUpdateIdUsuario: 0,
          isAutorizado: true
        };
        console.log('REQ POR AUTORIZAR', reqAutorizar);
        this.requerimientoService.autorizarRequerimiento(reqAutorizar).subscribe(
          (resp: IMensajeResultadoApi) => {
            this.mensajePrimeNgService.onToExitoMsg(null, resp.resultadoDescripcion);
            this.clickBusqueda();
          },
          (error) => {
            console.log('error', error.error);
            this.mensajePrimeNgService.onToErrorMsg(null, error.error);
          }
        );
      },
    });
  }

  confirmarAnulacion() {
    this.confirmationService.confirm({
      message: `Desea anular el requerimiento con el Id ${this.itemSeleccionado.idRequerimiento} ?`,
      header: this.globalConstants.titleAnular,
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        const reqAnular: IRequerimientoAnular = {
          idRequerimiento: this.itemSeleccionado.idRequerimiento,
          regUpdateIdUsuario: 1,
          idRequerimientoEstado: 6,
        };
        this.requerimientoService.anularRequerimiento(reqAnular).subscribe(
          (resp: IMensajeResultadoApi) => {
            this.mensajePrimeNgService.onToExitoMsg(null, resp.resultadoDescripcion);
            this.clickBusqueda();
          },
          (error) => {
            this.mensajePrimeNgService.onToErrorMsg(undefined, error.error);
          }
        );
      },
    });
  }

  modificar() {
    const { idRequerimiento, origen } = this.itemSeleccionado;
    this.router.navigate(['/main/modulo-re/modificar-requerimiento', idRequerimiento, origen]);
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

  usuarioBuscado(event: interfaceUsuario) {
    console.log('usuario buscado', event);
    this.isActivateBusquedaUsuario = false;
    this.usuarioSeleccionadoDelModal = event;
    const { nombresApellidos } = event;
    this.formularioBusqueda.patchValue({
      usuario: nombresApellidos,
    });
  }

  clickActivateBuscarUsuario() {
    this.isActivateBusquedaUsuario = !this.isActivateBusquedaUsuario;
  }

  clickBusqueda() {
    const formBody = this.formularioBusqueda.value;
    const fechaIn = this.utils.fecha_AAAAMMDD(formBody.fechaInicio);
    const fechaFin = this.utils.fecha_AAAAMMDD(formBody.fechaFin);
    const idUsuario = this.userContextService.getIdUsuario();

    const idRequerimientoEstado = 0;
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
        1
      )
      .pipe(
        map((resp) => {
          if (resp.length === 0) {
            this.mensajePrimeNgService.onToExitoMsg();
          } else if (resp.length > 0) {
            this.rowBusquedaRequerimiento = resp;
            const bodyBusqueda = {
              fechaIn,
              fechaFin,
              idUsuario,
            };
            // TODO SE GUARDA LA BUSQUEDA EN EL STORAGE
            this.sessionStorage.setItem('busquedaRequerimiento', bodyBusqueda);
          }
        })
      )
      .subscribe();
  }

  clickNuevo() {
    // if (this.usuarioSeleccionadoDelModal) {
      console.log(this.userContextService.getIdUsuario());
      this.router.navigate(['/main/modulo-re/registrar-requerimiento'], {
        queryParams: {
          idUsuario: this.userContextService.getIdUsuario(),
          empleado: this.userContextService.getNombreCompletoUsuario(),
          codCentroCosto: this.userContextService.getCodigoCentroCosto(),
          desCentroCosto: this.userContextService.getDescripcionCentroCosto(),
        },
      });
    // } else {
    //   this.router.navigate(['/main/modulo-re/registrar-requerimiento']);
    // }
  }
}
