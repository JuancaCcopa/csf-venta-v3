import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { UserContextService } from '../../services/user-context.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nombre: string;
  imagen: string;

  isVisibleInformacionGeneral: boolean;

  constructor(public app: LayoutComponent,
              private readonly userContextService: UserContextService,
              private sessionService: SessionService) { }

  ngOnInit(): void {
    this.profile();
  }

  profile() {
    this.nombre = this.sessionService.getItemDecrypt('nombre');
    this.imagen = this.sessionService.getItemDecrypt('imagen');
  }

  onDescargaDocumento(event: any) {
    
  }

  onLogout(event) {
    event.preventDefault();
    this.userContextService.logout();
  }

  onMuestraInformacionGeneral() {
    this.isVisibleInformacionGeneral = !this.isVisibleInformacionGeneral;
  }

}
