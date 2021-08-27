import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';
import { SelectItem } from 'primeng';
import { ISerie, ISeriePorMaquinaModificar, ISeriePorMaquina } from '../../../interface/serie-por-maquina.interface';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VentasService } from '../../../services/ventas.service';
import { MensajePrimeNgService } from '../../../../../services/mensaje-prime-ng.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BreadcrumbService } from '../../../../../services/breadcrumb.service';
import { map } from 'rxjs/operators';
import { IWarehouses } from '../../../../modulo-compartido/Ventas/interfaces/warehouses.interface';
import { ICentroCosto } from '../../../../modulo-administracion/models/aprobadorCentroCosto.interface';
import { ICentro } from '../../../../modulo-compartido/Ventas/interfaces/centro.interface';

@Component({
  selector: 'app-estacion-trabajo-update',
  templateUrl: './estacion-trabajo-update.component.html',
  styleUrls: ['./estacion-trabajo-update.component.css']
})
export class EstacionTrabajoUpdateComponent implements OnInit, OnDestroy {

  // Titulo del componente
  titulo = 'Estación de Trabajo';

  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  listSerieFactura: SelectItem[];
  listserieboleta: SelectItem[];
  listserienotacredito: SelectItem[];
  listserienotadebito: SelectItem[];
  listserieguia: SelectItem[];

  listSerie: ISerie[];

  modeloItem: ISeriePorMaquina;
  maestroForm: FormGroup;

  subscription$: Subscription;

  isCodAlmacen: string;
  isCodCentroCosto: string;

  id: number;

  constructor(private fb: FormBuilder,
              private ventasService: VentasService,
              public mensajePrimeNgService: MensajePrimeNgService,
              private router: Router,
              private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
        { label: 'Módulo Ventas' },
        { label: 'Estación de Trabajo', routerLink: ['module-ve/panel-estacion-trabajo'] },
        { label: 'Nuevo'}
    ]);
  }

  ngOnInit(): void {
    this.onbuildForm();
    this.onListaSerie();

    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      
      this.onSeriePorMaquinaPorId();
      
    });
  }

  onbuildForm() {
    this.maestroForm = this.fb.group(
      {
        'id' : new FormControl({value: null}, Validators.compose([Validators.required])),
        'nombremaquina' : new FormControl({value: null, disabled: true}, Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(3)])),
        'seriefactura' : new FormControl(null),
        'serieboleta' : new FormControl(null),
        'serienotacredito' : new FormControl(null),
        'serienotadebito' : new FormControl(null),
        'serieguia' : new FormControl(null),
        'codcentro' : new FormControl(null),
        'codalmacen' :  new FormControl(null)
      }
    );
  }

  onListaSerie() {
    this.listSerie = [];
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.getListSeriePorTipoSerie('')
    .pipe(
      map((resp: ISerie[]) => {
        this.listSerie = resp;

        this.listSerieFactura = [];
        this.listserieboleta = [];
        this.listserienotacredito = [];
        this.listserienotadebito = [];
        this.listserieguia = [];

        for (let item of this.listSerie) {
          if(item.tiposerie === 'F'){
            this.listSerieFactura.push({ value: item.serie.trim(), label: item.serie.trim() })
          }
          if(item.tiposerie === 'B'){
            this.listserieboleta.push({ value: item.serie.trim(), label: item.serie.trim() })
          }
          if(item.tiposerie === 'C'){
            this.listserienotacredito.push({ value: item.serie.trim(), label: item.serie.trim() })
          }
          if(item.tiposerie === 'D'){
            this.listserienotadebito.push({ value: item.serie.trim(), label: item.serie.trim() })
          }
          if(item.tiposerie === 'G'){
            this.listserieguia.push({ value: item.serie.trim(), label: item.serie.trim() })
          }
        }
      })
    )
    .subscribe();
  }

  private onSeriePorMaquinaPorId() {
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.getSeriePorMaquinaPorId(Number(this.id))
    .subscribe((data: ISeriePorMaquina) => {

      this.modeloItem = data;
      this.isCodAlmacen = this.modeloItem.codalmacen;
      this.isCodCentroCosto = this.modeloItem.codcentro;
      this.maestroForm.patchValue({
        id: this.modeloItem.id,
        nombremaquina: this.modeloItem.nombremaquina,
        seriefactura: this.onGeneraItemSeleccionado(this.modeloItem.seriefactura),
        serieboleta: this.onGeneraItemSeleccionado(this.modeloItem.serieboleta),
        serienotacredito: this.onGeneraItemSeleccionado(this.modeloItem.serienotacredito),
        serienotadebito: this.onGeneraItemSeleccionado(this.modeloItem.serienotadebito),
        serieguia: this.onGeneraItemSeleccionado(this.modeloItem.serieguia),
        codcentro: this.modeloItem.codcentro,
        codalmacen: this.modeloItem.codalmacen
      });
    });
  }

  onGeneraItemSeleccionado(serie: string): any {

    var data = null;

    if (serie === null) {
      return data = null;
    }

    if (serie.trim() === '') {
      return data = null;
    }

    data = { value: serie.trim(), label: serie.trim() }

    return data;
  }

  goAlmacenSeleccionado(item: IWarehouses) {
    this.maestroForm.patchValue({
      codalmacen: item.warehouseCode
    });
  }

  goCentroCostoSeleccionado(item: ICentro) {
    this.maestroForm.patchValue({
      codcentro: item.codcentro
    });
  }

  onClickSave() {

    const body = this.maestroForm.value;

    let seriefactura = body.seriefactura === null ? null : body.seriefactura.value;
    let serieboleta = body.serieboleta === null ? null : body.serieboleta.value;
    let serienotacredito = body.serienotacredito === null ? null : body.serienotacredito.value;
    let serienotadebito = body.serienotadebito === null ? null : body.serienotadebito.value;
    let serieguia = body.serieguia === null ? null : body.serieguia.value;

    const seriePorMaquinaModificar: ISeriePorMaquinaModificar = {
      id: body.id,
      seriefactura: seriefactura,
      serieboleta: serieboleta,
      serienotacredito: serienotacredito,
      serienotadebito: serienotadebito,
      serieguia: serieguia,
      codcentro: body.codcentro,
      codalmacen: body.codalmacen
    };

    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.setSeriePorMaquinaModificar(seriePorMaquinaModificar)
    .subscribe(() =>  {
      this.mensajePrimeNgService.onToExitoMsg(this.globalConstants.msgExitoSummary, this.globalConstants.msgExitoDetail);
      this.back(); },
      (error) => {
        this.mensajePrimeNgService.onToErrorMsg(this.globalConstants.msgErrorSummary, error.error);
    });
  }

  back() {
    this.router.navigate(['/main/modulo-ve/panel-estacion-trabajo']);
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
