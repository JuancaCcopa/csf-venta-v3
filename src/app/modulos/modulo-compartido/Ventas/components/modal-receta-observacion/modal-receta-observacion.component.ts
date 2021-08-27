import { Component, Input, OnInit, OnChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { DemoService } from '../../../../../services/demo.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IRecetaObservacion, IRecetaObservacionModificar } from '../../interfaces/receta.interface';
import { VentaCompartidoService } from '../../services/venta-compartido.service';
import { map } from 'rxjs/operators';
import { UserContextService } from '../../../../../services/user-context.service';
import swal from'sweetalert2';
@Component({
  selector: 'app-modal-receta-observacion',
  templateUrl: './modal-receta-observacion.component.html',
  styleUrls: ['./modal-receta-observacion.component.css']
})
export class ModalRecetaObservacionComponent implements OnInit, OnDestroy   {
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  
  @Input() isAtencion: string;
  @Input() isIdReceta: number;

  isVisualizarMantenimientoObservacion: boolean

  formularioBusqueda: FormGroup;
  columnas: any;
  listModelo: IRecetaObservacion[];

  // loading
  loading: boolean;
  // Subscription
  subscription$: Subscription;

  @Output() eventCancelar = new EventEmitter<boolean>();

  constructor(private readonly fb: FormBuilder,
              private readonly ventaCompartidoService: VentaCompartidoService,
              private readonly userContextService: UserContextService) { }

  ngOnInit(): void {

    this.buildForm();
    this.buildColumnas();
    this.incializar();
    this.onListarObservacion();
  }

  private buildForm() {
    this.formularioBusqueda = this.fb.group({
      codatencion: [{value: null, disabled: true}],
    });
  }

  private incializar(){
    this.formularioBusqueda.patchValue({
      codatencion: this.isAtencion
    });
  }

  private buildColumnas() {
    this.columnas = [
      { field: 'idobs', header: 'Id' },
      { field: 'id_receta', header: 'Receta' },
      { field: 'fecharegistro', header: 'Fecha Registro' },
      { field: 'usuarioregistro', header: 'Usuario' },
      { field: 'comentario', header: 'Comentario' },
      { field: 'fechaanulacion', header: 'Fecha Anulación' }
    ];
  }

  onListarObservacion(){
    this.loading = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventaCompartidoService.getListRecetasObservacionPorReceta(this.isIdReceta)
    .pipe(
      map((resp: IRecetaObservacion[]) => {
        this.loading = false;
        this.listModelo = resp;
      })
    )
    .subscribe(() => {},
    (error) => {
      this.loading = false;
      swal.fire(this.globalConstants.msgInfoSummary,error.error.resultadoDescripcion,'error')
    });
  }

  goModificar(value: IRecetaObservacion) {

    let data: IRecetaObservacionModificar = {
      idobs: value.idobs,
      idusuarioanulacion: this.userContextService.getIdUsuario()
    }

    this.subscription$ = new Subscription();
    this.subscription$  = this.ventaCompartidoService.modificarRecetasObservacion( data )
    .subscribe(() =>  {
      swal.fire(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail, 'success');
      this.onListarObservacion();
    },
      (error) => {
        swal.fire(this.globalConstants.msgErrorSummary,error.error.resultadoDescripcion, 'error');
    });
  }

  goCancelar() {
    this.eventCancelar.emit(false);
  }

  goNuevoAceptar() {
    this.isVisualizarMantenimientoObservacion =! this.isVisualizarMantenimientoObservacion;
    this.onListarObservacion();
  }

  goNuevoCancelar() {
    this.isVisualizarMantenimientoObservacion =! this.isVisualizarMantenimientoObservacion;
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
