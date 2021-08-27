import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VentasService } from '../../../services/ventas.service';
import { MensajePrimeNgService } from '../../../../../services/mensaje-prime-ng.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { ISerieRegistrar } from '../../../interface/serie-por-maquina.interface';
import { SelectItem } from 'primeng';
import { ITabla } from '../../../interface/tabla.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-serie-por-comprobante-create',
  templateUrl: './serie-por-comprobante-create.component.html',
  styleUrls: ['./serie-por-comprobante-create.component.css']
})
export class SeriePorComprobanteCreateComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Serie de Comprobantes';

  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();
  listTablaTipoSerie: SelectItem[];
  maestroForm: FormGroup;

  subscription$: Subscription;

  constructor(private fb: FormBuilder,
              private ventasService: VentasService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
        { label: 'Módulo Ventas' },
        { label: 'Serie de Comprobantes', routerLink: ['module-ve/panel-serie-comprobante'] },
        { label: 'Nuevo'}
    ]);
  }

  ngOnInit(): void {
    this.onbuildForm();
    this.onListarTipoSerie();
  }

  onbuildForm() {
    this.maestroForm = this.fb.group(
      {
        'tiposerie' : new FormControl(null, Validators.compose([Validators.required])),
        'serie' : new FormControl('000', Validators.compose([Validators.required, Validators.maxLength(3), Validators.minLength(3)])),
        'correlativo' : new FormControl('0000000', Validators.compose([Validators.required, Validators.maxLength(7), Validators.minLength(7)]))
      }
    );
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

  onClickSave() {

    const body = this.maestroForm.value;

    let tiposerie = body.tiposerie === null ? '' : body.tiposerie.value;

    const serie: ISerieRegistrar = {
      tiposerie: tiposerie,
      serie: String(body.serie),
      correlativo: String(body.correlativo)
    };

    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.setSerieRegistrar(serie)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.back(); },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgErrorSummary, error.error);
    });
  }

  back() {
    this.router.navigate(['/main/modulo-ve/panel-serie-comprobante']);
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
