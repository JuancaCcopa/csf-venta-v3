import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IMedico } from '../../interfaces/medico.interface';
import { Subscription } from 'rxjs';
import { VentaCompartidoService } from '../../services/venta-compartido.service';

@Component({
  selector: 'app-modal-busqueda-medico',
  templateUrl: './modal-busqueda-medico.component.html',
  styleUrls: ['./modal-busqueda-medico.component.css']
})
export class ModalBusquedaMedicoComponent implements OnInit {
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  isVisualizar: boolean = false;
  //Columnas de la tabla
  columnas: any;
  formularioBusqueda: FormGroup;
  formularioVisor: FormGroup;
  listModelo: IMedico[];

  seleccionItem: IMedico;
  subscription$: Subscription;
  loading: boolean;

  @Input() isHabilitaControl: boolean;
  @Output() eventoAceptar = new EventEmitter<IMedico>();
  @Output() eventoCancelar = new EventEmitter<IMedico>();
  constructor(private ventaCompartidoService: VentaCompartidoService,
              private readonly fb: FormBuilder) { }

ngOnInit(): void {
    this.buildColumnas();
    this.buildFormVisor()
    this.buildForm();
  }

  private buildFormVisor() {
    this.formularioVisor = this.fb.group({
      nombreVisor: [null],
    });
  }

  private buildForm() {
    this.formularioBusqueda = this.fb.group({
      nombre: [null],
    });
  }
 
  private buildColumnas() {
    this.columnas = [
      { field: 'codmedico', header: 'Código' },
      { field: 'nombres', header: 'Nombre' },
      { field: 'ruc', header: 'RUC' },
      { field: 'telefono', header: 'Telefono' },
      { field: 'direccion', header: 'Dirección' }
    ];
  }

  getListMedicosContains() {
    const formBody = this.formularioBusqueda.value;
    this.loading = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventaCompartidoService.getListMedicoPorNombre(formBody.nombre)
    .subscribe((data: IMedico[]) => {
      this.listModelo = [];
      console.log('data', data);
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
      nombreVisor: this.seleccionItem.codmedico
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
