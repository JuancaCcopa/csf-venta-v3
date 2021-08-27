import { Component,Input,Output,EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { SelectItem } from 'primeng';
import { map } from 'rxjs/operators';//JC
// const
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';

//services
import { MensajePrimeNgService } from '../../../../../services/mensaje-prime-ng.service';
import { UtilService } from '../../../../../services/util.service';
import { LanguageService } from '../../../../../services/language.service';
import { ConsolidadoRequerimientoService  } from '../../../services/consolidado-requerimiento.service';

//Routing
import { Router } from '@angular/router';


@Component({
  selector: 'app-requerimiento-listado',
  templateUrl: './requerimiento-listado.component.html',
  styleUrls: ['./requerimiento-listado.component.css']
})
export class RequerimientoListadoComponent implements OnInit {
  @Input() isDisplayBusquedaArticulo;
  @Output() articuloSeleccionado = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;

   // Titulo del componente
   titulo = 'Listado de Requerimiento';
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  // Formulario de Busqueda
  formularioBusqueda: FormGroup;

  //Grilla
  listGrilla: any = [];
  columnas: any[];
  itemSeleccionado: any;
  opciones: any = [];
 
  // Select
  rowMotivo: SelectItem[];
  rowMotivoSelect: any;

  rowAgrupado: SelectItem[];
  rowAgrupadoSelect: any;

  //modal ver
  isVerModalDetalle  = false;
  tituloDetalle: string="";
  
  motivoSeleccionadoEnCombo: any=[];

  //botton
  //seleccionArticulo=true;
  seleccionArticulo:any;

  // Suscripcion [para realizar el unsuscription al cerrar el formulario]
  subscription$: Subscription;
  loading = true;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    public readonly mensajePrimeNgService: MensajePrimeNgService,
    private readonly utilService: UtilService,
    public readonly lenguageService: LanguageService,
    private readonly consolidadoRequerimientoService: ConsolidadoRequerimientoService,
  ) { }

  ngOnInit() {
    this.onbuildForm();
    this.onTableColumna();
    this.opcionesTabla();
    
    this.datosMotivos();
    this.datosAgrupados();
    this.onListar();

  }

  private onbuildForm() {
    this.formularioBusqueda = this.fb.group({
      fechaInicio: new Date(),
      fechaFin: new Date(),
      comboMotivo:'',
      comboAgrupar:''
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
      { header: 'Nro Requerimiento' },
      { header: 'Fec Registro' },
      { header: 'Centro de Costo'},
      { header: 'Responsable' },      
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
      }
    ];
  }

  ver() {
   
    this.isVerModalDetalle = !this.isVerModalDetalle;
    this.itemSeleccionado.origen="PORTAL";
    const { idRequerimiento } = this.itemSeleccionado;
    this.tituloDetalle = `Requerimiento - Id: ${idRequerimiento}`;
  }

  itemElegido(datosDelSeleccionado) {
    this.itemSeleccionado = datosDelSeleccionado;
  }
  //
  onListar() {

    const formBody = this.formularioBusqueda.value;
    const fechaIn = this.utilService.fecha_AAAAMMDD(formBody.fechaInicio);
    const fechaFin = this.utilService.fecha_AAAAMMDD(formBody.fechaFin);
    var idmotivo = (formBody.comboMotivo.value==undefined)? '':formBody.comboMotivo.value;

    this.subscription$ = new Subscription();

    this.subscription$ = this.consolidadoRequerimientoService.getGetParamFecMotivo(fechaIn, fechaFin,idmotivo)
    .subscribe(resp => {
      if (resp) {
        debugger
        console.log(resp);
          this.listGrilla = resp;
          if(this.listGrilla.length>0){
            //this.seleccionArticulo=this.listGrilla[0];
          }
        }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error.error);
      }
    );
  }


  cambioEnComboMotivo(event: any) {
    this.motivoSeleccionadoEnCombo = event;
  }

  datosMotivos() {
    this.consolidadoRequerimientoService
      .getMotivoRequerimiento()
      .pipe(
        map((resp) => {
          this.rowMotivoSelect={label: "TODOS LOS REQUERIMIENTOS", value: "" }
          this.rowMotivo=[this.rowMotivoSelect];
          for (let item of resp) {
            console.log(item);
            this.rowMotivo.push({ label: item.desMotivoRequerimiento, value: item.codMotivoRequerimiento }); 
          }
        })
      )
      .subscribe(
        (resp) => {
          this.loading = false;
        },
        (error) => {
          console.log(error);
        }
      );       
  }

  datosAgrupados(){

    this.rowAgrupado=[];
    this.rowAgrupadoSelect={label: "ARTICULO", value: "01"};
    this.rowAgrupado.push(this.rowAgrupadoSelect);

  }

clickAceptar(){

  this.articuloSeleccionado.emit(this.seleccionArticulo);
}

clickCancelar(){

  this.cancel.emit();
}

}