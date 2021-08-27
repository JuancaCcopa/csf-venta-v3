import { EstadoSolicitudService } from './../../services/estado-solicitud.service';
import { map } from 'rxjs/operators';
import { ValeSalidaService } from './../../services/vale-salida.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  IValeSalida,
  IEstadoValeSalida,
  IAnularSolicitudVale,
} from '../../models/valeSalida.interface';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { interfaceUsuario } from '../../../modulo-administracion/models/usuario.interface';
//import { IEstadoRequerimiento } from '../../../modulo-requerimiento/models/requerimiento.interface';
import { ConstantesGenerales } from '../../../../constants/Constantes-generales';
import { UtilService } from '../../../../services/util.service';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { SessionService } from '../../../../services/session.service';
import { IMensajeResultadoApi } from '../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';
import { UserContextService } from '../../../../services/user-context.service';
import { LanguageService } from '../../../../services/language.service';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';

@Component({
  selector: 'app-panel-solicitud-vale',
  templateUrl: './panel-solicitud-vale.component.html',
  styleUrls: ['./panel-solicitud-vale.component.scss'],
  providers: [ConfirmationService],
})
export class PanelSolicitudValeComponent implements OnInit {
  // Titulo del componente
  titulo = 'Panel de Solicitud';
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  cabeceraTabla: any;
  opciones: any = [];
  formularioBusqueda: FormGroup;
  estadoSeleccionadoValeSalida: IEstadoValeSalida;
  usuarioSeleccionadoDelModal: interfaceUsuario;
  //comboRequerimientoEstado: IEstadoRequerimiento[] = [];
  comboSolicitudValeEstado: IEstadoValeSalida[] = [];
  rowDatadValeSalida: IValeSalida[] = [];
  isVerModalDetalle = false;
  tituloDetalle: string;
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;
  itemSeleccionado: IValeSalida;
  idResaltarEnTabla: number;

  constructor(
    private readonly router: Router,
    private readonly utils: UtilService,
    private readonly fb: FormBuilder,
    private readonly valeSalidaService: ValeSalidaService,
    public readonly mensajePrimeNgService: MensajePrimeNgService,
    private readonly confirmationService: ConfirmationService,
    private readonly sessionStorage: SessionService,
    private readonly claseEstado: EstadoSolicitudService,
    private readonly userContextService: UserContextService,
    public lenguageService: LanguageService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.storage();
    this.opcionesTabla();
    this.datosCabecera();
    this.cargarComboEstadoSolicitudVale();
  }

  storage() {
    this.busquedaGuardada();
    this.resaltarFila();
  }

  busquedaGuardada() {
    if (this.sessionStorage.getItem('busquedaSolicitudVale')) {
      const bodyBusqueda = this.sessionStorage.getItem('busquedaSolicitudVale');
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

  resaltarFila() {
    if (this.sessionStorage.getItem('idSolicitudVale')) {
      this.idResaltarEnTabla = this.sessionStorage.getItem('idSolicitudVale');
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

  itemElegido(datosDelSeleccionado) {
    this.itemSeleccionado = datosDelSeleccionado;
  }

  opcionesTabla() {
    this.opciones = [
      {
        label: 'Ver',
        icon: 'pi pi-eye',
        command: () => {
          this.verDetalle();
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
        label: 'Ver E. Par',
        icon: 'pi pi-check',
        command: () => {
          this.verEpar();
        },
      },
    ];
  }

  verDetalle() {
    this.isVerModalDetalle = !this.isVerModalDetalle;
    const { idSolicitudVale } = this.itemSeleccionado;
    this.tituloDetalle = `Detalle - Id Solicitud Vale ${idSolicitudVale}`;
  }

  quitar() {
    this.confirm();
  }

  verEpar() {}

  confirm() {
    this.confirmationService.confirm({
      message: `Desea anular el requerimiento con el Id ${this.itemSeleccionado.idSolicitudVale} ?`,
      accept: () => {
        // this.anular();
        console.log('Eliminar');
        const bodyAnular: IAnularSolicitudVale = {
          idSolicitudVale: this.itemSeleccionado.idSolicitudVale,
          idSolicitudValeEstado: 8, // 8 es el estado anulado
          regUpdateIdUsuario: 11,
        };
        console.log(bodyAnular);

        this.valeSalidaService.anularSolicitudVale(bodyAnular).subscribe(
          (resp: IMensajeResultadoApi) => {
            this.mensajePrimeNgService.onToExitoMsg(
              undefined,
              resp
            );
            this.clickBusqueda();
          },
          (error) =>
            this.mensajePrimeNgService.onToErrorMsg(undefined, error.error)
        );
      },
    });
  }

  anular() {}

  modificar() {
    const { idSolicitudVale } = this.itemSeleccionado;
    this.router.navigate(['main/modulo-so/modificar-solicitud-vale', idSolicitudVale]);
  }

  clickBusqueda() {
    console.log('clickBusqueda()');

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
    console.log('PARAMETROS PARA BUSQUEDA ', fechaIni, fechaFin, idUsuario, idSolicitudEstado)
    
    this.rowDatadValeSalida = [];

    this.valeSalidaService.getBusqueda(fechaIni, fechaFin, idUsuario, idSolicitudEstado)
      .pipe(
        map((resp) => {
          if (resp && resp.length === 0) {
            this.mensajePrimeNgService.onToInfoMsg();
            this.rowDatadValeSalida = [];
          } else if (resp.length > 0) {
            this.rowDatadValeSalida = resp;
          }
        })
      )
      .subscribe(
        (result) => console.log,
        (error) => console.log
      );

    const bodyBusqueda = {
      fechaIni,
      fechaFin,
      idUsuario,
      estado: this.estadoSeleccionadoValeSalida
        ? this.estadoSeleccionadoValeSalida
        : 0,
    };
    this.sessionStorage.setItem('busquedaSolicitudVale', bodyBusqueda);

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
  datosCabecera() {
    this.cabeceraTabla = [
      { field: 'idSolicitudVale', header: 'Id Solicitud Vale' },
      { field: 'fecSolicitudVale', header: 'fec Solicitud Vale' },
      { field: 'idUsuario', header: 'id Usuario' },
      { field: 'codCentroCosto', header: 'cod CentroCosto' },
      { field: 'observacion', header: 'observacion' },
      { field: 'nroEntrega', header: 'nro Entrega' },
      { field: 'idSalidaDraftSAP', header: 'id Salida Draft SAP' },
      { field: 'idSalidaRealSAP', header: 'id Salida Real SAP' },
      // { field: 'regCreate', header: 'regCreate' },
      // { field: 'regUpdate', header: 'regUpdate' },
      // { field: 'regCreateIdUsuario', header: 'reg CreateIdUsuario' },
      // { field: 'regUpdateIdUsuario', header: 'reg UpdateIdUsuario' },
      { field: 'idSolicitudValeEstado', header: 'id Solicitud Vale Estado' },
      { field: 'usuario', header: 'Usuario' },
      { field: 'desCentroCosto', header: 'des Centro Costo' },
      { field: 'desSolicitudValeEstado', header: 'Estado' },
    ];
  }
  clickNuevo() {
    this.router.navigate(['main/modulo-so/registro-solicitud-vale']);
  }
  estadoSolicitud(item: string): string {
    return this.claseEstado.estadoSolicitud(item);
  }
}
