import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { ConstantesGenerales } from '../../../../constants/Constantes-generales';

//services
import { SessionService } from '../../../../services/session.service';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { UtilService } from '../../../../services/util.service';
import { LanguageService } from '../../../../services/language.service';
import { TomaInventarioService } from '../../services/toma-inventario.service';
//Routing
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-toma-inventario',
  templateUrl: './panel-toma-inventario.component.html',
  styleUrls: ['./panel-toma-inventario.component.css']
})
export class PanelTomaInventarioComponent implements OnInit {
   // Titulo del componente
   titulo = 'Toma de invetario';
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;

  // Formulario de Busqueda
  formularioBusqueda: FormGroup;

  //Grilla
  listGrilla: any = [];
  columnas: any[];
  itemSeleccionado: any;
  opciones: any = [];
  idResaltar: number = 0;

   //modal toma inventario editar
   isActivateTomaInventarioEditar=  false;
   tituloModalTomaInventarioEditar:string;


  // Suscripcion [para realizar el unsuscription al cerrar el formulario]
  subscription$: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    public readonly mensajePrimeNgService: MensajePrimeNgService,
    private readonly utilService: UtilService,
    public readonly lenguageService: LanguageService,
    private readonly tomaInventarioService: TomaInventarioService,
    private readonly router: Router,
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
    
    this.router.navigate(['/main/modulo-ti//toma-inventario-crear']);
  }
  
  onToBuscar() {
    this.onListar();
  }

  onTableColumna(){

    this.columnas = [
      { header: 'Opciones' },
      { header: 'Codigo' },
      { header: 'Fecha. Registro'},
      { header: 'Usuario' },
      { header: 'Estado'},
      { header: 'Almacén'},
      { header: 'Nro Referencial'},
      { header: 'Observación'},
      { header: 'DocumentEntry'}
    ];

  }

  opcionesTabla() {
    
    this.opciones = [
      {
        label: 'Consultar y editar',
        icon: 'pi pi-eye',
        command: () => {
          this.ver();
        },
      }
    ];
  }

  ver() {

    this.isActivateTomaInventarioEditar = !this.isActivateTomaInventarioEditar;
    const { idTomaInventario } = this.itemSeleccionado;
    this.tituloModalTomaInventarioEditar = `Recuento de inventario - Id ${idTomaInventario}`;
    
  }

  itemElegido(datosDelSeleccionado) {
    this.itemSeleccionado = datosDelSeleccionado;

  }
  
  onListar() {

    this.idResaltar = (this.sessionStorage.getItemDecrypt('idtomainventario'))? parseInt(this.sessionStorage.getItemDecrypt('idtomainventario')):0;

     const formBody = this.formularioBusqueda.value;
     const fechaIn = this.utilService.fecha_AAAAMMDD(formBody.fechaInicio);
     const fechaFin = this.utilService.fecha_AAAAMMDD(formBody.fechaFin);

    this.tomaInventarioService.getGetParam(fechaIn, fechaFin)
    .subscribe(resp => {
          this.listGrilla = resp;
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error.error);
      }
    );

  }

  activarTomaInventarioGuardar() {
    this.isActivateTomaInventarioEditar = !this.isActivateTomaInventarioEditar;
  }

  activarEditar() {

    this.isActivateTomaInventarioEditar = !this.isActivateTomaInventarioEditar;
    if(this.isActivateTomaInventarioEditar==false) this.onListar();
    
  }

}