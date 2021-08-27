import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectItem } from 'primeng';
import { GlobalsConstantsForm } from '../../../../constants/globals-constants-form';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import swal from'sweetalert2';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ITabla } from '../../interface/tabla.interface';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { VentasService } from '../../services/ventas.service';
import { IHospital } from '../../interface/venta.interface';

@Component({
  selector: 'app-panel-pedidos-por-paciente',
  templateUrl: './panel-pedidos-por-paciente.component.html',
  styleUrls: ['./panel-pedidos-por-paciente.component.css']
})
export class PanelPedidosPorPacienteComponent implements OnInit, OnDestroy {
  // Titulo del componente
  titulo = 'Paciente de Clínica';
  // Name de los botones de accion
  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  listModelo: IHospital[];
  listTablaPiso: SelectItem[];
  listTablaPabellon: SelectItem[];

  columnas: any;

  // Formulario
  formularioBusqueda: FormGroup;

  subscription$: Subscription;

  isVisible: boolean;

  isModeloHospital: IHospital;

  // loading
  loading: boolean;

  constructor(private breadcrumbService: BreadcrumbService,
              private readonly formBuilder: FormBuilder,
              private readonly ventasService: VentasService) {
    this.breadcrumbService.setItems([
      { label: 'Módulo Venta' },
      { label: 'Consulta', routerLink: ['module-ve/panel-venta'] }
    ]);
  }

  ngOnInit(): void {
    this.buildForm();
    this.onHeaderGrilla();

    this.onListarPabellon();
    this.onListarPisos();
  }

  private buildForm() {
    this.formularioBusqueda = this.formBuilder.group({
      piso: [null],
      pabellon: [null],
    });
  }

  private onHeaderGrilla() {
    this.columnas = [
      { field: 'cama', header: 'Cama' },
      { field: 'codatencion', header: 'Atención' },
      { field: 'fechainicio', header: 'Fecha Ing.' },
      { field: 'nombres', header: 'Apellidos y Nombres' },
      { field: 'edad', header: 'Edad' },
      { field: 'sexo', header: 'Sexo' },
      { field: 'nombremedico', header: 'Medico' },
      { field: 'polizaplan', header: 'Poliza' },
      { field: 'codpaciente', header: 'His. Cli.' },
      { field: 'nombreaseguradora', header: 'Nombre aseguradora' }
    ];
  }

  onListarPabellon(){
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.getListTablaClinicaPorFiltros('PABELLON', '', 34, 0, 5)
    .pipe(
      map((resp: ITabla[]) => {
        this.listTablaPabellon = [];
        for (let item of resp) {
          this.listTablaPabellon.push({ value: item.codigo.trim(), label: item.nombre.trim() })
        }
      })
    )
    .subscribe(
      (resp) => {},
      (error) => {
        swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion,'error')
      }
    );
  }

  onListarPisos(){
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.getListTablaClinicaPorFiltros('PISOS', '', 34, 0, 5)
    .pipe(
      map((resp: ITabla[]) => {
        this.listTablaPiso = [];
        for (let item of resp) {
          this.listTablaPiso.push({ value: item.codigo.trim(), label: item.nombre.trim() })
        }
      })
    )
    .subscribe(
      (resp) => {},
      (error) => {
        swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion,'error')
      }
    );
  }

  goListarPacienteClinica(){

    const body = this.formularioBusqueda.value;

    if (body.pabellon === null) {
      return;
    }

    if (body.piso === null) {
      return;
    }

    this.loading = true;
    this.subscription$ = new Subscription();
    this.subscription$ = this.ventasService.getListHospitalPacienteClinicaPorFiltros(body.pabellon.value, body.piso.value, '0')
    .pipe(
      map((resp: IHospital[]) => {
        this.listModelo = [];
        this.listModelo = resp;
        this.loading = false;
      })
    )
    .subscribe(
      (resp) => {},
      (error) => {
        this.loading = false;
        swal.fire(this.globalConstants.msgErrorSummary, error.error.resultadoDescripcion,'error')
      }
    );
  }

  goPedidosFarmaciaPorAtencion(hospital: IHospital) {
    this.isModeloHospital = hospital;
    this.isVisible = !this.isVisible;
  }

  goCerrarPedidosFarmaciaPorAtencion() {
    this.isVisible = !this.isVisible;
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
