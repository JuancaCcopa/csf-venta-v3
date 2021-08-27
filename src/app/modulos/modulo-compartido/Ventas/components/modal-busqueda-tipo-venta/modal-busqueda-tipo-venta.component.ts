import { Component, OnInit } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';

@Component({
  selector: 'app-modal-busqueda-tipo-venta',
  templateUrl: './modal-busqueda-tipo-venta.component.html',
  styleUrls: ['./modal-busqueda-tipo-venta.component.css']
})
export class ModalBusquedaTipoVentaComponent implements OnInit {
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  constructor() { }

  ngOnInit(): void {
  }

}
