import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { SelectItem } from 'primeng';
import { map, filter, mapTo } from 'rxjs/operators';//JC

//constantes
import { ConstantesGenerales } from '../../../../constants/Constantes-generales';
import { ConfirmationService } from 'primeng/api';
import { IMensajeResultadoApi } from '../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';

//services
import { SessionService } from '../../../../services/session.service';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { UtilService } from '../../../../services/util.service';
import { LanguageService } from '../../../../services/language.service';
import { AlmacenService } from '../../services/almacen.service';

import { SolicitudTrasladoService  } from '../../services/solicitud-traslado.service';
//Routing
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-solicitud-traslado',
  templateUrl: './panel-solicitud-traslado.component.html',
  styleUrls: ['./panel-solicitud-traslado.component.css']
})

export class PanelSolicitudTraslaComponent implements OnInit {
   // Titulo del componente
   titulo = 'Solicitud de Traslado - Interno';
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;

  // Formulario de Busqueda
  formularioBusqueda: FormGroup;
  loading = false;

  //variables
  inputAlmacen: string="";
  codAlmacenOrigen:string="";
  codAlmacenDestino:string="";

  //Grilla
  listGrilla: any = [];
  columnas: any[];
  itemSeleccionado: any;
  opciones: any = [];
  idResaltar: number = 0;

  // Select
  rowMotivo: SelectItem[];
  rowMotivoSelect: any;
  
  rowAlmacenOrigen: SelectItem[];
  selectedAlmacenOrigen: any;
  
  rowAlmacenDestino: SelectItem[];
  selectedAlmacenDestino: any;

  //modal ver
  isVerModal = false;
  tituloModalVer: any;


   //modal almacen
   isActivateBusquedaAlmacen: boolean = false;

  // Suscripcion [para realizar el unsuscription al cerrar el formulario]
  subscription$: Subscription;
  
  constructor(
    private readonly fb: FormBuilder,
    public readonly mensajePrimeNgService: MensajePrimeNgService,
    private readonly confirmationService: ConfirmationService,
    private readonly utilService: UtilService,
    public readonly lenguageService: LanguageService,
    private readonly solicitudTrasladoService: SolicitudTrasladoService,
    private readonly almacenService: AlmacenService,
    private readonly router: Router,
    private readonly sessionStorage: SessionService
  ) { }

  ngOnInit() {
    this.onbuildForm();
    this.onTableColumna();
    this.opcionesTabla();
    this.datosMotivos();
    this.datosAlmacen();
    
    this.onListar();
    
  }

  private onbuildForm() {
    this.formularioBusqueda = this.fb.group({
      fechaInicio: new Date(),
      fechaFin: new Date(),
      numsolicitud:'',
      comboMotivo:'',
      almacenOrigen:'',
      almacenDestino:''
    });
  }

  onToCreate(){

    this.router.navigate(['/main/modulo-st/solicitud-traslado-crear']);
    
  }
  
  onToBuscar() {
    this.onListar();
  }

