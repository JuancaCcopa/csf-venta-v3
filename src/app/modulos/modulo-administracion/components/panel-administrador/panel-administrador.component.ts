import { PanelPrincipalService } from './../../services/panel-principal.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { IAprobacionNotificacion } from '../../models/aprobacionNotificacion.interface';
import { UserContextService } from '../../../../services/user-context.service';

@Component({
  selector: 'app-panel-administrador',
  templateUrl: './panel-administrador.component.html',
  styleUrls: ['./panel-administrador.component.scss'],
})
export class PanelAdministradorComponent implements OnInit {
  rowNotificacion: IAprobacionNotificacion[] = [];
  mensajeBienvenida: string;

  constructor(private readonly principalService: PanelPrincipalService,
              private readonly userContextService: UserContextService) {}

  ngOnInit() {
    this.mensajeBienvenida = `Bievenido(a) ${this.userContextService.getNombreCompletoUsuario()}`

    const idUsuario = this.userContextService.getIdUsuario();
    const idAprobacionDoc = 1;
    this.principalService
      .getAprobacionNotificacion(idUsuario, idAprobacionDoc)
      .pipe(
        map((resp) => {
          this.rowNotificacion = resp;
          // const pruebaNotifiacion: IAprobacionNotificacion = {
          //   idAprobacionNotificacion: 0,
          //   idAprobacionDocumento: 0,
          //   idDocumento: 0,
          //   tipoNotificacion: 'DESAPROBADO',
          //   desAprobacionNotificacion: 'string',
          //   idAprobador: 0,
          //   isAprobadorTemporal: false,
          //   idUsuario: 0,
          //   regCreate: 'string',
          //   regCreateIdUsuario: 0,
          //   isAprobacionNotificacion: true,
          //   desAprobacionDocumento: 'string',
          // };
          // this.rowNotificacion.push(pruebaNotifiacion);
          console.log('NOTIFICACIONES', resp);
        })
      )
      .subscribe(
        (resp) => {
          console.log(resp);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  tipoNotificacion(tipo: string): string {
    switch (tipo) {
      case 'APROBADO':
        return 'aprobado-notificacion';
        break;
      case 'DESAPROBADO':
        return 'desaprobado-notificacion';
        break;
      default:
        return null;
        break;
    }
  }
}
