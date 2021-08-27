import { Component, OnInit, Input } from '@angular/core';
import { map, filter } from 'rxjs/operators';
//services
import { TomaInventarioService } from '../../../services/toma-inventario.service';

@Component({
  selector: 'app-toma-inventario-ver-stock',
  templateUrl: './toma-inventario-ver-stock.component.html',
  styleUrls: ['./toma-inventario-ver-stock.component.scss'],
})

export class TomaInventarioVerStockComponent implements OnInit {
  @Input() itemAlmacen;
  @Input() isVerStock;
  @Input() items;
  
  
  //itemDetalle: any = [];
  loading = false;

  cols: any[];
  constructor(
      private readonly tomaInventarioService: TomaInventarioService
      ) {}
  
  ngOnInit(): void {
    
    this.cabeceraTabla();

  }
 

  cabeceraTabla() {
    this.cols = [
      { field: 'codArticulo', header: 'Cod Articulo' },
      { field: 'desArticulo', header: 'Descripción Articulo' },
      { field: 'laboratorio', header: 'Laboratorio' },
      { field: 'grupoArticulo', header: 'Grupo de Articulo' },
      { field: 'cantidadSolicitada', header: 'Stock' },
      { field: 'lote', header: 'Lote' },
      { field: 'conteo', header: 'Conteo' },
      { field: 'clasificacion', header: 'Clasificacion (ABC)' },
    ];
  }

}