  onTableColumna(){

    this.columnas = [
      { header: 'Opciones' },
      { header: 'Nro Solicitud' },
      { header: 'Socio de Negocio' },
      { header: 'Fecha Registro' },
      { header: 'Almacén Origen' },
      { header: 'Almacén Destino' },
      { header: 'Tipo Motivo' },
      { header: 'Responsable' },
      { header: 'Comentario' },
      { header: 'Estado Solicitud' }
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
        label: 'Anular',
        icon: 'pi pi-trash',
        command: () => {
            
            this.anular();
            
        },
      },
    ];
  }

  ver() {

    
    this.isVerModal = true;
    const { idSolicitudTraslado } = this.itemSeleccionado;
    this.tituloModalVer = `Solicitud de traslado Ver - Id: ${idSolicitudTraslado}`;
  }

  itemElegido(datosDelSeleccionado) {
    
    this.itemSeleccionado = datosDelSeleccionado;

    if(this.itemSeleccionado.idSolicitudTrasladoEstado==1) {
      this.opciones.find(x=>x.label=="Anular").visible=true;
      }
      else{
        this.opciones.find(x=>x.label=="Anular").visible=false;
      }

  }
  
  onListar() {

    this.idResaltar = (this.sessionStorage.getItemDecrypt('idsolicitudtraslado'))? parseInt(this.sessionStorage.getItemDecrypt('idsolicitudtraslado')):0;

    const formBody = this.formularioBusqueda.value;
    const fechaIn = this.utilService.fecha_AAAAMMDD(formBody.fechaInicio);
    const fechaFin = this.utilService.fecha_AAAAMMDD(formBody.fechaFin);

    const numsolicitud = formBody.numsolicitud;
    var comboMotivo = (formBody.comboMotivo==undefined)? '': formBody.comboMotivo.value;
    
    comboMotivo = (comboMotivo==undefined)? '':comboMotivo;
        
    this.loading = true;

    this.solicitudTrasladoService
      .getParam(fechaIn, fechaFin,numsolicitud,comboMotivo,this.codAlmacenOrigen,this.codAlmacenDestino)
      .pipe(map((resp) => (this.listGrilla = resp)))
      .subscribe(
        (resp) => {
          this.loading = false;
        },
        (error) => {
          //console.log(error);
          this.mensajePrimeNgService.onToErrorMsg(null, error)
        }
      );
  }


  datosMotivos() {

    this.rowMotivo=[];
    this.rowMotivoSelect={label: "- TODOS -", value: "" }
    this.rowMotivo.push(this.rowMotivoSelect);
    this.rowMotivo.push({"value":1,"label":"NORMAL"},{"value":2,"label":"URGENTE"});
       
  }

  datosAlmacen() {
    this.almacenService
      .getAlmacen()
      .pipe(
        map((resp) => {
          this.selectedAlmacenOrigen={label: "- TODOS -", value: "" }
          this.rowAlmacenOrigen=[this.selectedAlmacenOrigen];
          for (let item of resp) {
            this.rowAlmacenOrigen.push({ label: item.warehouseName, value: item.warehouseCode }); 
          }

          if(this.rowAlmacenOrigen.length>0) this.selectedAlmacenOrigen = this.rowAlmacenOrigen[0];

          this.rowAlmacenDestino=this.rowAlmacenOrigen;
          this.selectedAlmacenDestino = this.selectedAlmacenOrigen;

        })
      )
      .subscribe(
        (resp) => {
          //this.loading = false;
        },
        (error) => {
          console.log(error);
        }
      );
          
  }

  

  anular(){
    

    this.confirmationService.confirm({
      message: `Desea anular la solicitud de traslado con el Id ${this.itemSeleccionado.idSolicitudTraslado} ?`,
      header: this.globalConstants.titleAnular,
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        const reqAnular: any = {
          idSolicitudTraslado: this.itemSeleccionado.idSolicitudTraslado,
          reUpdateIdUsuario: 1
        };
        this.solicitudTrasladoService.setSolicitudTrasladoAnular(reqAnular).subscribe(
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

  almacenSeleccionado(event: any) {
   
    if(this.inputAlmacen=="origen"){
        this.codAlmacenOrigen = event.warehouseCode;
        this.formularioBusqueda.patchValue({
          almacenOrigen: event.warehouseCode+" "+event.warehouseName
        });
    }
      else{
          this.codAlmacenDestino = event.warehouseCode;
          this.formularioBusqueda.patchValue({
            almacenDestino: event.warehouseCode+" "+event.warehouseName
          });
      }
   
  }


  emptyInputAlmacen(input="") {

    if(input=="origen"){
      this.codAlmacenOrigen = "";
      this.formularioBusqueda.patchValue({
        almacenOrigen: ""
      });
  }
    else{
        this.codAlmacenDestino = "";
        this.formularioBusqueda.patchValue({
          almacenDestino: ""
        });
    }
    
  }

  activarModalAlmacen(input="") {
    
    this.inputAlmacen=input;
    this.isActivateBusquedaAlmacen = !this.isActivateBusquedaAlmacen;
  }

}