import { Component, Input, OnInit } from '@angular/core';
import { EstadoVentaService } from '../../../../modulo-venta/services/estado-venta.service';

@Component({
  selector: 'app-label-estado',
  templateUrl: './label-estado.component.html',
  styleUrls: ['./label-estado.component.css']
})
export class LabelEstadoComponent implements OnInit {

  @Input() isEstado: string;
  constructor(private estadoVentaService: EstadoVentaService) { }

  ngOnInit(): void {
  }

  goGetClassEstadoVenta() : string {
    return this.estadoVentaService.estadoVenta(this.isEstado.trim());
  }

}
