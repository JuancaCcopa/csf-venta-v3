import {
  IRegistroSolicitudValeSalida,
  ILineaModificarSolicitudValeAnexo,
  IModificarSolicitudValeSalida,
} from './../../models/valeSalida.interface';
import {
  IArticulo,
  INewArticulo,
} from './../../../modulo-requerimiento/models/articulo.interface';
import { ICentroCosto } from './../../../modulo-administracion/models/aprobadorCentroCosto.interface';
import { interfaceUsuario } from './../../../modulo-administracion/models/usuario.interface';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewChecked,
} from '@angular/core';
import { ValeSalidaService } from '../../services/vale-salida.service';
import { map } from 'rxjs/operators';
import {
  IValeSalida,
  IGrillaSolicitudValeSalida,
  ILineaRegistroSolicitudValeSalida,
  ILineaRegistroSolicitudValeAnexo,
} from '../../models/valeSalida.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Params, ActivatedRoute } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { UtilService } from '../../../../services/util.service';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { SessionService } from '../../../../services/session.service';
import { LanguageService } from '../../../../services/language.service';
import { UserContextService } from '../../../../services/user-context.service';
@Component({
  selector: 'app-modificar-solicitud-vale',
  templateUrl: './modificar-solicitud-vale.component.html',
  styleUrls: ['./modificar-solicitud-vale.component.scss'],
})
export class ModificarSolicitudValeComponent
  implements OnInit, AfterViewChecked {
   formularioSuperior: FormGroup;
  detalleDelItemSeleccionado: IValeSalida;
  isActivateBusquedaUsuario = false;
  opciones: any = [];
  dataGrilla: Partial<IGrillaSolicitudValeSalida>[] = [];
  indiceItemElegidoGrilla: Partial<IGrillaSolicitudValeSalida>;
  indiceModalCentroCosto: number;
  isActivateBusquedaCentroCosto = false;
  isActivateBusquedaArticulo = false;
  uploadedFiles: any[] = [];
  ArrayUploadedFiles: any[] = [];
  isEnvioArchivo = false;
  progress = 0;
  isMaxfilelimit = false;
  fileLimit = 0;
  rowLineaSolicitudValeSalidaAnexo: ILineaRegistroSolicitudValeAnexo[] = [];
  arrayItemAnexosEliminados: ILineaRegistroSolicitudValeAnexo[] = [];
  acomuladoDeitemQuitado: ILineaRegistroSolicitudValeSalida[] = [];
  idSolicitudVale: number;
  cols: any[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly valeSalidaService: ValeSalidaService,
    private readonly location: Location,
    private readonly utils: UtilService,
    public mensajePrimeNgService: MensajePrimeNgService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly sessionStorage: SessionService,
    public lenguageService: LanguageService,
    private readonly userContextService: UserContextService,
  ) {
    this.buildFormSuperior();
  }

  ngOnInit(): void {
    this.opcionesTabla();
    this.formatoTabla();

    this.route.params.subscribe((params: Params) => {
      this.idSolicitudVale = params.id;
      this.getVerDetalle(this.idSolicitudVale);
    });
    this.storage();
  }
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
  storage() {
    if (this.sessionStorage.getItem('idSolicitudVale')) {
      this.sessionStorage.removeItem('idSolicitudVale');
    }
  }

  formatoTabla(){
    this.cols = [
      {field: 'opciones', header: 'Opciones'},
      {field: 'numLinea', header: 'Num Linea'},
      {field: 'codArticulo', header: 'Cod Articulo'},
      {field: 'desArticulo', header: 'Des Articulo'},
      {field: 'codUnidadMedida', header: 'Cod Unidad Medida'},
      {field: 'codAlmacen', header: 'Cod Almacen'},
      {field: 'cantNecesaria', header: 'Cantidad necesaria'},
      {field: 'codCentroCosto', header: 'Cod centro costo'},
      {field: 'comentario', header: 'Comentario'}
    ]
  }

  getVerDetalle(id: number) {
    this.valeSalidaService
      .getDetalleValeSalida(id)
      .pipe(
        map((resp) => {
          this.detalleDelItemSeleccionado = resp[0];
          console.log(resp[0]);
          // this.desRequerimientoEstado = this.detalleDelItemSeleccionado.desRequerimientoEstado;
          this.dataGrilla = this.detalleDelItemSeleccionado.lineasSolicitudValeItem;
          this.rowLineaSolicitudValeSalidaAnexo = this.detalleDelItemSeleccionado.lineasSolicitudValeAnexo;
          // console.log(this.rowLineaRequerimientoAnexo);

          this.fileLimit = this.limitFile(
            this.rowLineaSolicitudValeSalidaAnexo
          );
          // this.dataGrilla.forEach(
          //   (el) => (el.fecNecesaria = new Date(el.fecNecesaria))
          // );

          this.agregarIndice(this.dataGrilla);
          this.formularioSuperior.patchValue({
            idTrabajador: this.detalleDelItemSeleccionado.idUsuario,
            trabajador: this.detalleDelItemSeleccionado.usuario,
            codCentroCosto: this.detalleDelItemSeleccionado.codCentroCosto,
            desCentroCosto: this.detalleDelItemSeleccionado.desCentroCosto,

            fechaSol: this.detalleDelItemSeleccionado.fecSolicitudVale
              ? new Date(this.detalleDelItemSeleccionado.fecSolicitudVale)
              : null,
            fechaNecesaria: this.detalleDelItemSeleccionado.fecSalidaRealSAP
              ? new Date(this.detalleDelItemSeleccionado.fecSalidaRealSAP)
              : null,
            fechaValidez: this.detalleDelItemSeleccionado.fecSolicitudVale
              ? new Date(this.detalleDelItemSeleccionado.fecSolicitudVale)
              : null,

            observacion: this.detalleDelItemSeleccionado.observacion,
            // proceSap: this.detalleDelItemSeleccionado.idSolicitudSAP,
          });

          // this.evaluarEstadoDeRequerimiento(
          //   this.detalleDelItemSeleccionado.idRequerimientoEstado
          // );

          // this.getMotivosRequerimiento();
        })
      )
      .subscribe(
        (resp) => resp,
        (error) => console.log
        // () => (this.isLoading = false)
      );
  }
  agregarIndice(data: IGrillaSolicitudValeSalida[]) {
    let n = 0;
    for (const i of data) {
      i.indice = n++;
    }
  }

  private buildFormSuperior() {
    this.formularioSuperior = this.fb.group({
      idTrabajador: [null],
      trabajador: [null],
      codCentroCosto: [null],
      desCentroCosto: [null],
      observacion: [null],
      motivo: [null],
      fechaSol: [new Date()],
      fechaNecesaria: [new Date()],
      fechaValidez: [new Date()],
    });
  }
  getVerDetalleSolicitud(id: number) {
    this.valeSalidaService
      .getDetalleValeSalida(id)
      .pipe(map((resp) => (this.detalleDelItemSeleccionado = resp[0])))
      .subscribe();
  }
  clickActivateBuscarUsuario() {
    this.isActivateBusquedaUsuario = !this.isActivateBusquedaUsuario;
  }
  usuarioBuscado(event: interfaceUsuario) {
    // console.log(event);
    this.clickActivateBuscarUsuario();
    this.formularioSuperior.patchValue({
      idTrabajador: event.idPersona,
      trabajador: event.nombresApellidos,
      codCentroCosto: event.codCentroCosto,
      desCentroCosto: event.desCentroCosto,
    });
  }
  opcionesTabla() {
    this.opciones = [
      {
        label: 'Quitar',
        icon: 'pi pi-trash',
        command: () => {
          this.quitar();
        },
      },
    ];
  }
  quitar() {
    this.dataGrilla.splice(+this.indiceItemElegidoGrilla, 1);
  }
  itemElegido(item) {
    this.indiceItemElegidoGrilla = item;
  }
  centroCostoSeleccionado(event: ICentroCosto) {
    console.log(this.indiceModalCentroCosto);

    console.log(event);

    this.dataGrilla[this.indiceModalCentroCosto].codCentroCosto =
      event.codCentroCosto;
    this.activarModalCentroCosto();
  }
  activarModalCentroCosto(indice?: number) {
    console.log(indice);
    this.indiceModalCentroCosto = indice;
    this.isActivateBusquedaCentroCosto = !this.isActivateBusquedaCentroCosto;
  }
  clickActivateBuscarArticulo() {
    this.isActivateBusquedaArticulo = !this.isActivateBusquedaArticulo;
  }
  articuloBuscado(event: IArticulo[]) {
    // Lista de articulos que seleccione en el POPUP
    this.cambioDeEstructuraDeArticulo_AddFechaNecesaria(event);
    this.clickActivateBuscarArticulo();
  }
  cambioDeEstructuraDeArticulo_AddFechaNecesaria(event: IArticulo[]) {
    // console.log(event);

    // const { fechaNecesaria } = this.formularioSuperior.value;
    for (const item of event) {
      const newArticulo: INewArticulo = {
        codArticulo: item.itemCode,
        desArticulo: item.itemName,
        codUnidadMedida: item.salesUnit,
        codAlmacen: item.defaultWarehouse,
        // fecNecesaria: fechaNecesaria,
      };
      this.dataGrilla.push(newArticulo);
    }
  }
  myUploader(event: any) {
    this.uploadedFiles = [];
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.ArrayUploadedFiles = event.files;
    this.fileLimit = this.limitFile(this.rowLineaSolicitudValeSalidaAnexo);
  }
  onClickRegresar() {
    this.location.back();
  }
  agregarNumLineas(
    data:
      | ILineaRegistroSolicitudValeSalida[]
      | ILineaRegistroSolicitudValeAnexo[]
  ) {
    let n = 1;
    for (const i of data) {
      i.numLinea = n++;
    }
  }
  clickGuardarGrilla(data: ILineaRegistroSolicitudValeSalida[]) {
    this.quitarNumLineas(data);
    this.agregarNumLineas(data);
    data.forEach((el) => {
      // el.cantidadNecesaria = +el.cantidadNecesaria;
      // el.codAlmacen = el.codAlmacen ? el.codAlmacen : '';
      el.codUnidadMedida = el.codUnidadMedida ? el.codUnidadMedida : '';
      // el.nroOrdenTrabajo = el.nroOrdenTrabajo ? el.nroOrdenTrabajo : '';
      el.isSolicitudValeItem = true;
      el.comentario = el.comentario ? el.comentario : '';
      if (!el.idSolicitudValeItem) {
        el.idEditForm = 3;
      }
    });
    data = data.filter((el) => el.idEditForm > 1);
    if (this.acomuladoDeitemQuitado.length > 0) {
      for (const i of this.acomuladoDeitemQuitado) {
        data.push(i);
      }
    }
    const {
      idTrabajador,
      // fechaNecesaria,
      fechaSol,
      // fechaValidez,
      codCentroCosto,
      observacion,
    } = this.formularioSuperior.value;

    const arrayAnexos: ILineaModificarSolicitudValeAnexo[] = [];
    this.ArrayUploadedFiles.forEach((el) => {
      // console.log(el.name);
      const anexoData: ILineaModificarSolicitudValeAnexo = {
        idSolicitudValeAnexo: 0,
        idSolicitudVale: 0,
        numLinea: 1,
        rutaAnexo: el.name,
        regCreateIdUsuario: 0,
        regUpdateIdUsuario: 11,
        isSolicitudValeAnexo: true,
        idEditForm: 3,
      };
      arrayAnexos.push(anexoData);
    });

    console.log(this.arrayItemAnexosEliminados);

    const arrayAnexosEliminados: ILineaModificarSolicitudValeAnexo[] = [];
    this.arrayItemAnexosEliminados.forEach((el) => {
      const anexoData: ILineaModificarSolicitudValeAnexo = {
        idSolicitudValeAnexo: el.idSolicitudValeAnexo,
        idSolicitudVale: el.idSolicitudVale,
        numLinea: 1,
        rutaAnexo: el.rutaAnexo,
        regCreateIdUsuario: 0,
        regUpdateIdUsuario: 11,
        isSolicitudValeAnexo: false,
        idEditForm: 2,
      };
      arrayAnexosEliminados.push(anexoData);
    });
    // this.agregarNumLineas(arrayAnexos);
    const arrayFinalAnexo = arrayAnexos.concat(arrayAnexosEliminados);

    this.quitarIndice(this.dataGrilla);
    const bodyModificar: IModificarSolicitudValeSalida = {
      idSolicitudVale: this.idSolicitudVale,
      fecSolicitudVale: this.utils.fechaApi_POST(fechaSol),
      // fecNecesaria: this.utils.fechaApi_POST(fechaNecesaria),
      // fecValidez: this.utils.fechaApi_POST(fechaValidez),
      idUsuario: idTrabajador,
      // codMotivoRequerimiento: this.motivoSeleccionadoEnCombo
      // .codMotivoRequerimiento,
      observacion: observacion ? observacion : '',
      codCentroCosto,
      regUpdateIdUsuario: 0,
      idSolicitudValeEstado: 1,
      lineasSolicitudValeItem: data,
      lineasSolicitudValeAnexo: arrayFinalAnexo,
    };
    console.log(bodyModificar);
    const apiFinal = JSON.stringify(bodyModificar);
    this.registerReq(apiFinal, this.uploadedFiles);
  }
  registerReq(data, formData) {
    this.valeSalidaService
      .modificarSolicitudValeSalida(data, formData)
      .subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              this.isEnvioArchivo = true;
              console.log('Solicitud ha sido hecha!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Se ha recibido el encabezado de respuesta!');
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round((event.loaded / event.total) * 100);
              console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              this.isEnvioArchivo = false;
              console.log('Registro Exitoso', event.body);
              this.mensajePrimeNgService.onToExitoMsg(
                undefined,
                event.body
              );
              this.sessionStorage.setItem('idSolicitudVale', event.body.idRegistro);
              setTimeout(() => {
                this.progress = 0;
                this.onClickRegresar();
              }, 1500);
          }
        },
        (error) => {
          this.isEnvioArchivo = false;
          this.progress = 0;
          this.mensajePrimeNgService.onToErrorMsg(undefined, error.error);
          console.log(error);
        }
      );
  }
  limitFile(item: any[]): number {
    if (item.length + this.uploadedFiles.length === 0) {
      this.isMaxfilelimit = false;
      return 3;
    }
    if (item.length + this.uploadedFiles.length === 1) {
      this.isMaxfilelimit = false;
      return 2;
    }
    if (item.length + this.uploadedFiles.length === 2) {
      this.isMaxfilelimit = false;
      return 1;
    }
    if (item.length + this.uploadedFiles.length >= 3) {
      console.log(this.uploadedFiles);

      this.isMaxfilelimit = true;
      return 0;
    }
  }
  quitarNumLineas(data: Partial<IGrillaSolicitudValeSalida>[]) {
    for (const i of data) {
      delete i.numLinea;
    }
  }
  quitarIndice(data: Partial<IGrillaSolicitudValeSalida>[]) {
    for (const i of data) {
      delete i.indice;
    }
  }
  itemQueSeCambio(event) {
    console.log(event);

    const { indice } = event.data;
    if (event.data.idSolicitudVale) {
      this.dataGrilla[indice].idEditForm = 2;
    }
    console.log(this.dataGrilla[indice]);
  }
  quitarListaItemAnexo(indice) {
    this.rowLineaSolicitudValeSalidaAnexo[indice].idEditForm = 2;
    this.arrayItemAnexosEliminados.push(
      this.rowLineaSolicitudValeSalidaAnexo[indice]
    );

    this.rowLineaSolicitudValeSalidaAnexo.splice(indice, 1);
    this.fileLimit = this.limitFile(this.rowLineaSolicitudValeSalidaAnexo);
  }

  claseEstado(item: string): string {
    switch (item) {
      case 'APROBADO':
        return 'aprobado';
        break;
      case 'DESAPROBADO':
        return 'desaprobado';
        break;
      case 'PENDIENTE':
        return 'pendiente';
        break;
      case 'ANULADO':
        return 'anulado';
        break;
      case 'PROCESADO SAP':
        return 'procesadoSap';
        break;

      default:
        return null;
        break;
    }
  }
  removeItemFile(event) {
    const indice = this.uploadedFiles.findIndex((el) => el == event.file);
    this.uploadedFiles.splice(indice, 1);
    this.fileLimit = this.limitFile(this.rowLineaSolicitudValeSalidaAnexo);
  }
}
