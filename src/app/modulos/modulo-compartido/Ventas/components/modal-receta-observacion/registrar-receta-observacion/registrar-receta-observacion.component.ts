import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../../constants/globals-constants-form';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VentaCompartidoService } from '../../../services/venta-compartido.service';
import { UserContextService } from '../../../../../../services/user-context.service';
import swal from'sweetalert2';
import { IRecetaObservacionRegistrar } from '../../../interfaces/receta.interface';

@Component({
  selector: 'app-registrar-receta-observacion',
  templateUrl: './registrar-receta-observacion.component.html',
  styleUrls: ['./registrar-receta-observacion.component.css']
})
export class RegistrarRecetaObservacionComponent implements OnInit, OnDestroy {
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  
  @Input() isAtencion: string;
  @Input() isIdReceta: number;

  formularioNuevo: FormGroup;
  // Subscription
  subscription$: Subscription;

  @Output() eventAceptar = new EventEmitter<boolean>();
  @Output() eventCancelar = new EventEmitter<boolean>();

  constructor(private readonly fb: FormBuilder,
              private readonly ventaCompartidoService: VentaCompartidoService,
              private readonly userContextService: UserContextService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.formularioNuevo = this.fb.group({
      idreceta: [{value: this.isIdReceta, disabled: true}],
      usuario: [{value: this.userContextService.getUsuario(), disabled: true}],
      comentario: [{value: null, disabled: false}],
    });
  }

  goAceptar() {

    const data = this.formularioNuevo.getRawValue();

    if (data.comentario === null || data.comentario === '' || data.comentario === undefined) {
      swal.fire(this.globalConstants.msgInfoSummary, 'Ingresar Comentario', 'info');
      return;
    }

    let body: IRecetaObservacionRegistrar = {
      id_receta: this.isIdReceta,
      codatencion: this.isAtencion,
      idusuarioregistro: this.userContextService.getIdUsuario(),
      comentario: data.comentario
    }

    this.subscription$ = new Subscription();
    this.subscription$  = this.ventaCompartidoService.registrarRecetaObservacion( body )
    .subscribe(() =>  {
      this.eventAceptar.emit(true);
    },
      (error) => {
        swal.fire(this.globalConstants.msgErrorSummary,error.error.resultadoDescripcion, 'error');
    });
  }

  goCancelar() {
    this.eventAceptar.emit(false);
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
