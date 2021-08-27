//libreria
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
//import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';//JC
import { Location } from '@angular/common';
import { map, filter, mapTo } from 'rxjs/operators';//JC
import { SelectItem } from 'primeng';
//constante
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';

//services
import { SessionService } from '../../../../../services/session.service';
import { LanguageService } from '../../../../../services/language.service';
import { MensajePrimeNgService } from '../../../../../services/mensaje-prime-ng.service';
import { UserContextService } from '../../../../../services/user-context.service';
import { UtilService } from '../../../../../services/util.service';
import { ConsolidadoRequerimientoService } from '../../../services/consolidado-requerimiento.service';
import { RequerimientoItemService } from '../../../services/requerimiento-item.service';
import { AlmacenService } from '../../../services/almacen.service';

//models
//import { IRequerimientoItemBus } from '../../../models/requerimiento-item-bus.interface';

//Interface
import { IMensajeResultadoApi } from '../../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';
import { element } from 'protractor';
import { debug } from 'console';



@Component({
  selector: 'app-consolidado-requerimiento-crear',
  templateUrl: './consolidado-requerimiento-crear.component.html',
  styleUrls: ['./consolidado-requerimiento-crear.component.css']
})

export class ConsolidadoRequerimientoCrearComponent implements OnInit, OnDestroy {

  formularioSuperior: FormGroup; //jc
  // Suscripcion [para realizar el unsuscription al cerrar el formulario]
  subscription$: Subscription;
    
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  
  //GRILLA LISTA DE ARTICULOS
  listRequerimiento: any = [];
  listRequerimientoItem: any = [];
  listFilteredProducto: any = [];
  indiceItemElegidoGrilla: any;
  itemSeleccionado: any
  opciones: any = [];

  bodyParams: any;
  
  loading = true;

  //Modal RQ
  isActivateBusquedaArticulo = false;
  
  //Modal Editar Cantidad
  tituloEditarCantiddaVer: string;
  isActivateCantidadEditar = false; 
  listModalRequerimientoProducto: any = [];

  //modal almacen
  isActivateBusquedaAlmacen: boolean = false;
  //variables almacen
  codAlmacen:string="";

  //modal socio de negocio
  indiceModalSocioNegocio: number;
  isActivateBusquedaSocioNegocio: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly activeRoute: ActivatedRoute,
    public lenguageService: LanguageService,
    public mensajePrimeNgService: MensajePrimeNgService,
    public consolidadoRequerimientoService: ConsolidadoRequerimientoService,//jc
    private readonly requerimientoItemService: RequerimientoItemService,//jc
    public userContextService: UserContextService,
    private readonly sessionStorage: SessionService,
    private readonly location: Location,
    private readonly almacenService: AlmacenService,
    
    
    private readonly utilService: UtilService) { }

  ngOnInit(): void {
    this.buildFormSuperior();
    this.obtenerParametrosDeRuta();
    this.opcionesTabla();
    
  }

  ngOnDestroy() {

  }

private buildFormSuperior() {
  this.formularioSuperior = this.fb.group({
    fechaConsolidado: [new Date()],
    responsable:this.userContextService.getNombreCompletoUsuario(),
    observacion:'',
    almacen:''
  });
}


