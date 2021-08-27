import { Component, OnInit, Input } from '@angular/core';
import { IRequerimiento, IDetalleRequerimieno, IAnexo, ILineaRequerimientoAprobador } from '../../../models/requerimiento.interface';
import { InterfaceColumnasGrilla } from '../../../interface/columnas-grilla-interface';
import { RequerimientoService } from '../../../services/requerimiento.service';
import { EstadoRequerimientoService } from '../../../services/estado-requerimiento.service';
import { map } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-ver-detalle-requerimiento-economato',
  templateUrl: './ver-detalle-requerimiento-economato.component.html',
  styleUrls: ['./ver-detalle-requerimiento-economato.component.scss']
})
export class VerDetalleRequerimientoEconomatoComponent implements OnInit {

  @Input() requerimiento: IRequerimiento;

  detalleDelItemSeleccionado: IDetalleRequerimieno;
  rowLineaAnexo: IAnexo[] = [];
  cabeceraTablaListAprobacion: InterfaceColumnasGrilla[] = [];
  cabeceraTablaListAprobacionViible: InterfaceColumnasGrilla[] = [];

  dataListaAprobacion: ILineaRequerimientoAprobador[];
  cols: any[];
  displayDescarga: boolean = false;
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
          console.log('resp[0]', resp[0])
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
      // { field: 'nroOrdenTrabajo', header: 'Nro. Orden T.' },
      { field: 'codArticulo', header: 'Cod. Artículo' },
      { field: 'desArticulo', header: 'Descripción Artículo' },
      { field: 'codUnidadMedida', header: 'Cod. U.M.' },
      // { field: 'codAlmacen', header: 'Cod Almacen'},
      { field: 'cantidadNecesaria', header: 'Cantidad Necesaria'},      
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
          // let progressStatus: ProgressStatus =
          // {status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((resp.loaded / resp.total) * 100)};
          // this.mensajePrimeNgService.onToInfoMsg(null,  'EN PROCESO');
          // this.downloadStatus.emit( {status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((resp.loaded / resp.total) * 100)});
          break;
        case HttpEventType.Response:
          // this.mensajePrimeNgService.onToInfoMsg(null, 'DESCARGA COMPLETA');
          saveAs(new Blob([resp.body], {type: resp.body.type}),nombreArchivo);
          // let file = new window.Blob([resp.body], {type: resp.body.type}, nombreArchivo);
          // let fileURL = window.URL.createObjectURL(file);
          // window.open(fileURL, '_blank');
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
