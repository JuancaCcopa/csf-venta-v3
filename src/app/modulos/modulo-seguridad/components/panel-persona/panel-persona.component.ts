import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonaModel } from '../../models/persona.model';
import { SeguridadService } from '../../services/seguridad.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
// import { IMensajeResultadoApi } from '../../../modulo-compartido/models/mensaje-resultado-api';
import { Subscription } from 'rxjs';
// import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { ButtonAcces } from '../../models/acceso-button';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';

@Component({
  selector: 'app-panel-persona',
  templateUrl: './panel-persona.component.html',
  styleUrls: ['./panel-persona.component.css']
})
export class PanelPersonaComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Usuario';
  // Acceso de botones
  buttonAcces: ButtonAcces = new ButtonAcces();
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  // Opcion Buscar
  descripcionFind = '';
  modeloFind: PersonaModel;
  listModelo: PersonaModel[];

  columnas: any[];

  // Opcion Eliminar
  modeloEliminar: PersonaModel;

  subscription: Subscription;

  constructor(private seguridadService: SeguridadService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private breadcrumbService: BreadcrumbService
              // private menuDinamicoService: MenuDinamicoService
              ) {
                this.breadcrumbService.setItems([
                    { label: 'Módulo Seguridad' },
                    { label: 'Usuario', routerLink: ['module-se/panel-persona'] }
                ]);
              }

  ngOnInit() {
    this.columnas = [
      { header: 'Codigo' },
      { header: 'Usuario' },
      { header: 'Apellidos y Nombres' },
      { header: 'Nro Documento' },
      { header: 'Perfil' },
      { header: 'Centro Costo' },
      { header: 'Activo' }
    ];
    // this.subscription = new Subscription();
    // this.subscription = this.menuDinamicoService.getObtieneOpciones('app-panel-persona')
    // .subscribe(acces => {
    //   this.buttonAcces = acces;
    // });
    this.onListar();
  }

  onToBuscar() {
    this.onListar();
  }

  onListar() {

    this.modeloFind = {nombre: this.descripcionFind};
    this.subscription = new Subscription();
    this.subscription = this.seguridadService.getPersona(this.modeloFind)
    .subscribe((resp: PersonaModel[]) => {
      if (resp) {
          this.listModelo = resp;
        }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onToRowSelectEdit(modelo: PersonaModel) {
    this.router.navigate(['/main/modulo-se/persona-update', modelo.idPersona]);
  }


  onToRowSelectDelete(modelo: PersonaModel) {
    this.modeloEliminar = modelo;
    this.onConfirmDelete();
  }

  onToCreate() {
    this.router.navigate(['/main/modulo-se/persona-create']);
  }

  onConfirmDelete() {
    this.confirmationService.confirm({
        message: this.globalConstants.subTitleEliminar,
        header: this.globalConstants.titleEliminar,
        icon: 'pi pi-info-circle',
        acceptLabel: 'Si',
        rejectLabel: 'No',
        accept: () => {
          this.onToDelete();
        },
        reject: () => {
          this.mensajePrimeNgService.onToCancelMsg(this.globalConstants.msgCancelSummary, this.globalConstants.msgCancelDetail);
        }
    });
  }

  onToDelete() {
    this.subscription = new Subscription();
    this.subscription = this.seguridadService.setDeletePersona(this.modeloEliminar)
    .subscribe((resp: any) => {
      this.listModelo = this.listModelo.filter(datafilter => datafilter.idPersona !== this.modeloEliminar.idPersona );
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
