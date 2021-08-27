import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PersonaModel } from '../../../models/persona.model';
import { Subscription } from 'rxjs';
import { SeguridadService } from '../../../services/seguridad.service';
import { MensajePrimeNgService } from '../../../../../services/mensaje-prime-ng.service';
import { LayoutComponent } from '../../../../../layout/layout.component';
import { CifrarDataService } from '../../../../../services/cifrar-data.service';
import { UserContextService } from '../../../../../services/user-context.service';

@Component({
  selector: 'app-persona-ver',
  templateUrl: './persona-ver.component.html',
  styleUrls: ['./persona-ver.component.css']
})
export class PersonaVerComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Usuario';

  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  modeloForm: FormGroup;

  modelo: PersonaModel = new PersonaModel();

  idPersona: number;
  // Imagen
  sellersPermitString: string;
  sellersPermitFile;
  subscription: Subscription;

  constructor(private fb: FormBuilder,
              private seguridadService: SeguridadService,
              public mensajePrimeNgService: MensajePrimeNgService,
              public app: LayoutComponent,
              private readonly cifrarDataService: CifrarDataService,
              private readonly userContextService: UserContextService) {}

  ngOnInit() {
    this.idPersona = this.userContextService.getIdEmpleado();
    this.getToObtienePersonaPorId();

    this.modeloForm = this.fb.group(
      {
        'apellidoPaterno' : new FormControl('', Validators.compose(
          [Validators.required, Validators.maxLength(50), Validators.minLength(2)])),
        'apellidoMaterno' : new FormControl('', Validators.compose(
          [Validators.required, Validators.maxLength(50), Validators.minLength(2)])),
        'nombre' : new FormControl('', Validators.compose(
          [Validators.required, Validators.maxLength(50), Validators.minLength(2)])),
        'numeroDocumento' : new FormControl('', Validators.compose([Validators.required])),
        'numeroTelefono' : new FormControl(''),
        'flgEstado' : new FormControl(true, Validators.compose([Validators.required])),
        'codCentroCosto' : new FormControl({value: '', disabled: true}, Validators.compose([Validators.required])),
        'desCentroCosto' : new FormControl('', Validators.compose([Validators.required])),
        'usuario' : new FormControl({value: '', disabled: true}, Validators.compose(
          [Validators.required, Validators.maxLength(20), Validators.minLength(2)])),
        'password' : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(6)])),
        'email' : new FormControl('', Validators.compose([Validators.required, Validators.email])),
        'perfil' : new FormControl('', Validators.compose([Validators.required])),
        'foto' : new FormControl('')
      }
    );
  }

  getToObtienePersonaPorId() {
    this.subscription = new Subscription();
    this.subscription = this.seguridadService.getPersonaPorId(this.idPersona)
    .subscribe(data => {
      this.modelo = data;
      this.modeloForm.controls['apellidoPaterno'].setValue(this.modelo.apellidoPaterno);
      this.modeloForm.controls['apellidoMaterno'].setValue(this.modelo.apellidoMaterno);
      this.modeloForm.controls['nombre'].setValue(this.modelo.nombre);
      this.modeloForm.controls['numeroDocumento'].setValue(this.modelo.nroDocumento);
      this.modeloForm.controls['numeroTelefono'].setValue(this.modelo.nroTelefono);
      this.modeloForm.controls['flgEstado'].setValue(this.modelo.flgActivo);
      this.modeloForm.controls['codCentroCosto'].setValue(this.modelo.codCentroCosto);
      this.modeloForm.controls['desCentroCosto'].setValue(this.modelo.desCentroCosto);
      this.modeloForm.controls['usuario'].setValue(this.modelo.entidadUsuario.usuario);
      this.modeloForm.controls['password'].setValue(this.cifrarDataService.decrypt(this.modelo.entidadUsuario.claveOrigen));
      this.modeloForm.controls['email'].setValue(this.modelo.entidadUsuario.email);
      this.modeloForm.controls['perfil'].setValue(this.modelo.entidadUsuario.descripcionPerfil)
      this.modeloForm.controls['foto'].setValue(this.modelo.entidadUsuario.imagen);
      this.sellersPermitString = this.modelo.entidadUsuario.imagen;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
