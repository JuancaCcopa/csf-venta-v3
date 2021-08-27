//libreria
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
//import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';//JC
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';//JC
import { SelectItem } from 'primeng';
//constante
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';

//services
import { SessionService } from '../../../../../services/session.service';
import { LanguageService } from '../../../../../services/language.service';
import { MensajePrimeNgService } from '../../../../../services/mensaje-prime-ng.service';
import { UserContextService } from '../../../../../services/user-context.service';
import { UtilService } from '../../../../../services/util.service';
import { ValeSalidaService } from '../../../services/vale-salida.service';
import { RequerimientoItemService } from '../../../services/requerimiento-item.service';
import { AlmacenService } from '../../../services/almacen.service';

//models
import { IRequerimientoItemBus } from '../../../models/requerimiento-item-bus.interface';

//Interface
import { IMensajeResultadoApi } from '../../../../modulo-compartido/Requerimiento/interfaces/mensajeRespuestaApi.interface';

@Component({
  selector: 'app-registrar-vale-salida',
  templateUrl: './registrar-vale-salida.component.html',
  styleUrls: ['./registrar-vale-salida.component.css']
})

export class RegistrarValeSalidaComponent implements OnInit, OnDestroy {
  formularioSuperior: FormGroup; //jc
  // Suscripcion [para realizar el unsuscription al cerrar el formulario]
  subscription$: Subscription;
    
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  
  //modal almacen
  isActivateBusquedaAlmacen: boolean = false;
  //variables almacen
  codAlmacen:string="";

    

  //GRILLA LISTA DE ARTICULOS
  listRequerimientoItem: any = [];
  indiceItemElegidoGrilla: any;
  opciones: any = [];


  bodyParams: any;//JC
  isActivateBusquedaArticulo = false; //jc
  loading = true; //jc
  constructor(
    private readonly fb: FormBuilder,
    private readonly activeRoute: ActivatedRoute,
    public lenguageService: LanguageService,
    //public requerimientoService: RequerimientoService,
    public mensajePrimeNgService: MensajePrimeNgService,
    public valeSalidaService: ValeSalidaService,//jc
    private readonly requerimientoItemService: RequerimientoItemService,//jc
    public userContextService: UserContextService,
    //private readonly sessionStorage: SessionService,
    private readonly location: Location,
    private readonly almacenService: AlmacenService,//jc
    private readonly sessionStorage: SessionService,
    
    private readonly utilService: UtilService) { }

  ngOnInit(): void {
    this.buildFormSuperior();
    this.obtenerParametrosDeRuta();
    this.opcionesTabla();
    //this.datosAlmacen();

  }

  ngOnDestroy() {
  
  }


private buildFormSuperior() {
  this.formularioSuperior = this.fb.group({
    fechaReg: [new Date()],
    codNumSap:'',
    conformidadSap:'',
    observacionValeSalida:'',
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
     
    })
  )
  .subscribe();
}

//jc
  clickActivateBuscarArticulo() {
    console.log("clickActivateBuscarArticulo");
    this.isActivateBusquedaArticulo = !this.isActivateBusquedaArticulo;
  }

  //jc
  articuloBuscado(event: IRequerimientoItemBus[]) {
    debugger
    this.cambioDeEstructuraDeArticulo_AddFechaNecesaria(event);
    this.clickActivateBuscarArticulo();
  }
  //jc
  cambioDeEstructuraDeArticulo_AddFechaNecesaria(event: IRequerimientoItemBus[]) {
    debugger;

    const { almacen } = this.formularioSuperior.value;
    var codCentroCosto = this.userContextService.getCodigoCentroCosto();
    var desCentroCosto = this.userContextService.getDescripcionCentroCosto();

    this.subscription$ = new Subscription();

    for (const item of event) {

        this.subscription$ = this.requerimientoItemService.getByIdRequerimiento(item.idRequerimiento)
        .subscribe(resp => {
          if (resp) {
                
                 for (const item of resp) {
                     var newRq = {
                       idRequerimiento:item.idRequerimiento,
                       codArticulo:item.codArticulo,
                       desArticulo: item.desArticulo,
                       codUnidadMedida: item.codUnidadMedida,
                       codAlmacen: this.codAlmacen,
                       desAlmacen: almacen,
                       cantidadNecesaria: item.cantidadNecesaria,
                       codCentroCosto: codCentroCosto,//item.codCentroCosto,
                       desCentroCostoUsuario: desCentroCosto,//item.desCentroCosto,
                       comentario: item.comentario
                     }
                    this.listRequerimientoItem.push(newRq);
                  }
            }
          },
          (error) => {
            this.mensajePrimeNgService.onToErrorMsg(null, error.error);
          });
    }

  }

  opcionesTabla() {
    this.opciones = [
      {
        label: 'Ver',
        icon: 'pi pi-eye',
        command: () => {
          //this.ver();
        },
      },
      {
        label: 'Anular',
        icon: 'pi pi-trash',
        command: () => {
            console.log("anular");
            //this.anular();
        },
      },
    ];
  }
  // onChange(event) {
   
  //     Array.from(this.listRequerimientoItem, x => {
  //       x["codAlmacen"]=event.value.value,
  //       x["desAlmacen"]=event.value.label
  //     });

  // }
  quitar() {
    this.listRequerimientoItem.splice(+this.indiceItemElegidoGrilla, 1);
  }

  itemElegido(item) {
    this.indiceItemElegidoGrilla = item;
  }
  
  onClickRegresar() {
    this.location.back();
  }

  clickGuardar(){

    const {
      fechaReg,
      codNumSap,
      conformidadSap,
      almacen,
      observacionValeSalida
    } = this.formularioSuperior.value;
    
    if(almacen=="" || this.codAlmacen==""){
      this.mensajePrimeNgService.onToErrorMsg(null, "SELECCIONE EL ALMACEN")
      return;
    }

    if(this.listRequerimientoItem.length==0){
      this.mensajePrimeNgService.onToErrorMsg(null, "NO HAY DATOS EN LA GRILLA")
      return;
    }
    

    var value={
      FecValeSalida:this.fechas_DDMMAAAA(fechaReg),
      CodAlmacen: this.codAlmacen,
      CodCentroCosto:this.userContextService.getCodigoCentroCosto(),
      NroSap:codNumSap,
      ConformidadSap:codNumSap,
      ObservacionValeSalida:observacionValeSalida,
      IdUsuario:this.userContextService.getIdUsuario(),
      RegCreateIdUsuario:this.userContextService.getIdUsuario(),
      ValeSalidaItem:this.listRequerimientoItem
    }
    
    this.valeSalidaService.setValeSalidaRegistrar(value).subscribe(
      (result: IMensajeResultadoApi) =>{
        this.sessionStorage.setItemEncrypt('idvalesalida', result["idRegistro"]);
        this.mensajePrimeNgService.onToExitoMsg(null, result["resultadoDescripcion"]);
        setTimeout(() => {
          this.onClickRegresar();
        }, 1500);
      },
      
      (error) => this.mensajePrimeNgService.onToErrorMsg(null, error.error)

    );

    document.getElementById("btnsave").remove();
    
    
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

  activarModalAlmacen() {
    this.isActivateBusquedaAlmacen = !this.isActivateBusquedaAlmacen;
  }

  almacenSeleccionado(event: any) {
   
    this.codAlmacen = event.warehouseCode;
    this.formularioSuperior.patchValue({
      almacen: event.warehouseName,
    });

    Array.from(this.listRequerimientoItem, x => {
      x["codAlmacen"]=event.warehouseCode,
      x["desAlmacen"]=event.warehouseName
    });

  }

}
