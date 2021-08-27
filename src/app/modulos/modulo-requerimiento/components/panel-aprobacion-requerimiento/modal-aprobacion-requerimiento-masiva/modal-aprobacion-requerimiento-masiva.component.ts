import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';
import { IRequerimientoAprobador, IBodyAprobadorReqMasivolOutIn } from '../../../models/aprobacionRequerimiento.interface';
import { RequerimientoService } from '../../../services/requerimiento.service';
import { MensajePrimeNgService } from '../../../../../services/mensaje-prime-ng.service';
import { UserContextService } from '../../../../../services/user-context.service';

@Component({
  selector: 'app-modal-aprobacion-requerimiento-masiva',
  templateUrl: './modal-aprobacion-requerimiento-masiva.component.html',
  styleUrls: ['./modal-aprobacion-requerimiento-masiva.component.css']
})
export class ModalAprobacionRequerimientoMasivaComponent implements OnInit {
  @Input() idRequerimiento: number;
  @Input() idArraySolicitudes: any[] = [];
  @Input() isModalAprobacionMasiva = false;
  @Input() isModalDesaprobacionMasiva = false;
  @Input() titulo: string;

  @Output() guardarAprobacionMasiva = new EventEmitter();
  @Output() cerrarModalEvent = new EventEmitter();
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;
  desAprobacion: string;
  dataListaAprobadorFinal: IRequerimientoAprobador[] = [];
  aprobadorSeleccionado: IRequerimientoAprobador;

  constructor(private readonly requerimientoService: RequerimientoService,
              // private readonly servicioLogin: SesionService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private readonly userContextService: UserContextService) {

  }

  ngOnInit() {
    console.log('INIT MODAL-APOBACION-REQUERIMIENTO-MASIVA');
    this.getListAprobadores(this.idRequerimiento);
  }

  // ngOnChanges() {
  //   this.getListAprobadores(this.idRequerimiento);
  // }

  cambioComboAprobadorFinal(event) {
    this.aprobadorSeleccionado = event;
  }

  getListAprobadores(id: number) {
    // this.requerimientoService
    //   .getAprobadoresFinales(id)
    //   .pipe(map((resp) => (this.dataListaAprobadorFinal = resp)))
    //   .subscribe();
    this.requerimientoService
      .getAprobadoresFinales(id)
      .subscribe(
        (resp) => {
          this.dataListaAprobadorFinal = (resp as IRequerimientoAprobador[]) ;
          // PONER EL APROBADOR POR DEFECTO
          const aprobador = this.dataListaAprobadorFinal.find(x => x.idUsuario === this.userContextService.getIdEmpleado());
          if (aprobador) {
            this.aprobadorSeleccionado = aprobador;
          }
        }
      );
  }

  clickGuardarAprobacion() {
    if (!this.validarAprobacion()) return;
    
    if (this.isModalAprobacionMasiva) {
      const bodyGuardar: IBodyAprobadorReqMasivolOutIn = {
        tipo: 'aprobar',
        idEstado: 3,
        aprobador: this.aprobadorSeleccionado,
        descripcion: this.desAprobacion,
      };
      this.guardarAprobacionMasiva.emit(bodyGuardar);
      this.isModalAprobacionMasiva = !this.isModalAprobacionMasiva;
    }
    if (this.isModalDesaprobacionMasiva) {
      const bodyGuardar: IBodyAprobadorReqMasivolOutIn = {
        tipo: 'desaprobar',
        idEstado: 4,
        aprobador: this.aprobadorSeleccionado,
        descripcion: this.desAprobacion,
      };
      this.guardarAprobacionMasiva.emit(bodyGuardar);
      this.isModalDesaprobacionMasiva = !this.isModalDesaprobacionMasiva;
    }
  }

  validarAprobacion(): boolean {
    if (!this.aprobadorSeleccionado) {
      this.mensajePrimeNgService.onToInfoMsg(null, 'Seleccione el Aprobador');
      return false;
    }

    return true;
  }

  clickCerrar() {
    this.cerrarModalEvent.emit();
  }

}
