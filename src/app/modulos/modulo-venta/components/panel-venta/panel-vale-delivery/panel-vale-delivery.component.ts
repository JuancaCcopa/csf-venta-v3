import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { LanguageService } from '../../../../../services/language.service';
import { IPaciente } from '../../../../modulo-compartido/Ventas/interfaces/paciente.interface';
import { IValeDelivery } from '../../../interface/vale-delivery';
import { VentasService } from '../../../services/ventas.service';
import { map } from 'rxjs/operators';
import swal from'sweetalert2';

@Component({
  selector: 'app-panel-vale-delivery',
  templateUrl: './panel-vale-delivery.component.html',
  styleUrls: ['./panel-vale-delivery.component.css']
})
export class PanelValeDeliveryComponent implements OnInit , OnDestroy{

  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  @Input() isAtencion: string;
  @Input() isAppendVale: any;
  @Input() isModeloPaciente: IPaciente;

  formularioVale: FormGroup;
  // Subscription
  subscription$: Subscription;

  @Output() eventAceptar = new EventEmitter<boolean>();
  @Output() eventCancelar = new EventEmitter<boolean>();
  
  constructor(private readonly fb: FormBuilder,
              public lenguageService: LanguageService,
              private readonly ventaService: VentasService) { }

  ngOnInit(): void {
    debugger;

    this.buildForm();
    this.goValeDeliveryPorCodAtencion();
    // this.onSetearDatos();
  }

  private buildForm() {
    this.formularioVale = this.fb.group({
      idvaledelivery: [{value: 0, disabled: true}],
      codatencion: [{value: null, disabled: true}],
      nombrepaciente: [{value: null, disabled: false}],
      telefono: [{value: null, disabled: false}],
      celular: [{value: null, disabled: false}],
      direccion: [{value: null, disabled: false}],
      distrito: [{value: null, disabled: false}],
      referencia: [{value: null, disabled: false}],
      fechaentrega: [{value: new Date(), disabled: false}],
      lugarentrega: [{value: null, disabled: false}],
      prioridad_1: [{value: null, disabled: false}],
      prioridad_2: [{value: null, disabled: false}],
      estado: [{value: false, disabled: false}],
    });
  }

  onSetearDatos() {
    this.formularioVale.patchValue({
      codatencion: this.isModeloPaciente.codatencion,
      nombrepaciente: this.isModeloPaciente.nombrepaciente,
      telefono: this.isModeloPaciente.telefono,
      celular: this.isModeloPaciente.telefono,
      direccion: this.isModeloPaciente.direccion
    });
  }

  goValeDeliveryPorCodAtencion() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventaService.getListValeDeliveryPorCodAtencion(this.isAtencion)
    .pipe(
      map((resp: IValeDelivery[]) => {
        debugger;
        if(resp.length === 0) {
          this.onSetearDatos();
        } else {
          this.onSetearDatosValeDelivery(resp[0]);
        }
      })
    )
    .subscribe((resp) => {},
    (error) => {
      swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion,'error')
    });
  }

  onSetearDatosValeDelivery(resp: IValeDelivery) {
    this.formularioVale.patchValue({
      idvaledelivery: resp.idvaledelivery,
      codatencion: resp.codatencion,
      nombrepaciente: resp.nombrepaciente,
      telefono: resp.telefono,
      celular: resp.celular,
      direccion: resp.direccion,
      distrito: resp.distrito,
      referencia: resp.referencia,
      fechaentrega: new Date(resp.fechaentrega),
      lugarentrega: resp.lugarentrega,
      prioridad_1: resp.prioridad_1,
      prioridad_2: resp.prioridad_2,
      estado: resp.estado
    });
  }

  goAceptar() {
    const data = this.formularioVale.getRawValue();

    let body: IValeDelivery = {
      idvaledelivery: data.idvaledelivery,
      codatencion: data.codatencion,
      nombrepaciente: data.nombrepaciente,
      telefono: data.telefono,
      celular: data.celular,
      direccion: data.direccion,
      distrito: data.distrito,
      referencia: data.referencia,
      fechaentrega: data.fechaentrega,
      lugarentrega: data.lugarentrega,
      prioridad_1: data.prioridad_1,
      prioridad_2: data.prioridad_2,
      estado: data.estado,
    }

    if (body.idvaledelivery === 0) {
      this.onNuevo(body);
    } else {
      this.onModificar(body);
    }
    
  }

  onNuevo(data: IValeDelivery) {
    this.subscription$ = new Subscription();
    this.subscription$  = this.ventaService.setRegistrarValeDelivery( data )
    .subscribe((resp: any) =>  {

      this.formularioVale.patchValue({
        idvaledelivery: resp.idRegistro
      });

      swal.fire(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail, 'success');

    },
      (error) => {
        swal.fire(this.globalConstants.msgErrorSummary,error.error.resultadoDescripcion, 'error');
    });
  }

  onModificar(data: IValeDelivery) {
    this.subscription$ = new Subscription();
    this.subscription$  = this.ventaService.setModificarValeDelivery( data )
    .subscribe(() =>  {
      swal.fire(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail, 'success');

    },
      (error) => {
        swal.fire(this.globalConstants.msgErrorSummary,error.error.resultadoDescripcion, 'error');
    });
  }

  goCancelar() {
    this.eventCancelar.emit(false);
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
