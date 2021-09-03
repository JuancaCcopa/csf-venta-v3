//libreria
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';//JC
import { Location } from '@angular/common';
// import { map } from 'rxjs/operators';
import { SelectItem } from 'primeng';
import { MenuItem } from 'primeng';

//constante
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';

//services
import { SessionService } from '../../../../../services/session.service';
import { LanguageService } from '../../../../../services/language.service';
import { MensajePrimeNgService } from '../../../../../services/mensaje-prime-ng.service';
import { UserContextService } from '../../../../../services/user-context.service';
import { UtilService } from '../../../../../services/util.service';
import { PlanillaService } from '../../../services/planilla.service';
import swal from 'sweetalert2';

//Interface

@Component({
  selector: 'app-generar-pagobot',
  templateUrl: './generar-pagobot.component.html',
  styleUrls: ['./generar-pagobot.component.css']
})

export class GenerarPagoBotComponent implements OnInit {
  formularioSuperior: FormGroup;
  // Suscripcion [para realizar el unsuscription al cerrar el formulario]
  subscription$: Subscription;

  @Input() isHabilitaControl = false;
  @Output() cancel = new EventEmitter<any>();

  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;


  bodyParams: any;

  loading = false;
  constructor(
    private readonly fb: FormBuilder,
    private readonly activeRoute: ActivatedRoute,
    public lenguageService: LanguageService,
    public mensajePrimeNgService: MensajePrimeNgService,
    public userContextService: UserContextService,
    private readonly location: Location,
    private readonly planillaService: PlanillaService,
    private readonly sessionStorage: SessionService,
    private messageService: MessageService,
    private readonly utilService: UtilService) { }

  ngOnInit(): void {

    this.buildFormSuperior();
    

  }



  private buildFormSuperior() {

    this.formularioSuperior = this.fb.group({
      idPago: '',
      codVenta: '',
      tipoPago: 'PAGOS DE MEDICAMENTOS DE FARMACIA',
      nombre: '',
      apellidos: '',
      telefono: '',
      correo: '',
      tipoDocumento: '',
      numeroDocumento: '',
      descripcionPago: '',
      urlImagen: ''
    });

  }

}
