import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { IServicio } from '../../interfaces/servicio.interface';
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';
import { Subscription } from 'rxjs';
import { RequerimientoCompartidoService } from '../../services/requerimiento-compartido.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-modal-busqueda-servicio',
  templateUrl: './modal-busqueda-servicio.component.html',
  styleUrls: ['./modal-busqueda-servicio.component.css']
})
export class ModalBusquedaServicioComponent implements OnInit, OnDestroy {

  @Input() isDisplayBusqueda;
  @Output() itemSeleccionado = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  listServicio: IServicio[] = [];

  modeloSeleccionado: IServicio[] = [];

  cols: any;
  loading = true;
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;

  subscription$: Subscription;
  constructor(
    private readonly requerimientoCompartidoService: RequerimientoCompartidoService
  ) {}

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  ngOnChanges() {
    if (this.isDisplayBusqueda) {
      this.loading = true;
      this.datosServicio();
    }
  }

  ngOnInit(): void {
    this.listServicio = [];
    this.modeloSeleccionado = [];
    this.cabeceraTabla();
  }

  cabeceraTabla() {
    this.cols = [
      { field: 'code', header: 'Codigo' },
      { field: 'name', header: 'Descripción' },
      { field: 'u_SYP_Concepto', header: 'Concepto' },
      { field: 'u_SYP_Cuenta', header: 'Cuenta' },
      { field: 'u_SYP_Origen', header: 'Origen' }
    ];
  }

  datosServicio() {
    this.subscription$ = new Subscription;
    this.subscription$ = this.requerimientoCompartidoService
      .getServicio()
      .pipe(
        map((resp) => {
          this.listServicio = resp;
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

  clickAceptar() {
    this.itemSeleccionado.emit(this.modeloSeleccionado);
  }

  clickCancelar() {
    this.cancel.emit();
  }
}
