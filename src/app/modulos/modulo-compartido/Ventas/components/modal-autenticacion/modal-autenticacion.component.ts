import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { LoginService } from '../../../../modulo-login/services/login.service';
import { CifrarDataService } from '../../../../../services/cifrar-data.service';
import { MessageService } from 'primeng/api';
import { IAutenticarRequest, IAutenticarResponse } from '../../interfaces/autenticar.interface';
import swal from'sweetalert2';

@Component({
  selector: 'app-modal-autenticacion',
  templateUrl: './modal-autenticacion.component.html',
  styleUrls: ['./modal-autenticacion.component.css']
})
export class ModalAutenticacionComponent implements OnInit, OnDestroy {
  // Variables globales
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  @Input() isAnular: boolean;
  @Output() eventoAceptar= new EventEmitter<IAutenticarResponse>();
  @Output() eventoCancelar = new EventEmitter<boolean>();

  formularioAutenticacion: FormGroup;

  subscription$: Subscription;
  constructor(private readonly fb: FormBuilder,
              private loginService: LoginService,
              private readonly cifrarDataService: CifrarDataService,
              public readonly messageService: MessageService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.formularioAutenticacion = this.fb.group({
      usuario: new FormControl('', Validators.compose([Validators.required])),
      contrasena: new FormControl('', Validators.compose([Validators.required])),
      motivo:  new FormControl('')
    });
  }

  goAutenticar() {
    const formBody = this.formularioAutenticacion.value;

    let body: IAutenticarRequest = {usuario: formBody.usuario, clave: this.cifrarDataService.encrypt(formBody.contrasena)}

    this.subscription$ = new Subscription();
    this.subscription$ = this.loginService.autenticaUsuario(body)
    .subscribe((data: boolean) => {
      if (data) {
        let bodyAceptar: IAutenticarResponse = {usuario: formBody.usuario, valido: true, observacion: formBody.motivo}
        this.eventoAceptar.emit(bodyAceptar);
      }
    },
    (error) => {
      swal.fire(this.globalConstants.msgInfoSummary,error.error.resultadoDescripcion,'error')
      this.eventoCancelar.emit(false);
    });
  }

  goCancelar() {
    this.formularioAutenticacion.reset();
    this.eventoCancelar.emit(false);
  }
  
  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
