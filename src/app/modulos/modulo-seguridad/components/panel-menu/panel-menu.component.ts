import { Component, OnInit, OnDestroy } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { SeguridadService } from '../../services/seguridad.service';
import { MenuModel } from '../../models/menu.model';
import { CustomMenuItem } from '../../models/menu-item.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
// import { MenuDinamicoService } from '../../../../services/menu-dinamico.service';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { ButtonAcces } from '../../models/acceso-button';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';

@Component({
  selector: 'app-panel-menu',
  templateUrl: './panel-menu.component.html',
  styleUrls: ['./panel-menu.component.css']
})
export class PanelMenuComponent implements OnInit, OnDestroy {

  // Acceso de botones
  buttonAcces: ButtonAcces = new ButtonAcces();
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  items: TreeNode[] = [];
  itemSelected: TreeNode;
  modelo: MenuModel;
  modeloNew: MenuModel;
  listModel: MenuModel[] = [];
  customMenuItem: CustomMenuItem;
  customMenuItemChildren: CustomMenuItem;

  modeloForm: FormGroup;

  evenObservable: Observable<MenuModel>;

  subscription: Subscription;

  constructor(private seguridadService: SeguridadService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private fb: FormBuilder,
              // private menuDinamicoService: MenuDinamicoService,
              private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: 'Módulo Seguridad' },
      { label: 'Menu', routerLink: ['module-se/panel-menu'] }
    ]);
  }

  ngOnInit() {
    this.getListaMenu();

    this.getInicializaForm();

    // this.subscription = new Subscription();
    // this.subscription = this.menuDinamicoService.getObtieneOpciones('app-panel-menu')
    // .subscribe(acces => {
    //   this.buttonAcces = acces;
    // });
  }

  getInicializaForm() {
    this.modeloForm = this.fb.group(
      {
        'idMenu' : new FormControl({value: '', disabled: true}, Validators.compose([Validators.required])),
        'descripcionTitulo' : new FormControl('', Validators.compose([Validators.required])),
        'icono' : new FormControl('', Validators.compose([Validators.required])),
        'url' : new FormControl('', Validators.compose([Validators.required])),
        'nroNivel' : new FormControl(''),
        'flgActivo' : new FormControl('', Validators.compose([Validators.required])),
        'idMenuPadre' : new FormControl('', Validators.compose([Validators.required])),
        'nombreFormulario' : new FormControl('')
      }
    );
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
    this.goDataForm(this.modelo);
  }

  goNewPadre()
  {
    this.modeloNew = {...this.modelo};
    this.modeloNew.idMenu = 0;
    this.modeloNew.descripcionTitulo = '';
    this.modeloNew.icono = 'fa fa-fw fa-gg';
    this.modeloNew.url = '/';

    if (this.itemSelected.parent === undefined) {
      this.modeloNew.idMenuPadre = 0;
      this.modeloNew.nroNivel = 1;
    } else {
      this.modeloNew.idMenuPadre = this.itemSelected.parent.data.idMenuPadre;
      this.modeloNew.nroNivel = this.itemSelected.parent.data.nroNivel;
    }
    this.goDataForm(this.modeloNew);
  }

  goDataForm(modeloMenu: MenuModel) {
    this.modeloForm.controls['idMenu'].setValue(modeloMenu.idMenu);
    this.modeloForm.controls['descripcionTitulo'].setValue(modeloMenu.descripcionTitulo);
    this.modeloForm.controls['icono'].setValue(modeloMenu.icono);
    this.modeloForm.controls['url'].setValue(modeloMenu.url);
    this.modeloForm.controls['flgActivo'].setValue(modeloMenu.flgActivo);
    this.modeloForm.controls['idMenuPadre'].setValue(modeloMenu.idMenuPadre);
    this.modeloForm.controls['nroNivel'].setValue(modeloMenu.nroNivel);
    this.modeloForm.controls['nombreFormulario'].setValue(modeloMenu.nombreFormulario);
  }

  goNewChildren()
  {
    this.modeloNew = {...this.modelo};

    if (this.modeloNew.nroNivel === 3 ) {
     this.mensajePrimeNgService.onToCancelMsg(this.globalConstants.msgCancelSummary, 'Comunicarse con el Area de TI');
     return;
    }
    this.modeloNew.idMenuPadre = this.modeloNew.idMenu;
    this.modeloNew.idMenu = 0;
    this.modeloNew.descripcionTitulo = '';
    this.modeloNew.icono = 'fa fa-fw fa-gg';
    this.modeloNew.url = '/';
    this.modeloNew.nroNivel = this.modeloNew.nroNivel + 1;
    this.goDataForm(this.modeloNew);
  }

  onClickSave() {

    this.modelo.idMenu = Number(this.modeloForm.controls['idMenu'].value);
    this.modelo.descripcionTitulo = this.modeloForm.controls['descripcionTitulo'].value;
    this.modelo.icono = this.modeloForm.controls['icono'].value;
    this.modelo.url = this.modeloForm.controls['url'].value;
    this.modelo.flgActivo = Boolean(this.modeloForm.controls['flgActivo'].value);
    this.modelo.idMenuPadre = Number(this.modeloForm.controls['idMenuPadre'].value);
    this.modelo.nroNivel = Number(this.modeloForm.controls['nroNivel'].value);
    this.modelo.nombreFormulario = this.modeloForm.controls['nombreFormulario'].value;

    if (this.modelo.idMenu === 0) {
      this.evenObservable = this.seguridadService.setInsertMenu(this.modelo);
    } else {
      this.evenObservable = this.seguridadService.setUpdateMenu(this.modelo);
    }

    this.subscription = new Subscription();
    this.subscription = this.evenObservable.subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.getListaMenu(); },
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
