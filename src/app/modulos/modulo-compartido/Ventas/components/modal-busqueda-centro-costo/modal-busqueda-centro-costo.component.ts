import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VentaCompartidoService } from '../../services/venta-compartido.service';
import { ICentro } from '../../interfaces/centro.interface';

@Component({
  selector: 'app-modal-busqueda-centro-costo',
  templateUrl: './modal-busqueda-centro-costo.component.html',
  styleUrls: ['./modal-busqueda-centro-costo.component.css']
})
export class ModalBusquedaCentroCostoComponent implements OnInit, OnDestroy {
  // Variables globales
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  //Lista
  listModelo: ICentro[];
  seleccionItem: ICentro;

  // Variable de visualizar tabla
  isVisualizar: boolean = false;

  //Columnas de la tabla
  columnas: any;
  formularioBusqueda: FormGroup;
  formularioVisor: FormGroup;
  subscription$: Subscription;
  loading: boolean;

  @Output() eventoAceptar = new EventEmitter<ICentro>();
  @Output() eventoCancelar = new EventEmitter<ICentro>();
  @Input() isCodCentroCosto: string;

  constructor(private readonly fb: FormBuilder,
              private readonly ventaCompartidoService: VentaCompartidoService) { }

  ngOnInit(): void {
    this.buildForm();
    this.buildFormVisor();
    this.buildColumnas();
    this.goObtieneCentroCosto();
  }

  private buildForm() {
    this.formularioBusqueda = this.fb.group({
      nombre: [''],
    });
  }

  private buildFormVisor() {
    this.formularioVisor = this.fb.group({
      nombreVisor: [null],
    });
  }

  private buildColumnas() {
    this.columnas = [
      { field: 'codcentro', header: 'Código' },
      { field: 'nombre', header: 'Nombre' }
    ];
  }

  private goObtieneCentroCosto() {
    if (this.isCodCentroCosto !== null || this.isCodCentroCosto.trim() !== '' || this.isCodCentroCosto !== undefined) {
      this.getCentroPorCodigo();
    }
  }

  getCentroPorCodigo() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventaCompartidoService.getCentroPorCodigo(this.isCodCentroCosto)
    .subscribe((data: ICentro) => {
      this.seleccionItem = data;
      this.clickAceptar();
    },
    (error) => {
      this.seleccionItem = null;
    });
  }

  getListCentroContains() {
    const formBody = this.formularioBusqueda.value;
    this.loading = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventaCompartidoService.getListCentroContains(formBody.nombre.toUpperCase())
    .subscribe((data: ICentro[]) => {
      this.listModelo = [];
      this.listModelo = data;
      this.loading = false;
    },
    (error) => {
      this.loading = false;
    });
  }

  clickAceptar() {
    this.LimpiarFiltroBusqueda();
    this.formularioVisor.patchValue({
      nombreVisor: this.seleccionItem.nombre
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
