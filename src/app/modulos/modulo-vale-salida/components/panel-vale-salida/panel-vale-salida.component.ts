import { Component, OnInit } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { FormGroup, FormBuilder } from '@angular/forms';
//import { IValeSalidaLista, IValeSalidaAnular } from '../../models/vale-salida';
import { Subscription } from 'rxjs';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';

import { ValeSalidaService } from '../../services/vale-salida.service';

import { UtilService } from '../../../../services/util.service';
import { IMensajeResultadoApi } from '../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';
//services
import { SessionService } from '../../../../services/session.service';
import { LanguageService } from '../../../../services/language.service';
import { UserContextService } from '../../../../services/user-context.service';
import { ConstantesGenerales } from '../../../../constants/Constantes-generales';
//import { Console } from 'console';

@Component({
  selector: 'app-panel-vale-salida',
  templateUrl: './panel-vale-salida.component.html',
  styleUrls: ['./panel-vale-salida.component.css']
})
export class PanelValeSalidaComponent implements OnInit {
  // Titulo del componente
  titulo = 'Vale Salida';

  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  // Formulario de Busqueda
  formularioBusqueda: FormGroup;

  //Grilla
  listModelo: any = [];
  columnas: any[];
  idValeSalidaResaltar : number=0;
  // Opcion Editar
  //modelocloned: { [s: string]: any; } = {};
  opciones: any = [];
  // Opcion Eliminar
 
  // Suscripcion [para realizar el unsuscription al cerrar el formulario]
  subscription$: Subscription;
  isVerModalValeSalida = false;
  itemSeleccionado: any;
  tituloValeSalidaVer: any;
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;

  constructor(public readonly mensajePrimeNgService: MensajePrimeNgService,
              private readonly router: Router,
              private readonly fb: FormBuilder,
              private readonly confirmationService: ConfirmationService,
              private readonly breadcrumbService: BreadcrumbService,
              private readonly valeSalidaService: ValeSalidaService,//jc

              private readonly utilService: UtilService,
              private readonly sessionStorage: SessionService,
              public readonly lenguageService: LanguageService,
              private userContextService: UserContextService//jc
              ) {
                this.breadcrumbService.setItems([
                    { label: this.globalConstants.cModuloRequerimiento },
                    { label: 'Vale de Salida', routerLink: ['module-va/panel-vale-salida'] }
                ]);
              }

  ngOnInit() {
    this.columnas = [
      { header: 'Opciones' },
      { header: 'Id' },
      { header: 'Fec.Vale' },
      { header: 'Usuario' },
      { header: 'Almacen' },
      { header: 'Centro de Costo (Usuario)' },
      { header: 'Id RQ' },
      { header: 'Conform.Sap' },
      { header: 'Obs.Conform.Sap' },
      { header: 'Estado' }
    ];

    this.onbuildForm();
    this.opcionesTabla();
    debugger;
    this.onListar();

  }

  private onbuildForm() {
    this.formularioBusqueda = this.fb.group({
      fechaInicio: new Date(),
      fechaFin: new Date(),
    });
  }

  onToBuscar() {
    this.onListar();
  }

  onListar() {
    
    debugger;

    this.idValeSalidaResaltar = (this.sessionStorage.getItemDecrypt('idvalesalida'))? parseInt(this.sessionStorage.getItemDecrypt('idvalesalida')):0;

    const formBody = this.formularioBusqueda.value;

    const fechaIn = this.utilService.fecha_AAAAMMDD(formBody.fechaInicio);
    const fechaFin = this.utilService.fecha_AAAAMMDD(formBody.fechaFin);

    this.subscription$ = new Subscription();

    this.subscription$ = this.valeSalidaService.getValeSalidaPorFiltro(fechaIn, fechaFin)
    .subscribe(resp => {
      if (resp) {
          this.listModelo = resp;
          console.log('this.listModelo', this.listModelo);
        }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error.error);
      }
    );
  }

  onToCreate() {
    //this.router.navigate(['/main/modulo-va/registrar-vale-salida']);
    this.router.navigate(['/main/modulo-va/registrar-vale-salida'], {
      queryParams: {
        idUsuario: this.userContextService.getIdUsuario(),
        codCentroCosto: this.userContextService.getCodigoCentroCosto(),
        desCentroCosto: this.userContextService.getDescripcionCentroCosto(),
      },
    });
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  opcionesTabla() {
    this.opciones = [
      {
        label: 'Ver',
        icon: 'pi pi-eye',
        command: () => {
          this.ver();
        },
      },
      {
        label: 'Anular',
        icon: 'pi pi-trash',
        command: () => {
            console.log("anular");
            this.anular();
            
        },
      },
    ];
  }
 itemElegido(datosDelSeleccionado) {
    this.itemSeleccionado = datosDelSeleccionado;
  }
  ver() {
    this.isVerModalValeSalida = !this.isVerModalValeSalida;
    const { idValeSalida } = this.itemSeleccionado;
    this.tituloValeSalidaVer = `Vale Salida Ver - Id ${idValeSalida}`;
  }

  anular(){
    debugger;
    const { idValeSalida } = this.itemSeleccionado;
    this.subscription$ = new Subscription();
    //var IdUsuario=this.userContextService.getIdUsuario();

    var editar ={
      IdValeSalida: idValeSalida,
      RegUpdateIdUsuario :this.userContextService.getIdUsuario()
    }
    this.subscription$ = this.valeSalidaService.setValeSalidaAnular(editar)
    .subscribe(resp => {
      if (resp) {
          console.log(resp["resultadoDescripcion"]);
          this.mensajePrimeNgService.onToExitoMsg(null,resp["resultadoDescripcion"]);
          this.onListar();
        }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error.error);
      }
    );

  }


}
