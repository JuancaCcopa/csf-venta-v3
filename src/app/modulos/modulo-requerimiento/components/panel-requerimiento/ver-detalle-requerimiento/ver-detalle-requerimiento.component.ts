import { Component, OnInit, Input } from '@angular/core';
import { IRequerimiento, IDetalleRequerimieno, IAnexo, ILineaRequerimientoAprobador } from '../../../models/requerimiento.interface';
import { RequerimientoService } from '../../../services/requerimiento.service';
import { EstadoRequerimientoService } from '../../../services/estado-requerimiento.service';
import { map } from 'rxjs/operators';
import { InterfaceColumnasGrilla } from '../../../interface/columnas-grilla-interface';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-ver-detalle-requerimiento',
  templateUrl: './ver-detalle-requerimiento.component.html',
  styleUrls: ['./ver-detalle-requerimiento.component.scss']
})
export class VerDetalleRequerimientoComponent implements OnInit {

  @Input() requerimiento: IRequerimiento;

  detalleDelItemSeleccionado: IDetalleRequerimieno;
  rowLineaAnexo: IAnexo[] = [];
  cabeceraTablaListAprobacion: InterfaceColumnasGrilla[] = [];
  cabeceraTablaListAprobacionViible: InterfaceColumnasGrilla[] = [];

  dataListaAprobacion: ILineaRequerimientoAprobador[];
  cols: any[];
  displayDescarga: boolean =false;
  constructor(
    private readonly requerimientoService: RequerimientoService,
    private readonly estadoRequerimientoService: EstadoRequerimientoService
  ) {}

  ngOnInit() {
    this.cabeceraTabla();
    this.dataCabeceraListaAprobacionDetalle();
    this.getVerDetalle(this.requerimiento.idRequerimiento, this.requerimiento.origen);
  }

  getVerDetalle(id: number, origen: string) {
    this.requerimientoService
      .getDetalleRequerimiento(id, origen)
      .pipe(
        map((resp) => {
          this.detalleDelItemSeleccionado = resp[0];
          this.rowLineaAnexo = resp[0].lineasRequerimientoAnexo;
          this.dataListaAprobacion = resp[0].lineasRequerimientoAprobador;
        })
      )
      .subscribe();
  }
  
  cabeceraTabla() {
    this.cols = [
      { field: 'numLinea', header: 'Línea' },
      { field: 'codArticulo', header: 'Cod. Servicio' },
      { field: 'desArticulo', header: 'Descripción Servicio' },    
      { field: 'codCentroCosto', header: 'Cod Centro Costo' },
      { field: 'codSocioNegocio', header: 'Cod Socio Negocio' },
      { field: 'fecNecesaria', header: 'Fecha' },
      { field: 'comentario', header: 'Comentario' },
    ];
  }

  dataCabeceraListaAprobacionDetalle() {
    this.cabeceraTablaListAprobacion = [
      { field: 'idAprobador', header: 'Id Aprobador', visibility: false, tipoFlag: "", formatoFecha: "" },
      { field: 'idRequerimiento', header: 'Id Requerimiento', visibility: false, tipoFlag: "", formatoFecha: "" },
      { field: 'idRequerimientoAprobador', header: 'Id Requerimiento Aprobador', visibility: false, tipoFlag: "", formatoFecha: "" },
      { field: 'desAprobador', header: 'Desaprobador', visibility: true, tipoFlag: "", formatoFecha: "" },
      { field: 'desRequerimientoEstado', header: 'Estado ', visibility: true, tipoFlag: "", formatoFecha: "" },
      { field: 'idRequerimientoEstado', header: 'idRequerimientoEstado', visibility: false, tipoFlag: "", formatoFecha: "" },
      { field: 'obsAprobacion', header: 'Observación', visibility: true, tipoFlag: "", formatoFecha: "" },
    ];

    this.cabeceraTablaListAprobacionViible = this.cabeceraTablaListAprobacion.filter(x => x.visibility == true);
    
  }

  claseDesEstado(item: string): string {
    return this.estadoRequerimientoService.estadoSolicitud(item);
  }
  onAnexoEjecutar(id: number, nombreArchivo: string) {
    this.displayDescarga = true;
    this.requerimientoService.getGetObtieneArchivoById(id)
    .subscribe((resp: any) => {
      console.log('resp',resp);
      switch (resp.type) {
        case HttpEventType.DownloadProgress:
          break;
        case HttpEventType.Response:
          saveAs(new Blob([resp.body], {type: resp.body.type}),nombreArchivo);
          this.displayDescarga = false;
          break;
      }
    },
      (error) => {
        this.displayDescarga = false;
        // this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }
}
