import { ICentroCosto } from './../../models/aprobadorCentroCosto.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AdminAprobadorService } from '../../services/aprobador.service';
import { map } from 'rxjs/operators';
import { IAprobador } from '../../models/aprobador.interface';
import { AdminAprobadorTemporalService } from '../../services/aprobador-temporal.service';
import { InterfaceAprobadorTemporal } from '../../models/aprobadorTemporal.interface';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { SessionService } from '../../../../services/session.service';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
@Component({
  selector: 'app-admin-aprobador-temporal',
  templateUrl: './admin-aprobador-temporal.component.html',
  styleUrls: ['./admin-aprobador-temporal.component.scss'],
  providers: [ConfirmationService],
})
export class AdminAprobadorTemporalComponent implements OnInit {
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  dataAprobadorTemporal: InterfaceAprobadorTemporal[] = [];
  isVerContenidoTabla = false;
  dataListaAprobador: IAprobador[] = [];
  seleccionListaAprobador: IAprobador;
  idAprobadorCombo = 0;
  cabeceraTabla: any;
  formularioBusqueda: FormGroup;
  isActivateButtonRegistrar = false;
  centroCosto: ICentroCosto;
  aprobador: Partial<IAprobador>;
  idEditadoResaltar: number = 0;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly confirmationService: ConfirmationService,
    private readonly adminAprobadorService: AdminAprobadorService,
    public mensajePrimeNgService: MensajePrimeNgService,
    private readonly adminAprobadorTemporalService: AdminAprobadorTemporalService,
    private readonly sessionStorage: SessionService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      { label: this.globalConstants.cModuloRequerimiento },
      { label: 'Aprobador Temporal', routerLink: ['modulo-ad/admin-temporal'] },
    ]);
    this.buiForm();
  }

  ngOnInit() {

    this.cargarCombo();

    if (this.sessionStorage.getItem('idAprobadorTemp')) {
      this.idEditadoResaltar = this.sessionStorage.getItem('idAprobadorTemp');
    }
    if (this.sessionStorage.getItem('usuarioAprobadorBuscado')) {
      const bodyUsuarioBuscado: Partial<IAprobador> = this.sessionStorage.getItem(
        'usuarioAprobadorBuscado'
      ) as Partial<IAprobador>;
      this.aprobador = bodyUsuarioBuscado;
      this.formularioBusqueda.patchValue({
        idAprobador: bodyUsuarioBuscado.idAprobador,
        aprobador: bodyUsuarioBuscado,
      });
      this.searchAprobadorTemporal(bodyUsuarioBuscado.idAprobador);
      this.isActivateButtonRegistrar = true;
    }
    if (this.sessionStorage.getItem('idAprobadorTemporal')) {
    }
  }
  private buiForm() {
    this.formularioBusqueda = this.fb.group({
      idAprobador: [{value: null, disabled: true}],
      aprobador: [null, Validators.required],
    });
  }

  cargarCombo() {
    this.adminAprobadorService
      .getAprobadorActivo(0)
      .pipe(
        map((resp) => {
          if (resp) {
            this.dataListaAprobador = resp;
          }
        })
      )
      .subscribe((err) => console.log);
  }

  cambioEnComboAprobador(event: IAprobador) {
    this.isActivateButtonRegistrar = true;
    this.aprobador = event;

    // this.centroCosto = {
    //   codCentroCosto: event.codCentroCosto.toString(),
    //   desCentroCosto: event.desCentroCosto,
    // };
    const { idAprobador } = event;
    this.formularioBusqueda.patchValue({
      idAprobador,
    });
  }

  clickBuscarAprobadorTemporal(idBuscado?: number) {
    this.isVerContenidoTabla = false;
    if (idBuscado) {
    }
    this.sessionStorage.setItem('usuarioAprobadorBuscado', this.aprobador);
    const { idAprobador } = this.formularioBusqueda.value.aprobador;
    const id = idAprobador ? idAprobador : idBuscado;
    if (id > 0) {
      this.searchAprobadorTemporal(id);
    }
  }

  searchAprobadorTemporal(id) {
    this.dataAprobadorTemporal = [];
    this.adminAprobadorTemporalService
      .getAprobadorTemporal(id)
      .pipe(
        map((resp) => {
          if (resp && resp.length > 0) {
            this.dataAprobadorTemporal = resp;
            this.datosCabecera();
            this.isVerContenidoTabla = true;
          }
          if (resp.length === 0) {
            this.mensajePrimeNgService.onToInfoMsg();
          }
        })
      )
      .subscribe(
        (resp) => resp,
        (error) => this.mensajePrimeNgService.onToErrorMsg()
      );
  }

  datosCabecera() {
    this.cabeceraTabla = [
      { field: 'idAprobadorTemporal', header: 'Id' },
      { field: 'idAprobador', header: 'Id Aprobador' },
      { field: 'usuarioOriginal', header: 'Usuario Original' },
      { field: 'idUsuarioTemporal', header: 'Id Usuario Temporal' },
      { field: 'usuarioTemporal', header: 'Usuario Temporal' },
      { field: 'fechaInicio', header: 'Fecha Inicio' },
      { field: 'fechaFin', header: 'Fecha Fin' },
      { field: 'idAprobadorEstado', header: 'Id Aprobador Estado' },
      {
        field: 'desAprobadorEstado',
        header: 'Des Aprobador Estado',
        claseColumna: 'estado-aprobador',
      },
    ];
  }
  anular(event) {
    this.confirmationService.confirm({
        message: this.globalConstants.subTitleAnular,
        header: this.globalConstants.titleAnular,
        icon: 'pi pi-info-circle',
        acceptLabel: 'Si',
        rejectLabel: 'No',
      accept: () => {
        this.anularAprobadorTemporal(event);
      },
    });
  }
  anularAprobadorTemporal(event: Partial<InterfaceAprobadorTemporal>) {
    const body: Partial<InterfaceAprobadorTemporal> = {
      idAprobadorTemporal: event.idAprobadorTemporal,
      idAprobador: event.idAprobador,
      regUpdateIdUsuario: 1,
      idAprobadorEstado: 3,
    };

    this.adminAprobadorTemporalService.anularAprobadorTemporal(body).subscribe(
      (resp) => {
        this.mensajePrimeNgService.onToExitoMsg();
        this.clickBuscarAprobadorTemporal(this.idAprobadorCombo);
      },
      (error) => this.mensajePrimeNgService.onToErrorMsg()
    );
  }
  clickRegistrar() {
    const { idAprobador } = this.formularioBusqueda.value;
    this.router.navigate(['/main/modulo-ad/registrar-aprobador-temporal'], {
      queryParams: {
        idAprobador: this.aprobador.idAprobador,
        aprobador: this.aprobador.usuario,
        codCentroCosto: this.aprobador.codCentroCosto,
        desCentroCosto: this.aprobador.desCentroCosto,
      },
    });
  }

  modificar(event: Partial<InterfaceAprobadorTemporal>) {
    this.sessionStorage.setItem('idAprobadorTemporal', event.idAprobadorTemporal);
    this.router.navigate(['/main/modulo-ad/modificar-aprobador-temporal'], {
      queryParams: {
        idAprobadorTemporal: event.idAprobadorTemporal,
        idAprobador: event.idAprobador,
        aprobador: this.aprobador.usuario,
        usuarioTemporal: event.usuarioTemporal,
        codCentroCosto: this.aprobador.codCentroCosto,
        desCentroCosto: this.aprobador.desCentroCosto,
        fechaInicio: event.fechaInicio as string,
        fechaFin: event.fechaFin as string,
        idAprobadorEstado: event.idAprobadorEstado,
      },
    });
  }
}
