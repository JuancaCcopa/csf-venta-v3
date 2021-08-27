import { Component, OnInit, OnDestroy } from '@angular/core';
import { PerfilModel } from '../../models/pefil.model';
import { SeguridadService } from '../../services/seguridad.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { Subscription } from 'rxjs';
// import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { ButtonAcces } from '../../models/acceso-button';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';

@Component({
  selector: 'app-panel-perfil',
  templateUrl: './panel-perfil.component.html',
  styleUrls: ['./panel-perfil.component.css']
})
export class PanelPerfilComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Perfil';
  // Acceso de botones
  buttonAcces: ButtonAcces = new ButtonAcces();
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  // Opcion Buscar
  descripcionFind = '';
  modeloFind: PerfilModel;
  listModelo: PerfilModel[];

  columnas: any[];

  // Opcion Editar
  modelocloned: { [s: string]: PerfilModel; } = {};

  // Opcion Eliminar
  modeloEliminar: PerfilModel;

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
                    { label: 'Perfil', routerLink: ['module-se/panel-perfil'] }
                ]);
              }

  ngOnInit() {
    this.columnas = [
      { header: 'Codigo' },
      { header: 'Descripcion' },
      { header: 'Activo' }
    ];
    // this.subscription = new Subscription();
    // this.subscription = this.menuDinamicoService.getObtieneOpciones('app-panel-perfil')
    // .subscribe(acces => {
    //   this.buttonAcces = acces;
    // });
    this.onListar();
  }

  onToBuscar() {
    this.onListar();
  }

  onListar() {

    this.modeloFind = {descripcionPerfil: this.descripcionFind};
    this.subscription = new Subscription();
    this.subscription = this.seguridadService.getPerfil(this.modeloFind)
    .subscribe(resp => {
      if (resp) {
          this.listModelo = resp;
        }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onRowEditInit(modelo: PerfilModel) {
    this.modelocloned[modelo.idPerfil] = {...modelo};
  }

  onRowEditSave(modelo: PerfilModel) {
    this.subscription = new Subscription();
    this.subscription = this.seguridadService.setUpdatePerfil(modelo)
    .subscribe((resp: any) => {
      delete this.modelocloned[modelo.idPerfil];
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  onRowEditCancel(modelo: PerfilModel, index: number) {
    this.listModelo[index] = this.modelocloned[modelo.idPerfil];
    delete this.modelocloned[modelo.idPerfil];
  }

  onToRowSelectDelete(modelo: PerfilModel) {
    this.modeloEliminar = modelo;
    this.onConfirmDelete();
  }

  onToCreate() {
    this.router.navigate(['/main/modulo-se/perfil-create']);
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
    this.subscription = this.seguridadService.setDeletePerfil(this.modeloEliminar)
    .subscribe((resp: any) => {
      this.listModelo = this.listModelo.filter(datafilter => datafilter.idPerfil !== this.modeloEliminar.idPerfil );
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
