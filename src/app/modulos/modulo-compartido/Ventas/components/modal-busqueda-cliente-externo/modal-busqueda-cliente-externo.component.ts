import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ICliente } from '../../interfaces/cliente.interface';
import { VentaCompartidoService } from '../../services/venta-compartido.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-modal-busqueda-cliente-externo',
  templateUrl: './modal-busqueda-cliente-externo.component.html',
  styleUrls: ['./modal-busqueda-cliente-externo.component.css']
})
export class ModalBusquedaClienteExternoComponent implements OnInit, OnDestroy {
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  isVisualizar: boolean = false;
  //Columnas de la tabla
  columnas: any;
  formularioBusqueda: FormGroup;
  formularioVisor: FormGroup;
  listModelo: ICliente[];

  seleccionItem: ICliente;
  subscription$: Subscription;
  loading: boolean;

  @Input() isHabilitaControl: boolean;
  @Output() eventoAceptar = new EventEmitter<ICliente>();
  @Output() eventoCancelar = new EventEmitter<ICliente>();
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
      opcion: ['NOMBRE'],
      codigo: [null],
      nombre: [null],
    });
  }
 
  private buildColumnas() {
    this.columnas = [
      { field: 'cardCode', header: 'Código' },
      { field: 'cardName', header: 'Nombre' },
      { field: 'federalTaxID', header: 'RUC/DNI' },
      { field: 'phone1', header: 'Telefono' },
      { field: 'mailAddress', header: 'Dirección' }
    ];
  }

  goListClientePorFiltro() {
    const formBody = this.formularioBusqueda.value;

    let codigo = formBody.codigo === null ? '': formBody.codigo.toUpperCase();
    let nombre = formBody.nombre === null ? '': formBody.nombre.toUpperCase();

    this.loading = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventaCompartidoService.getListClientePorFiltro(formBody.opcion, codigo, nombre)
    .subscribe((data: ICliente[]) => {
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
      nombreVisor: this.seleccionItem.cardCode
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
