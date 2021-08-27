import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsPrimeNgModule } from './modulo-controls-primeng.module';
import { ControlAutoCompleteComponent } from './components/control-auto-complete/control-auto-complete.component';
import { FormsModule } from '@angular/forms';
import { ControlDropdownComponent } from './components/control-dropdown/control-dropdown.component';
import { ControlAlmacenComponent } from './components/control-almacen/control-almacen.component';
import { ControlTipoVentaComponent } from './components/control-tipo-venta/control-tipo-venta.component';

@NgModule({
    declarations: [ControlAutoCompleteComponent, ControlDropdownComponent, ControlAlmacenComponent, ControlTipoVentaComponent],
    imports: [ CommonModule, ControlsPrimeNgModule, FormsModule ],
    exports: [ ControlAutoCompleteComponent, ControlDropdownComponent, ControlAlmacenComponent, ControlTipoVentaComponent],
    providers: [],
})
export class ControlsModule {}