//libreria
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { SelectItem } from 'primeng';
//constante
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';
//services
import { SessionService } from '../../../../../services/session.service';
import { LanguageService } from '../../../../../services/language.service';
import { MensajePrimeNgService } from '../../../../../services/mensaje-prime-ng.service';
import { UserContextService } from '../../../../../services/user-context.service';
import { UtilService } from '../../../../../services/util.service';
import { TomaInventarioService } from '../../../services/toma-inventario.service';

//Routing
import { Router } from '@angular/router';



@Component({
  selector: 'app-toma-inventario-crear',
  templateUrl: './toma-inventario-crear.component.html',
  styleUrls: ['./toma-inventario-crear.component.css']
})

export class TomaInvetarioCrearComponent implements OnInit, OnDestroy {
  
  
  subscription$: Subscription;
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
 
  // Formulario de Busqueda
  formularioSuperior: FormGroup;
  formularioBusqueda: FormGroup;

  listaAlmacen: any[] = [];
  //AlmacenSelected: any;
  loadingAlmacen = false;

  //Periodo
  rowPeriodo: SelectItem[];
  PeriodoSelected:any;

  //Categoria
  rowCategoria: SelectItem[];
  CategoriaSelected:any;

  //Grupo
  rowGrupo: SelectItem[];
  GrupoSelected:any;

  //GRILLA LISTA DE ARTICULOS
  listArticulosItem: any = [];
  //indiceItemElegidoGrilla: any;
  opciones: any = [];
  dtSelectedRows:any;

  //modal toma inventario crear
  isActivateTomaInventarioGuardar=  false;
  tituloModalTomaInventarioGuardar: String="Recuento de Inventario";
  itemSeleccionado:any;


  bodyParams: any;
  
  loading = true;
  constructor(
    private readonly fb: FormBuilder,
    private readonly activeRoute: ActivatedRoute,
    public lenguageService: LanguageService,
    public mensajePrimeNgService: MensajePrimeNgService,
    public tomaInventarioService: TomaInventarioService,
    public userContextService: UserContextService,
    private readonly location: Location,
    private readonly sessionStorage: SessionService,
    private readonly router: Router,
    private messageService: MessageService,
    private readonly utilService: UtilService) { }

  ngOnInit(): void {
    

    this.buildForm();
    this.getAlmacen();
    this.getGrupo();


    this.rowPeriodo=[];
    this.rowPeriodo.push({value:7,label:"Ninguno"});
    this.rowPeriodo.push({value:0,label:"Diario"});
    this.rowPeriodo.push({value:1,label:"Semana"});
    this.rowPeriodo.push({value:2,label:"Cada Semana"});
    this.rowPeriodo.push({value:3,label:"Mensual"});
    this.rowPeriodo.push({value:4,label:"Trimestral"});
    this.rowPeriodo.push({value:5,label:"Semestral"});
    this.rowPeriodo.push({value:6,label:"Anual"});
    this.rowPeriodo.push({value:8,label:"Cada DIa"});

    this.PeriodoSelected = this.rowPeriodo[0];

    this.rowCategoria=[];
    this.rowCategoria.push({value:0,label:"TODOS"},{value:1,label:"A"},{value:2,label:"B"},{value:3,label:"C"});
    this.CategoriaSelected = this.rowCategoria[0];

  }

  ngOnDestroy() {
    
  }

private buildForm() {
  
  this.formularioBusqueda = this.fb.group({
    almacen:''
  });

  this.formularioSuperior = this.fb.group({
    fechaReg: [new Date()],
    cbperiodo:'',
    cbcategoria:'',
    inicioCodeItem:'',
    finCodeItem:'',
    cbgrupo:'',
    responsable: this.userContextService.getNombreCompletoUsuario()
  });
}

  itemElegido(item) {
    this.dtSelectedRows = item;
  }
  
  onClickRegresar() {
    this.location.back();
  }

  clickGenerar(){

    
    const formBody = this.formularioSuperior.value;
    
    if(formBody.cbperiodo==""){
      this.messageService.add({key: 'myKeyTomaInventarioCrear', severity:'warn', summary: 'Mensaje', detail: `SELECCIONE EL PERIODO`});
      return;
    }

    if(formBody.cbcategoria==""){
      this.messageService.add({key: 'myKeyTomaInventarioCrear', severity:'warn', summary: 'Mensaje', detail: `SELECCIONE LA CATEGORIA`});
      return;
    }


    if(formBody.cbgrupo==""){
      this.messageService.add({key: 'myKeyTomaInventarioCrear', severity:'warn', summary: 'Mensaje', detail: `SELECCIONE UN GRUPO`});
      return;
    }

    if(this.dtSelectedRows.warehouseCode==undefined){
      this.messageService.add({key: 'myKeyTomaInventarioCrear', severity:'warn', summary: 'Mensaje', detail: `SELECCIONE UN ALMACEN`});
      return;
    }

    this.itemSeleccionado={
      codAlmacen:this.dtSelectedRows.warehouseCode,
      desAlmacen:this.dtSelectedRows.warehouseName,
      codArticuloDesde:formBody.inicioCodeItem,
      codArticuloHasta:formBody.finCodeItem,
      codGrupo:formBody.cbgrupo.value,
      codPeriodo:formBody.cbperiodo.value,
      idCategoria:formBody.cbcategoria.value,
      tomaInventarioItem:[]
    };

    this.activarTomaInventarioGuardar();
    
  }

  getAlmacen() {

    const formBody = this.formularioBusqueda.value;
    var almacen=formBody.almacen;
    this.loadingAlmacen = true;

    this.tomaInventarioService
      .getAlmacenByName(almacen)
      .pipe(map((resp:any) => {

        if(resp.error==null){
          this.listaAlmacen = resp.value;
          this.dtSelectedRows=this.listaAlmacen[0];
        }else{
          this.messageService.add({key: 'myKeyTomaInventarioCrear', severity:'error', summary: 'Mensaje', detail: "se ha producido un error interno en el servidor sl"});
        }
        

      }))
      .subscribe(
        (resp:any) => {
          
          this.loadingAlmacen = false;
          
        },
        (error) => {
          console.log(error);
          this.messageService.add({key: 'myKeyTomaInventarioCrear', severity:'error', summary: 'Mensaje', detail: "error de servicio"});
        }
      );
  }

  getGrupo() {

    const formBody = this.formularioBusqueda.value;
    var almacen=formBody.almacen;
    

    this.tomaInventarioService
      .getGrupoArticulo()
      .pipe(map((resp) => (this.rowGrupo = resp)))
      .subscribe(
        (resp) => {
          
    
          this.rowGrupo=[{value:0,label:"TODOS"}];
          for (const item of resp) {
            this.rowGrupo.push({value:item.number,label:item.groupName}); 
          }
          
          if(this.rowGrupo.length>0){
            this.GrupoSelected=this.rowGrupo[0];
          }
         
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onToBuscar() {
    
    this.getAlmacen();
  }

  
  activarTomaInventarioGuardar() {
    this.isActivateTomaInventarioGuardar = !this.isActivateTomaInventarioGuardar;
  }

}
