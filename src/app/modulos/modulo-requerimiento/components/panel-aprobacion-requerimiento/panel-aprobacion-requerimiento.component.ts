import { Component, OnInit, ViewChild } from '@angular/core';
import { TableListaAprobadoresComponent } from '../table-lista-aprobadores/table-lista-aprobadores.component';
import { ConstantesGenerales } from '../../../../constants/Constantes-generales';
import { InterfaceColumnasGrilla } from '../../interface/columnas-grilla-interface';
import { interfaceUsuario } from '../../../modulo-administracion/models/usuario.interface';
import { IRequerimiento, IEstadoRequerimiento, IAprobadorFinal } from '../../models/requerimiento.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IAprobacionRequerimientoIndividual, IBodyAprobadorReqMasivolOutIn, IAprobarRequerimientoMasivo } from '../../models/aprobacionRequerimiento.interface';
import { IAprobador } from '../../../modulo-administracion/models/aprobador.interface';
import { UtilService } from '../../../../services/util.service';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { RequerimientoService } from '../../services/requerimiento.service';
import { SessionService } from '../../../../services/session.service';
import { EstadoRequerimientoService } from '../../services/estado-requerimiento.service';
import { DatePipe } from '@angular/common';
import { UserContextService } from '../../../../services/user-context.service';
import { map } from 'rxjs/operators';
import { IMensajeResultadoApi } from '../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';
import { LanguageService } from '../../../../services/language.service';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';

@Component({
  selector: 'app-panel-aprobacion-requerimiento',
  templateUrl: './panel-aprobacion-requerimiento.component.html',
  styleUrls: ['./panel-aprobacion-requerimiento.component.scss']
})
export class PanelAprobacionRequerimientoComponent implements OnInit {

  // Titulo del componente
  titulo = 'Panel de Aprobación';
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  @ViewChild(TableListaAprobadoresComponent)
  tablaListaAprobadores: TableListaAprobadoresComponent;
  
  cabeceraTabla: InterfaceColumnasGrilla[] = [];
  cabeceraTablaVisible: InterfaceColumnasGrilla[] = [];
  modalRegistroRequerimiento: boolean;
  isActivateBusquedaUsuario = false;
  usuarioSeleccionadoDelModal: interfaceUsuario;
  opciones: any = [];
  rowBusquedaRequerimiento: IRequerimiento[] = [];
  itemSeleccionado: IRequerimiento;
  formularioBusqueda: FormGroup;
  modalBusqueda: boolean;
  isModalAprobacion = false;
  isModalDesaprobacion = false;
  idEditadoResaltar: number = 0;
  comboRequerimientoEstado: IEstadoRequerimiento[] = [];
  estadoSeleccionadoRequerimiento: IEstadoRequerimiento;
  isCambioTablaPendientesPorAprobar: boolean = false;
  rowSeleccionParaAprobarMasivo: IAprobacionRequerimientoIndividual[] = [];
  arrayIdQueSeAprobaran: any[] = [];
  dataListaAprobador: IAprobador[] = [];
  dataListaAprobadorFinal: IAprobadorFinal[] = [];
  tituloDetalle: string;
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;
  idRequerimiento: number;
  tituloAprobacionMasivo: string;
  isAprobarMasivo = false;
  isDesaprobarMasivo = false;

  constructor(
    private readonly utils: UtilService,
    public mensajePrimeNgService: MensajePrimeNgService,
    private readonly requerimientoService: RequerimientoService,
    private readonly fb: FormBuilder,
    private readonly sessionStorage: SessionService,
    private readonly estadoRequerimientoService: EstadoRequerimientoService,
    private readonly formatoFecha: DatePipe,
    private readonly userContextService: UserContextService,
    public lenguageService: LanguageService
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.formularioBusqueda = this.fb.group({
      fechaInicio: this.utils.restarDia(new Date(), ConstantesGenerales.RANGO_DIAS_BUSQUEDA),
      fechaFin: new Date(),
      usuario: [null],
      requerimientoEstado: [null],
    });
  }

