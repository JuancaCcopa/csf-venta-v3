import { AprobacionSolicitudService } from './../../services/aprobacion-solicitud.service';
import {
  IAprobacionMasivaSolicitudVale,
  IBodyAprobadorIndividualOutIn,
  IAprobacionIndividualSolicitudVale,
} from './../../models/valeSalidaAprobacion.interface';
import { EstadoSolicitudService } from './../../services/estado-solicitud.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  IEstadoValeSalida,
  IValeSalida,
} from '../../models/valeSalida.interface';
import { ValeSalidaService } from '../../services/vale-salida.service';
import { map } from 'rxjs/operators';
import { interfaceUsuario } from '../../../modulo-administracion/models/usuario.interface';
import { UtilService } from '../../../../services/util.service';
import { SessionService } from '../../../../services/session.service';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { LanguageService } from '../../../../services/language.service';
import { UserContextService } from '../../../../services/user-context.service';
import { ConstantesGenerales } from '../../../../constants/Constantes-generales';
import { IMensajeResultadoApi } from '../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';

@Component({
  selector: 'app-panel-aprobacion-solicitud',
  templateUrl: './panel-aprobacion-solicitud.component.html',
  styleUrls: ['./panel-aprobacion-solicitud.component.scss'],
})
export class PanelAProbacionSolicitudComponent implements OnInit {
  // Titulo del componente
  titulo = 'Panel de Aprobación';
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  opciones: any = [];
  formularioBusqueda: FormGroup;
  cabeceraTabla = [];
  idResaltarEnTabla: number;
  usuarioSeleccionadoDelModal: interfaceUsuario;
  estadoSeleccionadoValeSalida: IEstadoValeSalida;
  rowDatadValeSalida: IValeSalida[] = [];
  itemSeleccionado: IValeSalida;
  comboSolicitudValeEstado: IEstadoValeSalida[] = [];
  isDisplayAprobacion = false;
  idSolicitudVale: number;
  tituloDetalle: string;
  isAprobacionMasiva = false;
  rowSeleccionParaAprobarMasivo: IValeSalida[];
  isAprobarMasivo = false;
  isDesaprobarMasivo = false;
  tituloAprobacionMasivo: string;
  arrayIdSolicitudesMasivas: any[] = []

  constructor(
    private readonly fb: FormBuilder,
    private readonly utils: UtilService,
    private readonly sessionStorage: SessionService,
    private readonly valeSalidaService: ValeSalidaService,
    public mensajePrimeNgService: MensajePrimeNgService,
    private readonly claseEstado: EstadoSolicitudService,
    private readonly aprobacionSolicitudService: AprobacionSolicitudService,
    public lenguageService: LanguageService,
    private readonly userContextService: UserContextService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.opcionesTabla();
    this.datosCabeceraTabla();
    this.cargarComboEstadoSolicitudVale();
    this.storage();
  }
  storage() {
    this.busquedaGuardada();
  }

