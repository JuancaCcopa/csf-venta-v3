import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';

@Component({
  selector: 'app-panel-sala-operacion',
  templateUrl: './panel-sala-operacion.component.html',
  styleUrls: ['./panel-sala-operacion.component.css']
})
export class PanelSalaOperacionComponent implements OnInit {

  constructor(private readonly breadcrumbService: BreadcrumbService,
              private readonly router: Router) { 
    this.breadcrumbService.setItems([
      { label: 'Módulo Venta' },
      { label: 'Sala Operación', routerLink: ['module-ve/panel-venta'] }
    ]);
  }

  ngOnInit(): void {
  }

  getVerDetalle() {
    console.log('object');
    this.router.navigate(['/main/modulo-ve/sala-operacion-create']);
  }
}
