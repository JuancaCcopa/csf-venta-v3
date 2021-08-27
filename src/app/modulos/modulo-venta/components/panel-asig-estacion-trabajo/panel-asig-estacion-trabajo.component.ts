import { Component, OnInit } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { FunctionDblocalService } from '../../../modulo-base-datos-local/function-dblocal.service';
import { ConstantsTablasIDB } from '../../../modulo-base-datos-local/constants/constants-tablas-indexdb';
import swal from'sweetalert2';

@Component({
  selector: 'app-panel-asig-estacion-trabajo',
  templateUrl: './panel-asig-estacion-trabajo.component.html',
  styleUrls: ['./panel-asig-estacion-trabajo.component.css']
})
export class PanelAsigEstacionTrabajoComponent implements OnInit {

  // Titulo del componente
  titulo = 'Asignación de Estación de Trabajo';

  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  maestroForm: FormGroup;

  subscription$: Subscription;

  isUpdateData: boolean = false;

  constructor(private fb: FormBuilder,
              private breadcrumbService: BreadcrumbService,
              private functionDblocalService: FunctionDblocalService) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Venta' }
                ]);
              }

  ngOnInit() {
    this.isUpdateData = false;
    this.buildForm();
    this.onObtieneEstacionTrabajo();
  }

  buildForm() {
    this.maestroForm = this.fb.group(
      {
        'nombreequipo' : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(100), Validators.minLength(5)]))
      }
    );
  }

  onObtieneEstacionTrabajo() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.functionDblocalService.getByKey(ConstantsTablasIDB._TABLA_ESTACION_TRABAJO, 1)
    .subscribe((data: any) =>  {
      if (data !== undefined) {
        this.maestroForm.controls.nombreequipo.setValue(data.nombreequipo);
        this.isUpdateData = true;
      }
    },
      (error) => {
        swal.fire(this.globalConstants.msgInfoSummary, 'Error al obtener la Estación de Trabajo','error');
    });
  }

  onClickSave() {
    
    
    this.subscription$ = new Subscription();

    let observable = new Observable<any>();

    if (this.isUpdateData) {
      let body = {id: 1, nombreequipo: this.maestroForm.controls.nombreequipo.value}
      observable = this.functionDblocalService.setUpdate(ConstantsTablasIDB._TABLA_ESTACION_TRABAJO, body)
    } else {
      let body = {nombreequipo: this.maestroForm.controls.nombreequipo.value}
      observable = this.functionDblocalService.setAdd(ConstantsTablasIDB._TABLA_ESTACION_TRABAJO,body)
    }

    this.subscription$ = observable
    .subscribe(() =>  {
      swal.fire(this.globalConstants.msgInfoSummary, this.globalConstants.msgExitoDetail,'success');
    },
      (error) => {
        console.log('error', error);
        swal.fire(this.globalConstants.msgInfoSummary, 'Error al grabar Estación de Trabajo','error');
    });
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
