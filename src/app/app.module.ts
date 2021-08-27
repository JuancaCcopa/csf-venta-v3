import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigComponent } from './layout/config/config.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { HeaderBreadcrumbComponent } from './layout/header-breadcrumb/header-breadcrumb.component';
import { MenuComponent } from './layout/menu/menu.component';
import { LayoutComponent } from './layout/layout.component';
import { MenuitemComponent } from './layout/menu/menuitem/menuitem.component';
import { DialogModule } from 'primeng/dialog';
// PrimeNG
import { ProgressBarModule } from 'primeng/progressbar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TabViewModule } from 'primeng/tabview';

import localePy from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { DashboardGerencialComponent } from './modulos/modulo-dashboard/components/dashboard-gerencial/dashboard-gerencial.component';
import { LoginModule } from './modulos/modulo-login/module-login.module';
import { ModuloEstadoInternetModule } from './modulos/modulo-estado-internet/modulo-estado-internet.module';
import { HeaderInterceptorService } from './interceptor/header-interceptor.service';
import { DomSeguroImagenBase64Pipe } from './pipes/dom-seguro-imagen-base64.pipe';
import { SeguridadModule } from './modulos/modulo-seguridad/modulo-seguridad.module';
import { ModuloBaseDatosLocalModule } from './modulos/modulo-base-datos-local/modulo-base-datos-local.module';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

registerLocaleData(localePy, 'es');

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
    FooterComponent,
    HeaderComponent,
    HeaderBreadcrumbComponent,
    MenuComponent,
    LayoutComponent,
    MenuitemComponent,
    DashboardGerencialComponent,
    DomSeguroImagenBase64Pipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ProgressBarModule,
    InputSwitchModule,
    TabViewModule,
    LoginModule,
    ModuloEstadoInternetModule,
    SeguridadModule,
    DialogModule,
    ModuloBaseDatosLocalModule,
    NgxDocViewerModule
  ],
  providers: [ DatePipe,
              { provide: LOCALE_ID, useValue: 'es' },
              {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
