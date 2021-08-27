import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AdminAprobadorService } from '../../services/aprobador.service';
import { IAprobador, IAnularAprobador } from '../../models/aprobador.interface';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { SessionService } from '../../../../services/session.service';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-admin-aprobador',
  templateUrl: './admin-aprobador.component.html',
  styleUrls: ['./admin-aprobador.component.scss'],
  providers: [ConfirmationService],
})
export class AdminAprobadorComponent implements OnInit, OnDestroy {
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  rowResultAprobador: IAprobador[];
  cabeceraTabla: any[];
  id: number;
  loading = true;
  idEditadoResaltar = 0;

  subscription$: Subscription;

  constructor(private readonly router: Router,
              private readonly confirmationService: ConfirmationService,
              private readonly AprobadorAdminService: AdminAprobadorService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private readonly sessionStorage: SessionService,
              private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      { label: this.globalConstants.cModuloRequerimiento },
      { label: 'Config. Aprobadores'},
      { label: 'Principal', routerLink: ['modulo-ad/admin-aprobador'] }
    ]);
  }

  ngOnInit() {
    if (this.sessionStorage.getItem('idAprobador')) {
      this.idEditadoResaltar = this.sessionStorage.getItem('idAprobador');
    }
    this.datosCabeceraAprobador();
    this.datosTablaAprobador();
  }

  datosTablaAprobador() {
    this.AprobadorAdminService.getAprobador(0).subscribe(
      (result) => {
        this.rowResultAprobador = result;
        this.loading = false;
      },
      (error) => console.log(error)
    );
  }
  
  datosCabeceraAprobador() {
    this.cabeceraTabla = [
      { field: 'idAprobador', header: 'Id Aprobador' },
      { field: 'usuario', header: 'Aprobador' },
      { field: 'codCentroCosto', header: 'Cod Centro Costo' },
      { field: 'desCentroCosto', header: 'Centro de Costo' },
      { field: 'desAprobadorEstado', header: 'Estado' }
    ];
  }

  modificar(event: IAprobador) {
    this.router.navigate(['/main/modulo-ad/modificar-aprobador'], {
      queryParams: {
        codCentroCosto: event.codCentroCosto,
        desCentroCosto: event.desCentroCosto,
        idAprobador: event.idAprobador,
        usuario: event.usuario,
        idAprobadorEstado: event.idAprobadorEstado,
      },
    });
  }

  anular(event: IAprobador) {
    this.confirmationService.confirm({
      message: this.globalConstants.subTitleAnular,
      header: this.globalConstants.titleAnular,
      icon: 'pi pi-info-circle',
      accept: () => {
        const body: IAnularAprobador = {
          idAprobador: event.idAprobador,
          idAprobadorEstado: 3,
          regUpdateIdUsuario: event.regUpdateIdUsuario,
        };
        this.AprobadorAdminService.anularAprobador(body).subscribe(
          (result) =>
            this.mensajePrimeNgService.onToExitoMsg(),
          (error) => this.mensajePrimeNgService.onToErrorMsg(),
          () => this.datosTablaAprobador()
        );
      },
    });
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
