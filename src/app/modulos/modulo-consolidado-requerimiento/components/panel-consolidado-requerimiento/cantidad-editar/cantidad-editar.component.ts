import { Component,Input,Output,EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
// const
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';

//services
import { MensajePrimeNgService } from '../../../../../services/mensaje-prime-ng.service';
import { UtilService } from '../../../../../services/util.service';
import { LanguageService } from '../../../../../services/language.service';
import { ConsolidadoRequerimientoService  } from '../../../services/consolidado-requerimiento.service';

//Routing
import { Router } from '@angular/router';
//isDisplayBusquedaArticulo
@Component({
  selector: 'app-cantidad-editar',
  templateUrl: './cantidad-editar.component.html',
  styleUrls: ['./cantidad-editar.component.css']
})
export class CantidadEditarComponent implements OnInit {
  @Input() isDisplayCantidaEditar;
  @Input() listaCantidaEditar;
  @Output() editarCantidaSeleccionado = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;

  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  // Formulario de Busqueda
  formularioEditarCantida: FormGroup;

  //lista
  listaRequerimientoItem: any =[];
  //botton
  seleccionArticulo=false;

  // Suscripcion [para realizar el unsuscription al cerrar el formulario]
  subscription$: Subscription;
  loading = true; //jc

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
    debugger;
    this.listaRequerimientoItem= this.listaCantidaEditar;
    this.loading = false;
    
  }

  private onbuildForm() {
    this.formularioEditarCantida = this.fb.group({
      modalCantidad: 0,
      modalCantidadCompra: 0
    });
  }

  clickAceptar(){
    
    this.editarCantidaSeleccionado.emit(this.listaRequerimientoItem);
    
  }

}