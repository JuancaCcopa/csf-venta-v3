//libreria
import { Component,Input,Output, EventEmitter,OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';//JC
import { Location,formatDate } from '@angular/common';
import { map } from 'rxjs/operators';//JC
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
import { Console } from 'console';

@Component({
  selector: 'app-toma-inventario-guardar',
  templateUrl: './toma-inventario-guardar.component.html',
  styleUrls: ['./toma-inventario-guardar.component.css']
})


export class TomaInvetarioGuardarComponent implements OnInit {
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
  itemSeleccionadoGrillaIndex: any;
  opciones: any = [];
  idResaltar: number;
  loading = true;

  //Modal ver reporte sin stock
  isVerReporteStockModal=false;
  isVerStock=true;
  
  constructor(
    private readonly fb: FormBuilder,
    public lenguageService: LanguageService,
    public mensajePrimeNgService: MensajePrimeNgService,
    public tomaInventarioService: TomaInventarioService,
    public userContextService: UserContextService,
    private readonly location: Location,
    
    private readonly sessionStorage: SessionService,
    private messageService: MessageService,
    private readonly router: Router,
   
    ) { }

  ngOnInit(): void {
   
    
    this.buildFormSuperior();
    this.onTableColumna();
    this.opcionesTabla();
    this.listarGrilla();
      

  }

  onTableColumna(){

    this.columnas = [
      { field: 'codArticulo', header: 'Codigo Articulo' },
      { field: 'desArticulo', header: 'Descripción Articulo' },
      { field: 'codAlmacen',  header: 'Cod Almacén' },
      { field: 'desAlmacen',  header: 'Descripción Almacén' },
      { field: 'cantidadAlmacen', header: 'Cantidad en Almacén' },
      { field: 'isLote', header: 'Lote' },
      { field: 'isUbicacion', header: 'Ubicación' }
    ];
    
  }

  opcionesTabla() {
    this.opciones = [
      {
        label: 'Quitar',
        icon: 'pi pi-trash',
        command: () => {
          this.quitar();
        },
      },
    ];
  }

  quitar() {
    this.listArticulosItem.splice(+this.itemSeleccionadoGrillaIndex, 1);
  }

  itemElegido(index) {
    
    this.itemSeleccionadoGrillaIndex=index;
    
  }

private buildFormSuperior() {

  var hoy= new Date();
  var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();

  this.formularioSuperior = this.fb.group({
    numReferencial: "",
    fechaRegistro: [new Date()],
    hora: hora,
    estado:'ABIERTO',
    observacion: "",
    flgImprimirStock:false,
    responsable: this.userContextService.getNombreCompletoUsuario(),
  });
}
   
  onClickRegresar() {
    this.location.back();
  }

  clickVerReporte(){

    this.isVerStock=this.formularioSuperior.value.flgImprimirStock;

    this.activarModalReporteStock();
  }

  clickGuardar(){
    
    const {
      hora,
      observacion,
      numReferencial
    } = this.formularioSuperior.value;
 

    this.itemSelect.regCreateIdUsuario= this.userContextService.getIdUsuario();
    this.itemSelect.hora=hora;
    this.itemSelect.observacion=observacion;
    this.itemSelect.nroReferencial=numReferencial;
    this.itemSelect.tomaInventarioItem=this.listArticulosItem;


    this.tomaInventarioService.setTomaInventarioRegistrar(this.itemSelect).subscribe(
      (result: any) =>{

        this.sessionStorage.setItemEncrypt('idtomainventario', result["idRegistro"]);
        
        
        
        if(result.idRegistro>0){
          document.getElementById("btnsave").remove();
          document.getElementById("btnsalir").remove();
          
          this.messageService.add({key: 'myKeyTomaInventarioSave', severity:'success', summary: 'Mensaje', detail: result.resultadoDescripcion});
        }else{

          this.messageService.add({key: 'myKeyTomaInventarioSave', severity:'error', summary: 'Mensaje', detail: result.resultadoDescripcion});
        }
        
       
        setTimeout(() => {
          
          this.router.navigate(['/main/modulo-ti//panel-toma-inventario']);
        }, 1000);
        
      },
      
      (error) => this.mensajePrimeNgService.onToErrorMsg(null, error.error.title +"error http: "+error.status)

    );

  }

  
  listarGrilla(){
        
    this.tomaInventarioService
        .getTomaInventarioSelectParam(this.itemSelect)
        .pipe(
          map((resp) => {

            this.listArticulosItem=[];
            this.listArticulosItem=resp;
            Array.from(this.listArticulosItem, x => {
              x["desAlmacen"]=this.itemSelect.desAlmacen,
              x["idGrupoArticulo"]=this.itemSelect.desAlmacen
            });

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


  activarModalReporteStock() {
    this.isVerReporteStockModal = !this.isVerReporteStockModal;
  }

  clickSalir(){
    this.cancel.emit();
  }
    
    // getUbicacion(itemCode,whsCode,objItem) {

    //   this.tomaInventarioService
    //     .getUbicacionByItemWhs(itemCode,whsCode)
    //     .subscribe(
    //       (resp:any) => {
            
    //         if(resp.length>0){
  
    //           const tabla = {};
    //           const unicos = resp.filter((indice) => {
    //             return tabla.hasOwnProperty(indice.binAbs) ? false : (tabla[indice.binAbs] = true);
    //           });
             
    //           var ubicacionDefault ={
    //             BinAbsEntry: unicos[0].binAbs,
    //             BinCode: unicos[0].binCode,
    //             Cantidad: objItem.cantidadEntregada,
    //             PermitirCantidaNegativa:"tNO",
    //             NumLineaBase: objItem.numLinea,
    //             CodArticulo:objItem.codArticulo,
    //             UbicacionCount:unicos.length,
    //           }

    //       }
  
    //       },
    //       (error) => {
    //         console.log(error);
    //       }
    //     );
    // }

    clickExportar(){
      
        this.tomaInventarioService.downloadFile(this.itemSelect)
            .then((data:any) => {
              // window.open(url); 
              console.log(data)
              //data.type=0
              const downloadedFile = new Blob([data.body], { type: data.body.type });
              const a = document.createElement('a');
              a.setAttribute('style', 'display:none;');
              document.body.appendChild(a);
              a.download = "Toma de inventario - Generado";
              a.href = URL.createObjectURL(downloadedFile);
              a.target = '_blank';
              a.click();
              document.body.removeChild(a);

              (error) => {
                console.log(error);
                this.messageService.add({key: 'myKeyTomaInventario', severity:'error', summary: 'Mensaje', detail: error.error});
              }
            
            });

    }

}
