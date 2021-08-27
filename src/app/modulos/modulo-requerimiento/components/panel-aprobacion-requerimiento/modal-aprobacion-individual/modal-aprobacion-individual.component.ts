import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IRequerimiento } from '../../../models/requerimiento.interface';
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';
import { IRequerimientoAprobador, IBodyAprobadorReqIndividualOutIn } from '../../../models/aprobacionRequerimiento.interface';
import { MensajePrimeNgService } from '../../../../../services/mensaje-prime-ng.service';
import { SessionService } from '../../../../../services/session.service';
import { RequerimientoService } from '../../../services/requerimiento.service';
import { UserContextService } from '../../../../../services/user-context.service';

@Component({
  selector: 'app-modal-aprobacion-individual',
  templateUrl: './modal-aprobacion-individual.component.html',
  styleUrls: ['./modal-aprobacion-individual.component.css']
})
export class ModalAprobacionIndividualComponent implements OnInit {
  
  //@Input() idRequerimiento: number;
  @Input() requerimiento: IRequerimiento;
  @Input() isModalAprobar = false;
  @Input() isModalDesaprobar = false;
  @Input() titulo: string;
  @Output() cerrarModal = new EventEmitter();
  @Output() guardarAprobacionIndividual = new EventEmitter();

  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;
  desAprobacion: string;
  dataListaAprobadorFinal: IRequerimientoAprobador[] = [];
  aprobadorSeleccionado: IRequerimientoAprobador;

  constructor(private readonly requerimientoService: RequerimientoService,
              private readonly servicioLogin: SessionService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private readonly userContextService: UserContextService) {}

  ngOnInit() {
    console.log('INIT MODAL-APROBACION-INDIVIDUAL');
    this.getListAprobadores(this.requerimiento.idRequerimiento, this.requerimiento.origen);
  }

  getListAprobadores(id: number, origen: string) {
    this.requerimientoService
      .getRequerimentoAprobadorList(id, origen)
      .subscribe(
        (resp) => {
          this.dataListaAprobadorFinal = resp;
          if (this.dataListaAprobadorFinal.length > 0) {
            // PONER EL APROBADOR POR DEFECTO
            const aprobador = this.dataListaAprobadorFinal.find(x => x.idUsuario === this.userContextService.getIdUsuario());
            if (aprobador) {
              this.aprobadorSeleccionado = aprobador;
            }
          } else {
            this.mensajePrimeNgService.onToInfoMsg(null, 'No existen Usuarios pendientes para el Registro');
            this.cerrarModal.emit();
          }
        }
      );
      
  }

  cambioComboAprobadorFinal(event) {
    this.aprobadorSeleccionado = event;
  }

  clickGuardarAprobacion() {
    if (!this.validarAprobacion()) return;

    if (this.isModalAprobar) {
      const bodyGuardar: IBodyAprobadorReqIndividualOutIn = {
        tipo: 'aprobar',
        aprobador: this.aprobadorSeleccionado,
        descripcion: this.desAprobacion,
      };
      this.guardarAprobacionIndividual.emit(bodyGuardar);
    }
    if (this.isModalDesaprobar) {
      const bodyGuardar: IBodyAprobadorReqIndividualOutIn = {
        tipo: 'desaprobar',
        aprobador: this.aprobadorSeleccionado,
        descripcion: this.desAprobacion,
      };
      this.guardarAprobacionIndividual.emit(bodyGuardar);
    }
  }

  clickCerrar() {
    this.cerrarModal.emit();
  }

  validarAprobacion(): boolean {
    if (!this.aprobadorSeleccionado) {
      this.mensajePrimeNgService.onToInfoMsg(null, 'Seleccione el Aprobador');
      return false;
    }

    return true;
  }

}
