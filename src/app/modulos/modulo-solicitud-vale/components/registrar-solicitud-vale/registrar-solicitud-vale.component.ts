import {
  IRegistroSolicitudValeSalida,
  ILineaRegistroSolicitudValeAnexo,
  ILineaRegistroSolicitudValeSalida,
  IGrillaSolicitudValeSalida,
} from './../../models/valeSalida.interface';
import {
  IArticulo,
  INewArticulo,
} from './../../../modulo-requerimiento/models/articulo.interface';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewChecked,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValeSalidaService } from '../../services/vale-salida.service';
import { Location } from '@angular/common';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { UtilService } from '../../../../services/util.service';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { SessionService } from '../../../../services/session.service';
import { UserContextService } from '../../../../services/user-context.service';
import { LanguageService } from '../../../../services/language.service';
import { interfaceUsuario } from '../../../modulo-administracion/models/usuario.interface';
import { ICentroCosto } from '../../../modulo-administracion/models/aprobadorCentroCosto.interface';

@Component({
  selector: 'app-registrar-solicitud-vale',
  templateUrl: './registrar-solicitud-vale.component.html',
  styleUrls: ['./registrar-solicitud-vale.component.scss'],
})
export class RegistrarSolicitudValeComponent
  implements OnInit, AfterViewChecked {
  formularioSuperior: FormGroup;
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

  cols: any[];

  constructor(
    private readonly location: Location,
    private readonly fb: FormBuilder,
    private readonly utils: UtilService,
    public mensajePrimeNgService: MensajePrimeNgService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly valeSalidaService: ValeSalidaService,
    private readonly sessionStorage: SessionService,
    public lenguageService: LanguageService,
    private readonly userContextService: UserContextService
  ) {
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.buildFormSuperior();
    this.formatoTabla();
    this.opcionesTabla();
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

  // getMotivosRequerimiento() {
  //   this.requerimientoService
  //     .getMotivoRequerimiento()
  //     .subscribe((resp) => (this.comboMotivo = resp));
  // }
  // cambioEnComboMotivo(event: IMotivoRequerimiento) {
  //   this.motivoSeleccionadoEnCombo = event;
  // }
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
      {field: 'codComentario', header: 'Cod Comentario'}
    ]
  }

  quitar() {
    // const indice = this.dataGrilla.findIndex(el => el.itemCode === this.indiceItemElegidoGrilla.itemCode);
    this.dataGrilla.splice(+this.indiceItemElegidoGrilla, 1);
  }

  
  itemElegido(item) {
    // cuando doy click en el splitButton
    console.log("estoy selecionando item"+item);

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
  }

  validarParaGuardar(data: ILineaRegistroSolicitudValeSalida[]) {
    console.log('CANTIDAD PARA VALIDAR', data);

    let mensaje: string = '';
    let validado = true;
    data.forEach((el) => {
      if (!el.cantidad) {
        validado = false;
        mensaje += `La cantidad no es válida para el artículo ${el.codArticulo}<br>`
      }
      if (!el.codCentroCosto) {
        validado = false;
        mensaje += `Debe especificar el Centro de Costo para el artículo ${el.codArticulo}<br>`;
      }
    });

    if (!validado) {
      mensaje = `<span>${mensaje}</span>`;
      console.log(mensaje);
      this.mensajePrimeNgService.onToInfoMsg(null,mensaje);
    }

    return validado;

  }

  clickGuardarGrilla(data: ILineaRegistroSolicitudValeSalida[]) {
    this.agregarNumLineas(data);

    data.forEach((el) => {
      el.codUnidadMedida = el.codUnidadMedida ? el.codUnidadMedida : '';
      el.idSolicitudValeItem = 0;
      el.idSolicitudVale = 0;
      el.comentario = el.comentario ? el.comentario : '';
      el.isSolicitudValeItem = true;
      el.idEditForm = 1;
    });

    if (!this.validarParaGuardar(data)){
      return;
    }

    // Aarmar grilla
    const {
      // fechaNecesaria,
      fechaSol,
      // fechaValidez,
      codCentroCosto,
      observacion,
    } = this.formularioSuperior.value;

    // console.log(this.ArrayUploadedFiles);
    const arrayAnexos: ILineaRegistroSolicitudValeAnexo[] = [];
    this.ArrayUploadedFiles.forEach((el) => {
      // console.log(el.name);
      const anexoData: ILineaRegistroSolicitudValeAnexo = {
        idSolicitudValeAnexo: 0,
        idSolicitudVale: 0,
        numLinea: 1,
        rutaAnexo: el.name,
        rutaAnexoLectura: el.name,
        regCreateIdUsuario: this.userContextService.getIdUsuario(),
        isSolicitudValeAnexo: true,
        idEditForm: 1,
      };
      arrayAnexos.push(anexoData);
    });
    this.agregarNumLineas(arrayAnexos);
    // Transformarlo a string

    const bodyRegistro: IRegistroSolicitudValeSalida = {
      idSolicitudVale: 0,
      fecSolicitudVale: this.utils.fechaApi_POST(fechaSol),
      // fecNecesaria: this.utils.fechaApi_POST(fechaNecesaria),
      // fecValidez: this.utils.fechaApi_POST(fechaValidez),
      idUsuario: this.userContextService.getIdEmpleado(),
      // codMotivoRequerimiento: this.motivoSeleccionadoEnCombo
      // .codMotivoRequerimiento,
      observacion: observacion ? observacion : '',
      codCentroCosto,
      regCreateIdUsuario: this.userContextService.getIdUsuario(),
      idSolicitudValeEstado: 1,
      lineasSolicitudValeItem: data,
      lineasSolicitudValeAnexo: arrayAnexos,
    };

    const apiFinal = JSON.stringify(bodyRegistro);

    console.log(apiFinal);
    this.registerReq(apiFinal, this.uploadedFiles);
  }
  registerReq(data, formData) {
    this.valeSalidaService
      .registrarSolicitudValeSalida(data, formData)
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
                // this.progress = 0;
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
}
