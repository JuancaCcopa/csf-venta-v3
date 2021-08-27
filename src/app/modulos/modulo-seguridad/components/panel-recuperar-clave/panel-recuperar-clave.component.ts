import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { SessionService } from '../../../../services/session.service';
import { CifrarDataService } from '../../../../services/cifrar-data.service';
import { SeguridadService } from '../../services/seguridad.service';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-recuperar-clave',
  templateUrl: './panel-recuperar-clave.component.html',
  styleUrls: ['./panel-recuperar-clave.component.css']
})
export class PanelRecuperarClaveComponent implements OnInit {

  // Titulo del componente
  titulo = 'Cambiar Contraseña';

  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  maestroForm: FormGroup;

  modelo: UsuarioModel = new UsuarioModel();

  subscription: Subscription;

  constructor(private fb: FormBuilder,
              public mensajePrimeNgService: MensajePrimeNgService,
              private sessionService: SessionService,
              private cifrarDataService: CifrarDataService,
              private seguridadService: SeguridadService,
              private breadcrumbService: BreadcrumbService,
              private router: Router) {
      this.breadcrumbService.setItems([
          { label: 'Modulo Seguridad' },
          { label: 'Cambiar Contraseña', routerLink: ['module-se/panel-recuperar-clave'] }
      ]);
    }

    ngOnInit() {
      this.maestroForm = this.fb.group(
        {
          password : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(6)])),
          passwordNueva : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(6)])),
          passwordNuevaRepita : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(6)])),
        }
      );
    }
  
    onClickSave() {

      var passwordUsuario = this.sessionService.getItem('pass')
      var passwordUsuarioInput = this.cifrarDataService.encrypt(this.maestroForm.value.password);
      var passwordNuevo = this.cifrarDataService.encrypt(this.maestroForm.value.passwordNueva);

      if (passwordUsuario !== passwordUsuarioInput) {
        this.mensajePrimeNgService.onToInfoMsg(null, 'Contraseña Actual no coincide con la clave ingresada!!!');
        return;
      }

      if (this.maestroForm.value.passwordNueva !== this.maestroForm.value.passwordNuevaRepita) {
        this.mensajePrimeNgService.onToInfoMsg(null, 'Contraseña Nueva no son iguales!!!');
        return;
      }
      this.modelo.claveOrigen = passwordNuevo;
      this.subscription = new Subscription();
      this.subscription = this.seguridadService.setUpdatePasswordUsuario(this.modelo)
      .subscribe(() =>  {
        this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
        this.router.navigate(['/login']);
        },
        (error) => {
          this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
      });
    }
  
    ngOnDestroy() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }

}
