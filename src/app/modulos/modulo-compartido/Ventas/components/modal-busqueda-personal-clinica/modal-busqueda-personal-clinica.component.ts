import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IPersonalClinica } from '../../interfaces/personal-clinica.interface';
import { Subscription } from 'rxjs';
import { VentaCompartidoService } from '../../services/venta-compartido.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-modal-busqueda-personal-clinica',
  templateUrl: './modal-busqueda-personal-clinica.component.html',
  styleUrls: ['./modal-busqueda-personal-clinica.component.css']
})
export class ModalBusquedaPersonalClinicaComponent implements OnInit {
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  isVisualizar: boolean = false;
  //Columnas de la tabla
  columnas: any;
  formularioBusqueda: FormGroup;
  formularioVisor: FormGroup;
  listModelo: IPersonalClinica[];

  seleccionItem: IPersonalClinica;
  subscription$: Subscription;
  loading: boolean;

  @Input() isHabilitaControl: boolean;
  @Output() eventoAceptar = new EventEmitter<IPersonalClinica>();
  @Output() eventoCancelar = new EventEmitter<IPersonalClinica>();
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
      { field: 'codpersonal', header: 'Código' },
      { field: 'apellido', header: 'Apellido' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'direccion', header: 'Dirección' },
      { field: 'telefonocasa', header: 'Telefono' },
      { field: 'codempresa', header: 'Cod.Empresa' },
      { field: 'nombreempresa', header: 'Empresa' }
    ];
  }

  getListPersonalClinicaContains() {
    const formBody = this.formularioBusqueda.value;
debugger;
    if (formBody.nombre === null) {
      swal.fire(this.globalConstants.msgInfoSummary,'Ingresar como mínimo 4 caracteres','error');
      return;
    }

    if (formBody.nombre.length < 4) {
      swal.fire(this.globalConstants.msgInfoSummary,'Ingresar como mínimo 4 caracteres','error');
      return;
    }

    this.loading = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventaCompartidoService.getListPersonalClinicaPorNombre(formBody.nombre)
    .subscribe((data: IPersonalClinica[]) => {
      this.listModelo = [];
      this.listModelo = data;
      this.loading = false;
    },
    (error) => {
      swal.fire(this.globalConstants.msgInfoSummary,error.error.resultadoDescripcion,'error')
    });
  }

  clickAceptar() {
    this.LimpiarFiltroBusqueda();
    this.formularioVisor.patchValue({
      nombreVisor: this.seleccionItem.codpersonal
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
