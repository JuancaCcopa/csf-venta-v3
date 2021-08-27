import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IGrilla, IMotivoRequerimiento, IAnexo, IRequerimiento } from '../../../models/requerimiento.interface';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UtilService } from '../../../../../services/util.service';
import { RequerimientoService } from '../../../services/requerimiento.service';
import { MensajePrimeNgService } from '../../../../../services/mensaje-prime-ng.service';
import { SessionService } from '../../../../../services/session.service';
import { AdminAprobadorService } from '../../../../modulo-administracion/services/aprobador.service';
import { map } from 'rxjs/operators';
import { UserContextService } from '../../../../../services/user-context.service';
import { interfaceUsuario } from '../../../../modulo-administracion/models/usuario.interface';
import { INewArticulo } from '../../../models/articulo.interface';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { IMensajeResultadoApi } from '../../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';
import { ICentroCosto } from '../../../../modulo-administracion/models/aprobadorCentroCosto.interface';
import { ISocioNegocio } from '../../../../modulo-administracion/models/socio-negocio.interface';
import { LanguageService } from '../../../../../services/language.service';
import { IServicio } from '../../../../modulo-compartido/Requerimiento/interfaces/servicio.interface';

@Component({
  selector: 'app-registrar-requerimiento',
  templateUrl: './registrar-requerimiento.component.html',
  styleUrls: ['./registrar-requerimiento.component.scss']
})
export class RegistrarRequerimientoComponent implements OnInit, AfterViewChecked {
  modalBusqueda = false;
  modalRegistroRequerimiento = false;
  opciones: any = [];
  bodyParams: any;
  formularioSuperior: FormGroup;
  isActivateBusquedaUsuario = false;
  isActivateBusquedaServicio = false;
  isActivateBusquedaCentroCosto = false;
  dataGrilla: IGrilla[] = [];
  indiceItemElegidoGrilla: IGrilla;
  indiceModalCentroCosto: number;
  comboMotivo: IMotivoRequerimiento[];
  motivoSeleccionadoEnCombo: IMotivoRequerimiento;
  isArrayAnexo: IAnexo[] = [];
  ArrayUploadedFiles: any[] = [];
  uploadedFiles: any[] = [];
  uplo: File;
  progress = 0;
  isEnvioArchivo = false;
  indiceModalSocioNegocio: number;
  isActivateBusquedaSocioNegocio: boolean = false;

  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly fb: FormBuilder,
    private readonly utils: UtilService,
    private readonly requerimientoService: RequerimientoService,
    public mensajePrimeNgService: MensajePrimeNgService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly sessionStorage: SessionService,
    private readonly servicioAprobador: AdminAprobadorService,
    private readonly userContextService: UserContextService,
    public lenguageService: LanguageService
  ) {
    this.buildFormSuperior();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.opcionesTabla();
    this.getMotivosRequerimiento();
    this.obtenerParametrosDeRuta();
    this.mostrarEmpleadoPorDefecto();
  }

  obtenerParametrosDeRuta() {
    this.activeRoute.queryParamMap
    .pipe(
      map((params) => {
        this.bodyParams = {
          idUsuario: Number(params.get('idUsuario')),
          codCentroCosto: params.get('codCentroCosto'),
          desCentroCosto: params.get('desCentroCosto'),
          trabajador: params.get('empleado'),
        };
        this.formularioSuperior.patchValue({
          idUsuario: Number(this.bodyParams.idUsuario),
          trabajador: this.bodyParams.trabajador,
          codCentroCosto: this.bodyParams.codCentroCosto,
          desCentroCosto: this.bodyParams.desCentroCosto,
        });
      })
    )
    .subscribe();
  }

  private buildFormSuperior() {
    this.formularioSuperior = this.fb.group({
      idUsuario: [null],
      trabajador: [{value: null, disabled: true}],
      codCentroCosto: [{value: null, disabled: true}],
      desCentroCosto: [{value: null, disabled: true}],
      codSocioNegocio: [{value: null, disabled: true}],
      cardName: [null],
      observacion: [null],
      motivo: [null],
      fechaReq: [{value: new Date(), disabled: true}],
      fechaNecesaria: [new Date()],
      fechaValidez: [new Date()],
    });
  }

  mostrarEmpleadoPorDefecto() {
    this.servicioAprobador.getUsuarioById(this.userContextService.getIdUsuario()).subscribe(
      response => {
        this.mostrarUsuarioEncontrado(response);
      }
    );
  }

  onClickRegresar() {
    this.location.back();
  }

  cabeceraTabla() {}

  activarModalBusqueda() {
    this.modalBusqueda = true;
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
    // const indice = this.dataGrilla.findIndex(el => el.itemCode === this.indiceItemElegidoGrilla.itemCode);
    this.dataGrilla.splice(+this.indiceItemElegidoGrilla, 1);
  }

  itemElegido(item) {
    // cuando doy click en el splitButton
    this.indiceItemElegidoGrilla = item;
  }

  clickActivateBuscarUsuario() {
    this.isActivateBusquedaUsuario = !this.isActivateBusquedaUsuario;
  }

  onUsuarioEncontrado(usuario: interfaceUsuario) {
    this.clickActivateBuscarUsuario();
    this.mostrarUsuarioEncontrado(usuario);
  }

  mostrarUsuarioEncontrado(usuario: interfaceUsuario) {
    this.formularioSuperior.patchValue({
      idUsuario: usuario.idUsuario,
      trabajador: usuario.nombresApellidos,
      codCentroCosto: usuario.codCentroCosto,
      desCentroCosto: usuario.desCentroCosto,
    });
  }

  clickActivateBuscarServicio() {
    this.isActivateBusquedaServicio = !this.isActivateBusquedaServicio;
  }


  // CUANDO SELECCIONO ARTICULOS EN EL POPUP
  servicioBuscado(event: IServicio[]) {
    // Lista de articulos que seleccione en el POPUP
    this.cambioDeEstructuraDeArticulo_AddFechaNecesaria(event);
    this.clickActivateBuscarServicio();
  }

  validarParaGuardar(data: IGrilla[]) {

    let mensaje: string = '';
    let validado = true;

    data.forEach((el) => {
      if (!el.cantidadNecesaria) {
        validado = false;
        mensaje += `La cantidad no es válida para el artículo ${el.codArticulo}<br>`
      }
      if (!el.codCentroCosto) {
        validado = false;
        mensaje += `Debe especificar el Centro de Costo para el artículo ${el.codArticulo}<br>`;
      }
      // if (!el.codSocioNegocio) {
      //   validado = false;
      //   mensaje += `Debe especificar el Socio de Negocio para el artículo ${el.codArticulo}<br>`;
      // }      
    });

    if (!validado) {
      mensaje = `<span>${mensaje}</span>`;
      console.log(mensaje);
      this.mensajePrimeNgService.onToInfoMsg(null, mensaje);
    }

    return validado;

  }

  // AL GUARDAR REGISTRO FINAL
  clickGuardarGrilla(data: IGrilla[]) {
    this.agregarNumLineas(data);

    data.forEach((el) => {
      el.fecNecesaria = this.utils.fechaApi_POST(new Date(el.fecNecesaria));
      el.cantidadNecesaria = +el.cantidadNecesaria;
      el.codAlmacen = el.codAlmacen ? el.codAlmacen : '';
      el.codUnidadMedida = el.codUnidadMedida ? el.codUnidadMedida : '';
      el.nroOrdenTrabajo = el.nroOrdenTrabajo ? el.nroOrdenTrabajo : '';
      el.idRequerimiento = 0;
      el.idEditForm = 1;
      el.idRequerimientoItem = 0;
      el.comentario = el.comentario ? el.comentario : '';
      el.isRequerimientoItem = true;
    });

    // VALIDACION DEL DETALLE.
    if (!this.validarParaGuardar(data)) {
      return;
    }

    // Aarmar grilla
    const {
      idUsuario,
      fechaNecesaria,
      fechaReq,
      fechaValidez,
      codCentroCosto,
      codSocioNegocio,
      observacion,
    } = this.formularioSuperior.getRawValue();

    // console.log(this.ArrayUploadedFiles);
    const arrayAnexos: IAnexo[] = [];
    this.ArrayUploadedFiles.forEach((el) => {
      // console.log(el.name);
      const anexoData: IAnexo = {
        idRequerimientoAnexo: 0,
        idEditForm: 1,
        numLinea: 1,
        regCreateIdUsuario: this.userContextService.getIdUsuario(),
        isRequerimientoAnexo: true,
      };
      arrayAnexos.push(anexoData);
    });
    this.agregarNumLineas(arrayAnexos);
    // Transformarlo a string
    const bodyRegistro: IRequerimiento = {
      origen: '',
      idRequerimiento: 0,
      fecRequerimiento: this.utils.fechaApi_POST(fechaReq),
      fecNecesaria: this.utils.fechaApi_POST(fechaNecesaria),
      fecValidez: this.utils.fechaApi_POST(fechaValidez),
      idUsuario: idUsuario,
      codMotivoRequerimiento: this.motivoSeleccionadoEnCombo.codMotivoRequerimiento,
      observacion: observacion ? observacion : '',
      codCentroCosto: codCentroCosto,
      regCreateIdUsuario: this.userContextService.getIdUsuario(),
      idRequerimientoEstado: 1,
      idTipoRequerimiento: 1,
      lineasRequerimientoItem: data,
      lineasRequerimientoAnexo: arrayAnexos,
      isAutorizado: false,
      idUbicacion: 0
    };
    const apiFinal = JSON.stringify(bodyRegistro);
    this.registerReq(apiFinal, this.uploadedFiles);
  }

  registerReq(data, formData) {
    this.requerimientoService
      .registrarRequerimientoData(data, formData)
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
              this.mensajePrimeNgService.onToExitoMsg(undefined, event.body);
              this.sessionStorage.setItem('idRequerimiento', event.body.idRegistro);
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
  myUploader(event: any) {
    this.uploadedFiles = [];
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.ArrayUploadedFiles = event.files;
  }

  agregarNumLineas(data: IGrilla[] | IAnexo[]) {
    let n = 1;
    for (const i of data) {
      i.numLinea = n++;
    }
  }

  cambioDeEstructuraDeArticulo_AddFechaNecesaria(event: IServicio[]) {
    const { fechaNecesaria,codCentroCosto } = this.formularioSuperior.getRawValue();

    for (const item of event) {
      const newArticulo: INewArticulo = {
        codArticulo: item.code,
        desArticulo: item.name,
        // codUnidadMedida: item.salesUnit,
        // codAlmacen: item.defaultWarehouse,
        fecNecesaria: fechaNecesaria,
        cantidadNecesaria: 1,
        codCentroCosto: codCentroCosto
      };
      this.dataGrilla.push(newArticulo);
    }
  }

  guardarRequerimiento(body) {
    this.requerimientoService.saveRequerimiento(body).subscribe(
      (result: IMensajeResultadoApi) =>
        this.mensajePrimeNgService.onToExitoMsg(null, result),
      (error) => this.mensajePrimeNgService.onToErrorMsg(null, error.error)
    );
  }

  centroCostoSeleccionado(event: ICentroCosto) {
    this.dataGrilla[this.indiceModalCentroCosto].codCentroCosto = event.codCentroCosto;
    this.activarModalCentroCosto();
  }
   
  activarModalCentroCosto(indice?: number) {
    this.indiceModalCentroCosto = indice;
    this.isActivateBusquedaCentroCosto = !this.isActivateBusquedaCentroCosto;
  }


  socioNegocioSeleccionado(event: ISocioNegocio) {
    console.log('SOCIO SELECCIONADO', event, this.indiceModalSocioNegocio);
    this.dataGrilla[this.indiceModalSocioNegocio].codSocioNegocio =  event.cardCode;
    this.activarModalSocioNegocio();
    console.log('DATAGRILLA 1', this.dataGrilla);
  }

  activarModalSocioNegocio(indice?: number) {
    console.log('CLICK BUSCAR SOCI NEGOCIO', indice, this.isActivateBusquedaSocioNegocio);
    this.indiceModalSocioNegocio = indice;
    this.isActivateBusquedaSocioNegocio = !this.isActivateBusquedaSocioNegocio;
    console.log('DATAGRILLA 2', this.dataGrilla);
  }

  getMotivosRequerimiento() {
    this.requerimientoService
      .getMotivoRequerimiento()
      .subscribe((resp) => (this.comboMotivo = resp));
  }
  cambioEnComboMotivo(event: IMotivoRequerimiento) {
    this.motivoSeleccionadoEnCombo = event;
  }

}
