import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PlanesModel } from '../../../../modulo-venta/models/planes.model';
import { Subscription } from 'rxjs';
import { VentasService } from '../../../../modulo-venta/services/ventas.service';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { IAutenticarResponse } from '../../interfaces/autenticar.interface';

@Component({
  selector: 'app-modal-busqueda-planes',
  templateUrl: './modal-busqueda-planes.component.html',
  styleUrls: ['./modal-busqueda-planes.component.css']
})
export class ModalBusquedaPlanesComponent implements OnInit, OnDestroy, OnChanges {
  // Variables globales
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  columnas: any;
  formularioVisor: FormGroup;
  formularioBusqueda: FormGroup;

  listModelo: PlanesModel [];

  seleccionItem: PlanesModel = new PlanesModel();
  subscription$: Subscription;
  loading: boolean;
  isVisualizar: boolean = false;

  @Input() isHabilitaControl: boolean;
  @Input() isAutenticacion: boolean;
  @Input() isCodPlan: string;

  @Output() eventoAceptar = new EventEmitter<PlanesModel>();
  @Output() eventoCancelar = new EventEmitter<PlanesModel>();

  constructor(private ventasService: VentasService,
              private readonly fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.buildForm();
    this.buildColumnas();
    this.goListPlanesPorFiltro();
    this.buildFormVisor();
  }

  ngOnChanges() {
    if (this.formularioVisor !== undefined) {
      this.formularioVisor.controls.nombreVisor.setValue(this.isCodPlan);

      if (!this.isHabilitaControl) {
        this.formularioVisor.controls.nombreVisor.enable();
      } else {
        this.formularioVisor.controls.nombreVisor.disable();
      }
    }
  }

  private buildForm() {
    this.formularioBusqueda = this.fb.group({
      nombre: [''],
    });
  }

  private buildFormVisor() {
    this.formularioVisor = this.fb.group({
      nombreVisor: [{value: this.isCodPlan, disabled: this.isHabilitaControl}],
    });
  }
 
  private buildColumnas() {
    this.columnas = [
      { field: 'codPlan', header: 'Código' },
      { field: 'nombre', header: 'Descripción' },
      { field: 'porcentajeDescuento', header: 'Porcentaje' }
    ];
  }

  goListPlanesPorFiltro() {
    const formBody = this.formularioBusqueda.value;

    let modeloPlan = new PlanesModel();
    modeloPlan.nombre = formBody.nombre;

    this.loading = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.getPlanesGetByFiltros(modeloPlan)
    .subscribe((data: PlanesModel[]) => {
      this.listModelo = [];
      this.listModelo = data;
      this.loading = false;
    },
    (error) => {
      this.loading = false;
    });
  }

  goHabilitar() {
    this.isAutenticacion = !this.isAutenticacion;
  }

  goAutenticar(event: IAutenticarResponse) {
    if (event.valido) {
      this.isAutenticacion = !this.isAutenticacion;
      this.isVisualizar = !this.isVisualizar;
    }
  }

  goCancelarAutenticar() {
    this.isAutenticacion = !this.isAutenticacion;
  }

  clickAceptar() {
    this.LimpiarFiltroBusqueda();
    this.formularioVisor.patchValue({
      nombreVisor: this.seleccionItem.codPlan
    });
    this.isVisualizar = false;
    this.eventoAceptar.emit(this.seleccionItem);
  }

  clickCancelar() {
    this.LimpiarFiltroBusqueda();
    this.isVisualizar = false;
    this.eventoCancelar.emit();
  }

  private LimpiarFiltroBusqueda() {
    this.formularioBusqueda.patchValue({
      nombre: ''
    });
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
