import { Component, OnInit } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';

@Component({
  selector: 'app-modal-busqueda-pedido-devolucion',
  templateUrl: './modal-busqueda-pedido-devolucion.component.html',
  styleUrls: ['./modal-busqueda-pedido-devolucion.component.css']
})
export class ModalBusquedaPedidoDevolucionComponent implements OnInit {
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  constructor() { }

  ngOnInit(): void {
  }

}
