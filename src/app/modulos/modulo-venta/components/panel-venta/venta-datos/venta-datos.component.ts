import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IVentaCabeceraDatos } from '../../../interface/venta.interface';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { LanguageService } from '../../../../../services/language.service';

@Component({
  selector: 'app-venta-datos',
  templateUrl: './venta-datos.component.html',
  styleUrls: ['./venta-datos.component.css']
})
export class VentaDatosComponent implements OnInit {
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm;
  // Formulario
  formularioCabecera: FormGroup;
  @Input() modeloItem: IVentaCabeceraDatos;
  @Input() isDevolucion: boolean;

  isCodTipoCliente: string;
  isCodPedido: string;

  constructor(private readonly fb: FormBuilder,
              public lenguageService: LanguageService) { }

  ngOnInit(): void {
    this.buildForm();
    this.buildFormSetValue();

    if (this.isDevolucion) {
      this.isCodTipoCliente = '01';
      this.isCodPedido = '';
    } else {
      this.isCodTipoCliente = this.modeloItem.codtipocliente;
      this.isCodPedido = this.modeloItem.codpedido;
    }
  }

  private buildForm() {
    this.formularioCabecera = this.fb.group({
      codTipoCliente: [{value: null, disabled: true}],
      nombreTipoCliente: [{value: null, disabled: true}],
      codAtencion: [{value: null, disabled: true}],
      codClienteExterno: [{value: null, disabled: true}],
      codPersonal: [{value: null, disabled: true}],
      codMedico: [{value: null, disabled: true}],
      medicoAtencion: [{value: null, disabled: true}],
      paciente: [{value: null, disabled: true}],
      nombreClientePaciente: [{value: null, disabled: true}],
      direccion: [{value: null, disabled: true}],
      codAseguradora: [{value: null, disabled: true}],
      aseguradora: [{value: null, disabled: true}],
      plan: [{value: null, disabled: true}],
      descuentoPlan: [{value: null, disabled: true}],
      coaseguro: [{value: null, disabled: true}],
      titular: [{value: null, disabled: true}],
      poliza: [{value: null, disabled: true}],
      planPoliza: [{value: null, disabled: true}],
      codContratante: [{value: null, disabled: true}],
      contratante: [{value: null, disabled: true}],
      cama: [{value: null, disabled: true}],
      telefono: [{value: null, disabled: true}],
      codEmpresa: [{value: null, disabled: true}],
      empresa: [{value: null, disabled: true}],
      deducible: [{value: null, disabled: true}],
      nombrediagnostico: [{value: null, disabled: true}],
      nombretipdocidentidad: [{value: null, disabled: true}],
      docidentidad: [{value: null, disabled: true}],
      numeroplanilla: [{value: null, disabled: true}]
    });
  }
  
  private buildFormSetValue() {
    if (this.modeloItem) {
      this.formularioCabecera.controls.codTipoCliente.setValue(this.modeloItem.codtipocliente);
      this.formularioCabecera.controls.nombreTipoCliente.setValue(this.modeloItem.nombretipocliente);
      this.formularioCabecera.controls.codAtencion.setValue(this.modeloItem.codatencion);
      this.formularioCabecera.controls.codClienteExterno.setValue(this.modeloItem.codcliente);
      this.formularioCabecera.controls.codPersonal.setValue(this.modeloItem.codcliente);
      this.formularioCabecera.controls.codMedico.setValue(this.modeloItem.codcliente);
      this.formularioCabecera.controls.paciente.setValue(this.modeloItem.codpaciente);
      this.formularioCabecera.controls.medicoAtencion.setValue(this.modeloItem.nombremedico);
      this.formularioCabecera.controls.nombreClientePaciente.setValue(this.modeloItem.nombre);
      this.formularioCabecera.controls.direccion.setValue(this.modeloItem.dircliente);
      this.formularioCabecera.controls.codAseguradora.setValue(this.modeloItem.codaseguradora);
      this.formularioCabecera.controls.aseguradora.setValue(this.modeloItem.nombreaseguradora);
      this.formularioCabecera.controls.plan.setValue(this.modeloItem.codplan);
      this.formularioCabecera.controls.descuentoPlan.setValue(this.modeloItem.porcentajedctoplan);
      this.formularioCabecera.controls.coaseguro.setValue(this.modeloItem.porcentajecoaseguro);
      this.formularioCabecera.controls.poliza.setValue(this.modeloItem.codpoliza);
      this.formularioCabecera.controls.planPoliza.setValue(this.modeloItem.planpoliza);
      this.formularioCabecera.controls.codContratante.setValue(this.modeloItem.codcia);
      this.formularioCabecera.controls.contratante.setValue(this.modeloItem.nombrecia);
      this.formularioCabecera.controls.cama.setValue(this.modeloItem.cama);
      this.formularioCabecera.controls.codEmpresa.setValue(this.modeloItem.codempresa);
      this.formularioCabecera.controls.deducible.setValue(this.modeloItem.deducible);
      this.formularioCabecera.controls.nombrediagnostico.setValue(this.modeloItem.nombrediagnostico);
      this.formularioCabecera.controls.nombretipdocidentidad.setValue(this.modeloItem.nombretipdocidentidad);
      this.formularioCabecera.controls.docidentidad.setValue(this.modeloItem.docidentidad);
      this.formularioCabecera.controls.numeroplanilla.setValue(this.modeloItem.numeroplanilla);
    }
  }
}
