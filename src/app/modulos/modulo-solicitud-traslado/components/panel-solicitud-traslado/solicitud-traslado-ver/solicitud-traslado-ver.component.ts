import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
//services
import { SolicitudTrasladoService } from '../../../services/solicitud-traslado.service';

@Component({
  selector: 'app-solicitud-traslado-ver',
  templateUrl: './solicitud-traslado-ver.component.html',
  styleUrls: ['./solicitud-traslado-ver.component.scss'],
})

export class SolicitudTraslaVerComponent implements OnInit {
  @Input() item;

  itemSolicitudDetalle: any = [];

  constructor(
      private readonly solicitudTrasladoService: SolicitudTrasladoService
      ) {}
  
  ngOnInit(): void {
        
    this.getSolicitudTraslado(this.item.idSolicitudTraslado);

  }
  getSolicitudTraslado(id: number) {

    this.solicitudTrasladoService
      .getDetalle(id)
      .pipe(
        map((resp) => {
          
          this.itemSolicitudDetalle = resp;
         
        })
      )
      .subscribe();
  }

}