obtenerParametrosDeRuta() {
  this.activeRoute.queryParamMap
  .pipe(
    map((params) => {
      this.bodyParams = {
        idUsuario: Number(params.get('idUsuario')),
        codCentroCosto: params.get('codCentroCosto'),
        desCentroCosto: params.get('desCentroCosto'),        
      };
      this.formularioSuperior.patchValue({
        observacionValeSalida: this.bodyParams.codCentroCosto,
      });
    })
  )
  .subscribe();
}


  clickActivateBuscarArticulo() {
    
    this.isActivateBusquedaArticulo = !this.isActivateBusquedaArticulo;
  }

  articuloBuscado(event: any[]) {

    this.cambioDeEstructuraDeArticulo_AddFechaNecesaria(event);
    this.clickActivateBuscarArticulo();
  }

   cambioDeEstructuraDeArticulo_AddFechaNecesaria(event: any[]) {

     const loadRqItem = (numFunc, callback) =>{

      var numRecord=0;
    

        for (const item of event) {

            this.requerimientoItemService.getByIdRequerimiento(item.idRequerimiento,this.codAlmacen)
            .subscribe(   
              (resp) => {
              if (resp) {
                   
                   var obj = {
                    idRequerimiento: item.idRequerimiento,
                    ConsolidadoItem: []
                  }

                    for (const itemDato of resp) {
                        var newRq = {
                          idRequerimiento:itemDato.idRequerimiento,
                          codArticulo:itemDato.codArticulo,
                          desArticulo: itemDato.desArticulo,
                          codSocioNegocioCompra:itemDato.codSocioNegocio,
                          codUnidadMedida: itemDato.codUnidadMedida,
                          cantidad: itemDato.cantidadNecesaria,
                          cantidadCompra: itemDato.cantidadNecesaria,
                          idRequerimientoItem:itemDato.idRequerimientoItem,
                          stock:itemDato.stock
                        }
                        obj.ConsolidadoItem.push(newRq);
                        this.listRequerimientoItem.push(newRq);
                      }
                  
                  this.listRequerimiento.push(obj);

                }

                numRecord +=1;
             
                if(numRecord==numFunc){
                  callback();
                }
                
              },
            
              (error) => {
                this.mensajePrimeNgService.onToErrorMsg(null, error.error);
              },
              );
        }
        
      }


      loadRqItem(event.length, () =>{
        
        this.setearListProducts();
      });

   }

   setearListProducts(){
    
      this.listRequerimientoItem.forEach(products => {
        
        if (!this.listFilteredProducto.find(prod => prod.codArticulo == products.codArticulo)) {

            const productoSelect = this.listRequerimientoItem.filter(element => element.codArticulo == products.codArticulo);
            var cantidad=0;
            var stockSum=0;
            productoSelect.forEach(item => {
             
                cantidad +=item.cantidad;
                stockSum +=item.stock;
              });
            var cantidadCompra=cantidad;
            
    
            const { codArticulo, desArticulo, codSocioNegocioCompra,codUnidadMedida,stock } = products;
            this.listFilteredProducto.push({ codArticulo, desArticulo, codSocioNegocioCompra,cantidad,cantidadCompra,stockSum,codUnidadMedida});
        }
    });

   }

  opcionesTabla() {
    this.opciones = [
      {
        label: 'Editar Cantidad',
        icon: 'pi pi-pencil',
        command: () => {
          this.editarCantida();
        },
      },
      {
        label: 'Quitar',
        icon: 'pi pi-trash',
        command: () => {
          this.quitar();
        },
      },
    ];
  }

  editarCantida() {
    
    const { codArticulo } = this.itemSeleccionado;
    this.listModalRequerimientoProducto=this.listRequerimientoItem.filter(x=>x.codArticulo==codArticulo);

    this.clickActivateEditarCantidad();
  }

  quitar() {

    this.listFilteredProducto.splice(+this.indiceItemElegidoGrilla, 1);
     var element = this.itemSeleccionado.codArticulo;
    

    for (var i =0; i < this.listRequerimiento.length; i++){
      for (var j =0; j < this.listRequerimiento[i].ConsolidadoItem.length; j++) {
          if(this.listRequerimiento[i].ConsolidadoItem[j]){
            var codArticuloActual = this.listRequerimiento[i].ConsolidadoItem[j].codArticulo;
              if(codArticuloActual==element) {
                    delete  this.listRequerimiento[i].ConsolidadoItem[j];
              }
            }
        }
      }

  }

  itemElegido(item) {
    this.indiceItemElegidoGrilla = item;
    this.itemSeleccionado = this.listFilteredProducto[item];

  }
  
  onClickRegresar() {
    this.location.back();
  }

  clickGuardar(){
    
    
    const {
      observacion
    } = this.formularioSuperior.value;
    

    if(this.codAlmacen==""){
      this.mensajePrimeNgService.onToErrorMsg(null, "SELECCIONE EL ALMACEN")
      return;
    }

    if(this.listRequerimientoItem.length==0){
      this.mensajePrimeNgService.onToErrorMsg(null, "NO HAY DATOS EN LA GRILLA")
      return;
    }
    
    var value={
      CodAlmacen: this.codAlmacen,
      CodCentroCosto:this.userContextService.getCodigoCentroCosto(),
      Observacion:observacion,
      RegCreateIdUsuario:this.userContextService.getIdUsuario(),
      ConsolidadoReq: this.listRequerimiento

    }
    
    this.consolidadoRequerimientoService.setConsolidadoRegistrar(value).subscribe(
      (result: IMensajeResultadoApi) =>
        {
          document.getElementById("btnsave").remove();
          this.sessionStorage.setItemEncrypt('idconsolidado', result["idRegistro"]);
          this.mensajePrimeNgService.onToExitoMsg(null, result["resultadoDescripcion"]);
          setTimeout(() => {
            this.onClickRegresar();
          }, 1500);
      },
        
      (error) => this.mensajePrimeNgService.onToErrorMsg(null, error.error)

    );
    
  }


  fechas_DDMMAAAA(fecha: string | Date): string {
    let dia =new Date(fecha).getDate();
    let mes =new Date(fecha).getMonth()+1;
    const day = (dia<9)? "0"+dia:dia;
    const month =(mes<9)? "0"+mes:mes;
    const year = new Date(fecha).getFullYear();
    const fechaFinal = `${year}-${month}-${day}`;
    
    return fechaFinal;
  }

  editarCantidadBuscado(event: any[]) {
    
    //Actualizamos lo editado la cantidad
    for (const item of event) {

      this.listRequerimiento.map(function(itemRq){
        if(itemRq.idRequerimiento == item.idRequerimiento){
            itemRq.ConsolidadoItem.map((ItemCs)=>{
              if(ItemCs.idRequerimientoItem==item.idRequerimientoItem){
                //ItemCs.cantidad=item.cantidad;
                ItemCs.cantidadCompra=item.cantidadCompra;
              }
            });
        }
        return itemRq;
      });

    }

    this.updateListFilteredProducto();
    this.isActivateCantidadEditar=false;
    

  }

  updateListFilteredProducto(){

    this.listFilteredProducto=[];

    this.listRequerimientoItem.forEach(products => {
      
      if (!this.listFilteredProducto.find(prod => prod.codArticulo == products.codArticulo)) {

          const productoSelect = this.listRequerimientoItem.filter(element => element.codArticulo == products.codArticulo);
          var cantidadCompra=0;
          var cantidadSum = 0;
          productoSelect.forEach(item => {
              console.log(item.cantidad);
              cantidadSum +=item.cantidad;
              cantidadCompra +=item.cantidadCompra;
            });
          var cantidadCompra=cantidadCompra;         
        
          const { codArticulo, desArticulo, codSocioNegocioCompra,codUnidadMedida,stock } = products;
          this.listFilteredProducto.push({ codArticulo, desArticulo, codSocioNegocioCompra,cantidad:cantidadSum,cantidadCompra,stock,codUnidadMedida});
          
      }
  });

  }

  clickActivateEditarCantidad() {
    this.isActivateCantidadEditar = !this.isActivateCantidadEditar;
  }

  activarModalAlmacen() {
    
    this.isActivateBusquedaAlmacen = !this.isActivateBusquedaAlmacen;
  }

  almacenSeleccionado(event: any) {
   
    this.codAlmacen = event.warehouseCode;

    this.formularioSuperior.patchValue({
      almacen: event.warehouseName,
    });

  }

  socioNegocioSeleccionado(event: any) {
    
    this.listFilteredProducto[this.indiceModalSocioNegocio].codSocioNegocioCompra =  event.cardCode;
    
    Array.from(this.listRequerimiento, el => {

      Array.from(el["ConsolidadoItem"], x => {
        if(this.listFilteredProducto[this.indiceModalSocioNegocio].codArticulo ==x["codArticulo"]){
            x["codSocioNegocioCompra"]=event.cardCode
          }
      });
    });

    Array.from(this.listRequerimientoItem, el => {
        if(this.listFilteredProducto[this.indiceModalSocioNegocio].codArticulo ==el["codArticulo"]){
          el["codSocioNegocioCompra"]=event.cardCode
        }
    });

    this.activarModalSocioNegocio();
    
  }

  activarModalSocioNegocio(indice?: number) {
    this.indiceModalSocioNegocio = indice;
    this.isActivateBusquedaSocioNegocio = !this.isActivateBusquedaSocioNegocio; 
  }

}
