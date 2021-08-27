//libreria
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { FormGroup } from '@angular/forms';
// const
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';

//services
import { UbicacionLtService } from '../../services/ubicacion-lt.service';
import { LanguageService } from '../../../../../services/language.service';

@Component({
  selector: 'app-modal-busqueda-ubicacion-lt',
  templateUrl: './modal-busqueda-ubicacion-lt.component.html',
  styleUrls: ['./modal-busqueda-ubicacion-lt.component.css']
})

export class ModalBusquedaUbicacionLtComponent implements OnInit {

  @Input() isDisplayBusqueda = false;
  @Input() itemCode : string;
  @Input() whsCode : string;
  @Input() entorno : string;
  @Output() eventoRegistroSeleccionado = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  
  
  seleccion: any;
  rowLista: any[] = [];
  cols: any;
  loading = false;
  
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;

  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  // Formulario de Busqueda
  formularioBusquedaAl: FormGroup;
  tituloAlmacen: string;
  

  //GRILLA
  opciones: any = [];

  constructor(
    private ubicacionLtService: UbicacionLtService,
    public readonly lenguageService: LanguageService) {}

  ngOnInit(): void {  
    
    this.cabeceraTabla();
    this.getUbicacion();

  }

  cabeceraTabla() {
    this.cols = [
      { field: 'binAbs', header: 'Código' },
      { field: 'binCode', header: 'Descripción' }
    ];
  }
  
  getUbicacion() {
    
    
    this.loading = true;
    this.ubicacionLtService
      .getUbicacionByItemWhs(this.itemCode,this.whsCode)
      .pipe(map((resp:any[]) => {

        const tabla = {};
        const unicos = resp.filter((indice) => {
          
          return tabla.hasOwnProperty(indice.binAbs) ? false : (tabla[indice.binAbs] = true);
        });
        

        this.rowLista = unicos
        //this.rowLista = [...new Set(resp)]
        console.log(this.rowLista);

      }))
      .subscribe(
        (resp) => {
          this.loading = false;
        },
        (error) => {
          console.log(error);
        }
      );
  }  

  clickAceptar() {
    
    this.seleccion.entorno=this.entorno;
    this.eventoRegistroSeleccionado.emit(this.seleccion);
    this.cancel.emit();
  }
  clickCancelar() {
    this.cancel.emit();
  }

}
