import { Component, OnInit } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IOrdenCompraLista, IOrdenCompraAnular } from '../../models/orden-compra';
import { Subscription } from 'rxjs';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { OrdenCompraService } from '../../services/orden-compra.service';
import { UtilService } from '../../../../services/util.service';
import { IMensajeResultadoApi } from '../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';
import { SessionService } from '../../../../services/session.service';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-panel-orden-compra',
  templateUrl: './panel-orden-compra.component.html',
  styleUrls: ['./panel-orden-compra.component.css']
})
export class PanelOrdenCompraComponent implements OnInit {
  // Titulo del componente
  titulo = 'Orden Compra';

  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  // Formulario de Busqueda
  formularioBusqueda: FormGroup;

  // Opcion Buscar
  descripcionFind = '';
  modeloFind: IOrdenCompraLista;
  listModelo: IOrdenCompraLista[] = [];

  columnas: any[];

  // Opcion Editar
  modelocloned: { [s: string]: any; } = {};

  // Opcion Eliminar
  modeloEliminar: IOrdenCompraLista;

  // Suscripcion [para realizar el unsuscription al cerrar el formulario]
  subscription$: Subscription;
  
  constructor(public readonly mensajePrimeNgService: MensajePrimeNgService,
              private readonly router: Router,
              private readonly fb: FormBuilder,
              private readonly confirmationService: ConfirmationService,
              private readonly breadcrumbService: BreadcrumbService,
              private readonly ordenCompraService: OrdenCompraService,
              private readonly utilService: UtilService,
              private readonly sessionStorage: SessionService,
              public readonly lenguageService: LanguageService) {
                this.breadcrumbService.setItems([
                    { label: this.globalConstants.cModuloRequerimiento },
                    { label: 'Orden Compra', routerLink: ['module-oc/panel-orden-compra'] }
                ]);
              }

  ngOnInit() {
    this.columnas = [
      { header: 'Id' },
      { header: 'Proveedor' },
      { header: 'Fec.Generado' },
      { header: 'Fec.Vigente' },
      { header: 'Fec.Entrega' },
      { header: 'Monto Total' },
      { header: 'Tipo Pago' },
      { header: 'Tipo Orden Compra' },
      { header: 'Moneda'},
      { header: 'Estado' }
    ];

    this.onbuildForm();

    if (this.sessionStorage.getItem('busquedaOrdenCompra')) {

      const bodyBusqueda = this.sessionStorage.getItem('busquedaOrdenCompra');

      this.formularioBusqueda.patchValue({
        fechaInicio: new Date(bodyBusqueda.fechaIn),
        fechaFin: new Date(bodyBusqueda.fechaFin)
      });

      this.onListar();
    }

  }

  private onbuildForm() {
    this.formularioBusqueda = this.fb.group({
      idOrdenCompra:[0],
      fechaInicio: new Date(),
      fechaFin: new Date(),
      codSocioNegocio:['']
    });
  }

  onToBuscar() {
    this.onListar();
  }

  onListar() {
    const formBody = this.formularioBusqueda.value;

    const fechaIn = this.utilService.fecha_AAAAMMDD(formBody.fechaInicio);
    const fechaFin = this.utilService.fecha_AAAAMMDD(formBody.fechaFin);
    const idOrdenCompra = formBody.idOrdenCompra;
    const codSocioNegocio = formBody.codSocioNegocio;

    this.subscription$ = new Subscription();

    this.subscription$ = this.ordenCompraService.getOrdenCompraPorFiltro(fechaIn, fechaFin, idOrdenCompra, codSocioNegocio)
    .subscribe(resp => {
      if (resp) {
          this.listModelo = resp;
          console.log('this.listModelo', this.listModelo);
        }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error.error);
      }
    );
  }

  onToCreate() {
    this.router.navigate(['/main/modulo-oc/registrar-orden-compra']);
  }

  onConfirmDelete(value: IOrdenCompraAnular) {
    this.confirmationService.confirm({
        message: this.globalConstants.subTitleEliminar,
        header: this.globalConstants.titleEliminar,
        icon: 'pi pi-info-circle',
        acceptLabel: 'Si',
        rejectLabel: 'No',
        accept: () => {
          this.onToDelete(value);
        },
        reject: () => {
          this.mensajePrimeNgService.onToCancelMsg(this.globalConstants.msgCancelSummary, this.globalConstants.msgCancelDetail);
        }
    });
  }

  onToDelete(value: IOrdenCompraAnular) {
    this.subscription$ = new Subscription();
    this.subscription$ = this.ordenCompraService.setOrdenCompraAnular(value)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = this.listModelo.filter(datafilter => datafilter.idOrdenCompra !== this.modeloEliminar.idOrdenCompra );
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error.error);
      });
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