  busquedaGuardada() {
    if (this.sessionStorage.getItem('busquedaSolicitudValeAprobacion')) {
      const bodyBusqueda = this.sessionStorage.getItem(
        'busquedaSolicitudValeAprobacion'
      );
      const estado = bodyBusqueda.estado ? bodyBusqueda.estado : null;
      this.formularioBusqueda.patchValue({
        fechaInicio: new Date(bodyBusqueda.fechaIni),
        fechaFin: new Date(bodyBusqueda.fechaFin),
        usuario: bodyBusqueda.idUsuario,
        solicitudEstado: estado,
      });
      const idEstado = estado ? estado.idSolicitudValeEstado : 0;
      this.search(
        bodyBusqueda.fechaIni,
        bodyBusqueda.fechaFin,
        bodyBusqueda.idUsuario,
        idEstado
      );
    }
  }
  private buildForm() {
    this.formularioBusqueda = this.fb.group({
      fechaInicio: this.utils.restarDia(
        new Date(),
        ConstantesGenerales.RANGO_DIAS_BUSQUEDA
      ),
      fechaFin: new Date(),
      usuario: [null],
      solicitudEstado: [null],
    });
  }
  datosCabeceraTabla() {
    this.cabeceraTabla = [
      { field: 'idSolicitudVale', header: 'Id Solicitud Vale' },
      { field: 'fecSolicitudVale', header: 'fec Solicitud Vale' },
      { field: 'idUsuario', header: 'id Usuario' },
      { field: 'codCentroCosto', header: 'cod CentroCosto' },
      { field: 'observacion', header: 'observacion' },
      { field: 'nroEntrega', header: 'nro Entrega' },
      { field: 'idSalidaDraftSAP', header: 'id Salida Draft SAP' },
      { field: 'idSalidaRealSAP', header: 'id Salida Real SAP' },
      { field: 'idSolicitudValeEstado', header: 'id Solicitud Vale Estado' },
      { field: 'usuario', header: 'Usuario' },
      { field: 'desCentroCosto', header: 'des Centro Costo' },
      { field: 'desSolicitudValeEstado', header: 'Estado' },
    ];
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
    ];
  }

  clickBusqueda() {
    const formBody = this.formularioBusqueda.value;
    const fechaIn = this.utils.fecha_AAAAMMDD(formBody.fechaInicio);
    const fechaFin = this.utils.fecha_AAAAMMDD(formBody.fechaFin);
    // const idEmpleado = this.usuarioSeleccionadoDelModal
    //   ? this.usuarioSeleccionadoDelModal.idEmpleado
    //   : 0;
    const idUsuario = this.userContextService.getIdEmpleado();
    const idSolicitudValeEstado = this.estadoSeleccionadoValeSalida
      ? this.estadoSeleccionadoValeSalida.idSolicitudValeEstado
      : 0;
    this.search(fechaIn, fechaFin, idUsuario, idSolicitudValeEstado);
  }

  search(fechaIni, fechaFin, idUsuario, idSolicitudEstado) {
    console.log('PARAMETROS BUSQUEDA APROBACION DE SOLICITUD:', fechaIni, fechaFin, idUsuario, idSolicitudEstado);

    if (idSolicitudEstado === 1) {
      this.isAprobacionMasiva = true;
    } else {
      this.isAprobacionMasiva = false;
    }
    this.valeSalidaService
      .getBusqueda(fechaIni, fechaFin, idUsuario, idSolicitudEstado)
      .pipe(
        map((resp) => {
          // this.rowDatadValeSalida = resp;
          if (resp && resp.length === 0) {
            this.mensajePrimeNgService.onToInfoMsg();
          } else if (resp.length > 0) {
            this.rowDatadValeSalida = resp;
            const bodyBusqueda = {
              fechaIni,
              fechaFin,
              idUsuario,
              estado: this.estadoSeleccionadoValeSalida
                ? this.estadoSeleccionadoValeSalida
                : 0,
            };
            this.sessionStorage.setItem(
              'busquedaSolicitudValeAprobacion',
              bodyBusqueda
            );
          }
        })
      )
      .subscribe(
        (result) => console.log,
        (error) => console.log
      );
  }

  ver() {
    this.isDisplayAprobacion = !this.isDisplayAprobacion;
    this.idSolicitudVale = this.itemSeleccionado.idSolicitudVale;
  }

  cerrarModalDetalle(event: boolean) {
    this.isDisplayAprobacion = event;
  }

  cargarComboEstadoSolicitudVale() {
    this.valeSalidaService
      .getEstadoValeSalida()
      .pipe(
        map((resp) => {
          this.comboSolicitudValeEstado = resp;
        })
      )
      .subscribe();
  }

  cambioEnComboSolicitudVale(event) {
    this.estadoSeleccionadoValeSalida = event;
  }

  estadoSolicitud(item: string): string {
    return this.claseEstado.estadoSolicitud(item);
  }

  clickAprobarMasivo() {
    this.tituloAprobacionMasivo = '';
    this.rowSolicitudesMasivas();
    this.isAprobarMasivo = !this.isAprobarMasivo;
    this.tituloAprobacionMasivo = 'Aprobacion Masivo';
    // this.rowSeleccionParaAprobarMasivo.map(el => el.idSolicitudVale)
  }

  clickDesaprobarMasivo() {
    this.tituloAprobacionMasivo = '';
    this.rowSolicitudesMasivas();
    this.isDesaprobarMasivo = !this.isDesaprobarMasivo;
    this.tituloAprobacionMasivo = 'Desaprobacion Masivo';
  }

  rowSolicitudesMasivas() {
    this.arrayIdSolicitudesMasivas = [];
    this.rowSeleccionParaAprobarMasivo.map((el) =>
      this.arrayIdSolicitudesMasivas.push(el.idSolicitudVale)
    );
  }
  
  guardarAprobacionMasiva(event: IBodyAprobadorIndividualOutIn) {
    const solicitudesAenviar = [];
    this.rowSeleccionParaAprobarMasivo.map((el) => {
      solicitudesAenviar.push(
        this.armarBodyAprobacion(el.idSolicitudVale, event)
      );
    });
    const bodySolicitudesMasivas: IAprobacionMasivaSolicitudVale = {
      idSolicitudValeAprobadorMasivo: 0,
      lineasSolicitudValeAprobador: solicitudesAenviar,
    };
    this.aprobacionSolicitudService
      .aprobacionMasivaSolicitud(bodySolicitudesMasivas)
      .subscribe(
        (resp: IMensajeResultadoApi) => {
          this.rowSeleccionParaAprobarMasivo = [];
          this.clickBusqueda();
          this.mensajePrimeNgService.onToExitoMsg(
            undefined,
            resp
          );
        },
        (error) => this.mensajePrimeNgService.onToErrorMsg(error.error)
      );
  }
  cerrarModalMasivo(event) {
    this.isAprobarMasivo = event;
    this.isDesaprobarMasivo = event;
  }

  armarBodyAprobacion(
    idSolicitudVale: number,
    body: IBodyAprobadorIndividualOutIn
  ): IAprobacionIndividualSolicitudVale {
    const bodyAprobar: IAprobacionIndividualSolicitudVale = {
      idSolicitudValeAprobador: 0,
      idSolicitudVale,
      idAprobador: body.aprobador.idAprobador,
      fecAprobacion: this.utils.fechaApi_POST(new Date()),
      obsAprobacion: body.descripcion,
      idSolicitudValeEstado: body.idEstado,
      regUpdateIdUsuario: 1,
    };
    return bodyAprobar;
  }
}