  ngOnInit() {
    this.opcionesTabla();
    this.datosCabecera();
    this.cargarComboEstadoRequerimiento();
    if (this.sessionStorage.getItem('busquedaRequerimientoAprobacion')) {
      const bodyBusqueda = this.sessionStorage.getItem('busquedaRequerimientoAprobacion');
      const requerimientoEstado = bodyBusqueda.requerimientoEstado ? bodyBusqueda.requerimientoEstado : null;

      this.formularioBusqueda.patchValue({
        fechaInicio: new Date(bodyBusqueda.fechaIn),
        fechaFin: new Date(bodyBusqueda.fechaFin),      
        usuario: this.userContextService.getIdUsuario(),
        requerimientoEstado,
      });

      const idRequerimientoEstado = requerimientoEstado ? requerimientoEstado.idRequerimientoEstado : 0;

      this.search(
        this.formatoFecha.transform(new Date(bodyBusqueda.fechaIn), ConstantesGenerales._FORMATO_FECHA_BD),
        this.formatoFecha.transform(new Date(bodyBusqueda.fechaFin), ConstantesGenerales._FORMATO_FECHA_BD),        
        this.userContextService.getIdUsuario(),
        idRequerimientoEstado
      );

    }
  }

  search(fechaIn, fechaFin, idUsuario, idRequerimientoEstado) {
    // Cuando busque el estado pendiente, activar el cambio de tabla.
    this.rowBusquedaRequerimiento = [];
    
    if (idRequerimientoEstado === 9) {
      this.isCambioTablaPendientesPorAprobar = true;
    } else {
      this.isCambioTablaPendientesPorAprobar = false;
    }

    this.requerimientoService
      .getBusquedaRequerimientoAprobacionXUsuario(
        fechaIn,
        fechaFin,
        idUsuario,
        idRequerimientoEstado
      )
      .pipe(
        map((resp) => {
          if (resp.length === 0) {
            // this.mensajePrimeNgService.onToInfoMsg();
          } else if (resp.length > 0) {
            this.rowBusquedaRequerimiento = resp;
          }
        })
      )
      .subscribe();

    const bodyBusqueda = {fechaIn, fechaFin, idUsuario: idUsuario, 
      requerimientoEstado: this.estadoSeleccionadoRequerimiento ? this.estadoSeleccionadoRequerimiento : 0,
    };
    this.sessionStorage.setItem('busquedaRequerimientoAprobacion', bodyBusqueda);
  }

  cargarComboEstadoRequerimiento() {
    this.requerimientoService
      .getEstadoRequerimiento()
      .pipe(map((resp) => (this.comboRequerimientoEstado = resp)))
      .subscribe();
  }

  cambioEnComboEstadoRequerimiento(event) {
    this.estadoSeleccionadoRequerimiento = event;
  }

