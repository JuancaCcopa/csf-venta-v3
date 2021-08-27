//libreria
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { FormGroup, FormBuilder } from '@angular/forms';
// const
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';

//interfaces
import { IRequerimientoItemBus } from '../../interfaces/requerimiento-item-bus.interface';

//services
import { RequerimientoCompartidoService } from '../../services/requerimiento-compartido.service';
import { LanguageService } from '../../../../../services/language.service';
import { UtilService } from '../../../../../services/util.service';

@Component({
  selector: 'app-modal-busqueda-requerimiento',
  templateUrl: './modal-busqueda-requerimiento.component.html',
  styleUrls: ['./modal-busqueda-requerimiento.component.css']
})
export class ModalBusquedaRequerimientoComponent implements OnInit, OnChanges {
  @Input() isDisplayBusquedaArticulo;
  @Input() selectionMode:string = 'multiple';
  @Input() tipoArticulo: number = 0;
  //@Input() numRq: number = 0;
  @Input() isInventariable: boolean = false;
  @Output() articuloSeleccionado = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  seleccionArticulo: any;
  //rowListaArticulos: IArticulo[] = [];
  rowListaRequerimiento: IRequerimientoItemBus[] = [];
  cols: any;
  loading = true;
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;

  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  // Formulario de Busqueda
  formularioBusquedaRq: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private requerimientoCompartidoService: RequerimientoCompartidoService,
    private readonly utils: UtilService,
    public readonly lenguageService: LanguageService) {}

  ngOnInit(): void {
    this.buildFormRq();
    this.cabeceraTabla();
    //this.formularioBusquedaRq.get.fec
    this.getRequerimiento();
  }

  ngOnChanges() {
    if (this.isDisplayBusquedaArticulo) {
      
      //this.getRequerimiento();
    }
  }

  cabeceraTabla() {
    this.cols = [
      { field: 'idRequerimiento', header: 'Nro.RQ' },
      { field: 'fecRequerimiento', header: 'Fecha Req.' },
      { field: 'nombreCompleto', header: 'Usuario' },
      { field: 'desCentroCosto', header: 'Centro de Costo (Usuario)' },
      { field: 'obsConformidadSAP', header: 'Obs.Conformidad SAP' },
      { field: 'desRequerimientoEstado', header: 'RQ Estado' },
    ];
  }
  //numRq
  getRequerimiento() {

    const formBody = this.formularioBusquedaRq.value;
    const fechaIn = this.utils.fecha_AAAAMMDD(formBody.fechaInicio);
    const fechaFin = this.utils.fecha_AAAAMMDD(formBody.fechaFin);
    const nrorq = formBody.numRq;

    
    console.log("this.formularioBusquedaRq");
    console.log(fechaIn);
    this.requerimientoCompartidoService
      .GetParamBusqueda(fechaIn, fechaFin,nrorq)
      .pipe(map((resp) => (this.rowListaRequerimiento = resp)))
      .subscribe(
        (resp) => {
          this.loading = false;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  private buildFormRq() {
    this.formularioBusquedaRq = this.fb.group({
      fechaInicio: [new Date()],
      fechaFin: [new Date()],
      numRq:''
    });
  }

  clickAceptar() {
    this.articuloSeleccionado.emit(this.seleccionArticulo);
  }
  clickCancelar() {
    this.cancel.emit();
  }
  onToBuscar() {
    this.getRequerimiento();
  }
}
