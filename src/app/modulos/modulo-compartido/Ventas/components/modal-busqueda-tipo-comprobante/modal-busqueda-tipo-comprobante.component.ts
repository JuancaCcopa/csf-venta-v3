import { Component, OnInit } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';

@Component({
  selector: 'app-modal-busqueda-tipo-comprobante',
  templateUrl: './modal-busqueda-tipo-comprobante.component.html',
  styleUrls: ['./modal-busqueda-tipo-comprobante.component.css']
})
export class ModalBusquedaTipoComprobanteComponent implements OnInit {
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  constructor() { }

  ngOnInit(): void {
  }

}
