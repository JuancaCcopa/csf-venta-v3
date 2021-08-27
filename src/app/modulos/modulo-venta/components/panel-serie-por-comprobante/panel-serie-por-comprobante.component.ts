import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { ISerie } from '../../interface/serie-por-maquina.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { MensajePrimeNgService } from '../../../../services/mensaje-prime-ng.service';
import { ConfirmationService } from 'primeng/api';
import { VentasService } from '../../services/ventas.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ITabla } from '../../interface/tabla.interface';
import { SelectItem } from 'primeng';

@Component({
  selector: 'app-panel-serie-por-comprobante',
  templateUrl: './panel-serie-por-comprobante.component.html',
  styleUrls: ['./panel-serie-por-comprobante.component.css']
})
export class PanelSeriePorComprobanteComponent implements OnInit, OnDestroy {
  // Titulo del componente
  titulo = 'Serie de Comprobantes';
  tituloDetalle = "Venta"
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  listModelo: ISerie[];
  modeloItem: ISerie;
  listTablaTipoSerie: SelectItem[];
  columnas: any;

  // Formulario
  formularioBusqueda: FormGroup;

  subscription$: Subscription;

  constructor(private readonly breadcrumbService: BreadcrumbService,
              public readonly mensajePrimeNgService: MensajePrimeNgService,
              private readonly formBuilder: FormBuilder,
              private readonly confirmationService: ConfirmationService,
              private readonly ventasService: VentasService,
              private readonly router: Router) {
    this.breadcrumbService.setItems([
      { label: 'Módulo Venta' },
      { label: 'Serie de Comprobantes', routerLink: ['module-ve/panel-serie-comprobante'] }
    ]);
  }

  ngOnInit(): void {
  
    this.buildForm();    

    this.onHeaderGrilla();
    this.onListarTipoSerie();
    this.goListar();
  }

  private buildForm() {
    this.formularioBusqueda = this.formBuilder.group({
      tiposerie: [null]
    });
  }

  private onHeaderGrilla() {
    this.columnas = [
      { field: 'tiposerienombre', header: 'Tipo Serie' },
      { field: 'serie', header: 'Serie' },
      { field: 'correlativo', header: 'Correlativo' },
      { field: 'flg_electronico', header: 'Electrónico' },
      { field: 'flg_otorgar', header: 'Otorgar' },
      { field: 'formato_electronico', header: 'Formato Electrónico' }
    ];
  }

  private onListarTipoSerie(){
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.getListTablaLogisticaPorFiltros('TIPOCOMPROBANTE_CONSERIELOG   ', '', 34, 0, -1)
    .pipe(
      map((resp: ITabla[]) => {
        this.listTablaTipoSerie = [];
        for (let item of resp) {
          this.listTablaTipoSerie.push({ value: item.codigo.trim(), label: item.nombre.trim() })
        }
      })
    )
    .subscribe();
  }

  goListar() {
    const body = this.formularioBusqueda.value;

    let tiposerie = body.tiposerie === null ? '' : body.tiposerie.value;

    this.listModelo = [];
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.getListSeriePorTipoSerie(tiposerie)
    .pipe(
      map((resp: ISerie[]) => {
        this.listModelo = resp;
      })
    )
    .subscribe();
  }

  goToCreate() {
    this.router.navigate(['/main/modulo-ve/serie-comprobante-create']);
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
