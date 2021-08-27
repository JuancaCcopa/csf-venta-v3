import { ConfirmationService } from 'primeng/api';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { map } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

// const
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';

//services
import { MensajePrimeNgService } from '../../../../../services/mensaje-prime-ng.service';
import { UtilService } from '../../../../../services/util.service';
import { LanguageService } from '../../../../../services/language.service';
import { PlanillaService } from '../../../services/planilla.service';
import swal from 'sweetalert2';

//Routing
import { Router } from '@angular/router';

@Component({
  selector: 'app-planilla-usuario',
  templateUrl: './planilla-usuario.component.html',
  styleUrls: ['./planilla-usuario.component.css']
})

export class PlanillaUsuarioComponent implements OnInit {

  @Input() isActivarUsuario
  @Output() itemSeleccionado = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  //formularioSuperiorLote: FormGroup; //jc

  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;

  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  // Formulario de Busqueda
  formularioBusquedaUsuario: FormGroup;
  //lista
  listaModelo: any[] = [];
  registroSeleccionado: any;

  //botton
  //seleccionUsuario = false;

  // Suscripcion [para realizar el unsuscription al cerrar el formulario]
  subscription$: Subscription;
  loading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    public readonly mensajePrimeNgService: MensajePrimeNgService,
    private readonly utilService: UtilService,
    public readonly lenguageService: LanguageService,
    private readonly planillaService: PlanillaService,
    private messageService: MessageService
  ) { }

  ngOnInit() {

    this.buildFormSuperior();
    this.onToBuscar();

  }
  private buildFormSuperior() {

    this.formularioBusquedaUsuario = this.fb.group({
      nombre: ''
    });

  }

  onToBuscar() {
    this.loading = true;
    var {
      nombre,
    } = this.formularioBusquedaUsuario.value;

    this.planillaService.getUsuarioPorFiltro(nombre, "X").subscribe(
      (resp: any) => {
        debugger
        console.log(resp)
        this.listaModelo = resp;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        swal.fire(this.globalConstants.msgErrorSummary, error.error, 'error')
      }
    );
  }

  clickAceptar() {

    this.itemSeleccionado.emit(this.registroSeleccionado);
    this.cancel.emit();

  }

  onKeypressEvent(model: any, event: any) {

    setTimeout(() => {
      if (model.cantidadEntregada > model.cantidad) {
        model.cantidadEntregada = model.cantidad;
        this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Mensaje', detail: 'La Cantidad debe ser menor o gual, que la cantidad entregada' });
        event.preventDefault();
      }

    }, 0);

  }

  clickCancelar() {

    this.isActivarUsuario = !this.isActivarUsuario;

  }


}