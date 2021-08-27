import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
// const
import { ConstantesGenerales } from '../../../../constants/Constantes-generales';
//services
import { ConfirmationService } from 'primeng/api';
import { SessionService } from '../../../../services/session.service';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { UtilService } from '../../../../services/util.service';
import { LanguageService } from '../../../../services/language.service';
import { ConsolidadoRequerimientoService  } from '../../services/consolidado-requerimiento.service';
//Interface
import { IMensajeResultadoApi } from '../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';
//Routing
import { Router } from '@angular/router';


@Component({
  selector: 'app-panel-consolidado-requerimiento',
  templateUrl: './panel-consolidado-requerimiento.component.html',
  styleUrls: ['./panel-consolidado-requerimiento.component.css']
})
export class PanelConsolidadoRequerimientoComponent implements OnInit {
   // Titulo del componente
   titulo = 'Consolidado de Requerimiento';
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;
  // Formulario de Busqueda
  formularioBusqueda: FormGroup;
  loading = true;
  
  //Grilla
  listGrilla: any = [];
  columnas: any[];
  itemSeleccionado: any;
  opciones: any = [];
  idConsolidadoResaltar: number = 0;
 
  //modal ver
  isVerModal = false;
  tituloModalVer: any;

  // Suscripcion [para realizar el unsuscription al cerrar el formulario]
  subscription$: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly confirmationService: ConfirmationService,
    public readonly mensajePrimeNgService: MensajePrimeNgService,
    private readonly utilService: UtilService,
    public readonly lenguageService: LanguageService,
    private readonly consolidadoRequerimientoService: ConsolidadoRequerimientoService,
    private readonly sessionStorage: SessionService
  ) { }

  ngOnInit() {
    this.onbuildForm();
    this.onTableColumna();
    this.opcionesTabla();
    this.onListar();

  }

  private onbuildForm() {
    this.formularioBusqueda = this.fb.group({
      fechaInicio: new Date(),
      fechaFin: new Date(),
    });
  }

  onToCreate(){
    this.router.navigate(['/main/modulo-cr/consolidado-requerimiento-crear']);
  }
  
  onToBuscar() {
    this.onListar();
  }

  onTableColumna(){

    this.columnas = [
      { header: 'Opciones' },
      { header: 'ID Consolidado RQ' },
      { header: 'FecRegistro' },
      { header: 'Responsable' },
      { header: 'Almacen' },
      { header: 'Comentario' },
      { header: 'Estado' }
    ];
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
        label: 'Editar',
        icon: 'pi pi-pencil',
        command: () => {
          
          const { idConsolidado } = this.itemSeleccionado;
          this.router.navigate(['/main/modulo-cr/editar',idConsolidado]);
        },
      },
      {
        label: 'Anular',
        icon: 'pi pi-trash',
        command: () => {
          debugger;
            console.log("anular");
            this.anular();
        },
      },
      {
        label: 'Enviar SAP',
        icon: 'pi pi-list',
        command: () => {
            this.enviarSAP();
        },
      },
    ];
  }

  ver() {
    this.isVerModal = !this.isVerModal;
    const { idConsolidado } = this.itemSeleccionado;
    this.tituloModalVer = `Consolidado Ver - Id ${idConsolidado}`;
  }

  itemElegido(datosDelSeleccionado) {
    this.itemSeleccionado = datosDelSeleccionado;
  }
  //
  onListar() {
    
    this.idConsolidadoResaltar = (this.sessionStorage.getItemDecrypt('idconsolidado'))? parseInt(this.sessionStorage.getItemDecrypt('idconsolidado')):0;

    const formBody = this.formularioBusqueda.value;
    const fechaIn = this.utilService.fecha_AAAAMMDD(formBody.fechaInicio);
    const fechaFin = this.utilService.fecha_AAAAMMDD(formBody.fechaFin);

    this.subscription$ = new Subscription();

    this.subscription$ = this.consolidadoRequerimientoService.getGetParamPorFiltro(fechaIn, fechaFin)
    .subscribe(resp => {
      if (resp) {
          this.listGrilla = resp;
        }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error.error);
      }
    );
  }

  anular(){
    
    this.confirmationService.confirm({
      message: `Desea anular el consolidado con el Id ${this.itemSeleccionado.idConsolidado} ?`,
      header: this.globalConstants.titleAnular,
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        const reqAnular: any = {
          idConsolidado: this.itemSeleccionado.idConsolidado,
          RegUpdateIdUsuario: 1
        };
        this.consolidadoRequerimientoService.consolidadoAnular(reqAnular).subscribe(
          (resp: IMensajeResultadoApi) => {
            this.mensajePrimeNgService.onToExitoMsg(null, resp.resultadoDescripcion);
            this.onListar();
          },
          (error) => {
            this.mensajePrimeNgService.onToErrorMsg(undefined, error.error);
          }
        );
      },
    });

  }

  enviarSAP(){

    if (this.itemSeleccionado.idConsolidadoEstado !== 1) {
      this.mensajePrimeNgService.onToInfoMsg(null, `Estado de requerimiento incorrecto ${this.itemSeleccionado.desConsolidadoEstado}`);
      return;
    }

    if (this.itemSeleccionado.idConsolidadoEstado === 4) {
      this.mensajePrimeNgService.onToInfoMsg(null, `Consolidado ya se encuentra PROCESADO EN SAP ${this.itemSeleccionado.desConsolidadoEstado}`);
      return;
    }

    this.confirmationService.confirm({
      message: `Seguro de enviar a SAP el consolidado ${this.itemSeleccionado.idConsolidado} ?, una vez enviado no se podrá realizar ninguna modificación`,
      header: this.globalConstants.titleAnular,
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        const reqsap: any = {
          idConsolidado: this.itemSeleccionado.idConsolidado,
          RegUpdateIdUsuario: 1
        };
        this.consolidadoRequerimientoService.consolidadoSap(reqsap).subscribe(
          (resp: IMensajeResultadoApi) => {
            this.mensajePrimeNgService.onToExitoMsg(null, resp.resultadoDescripcion);
            this.onListar();
          },
          (error) => {
            this.mensajePrimeNgService.onToErrorMsg(undefined, error.error);
          }
        );
      },
    });

  }

}