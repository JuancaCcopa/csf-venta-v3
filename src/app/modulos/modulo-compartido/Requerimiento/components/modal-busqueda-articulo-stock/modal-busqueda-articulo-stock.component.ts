//libreria
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng';
import { ActivatedRoute } from '@angular/router';
// const
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';

import { SolicitudTrasladoService } from '../../../../modulo-solicitud-traslado/services/solicitud-traslado.service';

import { LanguageService } from '../../../../../services/language.service';
import { UtilService } from '../../../../../services/util.service';

//OnChanges
@Component({
  selector: 'app-modal-busqueda-articulo-stock',
  templateUrl: './modal-busqueda-articulo-stock.component.html',
  styleUrls: ['./modal-busqueda-articulo-stock.component.css']
})

export class ModalBusquedaArticuloStockComponent implements OnInit {

  @Input() isDisplayBusquedaArticulo = false;
  @Input() almacenSelect:any;
  @Output() articuloSeleccionado = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  @Input() tipoArticulo: number = 0;
  
  rowListaArticulo: any[] = [];
  seleccionArticulo: any;

  cols: any;
  loadingTipoArticulo = true;
  loadingArticulo = false;
  
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;

  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  // Formulario de Busqueda
  formularioBusquedaAr: FormGroup;
  tituloAlmacen: string;
    //CB ALMACEN
  rowTipoArticulo: SelectItem[];
  seleccionTipoArticulo: any;
  //GRILLA
  opciones: any = [];

  constructor(
    private readonly fb: FormBuilder,
    private solicitudTrasladoService: SolicitudTrasladoService,
    private readonly utils: UtilService,
    private activeRoute: ActivatedRoute,
    public readonly lenguageService: LanguageService) {}

  ngOnInit(): void {
    

    this.buildFormRq();
    this.cabeceraTabla();
    
    this.opcionesTabla();
    this.datosTipoArticulo();
    
    this.tituloAlmacen="ALMACEN CENTRAL";

  }

  cabeceraTabla() {
    this.cols = [
      { field: 'itemCode', header: 'Código Articulo' },
      { field: 'itemName', header: 'Descripción Articulo' },
      { field: 'onHandALM', header: 'Stock' }
    ];
  }
  
  getArticulos() {

    const formBody = this.formularioBusquedaAr.value;
    const cbtipoArticulo = formBody.cbtipoArticulo;
    var idtipoArticulo=cbtipoArticulo.value;
    var nomArt=formBody.nomArticulo;
    
    this.loadingArticulo = true;
    
    this.solicitudTrasladoService
      .getArticuloStock(idtipoArticulo,this.almacenSelect.value,nomArt)
      .pipe(map((resp) => (this.rowListaArticulo = resp)))
      .subscribe(
        (resp) => {
          this.loadingArticulo = false;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  private buildFormRq() {
    this.formularioBusquedaAr = this.fb.group({
      cbtipoArticulo:'',
      nomArticulo:''
    });
  }

  

  clickAceptar() {

    this.articuloSeleccionado.emit(this.seleccionArticulo);

  }
  clickCancelar() {
    this.cancel.emit();
  }
  onToBuscar() {
    
    this.getArticulos();
  }
  
  opcionesTabla() {
    this.opciones = [
      {
        label: 'Ver',
        icon: 'pi pi-eye',
        command: () => {
          //this.ver();
        },
      }
    ];
  }

  datosTipoArticulo() {
    this.solicitudTrasladoService
      .getTipoArticulo()
      .pipe(
        map((resp) => {
          this.rowTipoArticulo=[];
          for (let item of resp) {
            this.rowTipoArticulo.push({ label: item.groupName, value: item.number }); 
          }

          if(this.rowTipoArticulo.length>0) {

            this.seleccionTipoArticulo=this.rowTipoArticulo[0];

          }
          
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

}
