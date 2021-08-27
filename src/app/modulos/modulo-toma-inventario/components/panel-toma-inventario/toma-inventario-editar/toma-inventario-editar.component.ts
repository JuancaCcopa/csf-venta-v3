//libreria
import { Component,Input,Output, EventEmitter,OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';//JC
import { Location,formatDate } from '@angular/common';
import { map, filter } from 'rxjs/operators';//JC
import { SelectItem } from 'primeng';
import { ConfirmationService } from 'primeng/api';

//constante
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';

//services
import { SessionService } from '../../../../../services/session.service';
import { LanguageService } from '../../../../../services/language.service';
import { MensajePrimeNgService } from '../../../../../services/mensaje-prime-ng.service';
import { UserContextService } from '../../../../../services/user-context.service';
import { TomaInventarioService } from '../../../services/toma-inventario.service';

//Routing
import { Router } from '@angular/router';
import { Console } from 'console';

@Component({
  selector: 'app-toma-inventario-editar',
  templateUrl: './toma-inventario-editar.component.html',
  providers: [ConfirmationService]
})


export class TomaInvetarioEditarComponent implements OnInit {
  formularioSuperior: FormGroup; 
  
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;
  // Suscripcion [para realizar el unsuscription al cerrar el formulario]
  subscription$: Subscription;
    
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
 
  @Input() itemSelect:any;
  @Output() cancel = new EventEmitter<any>();
  
  //GRILLA LISTA DE ARTICULOS
  columnas: any = [];
  listArticulosItem: any = [];
  itemSeleccionadoGrilla: any;
  itemSeleccionadoGrillaIndex: number;
  opciones: any = [];
  idResaltar: number;
  loading = true;
  selectedArticulos: any[];
  selectedArticulo: any;

  //Modal ubicacion
  isActivateUbicacion = false; 
  ModalUbicacionItemCode: string="";
  ModalUbicacionWhsCode: string="";
  ModalUbicacionEntorno: string="";

  constructor(
    private readonly fb: FormBuilder,
    public lenguageService: LanguageService,
    public mensajePrimeNgService: MensajePrimeNgService,
    public tomaInventarioService: TomaInventarioService,
    public userContextService: UserContextService,
    private readonly location: Location,
    private readonly confirmationService: ConfirmationService,
    private readonly sessionStorage: SessionService,
    private messageService: MessageService,
    private readonly router: Router,
   
    ) { }

  ngOnInit(): void {
   
    console.log("this.itemSelect");
    console.log(this.itemSelect);

    this.buildFormSuperior();
    this.onTableColumna();
    this.listarGrilla();
    this.opcionesTabla();

  }

  opcionesTabla() {
    
    this.opciones = [
      {
        label: 'Quitar',
        icon: 'pi pi-trash',
        command: () => {
          this.confirmationService.confirm({
            message: `¿Estas Seguro de quitar de la lista el articulo ${this.selectedArticulo.codArticulo} ${this.selectedArticulo.desArticulo}?`,
            accept: () => {
              
              const body = {
                id: this.selectedArticulo.idTomaInventarioItem,
                idusuario: this.userContextService.getIdUsuario()
              };
              this.tomaInventarioService.setTomaInventarioItemDel(body).subscribe(
                
                (result: any) => {
                  this.quitar();
                  this.messageService.add({key: 'myKeyEditar', severity:'success', summary: 'Mensaje', detail: result.resultadoDescripcion});
                },
                (error) => this.messageService.add({key: 'myKeyEditar', severity:'error', summary: 'Mensaje', detail: error.error})
              );
            },
          });

        },
      },
    ];
  }

  quitar() {
    
    this.listArticulosItem.tomaInventarioItem.splice(+this.itemSeleccionadoGrillaIndex, 1);
    this.selectedArticulos.splice(+this.itemSeleccionadoGrillaIndex, 1);

  }

  onTableColumna(){

    this.columnas = [
      { field: 'codArticulo', header: 'Codigo Articulo' },
      { field: 'desArticulo', header: 'Descripción Articulo' },
      { field: 'codAlmacen',  header: 'Cod Almacén' },
      { field: 'desAlmacen',  header: 'Descripción Almacén' },
      { field: 'cantidadAlmacen', header: 'Cantidad en Almacén' },
      { field: 'contado', header: 'Contado' },
      { field: 'cantidadContada', header: 'Cantidad contada' },
      { field: 'desviacion', header: 'Desviación' },
      { field: 'codUnidadMedida', header: 'Cod UM' },
      { field: 'isLote', header: 'Es Lote' },
      { field: 'IsUbicacion', header: 'Es Ubicación' },

    ];
    
  }

private buildFormSuperior() {

  var hoy= new Date();
  var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();

  var strEstado="";
  if(this.itemSelect.idTomaInventarioEstado==1){
    strEstado='ABIERTO'
  }else if(this.itemSelect.idTomaInventarioEstado==2){
    strEstado='GENERADO'
  }else if(this.itemSelect.idTomaInventarioEstado==3){
    strEstado='CERRADO'
  }
  

  this.formularioSuperior = this.fb.group({
    numReferencial: this.itemSelect.nroReferencial,
    fechaRegistro: [new Date()],
    hora: hora,
    estado: strEstado,
    observacion: this.itemSelect.observacion,
    responsable: this.userContextService.getNombreCompletoUsuario(),
  });
}
   
  onClickRegresar() {
    this.location.back();
  }

  clickGuardar(){

    const {
      numReferencial,
      observacion
    } = this.formularioSuperior.value;

    const newArr = [...new Set(this.selectedArticulos)];

    this.itemSelect.regUpdateIdUsuario= this.userContextService.getIdUsuario();
    this.itemSelect.NroReferencial=observacion;
    this.itemSelect.observacion=observacion;
    this.itemSelect.tomaInventarioItem = newArr;

    this.tomaInventarioService.setTomaInventarioUpdate(this.itemSelect).subscribe(
      (result: any) =>{

        this.sessionStorage.setItemEncrypt('idtomainventario', result["idRegistro"]);
        
        if(result.idRegistro>0){
          document.getElementById("btnsave").remove();
          this.messageService.add({key: 'myKeyTomaInventario', severity:'success', summary: 'Mensaje', detail: result.resultadoDescripcion});
        }else{

          this.messageService.add({key: 'myKeyTomaInventario', severity:'error', summary: 'Mensaje', detail: result.resultadoDescripcion});
        }

        this.envioSap(result["idRegistro"]);

      },
      
      (error) => {
        this.messageService.add({key: 'myKeyTomaInventario', severity:'error', summary: 'Mensaje', detail: error.error});
      }

    );

  }

  
  listarGrilla(){

    if(this.selectedArticulos==undefined) this.selectedArticulos=[];

    this.tomaInventarioService
        .getAllById(this.itemSelect.idTomaInventario)
        .pipe(
          map((resp:any) => {
            
            console.log("listarGrilla");
            console.log(resp);

            this.listArticulosItem=resp;
            var array=[];
            resp.tomaInventarioItem.forEach(el => {
              
              if (el.contado==true) {
                array=array.concat(el);
              }
            });

            setTimeout(() => {
              this.selectedArticulos=array;
            }, 10);
            
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
  
  clickCancelar(){
    
   this.cancel.emit();
  }


  onKeypressEvent(model,evento){
   
    if(this.selectedArticulos==undefined) this.selectedArticulos=[];
    
    setTimeout(() => {

      model.desviacion=model.cantidadContada-model.cantidadAlmacen;
      this.selectedArticulos=this.selectedArticulos.concat(model);

    }, 1);
    

    }

    // onkeyup(model,event){
    //   debugger;
    
    //   if(event.key=="Backspace"){
    //     console.log("Backspace");
    //     console.log(model.cantidadContada);
        
    //     model.desviacion=Math.abs(model.cantidadAlmacen-model.cantidadContada);

    //   }
      
    // }
    //(keyup)="onkeyup(modelo,$event)"

    onChange(model,event){
      
       if(model.cantidadContada==null){
        model.desviacion="";
        var result=this.selectedArticulos.filter(x=> x!=model);
        this.selectedArticulos=[].concat(result);

       }else{
        
        model.desviacion=model.cantidadContada-model.cantidadAlmacen;

       }
 
    }

    envioSap(id) {

      this.tomaInventarioService
        .getAllById(id)
        .pipe(
          map((resp:any) => {

          var value={
            Reference2: resp.nroReferencial,
            CountTime:resp.hora,
            Remarks: resp.observacion,
            InventoryCountingLines:[]
          }
          
            var linea = 0;
            resp.tomaInventarioItem.forEach((item) => {
              
            linea +=1;

            var obj ={
                    
                    LineNumber: linea,
                    ItemCode: item.codArticulo,
                    ItemDescription: item.desArticulo,
                    WarehouseCode: item.codAlmacen,
                    BinEntry: item.idUbicacion,
                    InWarehouseQuantity: (item.cantidadAlmacen==null)? 0:item.cantidadAlmacen,
                    Counted: (item.contado== true)? 'tYES':'tNO',
                    UoMCode: item.codUnidadMedida,
                    CountedQuantity: item.cantidadContada,
                    Variance: item.desviacion,
                  }

                  value.InventoryCountingLines.push(obj);

            });

          var send ={
                Id:this.itemSelect.idTomaInventario,
                IdUsuario:this.userContextService.getIdUsuario(),
                value:value
              }
      
              this.tomaInventarioService
              .setInventoryCountings(send)
              .pipe(
                map((resp) => {
                  
                    this.clickCancelar();

                  if(resp["exito"]==true){
                    this.messageService.add({key: 'myKeyTomaInventario', severity:'info', summary: 'Mensaje', detail: `[SAP BO] SE ENVIO CORRECTAMENTE - DocumentEntry ${resp["documentEntry"]}`});
                  }else{
                    this.messageService.add({key: 'myKeyTomaInventario', severity:'error', summary: 'Mensaje', detail: ` ERROR DE ENVIAR A SAP BO: ${resp["mensaje"]}`});
                  }
                  
                })
              )
              .subscribe(
                (resp) => {
                  //this.loading = false;            
                },
                (error) => {
                    
                  this.clickCancelar();

                  this.messageService.add({key: 'myKeyTomaInventario', severity:'error', summary: 'Mensaje', detail: ` ERROR DE ENVIAR A SAP BO LA SOLICITUD`});

                }
              );

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

      }//FIN

       clickActivateUbicacion() {
          this.isActivateUbicacion = !this.isActivateUbicacion;
        }


      ubicacionModel(item,index) {       
    
        this.itemSeleccionadoGrilla = item;
        this.itemSeleccionadoGrillaIndex = index;
        this.ModalUbicacionItemCode=item.codArticulo;
        this.ModalUbicacionWhsCode=item.codAlmacen;

        this.clickActivateUbicacion();
    
      }

      ubicacionSelecccioando(event: any) {

        var  search=this.listArticulosItem.tomaInventarioItem[this.itemSeleccionadoGrillaIndex];
        search.idUbicacion=event.binAbs;
        search.desUbicacion=event.binCode;
        search.cantidadAlmacen=event.onHandALM;
        
      }
   
      itemElegido(item,index) {
        
        this.itemSeleccionadoGrillaIndex=index;
        this.selectedArticulo = item;
      }

}
