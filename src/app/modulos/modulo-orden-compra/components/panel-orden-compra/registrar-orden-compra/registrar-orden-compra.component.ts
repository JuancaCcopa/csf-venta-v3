import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LanguageService } from '../../../../../services/language.service';
import { RequerimientoService } from '../../../../modulo-requerimiento/services/requerimiento.service';
import { IMotivoRequerimiento } from '../../../../modulo-requerimiento/models/requerimiento.interface';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { MensajePrimeNgService } from '../../../../../services/mensaje-prime-ng.service';
import { IOrdenCompraItem, ITipoOrdenCompra, ITipoPago, IMoneda, IOrdenCompra } from '../../../models/orden-compra';
import { SelectItem } from 'primeng';
import { Subscription } from 'rxjs';
import { OrdenCompraService } from '../../../services/orden-compra.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ISocioNegocio } from '../../../../modulo-administracion/models/socio-negocio.interface';
import { interfaceUsuario } from '../../../../modulo-administracion/models/usuario.interface';
import { UserContextService } from '../../../../../services/user-context.service';
import { IArticulo } from '../../../../modulo-requerimiento/models/articulo.interface';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { SessionService } from '../../../../../services/session.service';
import { UtilService } from '../../../../../services/util.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registrar-orden-compra',
  templateUrl: './registrar-orden-compra.component.html',
  styleUrls: ['./registrar-orden-compra.component.css']
})
export class RegistrarOrdenCompraComponent implements OnInit, OnDestroy {
  formularioSuperior: FormGroup;
  formularioInferior: FormGroup;
  comboMotivo: IMotivoRequerimiento[];
  motivoSeleccionadoEnCombo: IMotivoRequerimiento;
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  listArticulosDetalle: IOrdenCompraItem[] = [];

  listItemTipoPago: SelectItem[];
  listItemTipoOrden: SelectItem[];
  listItemMoneda: SelectItem[];
  progress = 0;
  isEnvioArchivo = false;
  indiceModalSocioNegocio: number;
  isActivateBusquedaSocioNegocio: boolean = false;
  isActivateBusquedaArticulo = false;
  subscription$: Subscription;
  uploadedFiles: any[] = [];
  constructor(
    private readonly fb: FormBuilder,
    public lenguageService: LanguageService,
    public requerimientoService: RequerimientoService,
    public mensajePrimeNgService: MensajePrimeNgService,
    public ordenCompraService: OrdenCompraService,
    public userContextService: UserContextService,
    private readonly sessionStorage: SessionService,
    private readonly location: Location,
    private readonly utilService: UtilService) { }

  ngOnInit(): void {
    this.buildFormSuperior();
    this.buildFormInferior();
    this.getMoneda();
    this.getTipoOrden();
    this.getTipoPago();

    this.formularioInferior.patchValue({
      solicitante: this.userContextService.getNombreCompletoUsuario(),
      idUsuario: this.userContextService.getIdUsuario()
    });
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  private buildFormSuperior() {
    this.formularioSuperior = this.fb.group({
      codSocioNegocio: [null],
      desSocioNegocio: [null],
      fechaGenerado: [new Date()],
      fechaVigencia: [new Date()],
      fechaEntrega: [new Date()],
      tipoPago: [null],
      tipo: [null],
      moneda: [null],
      nroSAP: [{value: null, disabled: true}],
      conform: [{value: null, disabled: true}],
      tipoCambio: [{value: null, disabled: true}],
      flgIgv:[false],
      observacion: [null]
    });
  }

  private buildFormInferior() {
    this.formularioInferior = this.fb.group({
      lugarEntrega: [null],
      personaContacto: [null],
      solicitante: [null],
      idUsuario: [null]
    });
  }


  getTipoOrden() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.ordenCompraService.getTipoOrdenCompra()
    .subscribe((data: ITipoOrdenCompra[]) => {
      this.listItemTipoOrden = [];
      for (let item of data) {
        this.listItemTipoOrden.push({ label: item.descripcionTipoOrdenCompra, value: item.idTipoOrdenCompra });
      }
    });
  }

