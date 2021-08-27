import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { interfaceUsuario } from '../../../../modulo-administracion/models/usuario.interface';
import { ConstantesGenerales } from '../../../../../constants/Constantes-generales';
import { AdminAprobadorService } from '../../../../modulo-administracion/services/aprobador.service';
import { map } from 'rxjs/operators';
import { GlobalsConstantsForm } from '../../../../../constants/globals-constants-form';

@Component({
  selector: 'app-modal-busqueda-usuario',
  templateUrl: './modal-busqueda-usuario.component.html',
  styleUrls: ['./modal-busqueda-usuario.component.css']
})
export class ModalBusquedaUsuarioComponent implements OnInit {
  @Input() isDisplayBusquedaUsuario;
  @Output() usuarioSeleccionado = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  globalConstants: GlobalsConstantsForm = new GlobalsConstantsForm();

  rowDatosUsuarios: interfaceUsuario[] = [];
  cols: any;
  selecionUsuario: any;
  loading = true;
  timeAnimationModal = ConstantesGenerales.DURACION_ANIMACION_MODAL;
  constructor(
    private AprobadorAdminService: AdminAprobadorService
  ) {}

  ngOnInit(): void {
    this.cabeceraTabla();
    this.getUsuarios();
  }
  cabeceraTabla() {
    this.cols = [
      { field: 'nombresApellidos', header: 'Usuario' },
      { field: 'codCentroCosto', header: 'Cod Centro Costo' },
      { field: 'desCentroCosto', header: 'Centro Costo' },
    ];
  }

  getUsuarios(): void {
    this.AprobadorAdminService.getUsuario()
      .pipe(
        map((resp) => {
          this.rowDatosUsuarios = resp;
        })
      )
      .subscribe(
        (result) => {
          this.loading = false;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  clickAceptar() {
    this.usuarioSeleccionado.emit(this.selecionUsuario);
  }
  clickCancelar() {
    this.cancel.emit();
  }
}
