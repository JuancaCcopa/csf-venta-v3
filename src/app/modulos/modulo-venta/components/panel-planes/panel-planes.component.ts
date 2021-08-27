import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { VentasService } from '../../services/ventas.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IMensajeResultadoApi } from '../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';
import { PlanesModel } from '../../models/planes.model';
import swal from'sweetalert2';

@Component({
  selector: 'app-panel-planes',
  templateUrl: './panel-planes.component.html',
  styleUrls: ['./panel-planes.component.css']
})
export class PanelPlanesComponent implements OnInit {
  // Titulo del componente
  titulo = 'Planes';

  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  // Formulario de Busqueda
  formularioBusqueda: FormGroup;

  // Opcion Buscar
  descripcionFind = '';
  modeloFind: PlanesModel = new PlanesModel() ;
  listModelo: PlanesModel[];

  columnas: any[];
  
  // Opcion Editar
  modelocloned: { [s: string]: any; } = {};

  // Opcion Eliminar
  modeloEliminar: PlanesModel = new PlanesModel() ;

  subscription$: Subscription;
  
  constructor(public readonly mensajePrimeNgService: MensajePrimeNgService,
              private readonly router: Router,
              private readonly fb: FormBuilder,
              private readonly confirmationService: ConfirmationService,
              private readonly breadcrumbService: BreadcrumbService,
              private readonly ventasService: VentasService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Ventas' },
                    { label: 'Planes', routerLink: ['module-re/panel-mantenimiento'] }
                ]);
              }

  ngOnInit() {
    this.columnas = [
      { header: 'Codigo' },
      { header: 'Descripcion' },
      { header: 'Descuento' },
      { header: 'Estado' }
    ];

    this.onbuildForm();

    this.onListar();
  }

  private onbuildForm() {
    this.formularioBusqueda = this.fb.group({
      nombre: [''],
    });
  }

  onToBuscar() {
    this.onListar();
  }

  onListar() {
    const formBody = this.formularioBusqueda.value;
    this.modeloFind = {nombre: formBody.nombre};
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.getPlanesGetByFiltros(this.modeloFind)
    .subscribe(resp => {
      if (resp) {
          this.listModelo = resp;
        }
      },
      (error) => {
      swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion,'error')
      }
    );
  }

  onRowEditInit(modelo: PlanesModel) {
    this.modelocloned[modelo.codPlan] = {...modelo};
  }

  onRowEditSave(modelo: PlanesModel) {
    debugger;
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.setPlanesModificar(modelo)
    .subscribe((resp: IMensajeResultadoApi) => {
      delete this.modelocloned[modelo.codPlan];
      swal.fire(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail, 'success');
    },
      (error) => {
        swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion,'error');
      });
  }

  onRowEditCancel(modelo: PlanesModel, index: number) {
    this.listModelo[index] = this.modelocloned[modelo.codPlan];
    delete this.modelocloned[modelo.codPlan];
  }

  onToRowSelectDelete(modelo: PlanesModel) {
    this.modeloEliminar = modelo;
    this.onConfirmDelete();
  }

  onToCreate() {
    this.router.navigate(['/main/modulo-ve/planes-create']);
  }

  onConfirmDelete() {

    swal.fire({
      title: this.globalConstants.titleEliminar,
      text: this.globalConstants.subTitleEliminar,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.onToDelete();
      }
    });
  }

  onToDelete() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.setPlanesEliminar(this.modeloEliminar)
    .subscribe((resp: IMensajeResultadoApi) => {
      this.listModelo = this.listModelo.filter(datafilter => datafilter.codPlan !== this.modeloEliminar.codPlan );
      swal.fire(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail, 'success')
    },
      (error) => {
        swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion,'error');
      });
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
