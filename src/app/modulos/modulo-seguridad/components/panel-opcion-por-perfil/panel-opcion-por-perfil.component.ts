import { Component, OnInit, OnDestroy } from '@angular/core';
import { TreeNode, SelectItem } from 'primeng';
import { CustomMenuItem } from '../../models/menu-item.model';
import { SeguridadService } from '../../services/seguridad.service';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { MenuModel } from '../../models/menu.model';
import { OpcionPorPerfilModel } from '../../models/opcion-por-perfil';
import { PerfilModel } from '../../models/pefil.model';
import { Subscription } from 'rxjs';
// import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { UserContextService } from '../../../../services/user-context.service';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { ButtonAcces } from '../../models/acceso-button';
import { VariablesGlobales } from '../../../../interface/variables-globales';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';

@Component({
  selector: 'app-panel-opcion-por-perfil',
  templateUrl: './panel-opcion-por-perfil.component.html',
  styleUrls: ['./panel-opcion-por-perfil.component.css']
})
export class PanelOpcionPorPerfilComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Opciones por Perfil';
  // Acceso de botones
  buttonAcces: ButtonAcces = new ButtonAcces();
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  items: TreeNode[] = [];
  itemSelected: TreeNode;
  modelo: MenuModel;
  modeloPerfil: PerfilModel = new PerfilModel();

  listModel: MenuModel[];
  listModelSeleccionado: OpcionPorPerfilModel[] = [];
  listModelPorSeleccionar: OpcionPorPerfilModel[] = [];
  listItemPerfil: SelectItem[];
  customMenuItem: CustomMenuItem;
  customMenuItemChildren: CustomMenuItem;

  perfilSelected: any;

  subscription: Subscription;

  constructor(private seguridadService: SeguridadService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private breadcrumbService: BreadcrumbService,
              // private menuDinamicoService: MenuDinamicoService,
              private userContextService: UserContextService) {
                this.breadcrumbService.setItems([
                  { label: 'Módulo Seguridad' },
                  { label: 'Opción por Perfil', routerLink: ['module-se/panel-opcion-por-perfil'] }
              ]);
              }

  ngOnInit() {
    // this.subscription = new Subscription();
    // this.subscription = this.menuDinamicoService.getObtieneOpciones('app-panel-opcion-por-perfil')
    // .subscribe(acces => {
    //   this.buttonAcces = acces;
    // });

    this.getListaMenu();

    this.getToObtienePerfil();
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

  getToObtienePerfil() {
    this.subscription = new Subscription();
    this.subscription = this.seguridadService.getPerfil(this.modeloPerfil)
    .subscribe((data: PerfilModel[]) => {
      this.listItemPerfil = [];
      for (let item of data) {
        this.listItemPerfil.push({ label: item.descripcionPerfil, value: item.idPerfil });
      }
    });
  }

  onChangePerfil() {
    let menu = this.modelo ? this.modelo.idMenu : 0;
    this.onListar(menu);
  }

  nodeSelect(menu: any)
  {
    this.itemSelected = menu;
    this.modelo = menu.data;

    this.onListar(this.modelo.idMenu);
  }

  onListar(idMenu: number) {

    let perfil = this.perfilSelected ? this.perfilSelected.value : 0  ;

    this.subscription = new Subscription();
    this.subscription = this.seguridadService.getPorSeleccionarOpcionPorPerfil(idMenu, perfil )
    .subscribe(resp => {
      if (resp) {
          this.listModelPorSeleccionar = resp;
        }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );

    this.subscription = new Subscription();
    this.subscription = this.seguridadService.getSeleccionadoOpcionPorPerfil(idMenu, perfil)
    .subscribe(resp => {
      if (resp) {
          this.listModelSeleccionado = resp;
        }
      },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(null, error);
      }
    );
  }

  onToMoveToTarget(items: OpcionPorPerfilModel[]) {
    this.setCreateItem(items);
  }

  onToMoveToSource(items: OpcionPorPerfilModel[]) {
    this.setDeleteItem(items);
  }

  onToMoveAllToTarget(items: OpcionPorPerfilModel[]) {
    this.setCreateItem(items);
  }

  onToMoveAllToSource(items: OpcionPorPerfilModel[]) {
    this.setDeleteItem(items);
  }

  setCreateItem(event: OpcionPorPerfilModel[]) {

    if (!this.perfilSelected) {
      this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, 'Seleccionar un Perfil');
      return;
    }

    event.map(dato => {
      dato.idPerfil = this.perfilSelected.value,
      dato.regUsuario = this.userContextService.getIdUsuario(),
      dato.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo

      return dato;
    });

    this.subscription = new Subscription();
    this.subscription = this.seguridadService.setInsertOpcionPorPerfil(event)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  setDeleteItem(event: OpcionPorPerfilModel[]) {

    event.map(dato => {
      dato.idPerfil = this.perfilSelected.value,
      dato.regUsuario = this.userContextService.getIdUsuario(),
      dato.regEstacion = VariablesGlobales._DISPOSITIVO.nombreDispositivo
      return dato;
    });

    this.subscription = new Subscription();
    this.subscription = this.seguridadService.setDeleteOpcionPorPerfil(event)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
    },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgExitoSummary, error);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