  getTipoPago() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.ordenCompraService.getTipoPago()
    .subscribe((data: ITipoPago[]) => {
      this.listItemTipoPago = [];
      for (let item of data) {
        this.listItemTipoPago.push({ label: item.paymentTermsGroupName, value: item.groupNumber });
      }
    });
  }

  getMoneda() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.ordenCompraService.getMoneda()
    .subscribe((data: IMoneda[]) => {
      this.listItemMoneda = [];
      for (let item of data) {
        this.listItemMoneda.push({ label: item.name, value: item.code });
      }
    });
  }

  socioNegocioSeleccionado(event: ISocioNegocio) {
    
    this.formularioSuperior.patchValue({
      codSocioNegocio: event.cardCode,
      desSocioNegocio: event.cardName
    });

    this.activarModalSocioNegocio();
  }

  activarModalSocioNegocio() {
    this.isActivateBusquedaSocioNegocio = !this.isActivateBusquedaSocioNegocio;
  }

  clickActivateBuscarArticulo() {
    this.isActivateBusquedaArticulo = !this.isActivateBusquedaArticulo;
  }

  articuloBuscado(event: IArticulo[]) {
    this.cambioDeEstructuraDeArticulo_AddFechaNecesaria(event);
    this.clickActivateBuscarArticulo();
  }

  cambioDeEstructuraDeArticulo_AddFechaNecesaria(event: IArticulo[]) {
    const { fechaNecesaria,codCentroCosto } = this.formularioSuperior.value;

    for (const item of event) {
      const newArticulo: IOrdenCompraItem = {
        numLinea:0,
        codArticulo: item.itemCode,
        desArticulo: item.itemName,
        unidadMedida: item.salesUnit,
        cantidad: 0,
        codAlmacen: item.defaultWarehouse,
        // fecNecesaria: fechaNecesaria,
        precio: 0,
        descuento:0,
        igv:0,
        total: 0,
        obsItem: ''
      };
      this.listArticulosDetalle.push(newArticulo);
    }
  }

// AL GUARDAR REGISTRO FINAL
clickGuardarGrilla(data: IOrdenCompraItem[]) {
  this.agregarNumLineas(data);

  data.forEach((el) => {
    // el.fecNecesaria = this.utilService.fechaApi_POST(new Date(el.fecNecesaria));
    el.cantidad = +el.cantidad;
    el.codAlmacen = el.codAlmacen ? el.codAlmacen : '';
    el.unidadMedida = el.unidadMedida ? el.unidadMedida : '';
    el.idOrdenCompraItem = 0;
    el.idOrdenCompra = 0;
    el.obsItem = el.obsItem ? el.obsItem : '';
  });

  // VALIDACION DEL DETALLE.
  if (!this.validarParaGuardar(data)) {
    return;
  }

  // Aarmar grilla
  console.log('this.formularioSuperior.value', this.formularioSuperior.value);
  console.log('this.formularioInferior.value', this.formularioInferior.value);
  const {
    codSocioNegocio,
    fechaGenerado,
    fechaVigencia,
    fechaEntrega,
    tipoPago,
    tipo,
    moneda,
    tipoCambio,
    flgIgv,
    observacion
  } = this.formularioSuperior.value;

  const {
    lugarEntrega,
    personaContacto,
    idUsuario
  } = this.formularioInferior.value;

  const bodyRegistro: IOrdenCompra = {
    idOrdenCompra: 0,
    codSocioNegocio: codSocioNegocio,
    fecGenerado: this.utilService.fechaApi_POST(fechaGenerado),
    fecVigente: this.utilService.fechaApi_POST(fechaVigencia),
    fecEntrega: this.utilService.fechaApi_POST(fechaEntrega),
    montoTotal: 0,
    montoNeto: 0,
    montoIgv: 0,
    codTipoPago: tipoPago.value,
    idTipoOrdenCompra: tipo.value,
    codMoneda: moneda.value,
    obsOrdenCompra: observacion,
    idEstadoOrdenCompra: 1,
    flgIgv: flgIgv,
    codAlmacen: '',
    porcentajeIgv: 0.18,
    lugarEntrega : lugarEntrega,
    idUsuarioSolicitante: idUsuario,
    tipoCambio: tipoCambio,
    personaContacto: personaContacto,
    regIdUsuario: this.userContextService.getIdUsuario(),
    listOrdenCompraItem: data,
    listOrdenCompraItemReq: [],
    listOrdenCompraAnexo:[]
  };

  const apiFinal = JSON.stringify(bodyRegistro);
  this.registerReq(apiFinal, this.uploadedFiles);
}

agregarNumLineas(data: IOrdenCompraItem[]) {
  let n = 1;
  for (const i of data) {
    i.numLinea = n++;
  }
}

validarParaGuardar(data: IOrdenCompraItem[]) {

  let mensaje: string = '';
  let validado = true;

  data.forEach((el) => {
    if (!el.cantidad) {
      validado = false;
      mensaje += `La cantidad no es válida para el artículo ${el.codArticulo}<br>`
    }
    if (!el.precio) {
      validado = false;
      mensaje += `Debe especificar el precio para el artículo ${el.codArticulo}<br>`;
    }
    if (!el.codAlmacen) {
      validado = false;
      mensaje += `Debe especificar el almacen para el artículo ${el.codArticulo}<br>`;
    }      
  });

  if (!validado) {
    mensaje = `<span>${mensaje}</span>`;
    this.mensajePrimeNgService.onToInfoMsg(null, mensaje);
  }

  return validado;

}

registerReq(data, formData) {
  this.ordenCompraService
    .setOrdenCompraRegistrar(data, formData)
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
            this.sessionStorage.setItem('idOrdenCompra', event.body.idRegistro);
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

  onClickRegresar() {
    this.location.back();
  }

}
