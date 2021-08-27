import { AprobadorCentroCostoService } from './../../services/aprobador-centro-costo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { map, filter } from 'rxjs/operators';
import { ConstantesGenerales } from '../../../../constants/Constantes-generales';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { SessionService } from '../../../../services/session.service';
import { IMensajeResultadoApi } from '../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import {
  IAprobacionCentroCosto,
  IAprobadorCentroCosto,
  IResultBusquedaCC,
} from '../../models/aprobadorCentroCosto.interface';
@Component({
  selector: 'app-centro-costo-aprobador',
  templateUrl: './centro-costo-aprobador.component.html',
  styleUrls: ['./centro-costo-aprobador.component.scss'],
  providers: [ConfirmationService],
})
export class CentroCostoAprobadorComponent implements OnInit {
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  dataPrueba = ConstantesGenerales.DATA_PRUEBA;
  cabeceraTabla: any;
  opcionesDeTabla: any = [];

  opcionesDropdown: any;

  formularioBusqueda: FormGroup;
  rowDatosAprobacion: IAprobacionCentroCosto[] = [];
  rowDatosAprobador: IAprobadorCentroCosto[] = [];
  rowResultBusqueda: IResultBusquedaCC[] = [];
  isDisplayTable = false;
  isActivateButtonNuevo = true;
  aprobadorSeleccionadoEnCombo: IAprobadorCentroCosto;
  idEditadoResaltar: number = 0;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly confirmationService: ConfirmationService,
    private readonly aprobadorCentroCostoService: AprobadorCentroCostoService,
    public mensajePrimeNgService: MensajePrimeNgService,
    private readonly sessionStorage: SessionService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      { label: this.globalConstants.cModuloRequerimiento },
      { label: 'Aprobador por Centro Costo', routerLink: ['modulo-ad/admin-centro-costo'] }
    ]);
    this.buildForm();
  }

  ngOnInit() {
    this.datosAprobacionCombo();
    this.datosAprobadorCombo();
    this.datosCabecera();
    if (this.sessionStorage.getItem('idAprobacionCC')) {
      console.log(this.sessionStorage.getItem('idAprobacionCC'));

      this.idEditadoResaltar = this.sessionStorage.getItem('idAprobacionCC');
    }

    if (this.sessionStorage.getItem('aprobador')) {
      const { aprobador } = this.sessionStorage.getItem('aprobador');
      this.aprobadorSeleccionadoEnCombo = aprobador;
      this.formularioBusqueda.patchValue({
        nroAprobador: this.aprobadorSeleccionadoEnCombo.idAprobador,
        aprobador: this.aprobadorSeleccionadoEnCombo,
      });
      this.isActivateButtonNuevo = false;
      this.search(this.aprobadorSeleccionadoEnCombo.idAprobador);
    }
    console.log(this.idEditadoResaltar);
  }

  private buildForm() {
    this.formularioBusqueda = this.formBuilder.group({
      idAprobacion: [{ value: null, disabled: true }],
      aprobacion: [{ value: null, disabled: true }],
      nroAprobador: [{ value: null, disabled: true }],
      aprobador: [null, Validators.required],
    });
  }

  modificar(event) {
    this.router.navigate(['/main/modulo-ad/modificar-centro-costo'], {
      queryParams: {
        idAprobacionCC: event.idAprobacionCC,
        idAprobacion: event.idAprobacion,
        codCentroCosto: event.codCentroCosto,
        desCentroCosto: event.desCentroCosto,
        idAprobacionDocumento: event.idAprobacionDocumento,
        regUpdateIdUsuario: event.regUpdateIdUsuario,
        idAprobador: event.idAprobador,
        aprobador: this.aprobadorSeleccionadoEnCombo.usuario,
      },
    });
  }

  anular(event: Partial<IResultBusquedaCC>) {
    this.confirmationService.confirm({
      message: '¿Seguro que quiere ANULAR?',
      accept: () => {
        const body = {
          idAprobacionCC: event.idAprobacionCC,
          regUpdateIdUsuario: 1,
        };
        this.aprobadorCentroCostoService.anularCC(body).subscribe(
          (result: IMensajeResultadoApi) => {
            this.mensajePrimeNgService.onToExitoMsg(undefined, result);
          },
          (error) => this.mensajePrimeNgService.onToErrorMsg(undefined, error.error)
        );
      },
    });
  }

  cambioEnComboAprobacion(event) {
    const body: IAprobacionCentroCosto = event.value;
    this.formularioBusqueda.patchValue({ idAprobacion: body.idAprobacion });
  }

  datosAprobacionCombo() {
    this.aprobadorCentroCostoService
      .getAprobacionCentroCosto()
      .pipe(
        map((resp) => {
          this.rowDatosAprobacion = resp;
          if (resp) {
            // Cambiar cuando envien más datos
            this.formularioBusqueda.patchValue({
              idAprobacion: this.rowDatosAprobacion[0].idAprobacion,
              aprobacion: this.rowDatosAprobacion[0],
            });
          }
        })
      )
      .subscribe();
  }

  datosCabecera() {
    this.cabeceraTabla = [
      { field: 'idAprobacionCC', header: 'id AprobacionCC' },
      { field: 'codCentroCosto', header: 'cod CentroCosto' },
      { field: 'desCentroCosto', header: 'Centro de Costo' },
      { field: 'desAprobacionDocumento', header: 'Aprobación documento' },
      { field: 'estadoAprobacionCC', header: 'Estado Aprobación' },
      // { field: 'idAprobacion', header: 'id Aprobacion' },
      // { field: 'idAprobacionDocumento', header: 'idAprobacionDocumento' },
      // { field: 'idAprobador', header: 'idAprobador' },
      // { field: 'regCreate', header: 'regCreate' },
      // { field: 'regUpdate', header: 'regUpdate' },
      // { field: 'regCreateIdUsuario', header: 'regCreateIdUsuario' },
      // { field: 'regUpdateIdUsuario', header: 'regUpdateIdUsuario' },
      // { field: 'isAprobacionCC', header: 'isAprobacionCC' },
    ];
  }

  cambioEnComboAprobador(event: IAprobadorCentroCosto) {
    // console.log(event);
    this.aprobadorSeleccionadoEnCombo = event;

    this.isActivateButtonNuevo = false;
    // const body= event;
    this.formularioBusqueda.patchValue({
      nroAprobador: this.aprobadorSeleccionadoEnCombo.idAprobador,
    });
  }

  datosAprobadorCombo() {
    this.aprobadorCentroCostoService
      .getAprobadorCentroCosto(0)
      .pipe(
        map((resp) => {
          this.rowDatosAprobador = resp.filter(
            (el) => el.idAprobadorEstado !== 3
          );
          // if (resp) {
          // this.formularioBusqueda.patchValue({nroAprobador: this.rowDatosAprobador[0].idAprobador});
          // }
        })
      )
      .subscribe();
  }

  clickBuscar() {
    const body = this.formularioBusqueda.value;
    this.sessionStorage.setItem('aprobador', body);
    // const {idAprobacion} = body.aprobacion;
    const { idAprobador } = body.aprobador;
    this.isDisplayTable = false;
    this.search(idAprobador);
  }
  
  search(idAprobador: number) {
    this.rowResultBusqueda = [];

    this.aprobadorCentroCostoService
      .getBuscarCC(idAprobador)
      .pipe(
        map((resp) => {
          this.rowResultBusqueda = resp;
          console.log(this.rowResultBusqueda);

          if (this.rowResultBusqueda.length === 0) {
            // this.mensajePrimeNgService.onToInfoMsg();
          }
          if (this.rowResultBusqueda.length > 0) {
            this.isDisplayTable = true;
          }
        })
      )
      .subscribe(
        (resp) => {},
        (error) => {
          this.mensajePrimeNgService.onToErrorMsg(undefined, error.error);
        }
      );
  }
  
  clickNuevo() {
    console.log('this.rowDatosAprobacion', this.rowDatosAprobacion);
    this.router.navigate(['/main/modulo-ad/registrar-centro-costo'], {
      queryParams: {
        idAprobacion: this.rowDatosAprobacion[0].idAprobacion,
        idAprobador: this.aprobadorSeleccionadoEnCombo.idAprobador,
        aprobador: this.aprobadorSeleccionadoEnCombo.usuario,
      },
    });
  }
}
