import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
//services
import { SolicitudTrasladoService } from '../../../services/solicitud-traslado.service';

@Component({
  selector: 'app-solicitud-traslado-ext-ver',
  templateUrl: './solicitud-traslado-ext-ver.component.html',
  styleUrls: ['./solicitud-traslado-ext-ver.component.scss'],
})

export class SolicitudTraslaExtVerComponent implements OnInit {
  @Input() item;

  itemSolicitud: any;
  itemSolicitudDetalle: any = [];

  cols: any[];
  constructor(
      private readonly solicitudTrasladoService: SolicitudTrasladoService
      ) {}
  
  ngOnInit(): void {
    
    this.cabeceraTabla();
    this.getSolicitudTraslado(this.item.idSolicitudTraslado);

  }
  getSolicitudTraslado(id: number) {
    
    this.solicitudTrasladoService
      .getDetalle(id)
      .pipe(
        map((resp) => {
          
         console.log(resp);
          this.itemSolicitudDetalle = resp;
         
        })
      )
      .subscribe();
  }

  cabeceraTabla() {
    this.cols = [
      { field: 'idSolicitudTrasladoItem', header: 'Nro Solicitud' },
      { field: 'codArticulo', header: 'Código Articulo' },
      { field: 'desArticulo', header: 'Descripción Articulo' },
      { field: 'cantidadSolicitada', header: 'Cantidad' },
      { field: 'codUnidadMedida', header: 'Cod UM' }
    ];
  }

}
