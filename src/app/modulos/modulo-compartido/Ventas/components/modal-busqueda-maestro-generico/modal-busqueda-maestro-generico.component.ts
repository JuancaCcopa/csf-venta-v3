import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VentaCompartidoService } from '../../services/venta-compartido.service';
import { IGenerico } from '../../interfaces/generico.interface';
import swal from'sweetalert2';

@Component({
  selector: 'app-modal-busqueda-maestro-generico',
  templateUrl: './modal-busqueda-maestro-generico.component.html',
  styleUrls: ['./modal-busqueda-maestro-generico.component.css']
})
export class ModalBusquedaMaestroGenericoComponent implements OnInit, OnDestroy, OnChanges {
  // Variables globales
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  //Lista
  listModelo: IGenerico[];
  seleccionItem: IGenerico;

  // Variable de visualizar tabla
  isVisualizar: boolean = false;
  @Input() isName: string;

  //Columnas de la tabla
  columnas: any;
  formularioBusqueda: FormGroup;
  formularioVisor: FormGroup;
  subscription$: Subscription;
  loading: boolean;

  @Input() isDescripcion: string;
  @Output() eventoResgistroSeleccionado = new EventEmitter<IGenerico>();
  @Output() eventoCancelar = new EventEmitter<IGenerico>();

  constructor(private readonly fb: FormBuilder,
              private readonly ventaCompartidoService: VentaCompartidoService) { }

  ngOnChanges() {
    this.isDescripcion = this.isDescripcion === null ? '' : this.isDescripcion ;
    this.isDescripcion = this.isDescripcion === undefined ? '' : this.isDescripcion ;

    if (this.isDescripcion !== '') {
      this.formularioVisor.patchValue({
        nombreVisor: [this.isDescripcion],
      });
    }

  }

  ngOnInit(): void {
    this.buildForm();
    this.buildFormVisor();
    this.buildColumnas();
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
      { field: 'code', header: 'Código' },
      { field: 'name', header: 'Nombre' }
    ];
  }

  goListGenericoPorFiltro() {
    const formBody = this.formularioBusqueda.value;

    let name = formBody.nombre === null ? '': formBody.nombre;
    name = name === undefined ? '': name;

    if (name.length < 3) {
      swal.fire(this.globalConstants.msgInfoSummary, 'Ingresar Descripción','error') 
      return;
    }

    this.loading = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventaCompartidoService.getListGenericoPorFiltro(name.toUpperCase())
    .subscribe((data: IGenerico[]) => {
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
      nombreVisor: this.seleccionItem.name
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
    this.listModelo = [];
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
