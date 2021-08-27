import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { TreeModule } from 'primeng/tree';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  exports: [
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    SplitButtonModule,
    PanelModule,
    CalendarModule,
    TreeModule,
    RadioButtonModule,
    DropdownModule,
    InputTextareaModule,
    ToastModule,
    CheckboxModule,
    InputMaskModule
  ],
})
export class VentasCompartidoPrimeNgModule {}
