import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { VentasService } from '../../../modulo-venta/services/ventas.service';

@Component({
  selector: 'app-control-almacen',
  templateUrl: './control-almacen.component.html',
  styleUrls: ['./control-almacen.component.css']
})
export class ControlAlmacenComponent implements OnInit {

  listModelo: modelo [];
  // Variable que emitira el item seleccionado de la lista recibida
  @Output() oItemData = new EventEmitter<modelo>();

  constructor(private readonly ventasService: VentasService) { }

  ngOnInit(): void {
    this.onListarTipoVenta();
  }

  private onListarTipoVenta() {
    this.ventasService.getTipoVenta().then(tipoVenta => this.listModelo = tipoVenta);
  }

  onSelect(event: modelo) {
    this.oItemData.emit(event);
  }
  
}

interface modelo {
  name: string;
  code: string;
}
