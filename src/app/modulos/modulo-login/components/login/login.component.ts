import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginModel } from '../../models/login.model';
import { LoginService } from '../../services/login.service';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { UserContextService } from '../../../../services/user-context.service';
import { SessionService } from '../../../../services/session.service';
import { estadoInternetService } from '../../../modulo-estado-internet/estadoInternet.service';
import { CifrarDataService } from '../../../../services/cifrar-data.service';
import { VariablesGlobales } from '../../../../interface/variables-globales';
import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { VentaCompartidoService } from '../../../modulo-compartido/Ventas/services/venta-compartido.service';
import { ISeriePorMaquina } from '../../../modulo-compartido/Ventas/interfaces/serie-por-maquina.interface';
import { SelectItem } from 'primeng';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  modeloLogin: LoginModel;
  listSeriePorMaquina: SelectItem[];
  formularioLogin: FormGroup;

  subscripcionInternet: Subscription;
  subscripcion: Subscription;

  displayValida: boolean;

  displayAutenticacion: boolean;

  constructor(private readonly loginService: LoginService,
              private readonly router: Router,
              public readonly mensajePrimeNgService: MensajePrimeNgService,
              private readonly userContextService: UserContextService,
              private readonly sessionService: SessionService,
              private readonly fb: FormBuilder,
              private readonly servicioInternet: estadoInternetService,
              private readonly ventaCompartidoService: VentaCompartidoService,
              private readonly cifrarDataService: CifrarDataService,
              private readonly menuDinamicoService: MenuDinamicoService) { }

  ngOnInit(): void {
    this.modeloLogin = new LoginModel();
    this.iniciarObservableEstadoInternet();
    this.instanciarFormulario();
    // this.onSeriePorEstacion();
  }

  iniciarObservableEstadoInternet() {
    this.subscripcionInternet = this.servicioInternet._ESTADO_INTERNET$.subscribe(
      estado => {
        VariablesGlobales.ESTADO_INTERNET = estado;
      }
    );
  }

  instanciarFormulario() {
    this.formularioLogin = this.fb.group({
      // estacion: [null],
      login: new FormControl('', [
        Validators.minLength(4),
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.minLength(6),
        Validators.required
      ])
    });
  }

  // onSeriePorEstacion() {
  //   this.subscripcion = new Subscription();
  //   this.subscripcion = this.ventaCompartidoService.getListSeriePorMaquina()
  //   .subscribe((res: ISeriePorMaquina[]) => {
  //       this.listSeriePorMaquina = [];
  //       res.forEach(data => {
  //         this.listSeriePorMaquina.push({label:data.nombremaquina, value:data});
  //       });
  //       this.onObtieneEstacionLocal();
  //     },
  //     (err) => {
  //       this.mensajePrimeNgService.onToErrorMsg(null, err.error);
  //     }
  //   );
  // }

  // onObtieneEstacionLocal() {
  //   if (this.sessionService.getItem('estacion')) {
  //     let estacion = this.sessionService.getItem('estacion');
  //     this.formularioLogin.controls.estacion.setValue(estacion);
  //   }
  //   if (this.sessionService.getItem('usuario')) {
  //     let usuarioLocal = this.sessionService.getItemDecrypt('usuario');
  //     this.formularioLogin.controls.login.setValue(usuarioLocal);
  //   }
  // }

  onClickLogin()
  {
    this.modeloLogin.usuario = this.formularioLogin.value.login;
    this.modeloLogin.clave = this.cifrarDataService.encrypt(this.formularioLogin.value.password);
    this.displayAutenticacion = true;
    this.onLoginOnline();
  }

  onLoginOnline () {
    this.subscripcion = new Subscription();
    this.subscripcion = this.loginService.autentica(this.modeloLogin)
    .subscribe((res: any) => {
      localStorage.setItem('token', res.token);
        this.onObtienePermisosPorUsuario();
      },
      (err) => {
        this.displayAutenticacion = false;
        this.mensajePrimeNgService.onToErrorMsg('Login', err.error);
      }
    );
  }

  onObtienePermisosPorUsuario() {
    this.subscripcion = new Subscription();
    this.subscripcion = this.loginService.obtienePermisosPorUsuario(this.modeloLogin)
    .subscribe((res: any) => {
        this.onEncriptaData(res);
        this.onGeneraMenu();
        this.displayAutenticacion = false;
      },
      (err) => {
        this.displayAutenticacion = false;
        this.mensajePrimeNgService.onToErrorMsg('Login', err.error);
      }
    );
  }

  onEncriptaData(res: any) {
    this.sessionService.setItem('menu', res.listaAccesoMenu);
    this.sessionService.setItemEncrypt('idUsuario', res.idUsuario);
    this.sessionService.setItemEncrypt('idEmpleado', res.idPersona);
    this.sessionService.setItemEncrypt('idPerfil', res.idPerfil);
    this.sessionService.setItemEncrypt('imagen', res.imagen);
    this.sessionService.setItemEncrypt('nombre', res.nombre);
    this.sessionService.setItemEncrypt('usuario', res.usuario);
    this.sessionService.setItemEncrypt('email', res.email);
    this.sessionService.setItemEncrypt('codCentroCosto', res.codCentroCosto);
    this.sessionService.setItemEncrypt('desCentroCosto', res.desCentroCosto);
    this.sessionService.setItem('pass', this.modeloLogin.clave);
    this.userContextService.setUser(res.usuario);
    
    // Guarda la estacion de trabajo
    // this.sessionService.setItem('estacion', this.formularioLogin.value.estacion);

    this.onFinalizaProceso();
  }

  onGeneraMenu() {
    this.menuDinamicoService.setArmaMenuDimamico();
  }

  onFinalizaProceso() {
    this.router.navigate(['/main/csfe/bienvenido']);
  }

  onRecuperarContrasena() {
    this.displayValida = true;

    if (this.formularioLogin.value.login === '') {
      this.mensajePrimeNgService.onToInfoMsg(null, 'Ingresar Usuario');
      this.displayValida = false;
      return;
    }
    this.modeloLogin.usuario = this.formularioLogin.value.login;
    this.subscripcion = new Subscription();
    this.subscripcion = this.loginService.RecuperarPassword(this.modeloLogin)
    .subscribe((res: any) => {
      this.displayValida = false;
      this.mensajePrimeNgService.onToExitoMsg('Mensaje de Éxito : ', 'Se envio email con su nueva contraseña...!!!');
      },
      (err) => {
        this.displayValida = false;
        this.mensajePrimeNgService.onToErrorMsg('Login', err.error);
      }
    );
  }

  ngOnDestroy() {
    this.subscripcionInternet.unsubscribe();
    if (this.subscripcion) {
      this.subscripcion.unsubscribe();
    }
  }
}
