import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';
@NgModule({
  exports: [
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    SplitButtonModule,
    PanelModule,
    CalendarModule,
    DropdownModule,
    ToastModule
  ],
})
export class RequerimientoCompartidoPrimeNgModule {}
