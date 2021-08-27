import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IGrilla, IMotivoRequerimiento, IAnexo, IRequerimiento } from '../../../models/requerimiento.interface';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '../../../../../services/util.service';
import { RequerimientoService } from '../../../services/requerimiento.service';
import { MensajePrimeNgService } from '../../../../../services/mensaje-prime-ng.service';
import { SessionService } from '../../../../../services/session.service';
import { AdminAprobadorService } from '../../../../modulo-administracion/services/aprobador.service';
import { UserContextService } from '../../../../../services/user-context.service';
import { LanguageService } from '../../../../../services/language.service';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { interfaceUsuario } from '../../../../modulo-administracion/models/usuario.interface';
import { IArticulo, INewArticulo } from '../../../models/articulo.interface';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { IMensajeResultadoApi } from '../../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';
import { ICentroCosto } from '../../../../modulo-administracion/models/aprobadorCentroCosto.interface';
import { ISocioNegocio } from '../../../../modulo-administracion/models/socio-negocio.interface';
import { UbicacionModel, UbicacionPorTipoProductoModel, UbicacionPorStockModel } from '../../../models/ubicacion.model';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';

@Component({
  selector: 'app-registrar-requerimiento-economato',
  templateUrl: './registrar-requerimiento-economato.component.html',
  styleUrls: ['./registrar-requerimiento-economato.component.scss']
})
export class RegistrarRequerimientoEconomatoComponent implements OnInit {
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  modalBusqueda = false;
  modalRegistroRequerimiento = false;
  opciones: any = [];
  bodyParams: any;
  formularioSuperior: FormGroup;
  formularioFindArticulo: FormGroup;
  isActivateBusquedaUsuario = false;
  isActivateBusquedaArticulo = false;
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

  //Ubicacion
  isActivateBusquedaUbicacion = false;
  itemUbicacionSeleccionado: UbicacionModel = new UbicacionModel();
  // Tipo Producto
  isActivateBusquedaTipoProducto = false;
  itemTipoProductoSeleccionado: UbicacionPorTipoProductoModel = new UbicacionPorTipoProductoModel();

  idUsuario: number;
  
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
    this.buildFormFindArticulo();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.opcionesTabla();
    this.getMotivosRequerimiento();
    this.obtenerParametrosDeRuta();
    this.mostrarEmpleadoPorDefecto();

    this.idUsuario = this.userContextService.getIdUsuario();
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
      idUsuario: [{value: null, disabled: true}],
      trabajador: [{value: null, disabled: true}],
      codCentroCosto: [{value: null, disabled: true}],
      desCentroCosto: [{value: null, disabled: true}],
      codSocioNegocio: [{value: null, disabled: true}],
      cardName: [{value: null, disabled: true}],
      observacion: [null],
      motivo: [null],
      fechaReq: [{value: new Date(), disabled: true}],
      fechaNecesaria: [{value: new Date(), disabled: false}],
      fechaValidez: [{value: new Date(), disabled: false}],
    });
  }

  private buildFormFindArticulo() {
    this.formularioFindArticulo = this.fb.group({
      idUbicacion: [null],
      desUbicacion: [null],
      number: [null],
      groupName: [null]
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
    this.dataGrilla.splice(+this.indiceItemElegidoGrilla, 1);
  }

  itemElegido(item) {
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

  ubicacionSeleccionado(event: UbicacionModel) {
    this.itemUbicacionSeleccionado = event;
    this.formularioFindArticulo.patchValue({
      idUbicacion: event.idUbicacion,
      desUbicacion: event.desUbicacion,
    });

    this.activarModalUbicacion();
  }
  activarModalUbicacion() {
    this.isActivateBusquedaUbicacion = !this.isActivateBusquedaUbicacion;
  }

  tipoProductoSeleccionado(event: UbicacionPorTipoProductoModel) {
    this.itemTipoProductoSeleccionado = event;
    this.formularioFindArticulo.patchValue({
      number: event.codTipoProducto,
      groupName: event.desTipoProducto,
    });

    this.activarModalTipoProducto();
  }
  activarModalTipoProducto() {
    if (this.itemUbicacionSeleccionado) {
      this.isActivateBusquedaTipoProducto = !this.isActivateBusquedaTipoProducto;
    }
  }

  clickActivateBuscarArticulo() {
    this.isActivateBusquedaArticulo = !this.isActivateBusquedaArticulo;
  }

  // CUANDO SELECCIONO ARTICULOS EN EL POPUP
  articuloBuscado(event: UbicacionPorStockModel[]) {
    // Lista de articulos que seleccione en el POPUP
    this.cambioDeEstructuraDeArticulo_AddFechaNecesaria(event);
    this.clickActivateBuscarArticulo();
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

    const { idUbicacion } = this.formularioFindArticulo.value;

    const arrayAnexos: IAnexo[] = [];
    this.ArrayUploadedFiles.forEach((el) => {
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
      idTipoRequerimiento: 2,
      lineasRequerimientoItem: data,
      lineasRequerimientoAnexo: arrayAnexos,
      isAutorizado: false,
      idUbicacion: idUbicacion
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
              break;
            case HttpEventType.ResponseHeader:
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round((event.loaded / event.total) * 100);
              break;
            case HttpEventType.Response:
              this.isEnvioArchivo = false;
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

  cambioDeEstructuraDeArticulo_AddFechaNecesaria(event: UbicacionPorStockModel[]) {
    const { fechaNecesaria,codCentroCosto } = this.formularioSuperior.getRawValue();

    for (const item of event) {
      const newArticulo: INewArticulo = {
        codArticulo: item.codArticulo,
        desArticulo: item.desArticulo,
        codUnidadMedida: item.salesUnit,
        codAlmacen: item.defaultWarehouse,
        fecNecesaria: fechaNecesaria,
        cantidadNecesaria: 0,
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
    this.dataGrilla[this.indiceModalSocioNegocio].codSocioNegocio =  event.cardCode;
    this.activarModalSocioNegocio();
  }

  activarModalSocioNegocio(indice?: number) {
    this.indiceModalSocioNegocio = indice;
    this.isActivateBusquedaSocioNegocio = !this.isActivateBusquedaSocioNegocio;
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
