import { Component, OnInit, Input } from '@angular/core';
import { LayoutComponent } from '../layout.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

 @Input() model: any[];

  constructor(public app: LayoutComponent) { }

  ngOnInit() {
    //   this.model = [
    //       { label: 'Dashboard', icon: 'fa fa-fw fa-dashboard' },
          // {
          //     label: 'Components', icon: 'fa fa-fw fa-sitemap', routerLink: ['/components'],
          //     items: [
          //         { label: 'Sample Page', icon: 'fa fa-fw fa-columns', routerLink: ['/components/sample'] },
          //         { label: 'Forms', icon: 'fa fa-fw fa-code', routerLink: ['/components/forms'] },
          //         { label: 'Data', icon: 'fa fa-fw fa-table', routerLink: ['/components/data'] },
          //         { label: 'Panels', icon: 'fa fa-fw fa-list-alt', routerLink: ['/components/panels'] },
          //         { label: 'Overlays', icon: 'fa fa-fw fa-square', routerLink: ['/components/overlays'] },
          //         { label: 'Menus', icon: 'fa fa-fw fa-minus-square-o', routerLink: ['/components/menus'] },
          //         { label: 'Messages', icon: 'fa fa-fw fa-circle-o-notch', routerLink: ['/components/messages'] },
          //         { label: 'Charts', icon: 'fa fa-fw fa-area-chart', routerLink: ['/components/charts'] },
          //         { label: 'File', icon: 'fa fa-fw fa-arrow-circle-o-up', routerLink: ['/components/file'] },
          //         { label: 'Misc', icon: 'fa fa-fw fa-user-secret', routerLink: ['/components/misc'] }
          //     ]
          // },
          // {
          //     label: 'Pages', icon: 'fa fa-fw fa-life-saver', routerLink: ['/pages'],
          //     items: [
          //         { label: 'Empty Page', icon: 'fa fa-fw fa-square-o', routerLink: ['/pages/empty'] },
          //         { label: 'Landing Page', icon: 'fa fa-fw fa-globe', url: 'assets/pages/landing.html' },
          //         { label: 'Login Page', icon: 'fa fa-fw fa-sign-in', url: 'assets/pages/login.html' },
          //         { label: 'Error Page', icon: 'fa fa-fw fa-exclamation-circle', url: 'assets/pages/error.html' },
          //         { label: '404 Page', icon: 'fa fa-fw fa-times', url: 'assets/pages/404.html' },
          //         {
          //             label: 'Access Denied Page', icon: 'fa fa-fw fa-exclamation-triangle',
          //             url: 'assets/pages/access.html'
          //         }
          //     ]
          // },
    //       {
    //         label: 'Modulos', icon: 'fa fa-fw fa-gg',
    //         items: [
    //             {
    //                 label: 'Ventas', icon: 'fa fa-fw fa-sitemap',
    //                 items: [
    //                     { label: 'Venta Farmacia', icon: 'fa fa-fw fa-cart-plus',
    //                     routerLink: ['modulo-ve/venta-create'] },
    //                     { label: 'Venta Consulta', icon: 'fa fa-fw fa-list',
    //                     routerLink: ['modulo-ve/panel-venta'] },
    //                     { label: 'Venta Devolución', icon: 'fa fa-fw fa-retweet',
    //                     routerLink: ['modulo-ve/venta-devolucion'] },
    //                     { label: 'Venta Pendiente', icon: 'fa fa-fw fa-pencil-square-o',
    //                     routerLink: ['modulo-ve/venta-pendiente'] },
    //                     { label: 'Comprobantes', icon: 'fa fa-fw fa-cc-mastercard',
    //                     routerLink: ['modulo-ve/panel-comprobante'] },
    //                     { label: 'Seguimiento', icon: 'fa fa-fw fa-bars',
    //                     routerLink: ['modulo-ve/panel-seguimiento'] },
    //                     { label: 'Pedidos por Paciente', icon: 'fa fa-fw fa-medkit',
    //                     routerLink: ['modulo-ve/panel-pedido-paciente'] },
    //                     { label: 'Planes', icon: 'fa fa-fw fa-paper-plane-o',
    //                     routerLink: ['modulo-ve/panel-planes'] },
    //                     { label: 'Caja', icon: 'fa fa-fw fa-credit-card',
    //                     routerLink: ['modulo-ve/panel-caja'] },
    //                     { label: 'Planilla', icon: 'fa fa-fw fa-money',
    //                     routerLink: ['modulo-ve/panel-planillas'] }
    //                 ]
    //             },
    //             {
    //                 label: 'Gestión Aprobadores', icon: 'fa fa-fw fa-sitemap',
    //                 items: [
    //                     { label: 'Aprobador Principal', icon: 'fa fa-fw fa-list',
    //                     routerLink: ['modulo-ad/admin-aprobador'] },
    //                     { label: 'Aprobador Temporal', icon: 'fa fa-fw fa-users',
    //                     routerLink: ['modulo-ad/aprobador-temporal'] },
    //                     { label: 'Aprobador C.C.', icon: 'fa fa-fw fa-users',
    //                     routerLink: ['modulo-ad/admin-centro-costo'] }
    //                 ]
    //             },
    //             {
    //                 label: 'Gestión Requerimiento', icon: 'fa fa-fw fa-sitemap',
    //                 items: [
    //                     { label: 'Requerimiento', icon: 'fa fa-fw fa-list',
    //                     routerLink: ['modulo-re/panel-requerimiento'] },
    //                     { label: 'Aprobaciones', icon: 'fa fa-fw fa-users',
    //                     routerLink: ['modulo-re/panel-aprobacion-requerimiento'] },
    //                 ]
    //             },
    //             {
    //                 label: 'Gestión Vale Salida', icon: 'fa fa-fw fa-sitemap',
    //                 items: [
    //                     { label: 'Vale Salida', icon: 'fa fa-fw fa-list',
    //                     routerLink: ['modulo-so/panel-solicitud'] },
    //                     { label: 'Aprobaciones', icon: 'fa fa-fw fa-users',
    //                     routerLink: ['modulo-so/panel-aprobacion-solicitud'] },
    //                 ]
    //             }
    //           ]
    //       },
    //       {
    //         label: 'Configuración', icon: 'fa fa-fw fa-cog',
    //         items: [
    //             { label: 'Usuario', icon: 'fa fa-fw fa-user', routerLink: ['modulo-se/panel-persona'] },
    //             {
    //                 label: 'Acceso', icon: 'fa fa-fw fa-briefcase',
    //                 items: [
    //                     { label: 'Perfil', icon: 'fa fa-fw fa-user',
    //                     routerLink: ['modulo-se/panel-perfil'] },
    //                     { label: 'Menu', icon: 'fa fa-fw fa-sitemap',
    //                     routerLink: ['modulo-se/panel-menu'] },
    //                     { label: 'Opciones', icon: 'fa fa-fw fa-filter',
    //                     routerLink: ['modulo-se/panel-opcion'] },
    //                     { label: 'Opciones por Perfil', icon: 'fa fa-fw fa-users',
    //                     routerLink: ['modulo-se/panel-opcion-x-perfil'] }
    //                 ]
    //             },
    //             {
    //                 label: 'Parametros', icon: 'fa fa-fw fa-cogs',
    //                 items: [
    //                     { label: 'Conexión', icon: 'fa fa-fw fa-database',
    //                     routerLink: ['modulo-se/panel-parametro-conexion'] },
    //                     { label: 'Sistema', icon: 'fa fa-fw fa-cog',
    //                     routerLink: ['modulo-se/panel-parametro-sistema'] }
    //                 ]
    //             }
    //         ]
    //     },
    //     { label: 'Docs', icon: 'fa fa-fw fa-book', routerLink: ['/documentation'] }
    //   ];
  }
}
