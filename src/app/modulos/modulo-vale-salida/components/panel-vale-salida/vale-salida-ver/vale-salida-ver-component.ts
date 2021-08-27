import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';
import { ValeSalidaService } from '../../../services/vale-salida.service';
import { IValeSalidaLista } from '../../../models/vale-salida';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';

@Component({
  selector: 'app-vale-salida-ver',
  templateUrl: './vale-salida-ver-component.html',
  styleUrls: ['./vale-salida-ver.component.scss']
})
//vale-salida-ver-component
export class ValeSalidaVerComponent implements OnInit {

  @Input() inputvalesalida: IValeSalidaLista;
  
  ValeSalida: any;
  loading = true;
  cols: any[];
  item: any[];
 // Name de los botones de accion
 globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  constructor(
    private readonly valeSalidaService: ValeSalidaService,
    
  ) {}

  ngOnInit() {
    this.datos();
    this.cabeceraTabla();
  }

  datos() {
    debugger;
    this.valeSalidaService
      .getValeSalidaAllPorId(this.inputvalesalida.idValeSalida)
      .pipe(
        map((resp) => {
          this.ValeSalida=resp;
          console.log("this.ValeSalida");
          console.log(this.ValeSalida);
          //this.item = this.ValeSalida.valeSalidaItem;
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
      { field: 'idValeSalidaItem', header: 'IdValeSalidaItem' },
      { field: 'idRequerimiento', header: 'IdRequerimiento' },
      { field: 'codArticulo', header: 'CodArticulo' },
      { field: 'desArticulo', header: 'DesArticulo' },
      { field: 'codUnidadMedida', header: 'CodUnidadMedida' },
      { field: 'cantidadNecesaria', header: 'CantidadNecesaria' },
      { field: 'codCentroCosto', header: 'CodCentroCosto' },
      { field: 'comentario', header: 'Comentario' },
    ];
  }



}
