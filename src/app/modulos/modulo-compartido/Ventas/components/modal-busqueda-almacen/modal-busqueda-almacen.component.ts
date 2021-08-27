import { Component, EventEmitter, OnInit, Output, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { IWarehouses } from '../../interfaces/warehouses.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VentaCompartidoService } from '../../services/venta-compartido.service';
import { Subscription } from 'rxjs';
import { UtilService } from '../../../../../services/util.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-modal-busqueda-almacen',
  templateUrl: './modal-busqueda-almacen.component.html',
  styleUrls: ['./modal-busqueda-almacen.component.css']
})
export class ModalBusquedaAlmacenComponent implements OnInit, OnDestroy, OnChanges {
  // Variables globales
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  //Lista
  listModelo: IWarehouses[];
  seleccionItem: IWarehouses;

  // Variable de visualizar tabla
  isVisualizar: boolean = false;
  @Input() isVenta: boolean = false;
  @Input() isWarehouseCode: string;

  //Columnas de la tabla
  columnas: any;
  formularioBusqueda: FormGroup;
  formularioVisor: FormGroup;
  subscription$: Subscription;
  loading: boolean;

  @Output() eventoResgistroSeleccionado = new EventEmitter<IWarehouses>();
  @Output() eventoCancelar = new EventEmitter<IWarehouses>();

  constructor(private readonly fb: FormBuilder,
              private readonly ventaCompartidoService: VentaCompartidoService,
              private readonly utilService: UtilService) { }

  ngOnChanges() {
    if (this.isWarehouseCode === undefined) {
      return;
    }

    if (this.isWarehouseCode === null) {
      return;
    }

    if (this.isWarehouseCode.trim() === '') {
      return;
    }

    this.getWarehousesPorCodigo();
  }

  ngOnInit(): void {
    this.buildForm();
    this.buildFormVisor();
    this.buildColumnas();
    this.goObtieneAlmacen();
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

  private goObtieneAlmacen() {

    if (this.isWarehouseCode === undefined) {
      return;
    }

    if (this.isWarehouseCode === null) {
      return;
    }

    if (this.isWarehouseCode.trim() === '') {
      return;
    }

    this.getWarehousesPorCodigo();
  }

  private buildColumnas() {
    this.columnas = [
      { field: 'warehouseCode', header: 'Código' },
      { field: 'warehouseName', header: 'Nombre' }
    ];
  }

  getWarehousesPorCodigo() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventaCompartidoService.getWarehousesPorCodigo(this.isWarehouseCode)
    .subscribe((data: IWarehouses) => {
      this.seleccionItem = data;
      this.clickAceptar();
    },
    (error) => {
      this.seleccionItem = null;
      swal.fire(this.globalConstants.msgInfoSummary,error.error.resultadoDescripcion,'error')
    });
  }

  getListWarehousesContains() {

    const formBody = this.formularioBusqueda.value;

    let almacen = formBody.nombre === null ? '' : formBody.nombre;
    almacen = almacen === undefined ? '' : almacen;

    if (almacen.length < 3){
      swal.fire(this.globalConstants.msgInfoSummary, 'Ingresar al menos 3 caracteres', 'info');
      return;
    }
    
    this.loading = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventaCompartidoService.getListWarehousesContains(this.utilService.convertirMayuscula(almacen))
    .subscribe((data: IWarehouses[]) => {
      this.listModelo = [];
      this.listModelo = data;
      this.loading = false;
    },
    (error) => {
      this.loading = false;
      swal.fire(this.globalConstants.msgInfoSummary,error.error.resultadoDescripcion,'error')
    });
  }

  clickAceptar() {
    this.LimpiarFiltroBusqueda();
    this.formularioVisor.patchValue({
      nombreVisor: this.seleccionItem.warehouseName
    });
    this.isVisualizar = false;
    this.eventoResgistroSeleccionado.emit(this.seleccionItem);
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
