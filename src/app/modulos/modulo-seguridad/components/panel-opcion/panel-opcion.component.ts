import { Component, OnInit, OnDestroy } from '@angular/core';
import { TreeNode } from 'primeng';
import { MenuModel } from '../../models/menu.model';
import { SeguridadService } from '../../services/seguridad.service';
import { CustomMenuItem } from '../../models/menu-item.model';
import { OpcionModel } from '../../models/opcion.model';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { Subscription } from 'rxjs';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { ButtonAcces } from '../../models/acceso-button';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';

@Component({
  selector: 'app-panel-opcion',
  templateUrl: './panel-opcion.component.html',
  styleUrls: ['./panel-opcion.component.css']
})
export class PanelOpcionComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Opcion';
  // Acceso de botones
  buttonAcces: ButtonAcces = new ButtonAcces();
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  items: TreeNode[] = [];
  itemSelected: TreeNode;
  modelo: MenuModel;
  listModel: MenuModel[] = [];

  customMenuItem: CustomMenuItem;
  customMenuItemChildren: CustomMenuItem;

  columnas: any[];
  listModelo: OpcionModel[];
  // Opcion Editar
  modelocloned: { [s: string]: OpcionModel; } = {};

  // Opcion Eliminar
  modeloEliminar: OpcionModel;

  subscription: Subscription;

  constructor(private seguridadService: SeguridadService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([
                  { label: 'Módulo Seguridad' },
                  { label: 'Opción', routerLink: ['module-se/panel-opcion'] }
              ]);
              }

  ngOnInit() {
      this.getListaMenu();

      this.columnas = [
        { header: 'Codigo' },
        { header: 'Descripcion' },
        { header: 'KeyOpcion' }
      ];

      // this.subscription = new Subscription();
      // this.subscription = this.menuDinamicoService.getObtieneOpciones('app-panel-opcion')
      // .subscribe(acces => {
      //   this.buttonAcces = acces;
      // });
  }

  getListaMenu() {
    this.items = [];
    this.subscription = new Subscription();
    this.subscription = this.seguridadService.getMenuAll()
    .subscribe(data => {
      this.listModel = data;
      for (const menu of this.listModel.filter(x => x.idMenuPadre === 0)) {

        this.customMenuItem = {
          label : menu.descripcionTitulo,
          data: menu,
          icon: menu.icono,
          children: []
        };

        for (const chlidernLevelOne of this.listModel.filter(x => x.idMenuPadre === menu.idMenu)) {
          this.customMenuItemChildren = {
            label: chlidernLevelOne.descripcionTitulo,
            data: chlidernLevelOne,
            icon: chlidernLevelOne.icono,
            children: []
          };

          for (const chlidernLevelTwo of this.listModel.filter(x => x.idMenuPadre === chlidernLevelOne.idMenu)) {
            this.customMenuItemChildren.children.push({
              label: chlidernLevelTwo.descripcionTitulo,
              data: chlidernLevelTwo,
              icon: chlidernLevelTwo.icono
            });
          }

          this.customMenuItem.children.push(this.customMenuItemChildren);

        }
        this.items.push(this.customMenuItem);
      }
    });
  }

  nodeSelect(menu: any)
  {
    this.itemSelected = menu;
    this.modelo = menu.data;

    this.onListar(this.modelo.idMenu);
  }


  onListar(idMenu: number) {

    this.subscription = new Subscription();
    this.subscription = this.seguridadService.getOpcion(idMenu)
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

  onRowEditInit(modelo: OpcionModel) {
    this.modelocloned[modelo.idOpcion] = {...modelo};
  }

  onRowEditSave(modelo: OpcionModel) {
    this.subscription = new Subscription();
    this.subscription = this.seguridadService.setUpdateOpcion(modelo)
    .subscribe((resp: any) => {
      delete this.modelocloned[modelo.idOpcion];
      this.mensajePrimeNgService.onToExitoMsg(null, resp);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      });
  }

  onRowEditCancel(modelo: OpcionModel, index: number) {
    this.listModelo[index] = this.modelocloned[modelo.idOpcion];
    delete this.modelocloned[modelo.idOpcion];
  }

  onToRowSelectDelete(modelo: OpcionModel) {
    this.modeloEliminar = modelo;
    this.onConfirmDelete();
  }

  onToCreate() {
    this.router.navigate(['/main/modulo-se/opcion-create', this.modelo.idMenu]);
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
    this.subscription = this.seguridadService.setDeleteOpcion(this.modeloEliminar)
    .subscribe((resp: any) => {
      this.listModelo = this.listModelo.filter(datafilter => datafilter.idOpcion !== this.modeloEliminar.idOpcion );
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