  activarModalBusqueda() {
    this.modalBusqueda = true;
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
    ];
  }

  ver() {
    this.isModalAprobacion = !this.isModalAprobacion;
    this.idRequerimiento = this.itemSeleccionado.idRequerimiento;
  }

  itemElegido(datosDelSeleccionado) {
    this.itemSeleccionado = datosDelSeleccionado;
  }

  activarModalAprobarRequerimiento() {
    this.isModalAprobacion = !this.isModalAprobacion;
  }

  cerrarModalDetalle(event) {
    this.isModalAprobacion = event;
  }
  
  clickAprobarRequerimiento() {
    this.isModalAprobacion = !this.isModalAprobacion;
    this.idRequerimiento = this.itemSeleccionado.idRequerimiento;
  }

  activarModalDesaprobarRequerimiento() {
    this.isModalDesaprobacion = !this.isModalDesaprobacion;
  }

  datosCabecera() {
    this.cabeceraTabla = [
      { field: 'idRequerimiento', header: 'Id Requerimiento', visibility: true, tipoFlag: "", formatoFecha: "" },
      { field: 'origen', header: 'Origen', visibility: false, tipoFlag: "", formatoFecha: "" },
      { field: 'fecRequerimiento', header: 'Fecha', visibility: true, tipoFlag: "", formatoFecha: "" },
      { field: 'idUsuario', header: 'idUsuario', visibility: false, tipoFlag: "", formatoFecha: "" },
      { field: 'usuario', header: 'Solicitante', visibility: true, tipoFlag: "", formatoFecha: "" },
      { field: 'codCentroCosto', header: 'Id Centro Costo', visibility: false, tipoFlag: "", formatoFecha: "" },
      { field: 'desCentroCosto', header: 'Centro Costo', visibility: true, tipoFlag: "", formatoFecha: "" },
      { field: 'idSolicitudSAP', header: 'Solicitud SAP', visibility: true, tipoFlag: "", formatoFecha: "" },
      { field: 'conformidadSAP', header: 'Conformidad SAP', visibility: true, tipoFlag: "", formatoFecha: "" },
      { field: 'obsConformidadSAP', header: 'Observación', visibility: true, tipoFlag: "", formatoFecha: "" },
      { field: 'desRequerimientoEstado', header: 'Estado', visibility: true, tipoFlag: "", formatoFecha: "" },
    ];

    this.cabeceraTablaVisible = this.cabeceraTabla.filter(x => x.visibility == true);

  }

  usuarioBuscado(event: interfaceUsuario) {
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
    const idRequerimientoEstado = this.estadoSeleccionadoRequerimiento ? this.estadoSeleccionadoRequerimiento.idRequerimientoEstado : 0;
    this.search(fechaIn, fechaFin, idUsuario, idRequerimientoEstado);
  }

  estadoRequerimiento(estado: string): string {
    return this.estadoRequerimientoService.estadoSolicitud(estado);
  }

  clickAprobarMasivo() {
    this.arrayIdQueSeAprobaran = [];
    this.tituloAprobacionMasivo = 'Aprobación masiva';
    this.rowSeleccionParaAprobarMasivo.forEach((el) => {
      this.arrayIdQueSeAprobaran.push(el.idRequerimiento);
    });
    this.isAprobarMasivo = !this.isAprobarMasivo;
  }

  clickDesaprobarMasivo() {
    this.tituloAprobacionMasivo = 'Desaprobación masiva';
    this.arrayIdQueSeAprobaran = [];
    this.rowSeleccionParaAprobarMasivo.forEach((el) => {
      this.arrayIdQueSeAprobaran.push(el.idRequerimiento);
    });
    this.isDesaprobarMasivo = !this.isDesaprobarMasivo;
  }

  guardarAprobacionMasiva(event: IBodyAprobadorReqMasivolOutIn) {
    console.log('ENTRO A guardarAprobacionMasiva');
    const solicitudesAenviar = [];
    this.rowSeleccionParaAprobarMasivo.map((el) => {
      solicitudesAenviar.push(
        this.armarBodyAprobacion(el.idRequerimiento, el.origen, event)
      );
    });
    const bodySolicitudesMasivas: IAprobarRequerimientoMasivo = {
      idRequerimientoAprobadorMasivo: 0,
      lineasRequerimientoAprobador: solicitudesAenviar,
    };
    this.requerimientoService
      .registrarAprobacionMasivo(bodySolicitudesMasivas)
      .subscribe(
        (resp: IMensajeResultadoApi) => {
          this.rowSeleccionParaAprobarMasivo = [];
          this.clickBusqueda();
          this.mensajePrimeNgService.onToExitoMsg(
            undefined,
            resp
          );
        },
        (error) => {
          console.log('ERROR =>', error);
          this.mensajePrimeNgService.onToErrorMsg(null, error.error)
        }
      );
  }

  cerrarModalMasivo() {
    this.isAprobarMasivo = false;
    this.isDesaprobarMasivo = false;
  }

  armarBodyAprobacion(
    idRequerimiento: number,
    origen: string,
    body: IBodyAprobadorReqMasivolOutIn
  ): IAprobacionRequerimientoIndividual {
    const bodyAprobar: IAprobacionRequerimientoIndividual = {
      idRequerimientoAprobador: 0,
      idRequerimiento,
      origen,
      idAprobador: body.aprobador.idAprobador,
      fecAprobacion: this.utils.fechaApi_POST(new Date()),
      obsAprobacion: body.descripcion,
      idRequerimientoEstado: body.idEstado,
      regUpdateIdUsuario: this.userContextService.getIdUsuario(),
    };
    return bodyAprobar;
  }

}
