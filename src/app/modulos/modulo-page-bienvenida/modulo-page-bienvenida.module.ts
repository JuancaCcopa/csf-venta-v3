import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageInicialComponent } from './components/page-inicial/page-inicial.component';
import { PageBienvenidaRoutingModule } from './modulo-page-bienvenida-routing.module';
@NgModule({
    declarations: [
        PageInicialComponent
        ],
    imports: [ 
        CommonModule,
        PageBienvenidaRoutingModule
    ],
    exports: [],
    providers: [],
})
export class PageBienvenidaModule {}