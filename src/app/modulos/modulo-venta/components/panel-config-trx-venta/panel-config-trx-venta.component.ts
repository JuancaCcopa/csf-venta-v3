import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { VentasService } from '../../services/ventas.service';
import { map } from 'rxjs/operators';
import { IVentaConfiguracion, IVentaConfiguracionEliminar } from '../../interface/venta-configuracion.interface';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { IMensajeResultadoApi } from '../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';

@Component({
  selector: 'app-panel-config-trx-venta',
  templateUrl: './panel-config-trx-venta.component.html',
  styleUrls: ['./panel-config-trx-venta.component.css']
})
export class PanelConfigTrxVentaComponent implements OnInit, OnDestroy {
  // Titulo del componente
  titulo = 'Configuración de Transacciones de Ventas';
  tituloDetalle = "Venta"
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  listModelo: IVentaConfiguracion[];
  modeloItem: IVentaConfiguracion;

  columnas: any;

  // Formulario
  formularioBusqueda: FormGroup;

  subscription$: Subscription;

  // Opcion Eliminar
  modeloEliminar: IVentaConfiguracionEliminar;

  modelocloned: { [s: string]: IVentaConfiguracion; } = {};

  constructor(private readonly breadcrumbService: BreadcrumbService,
              public readonly mensajePrimeNgService: MensajePrimeNgService,
              private readonly formBuilder: FormBuilder,
              private readonly confirmationService: ConfirmationService,
              private readonly ventasService: VentasService,
              private readonly router: Router) {
    this.breadcrumbService.setItems([
      { label: 'Módulo Venta' },
      { label: 'Configuración de Transacciones de Ventas', routerLink: ['module-ve/panel-trx-venta'] }
    ]);
  }

  ngOnInit(): void {
  
    this.buildForm();    

    this.onHeaderGrilla();
    
    this.goListar();
  }

  private buildForm() {
    this.formularioBusqueda = this.formBuilder.group({
      nombre: ['']
    });
  }

  private onHeaderGrilla() {
    this.columnas = [
      { field: 'codigo', header: 'Id' },
      { field: 'descripcion', header: 'Descripción' },
      { field: 'automatico', header: 'Venta Automática' },
      { field: 'receta', header: 'Venta Receta' },
      { field: 'pedido', header: 'Venta Pedido' },
      { field: 'manual', header: 'Venta Manual' },
      { field: 'automatico', header: 'Impresión Automática' },
      { field: 'almacen', header: 'Almacen' }
    ];
  }

  goListar() {
    let body = this.formularioBusqueda.value;
    this.listModelo = [];
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.getVentaConfiguracionGetByFiltros(body.nombre)
    .pipe(
      map((resp: IVentaConfiguracion[]) => {
        this.listModelo = resp;
      })
    )
    .subscribe();
  }

  onRowEditInit(value: IVentaConfiguracion) {
    this.modelocloned[value.idconfiguracion] = {...value};
  }

  onRowEditSave(value: IVentaConfiguracion) {
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.setVentaConfiguracionModificar(value)
    .subscribe((resp: IMensajeResultadoApi) => {
      delete this.modelocloned[value.idconfiguracion];
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  onRowEditCancel(value: IVentaConfiguracion, index: number) {
    this.listModelo[index] = this.modelocloned[value.idconfiguracion];
    delete this.modelocloned[value.idconfiguracion];
  }

  goToRowSelectDelete(value: IVentaConfiguracion) {
    this.modeloEliminar = value;
    this.onConfirmDelete();
  }

  onConfirmDelete() {
    this.confirmationService.confirm({
        message: this.globalConstants.subTitleEliminar,
        header: this.globalConstants.titleEliminar,
        icon: 'pi pi-info-circle',
        acceptLabel: 'Si',
        rejectLabel: 'No',
        accept: () => {
          this.onToDelete();
        },
        reject: () => {
          this.mensajePrimeNgService.onToCancelMsg(this.globalConstants.msgCancelSummary, this.globalConstants.msgCancelDetail);
        }
    });
  }

  onToDelete() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.setVentaConfiguracionEliminar(this.modeloEliminar)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = this.listModelo.filter(datafilter => datafilter.idconfiguracion !== this.modeloEliminar.idconfiguracion );
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  goToCreate() {
    this.router.navigate(['/main/modulo-ve/trx-venta-create']);
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
