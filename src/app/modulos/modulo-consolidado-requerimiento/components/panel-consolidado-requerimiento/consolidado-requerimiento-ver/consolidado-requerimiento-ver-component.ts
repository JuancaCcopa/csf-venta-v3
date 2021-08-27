import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';
import { ConsolidadoRequerimientoService } from '../../../services/consolidado-requerimiento.service';
//import { IValeSalidaLista } from '../../../models/vale-salida';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { Console } from 'console';

@Component({
  selector: 'app-consolidado-requerimiento-ver',
  templateUrl: './consolidado-requerimiento-ver-component.html',
  styleUrls: ['./consolidado-requerimiento-ver.component.scss']
})

export class ConsolidadoRequerimientoVerComponent implements OnInit {
  @Input() inputConsolidado: any;
  
  Consolidado: any;
  loading = true;
  cols: any[];
  item: any[];
 // Name de los botones de accion
 globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  constructor(
    private readonly consolidadoRequerimientoService: ConsolidadoRequerimientoService,
        
  ) {}

  ngOnInit() {

    this.datos();
    this.cabeceraTabla();
    
  }

  datos() {
    
    this.consolidadoRequerimientoService
      .getVerPorId(this.inputConsolidado.idConsolidado)
      .pipe(
        map((resp) => {
          debugger;
          this.Consolidado=resp;     
        })
      )
      .subscribe(
        (resp) => {
          this.loading = false;
        },
        (error) => {
          console.log(error);
        }
      );
          
  }

  cabeceraTabla() {
    this.cols = [
      { field: 'CodArticulo', header: 'CodArticulo' },
      { field: 'DesArticulo', header: 'DesArticulo' },
      { field: 'CodSocioNegocioCompra', header: 'CodSocioNegocioCompra' },
      { field: 'Cantidad', header: 'Cantidad' },
      { field: 'CantidadCompra', header: 'CantidadCompra' },
      { field: 'DocEntry', header: 'DocEntry' }
    ];
  }


}
