import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { ISeriePorMaquina, ISeriePorMaquinaEliminar, ISerie } from '../../interface/serie-por-maquina.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { ConfirmationService } from 'primeng/api';
import { VentasService } from '../../services/ventas.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { IMensajeResultadoApi } from '../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';
import { SelectItem } from 'primeng';

@Component({
  selector: 'app-panel-estacion-trabajo',
  templateUrl: './panel-estacion-trabajo.component.html',
  styleUrls: ['./panel-estacion-trabajo.component.css']
})
export class PanelEstacionTrabajoComponent implements OnInit, OnDestroy {
  // Titulo del componente
  titulo = 'Estación de Trabajo';
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  listModelo: ISeriePorMaquina[];
  modeloItem: ISeriePorMaquina;

  columnas: any;

  // Formulario
  formularioBusqueda: FormGroup;

  subscription$: Subscription;

  // Opcion Eliminar
  modeloEliminar: ISeriePorMaquinaEliminar;

  modelocloned: { [s: string]: ISeriePorMaquina; } = {};

  constructor(private readonly breadcrumbService: BreadcrumbService,
              public readonly mensajePrimeNgService: MensajePrimeNgService,
              private readonly formBuilder: FormBuilder,
              private readonly confirmationService: ConfirmationService,
              private readonly ventasService: VentasService,
              private readonly router: Router) {
    this.breadcrumbService.setItems([
      { label: 'Módulo Venta' },
      { label: 'Estación de Trabajo', routerLink: ['module-ve/panel-estacion-trabajo'] }
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
      { field: 'nombremaquina', header: 'Nombre Equipo' },
      { field: 'seriefactura', header: 'Serie Factura' },
      { field: 'serieboleta', header: 'Serie Boleta' },
      { field: 'serienotacredito', header: 'Serie Nota Crédito' },
      { field: 'serienotadebito', header: 'Serie Nota Débito' },
      { field: 'serieguia', header: 'Serie Guía' },
      { field: 'descentro', header: 'Centro Costo' },
      { field: 'desalmacen', header: 'Almacén' }
    ];
  }

  goListar() {
    let body = this.formularioBusqueda.value;
    this.listModelo = [];
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.getSeriePorMaquinaGetByFiltros(body.nombre)
    .pipe(
      map((resp: ISeriePorMaquina[]) => {
        this.listModelo = resp;
      })
    )
    .subscribe();
  }

  goToEditar(id: number) {
    this.router.navigate(['/main/modulo-ve/estacion-trabajo-update', id]);
  }

  goToRowSelectDelete(value: ISeriePorMaquina) {
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
    this.subscription$ = this.ventasService.setSeriePorMaquinaEliminar(this.modeloEliminar)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = this.listModelo.filter(datafilter => datafilter.id !== this.modeloEliminar.id );
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  goToCreate() {
    this.router.navigate(['/main/modulo-ve/estacion-trabajo-create']);
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
