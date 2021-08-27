import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IHospitalExclusiones } from 'src/app/modulos/modulo-venta/interface/venta.interface';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
@Component({
  selector: 'app-modal-busqueda-hospital-exclusiones',
  templateUrl: './modal-busqueda-hospital-exclusiones.component.html',
  styleUrls: ['./modal-busqueda-hospital-exclusiones.component.css']
})
export class ModalBusquedaHospitalExclusionesComponent implements OnInit {
  // Variables globales
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  @Input() isListModelo: IHospitalExclusiones[];
  @Output() eventoCerrar = new EventEmitter<IHospitalExclusiones>();
  columnas: any;
  
  constructor() { }

  ngOnInit(): void {
    this.buildColumnas();
  }

  private buildColumnas() {
    this.columnas = [
      { field: 'coddiagnostico', header: 'Código' },
      { field: 'nombrediagnostico', header: 'Diagnostico' }
    ];
  }

  goCerrar() {
    this.eventoCerrar.emit();
  }
  
}
