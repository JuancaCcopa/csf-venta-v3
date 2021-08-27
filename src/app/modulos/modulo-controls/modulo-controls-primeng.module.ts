import { NgModule } from '@angular/core';

// Module PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
    declarations: [],
    exports: [ InputTextModule,
            ButtonModule,
            PanelModule,
            InputTextareaModule,
            DropdownModule,
            CheckboxModule,
            SplitButtonModule,
            AutoCompleteModule],
    providers: [],
})
export class ControlsPrimeNgModule {}