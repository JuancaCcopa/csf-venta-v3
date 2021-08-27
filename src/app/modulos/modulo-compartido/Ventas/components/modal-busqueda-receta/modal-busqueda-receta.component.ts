import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { LanguageService } from '../../../../../services/language.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IReceta } from '../../interfaces/receta.interface';
import { VentasService } from '../../../../modulo-venta/services/ventas.service';
import { map } from 'rxjs/operators';
import { ITabla } from '../../../../modulo-venta/interface/tabla.interface';
import { SelectItem } from 'primeng';
import { VentaCompartidoService } from '../../services/venta-compartido.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-modal-busqueda-receta',
  templateUrl: './modal-busqueda-receta.component.html',
  styleUrls: ['./modal-busqueda-receta.component.css']
})
export class ModalBusquedaRecetaComponent implements OnInit, OnDestroy {
  @Input() append: any;
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  subscription$: Subscription;
  // Formulario
  formularioBusqueda: FormGroup;
  listTablaEstadoConsultaMedica: SelectItem[];
  listTablaEstadoReceta: SelectItem[];

  columnas: any;
  listModelo: IReceta[];
  seleccionItem: IReceta;

  isVisualizarObservacion: boolean;
  isModeloReeceta: IReceta;

  isVisibleValeDelivery: boolean;

  @Output() eventoAceptar = new EventEmitter<IReceta>();
  @Output() eventoCancelar = new EventEmitter<IReceta>();

  // loading
  loading: boolean;
  constructor(public lenguageService: LanguageService,
              private readonly ventasService: VentasService,
              private readonly formBuilder: FormBuilder,
              private readonly ventaCompartidoService: VentaCompartidoService) { }

  ngOnInit(): void {
    this.onHeaderGrilla();
    this.onListarEstadoConsultaMedica();
    this.onListarEstadoReceta();
    this.buildForm();
  }

  private onHeaderGrilla() {
    this.columnas = [
      { field: 'ide_receta', header: 'Receta' },
      { field: 'cod_atencion', header: 'Atención' },
      { field: 'fec_registra', header: 'Fecha' },
      { field: 'paciente', header: 'Paciente' },
      { field: 'telefono', header: 'Telefono' },
      { field: 'telefono2', header: 'Telefono2' },
      { field: 'medico', header: 'Medido' },
      { field: 'est_consulta_medica', header: 'Tip. Cons. Med.' },
      { field: 'flg_atendido_online', header: 'Ate.' }
    ];
  }

  private onListarEstadoConsultaMedica(){
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.getListTablaClinicaPorFiltros('MEDISYN_ESTADO_CONSULTA_MEDICA', '', 34, 0, -1)
    .pipe(
      map((resp: ITabla[]) => {
        debugger;
        this.listTablaEstadoConsultaMedica = [];
        for (let item of resp) {
          this.listTablaEstadoConsultaMedica.push({ value: item.codigo.trim(), label: item.nombre.trim() })
        }
      })
    )
    .subscribe();
  }

  private buildForm() {
    this.formularioBusqueda = this.formBuilder.group({
      tipoconsultamedica: [null],
      fechainicio: [new Date()],
      fechafin: [new Date()],
      codreceta: [0],
      nombre: [''],
      estado: [null]
    });
  }

  private onListarEstadoReceta(){
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.getListTablaLogisticaPorFiltros('SBA_ESTADORECETA', '', 34, 0, -1)
    .pipe(
      map((resp: ITabla[]) => {
        this.listTablaEstadoReceta = [];
        for (let item of resp) {
          this.listTablaEstadoReceta.push({ value: item.codigo.trim(), label: item.nombre.trim() })
        }
      })
    )
    .subscribe();
  }

  goListarPedido(){
    const body = this.formularioBusqueda.value;

    let tipoconsultamedica = body.tipoconsultamedica === null ? '' : body.tipoconsultamedica.value
    let estado = body.estado === null ? '' : body.estado.value

    this.loading = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventaCompartidoService.getListRecetasPorFiltro(body.fechainicio, body.fechafin, tipoconsultamedica, body.codreceta, body.nombre, estado)
    .pipe(
      map((resp: IReceta[]) => {
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

  goVisualizarObservacion(value: IReceta) {    
    this.isModeloReeceta = value;
    this.isVisualizarObservacion = !this.isVisualizarObservacion;
  }

  goValeDelivery() { 
    this.isVisibleValeDelivery = !this.isVisibleValeDelivery;
  }

  clickAceptar() {
    this.LimpiarFiltroBusqueda();
    this.eventoAceptar.emit(this.seleccionItem);
  }

  clickCancelar() {
    this.LimpiarFiltroBusqueda();
    this.eventoCancelar.emit();
  }

  private LimpiarFiltroBusqueda() {
    this.formularioBusqueda.patchValue({
      tipoconsultamedica: null,
      fechainicio: new Date(),
      fechafin: new Date(),
      codreceta: 0,
      nombre: '',
      estado: null
    });
  }

  goCancelarRecetaObservacion() {
    this.isVisualizarObservacion = !this.isVisualizarObservacion;
  }

  goValeDeliveryCancelar() {
    this.isVisibleValeDelivery = !this.isVisibleValeDelivery;
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
