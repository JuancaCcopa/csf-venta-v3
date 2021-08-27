import { NgModule } from '@angular/core';

// Module PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FieldsetModule } from 'primeng/fieldset';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ProgressBarModule } from 'primeng/progressbar';

// Sevices
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@NgModule({
    declarations: [],
    exports: [ InputTextModule,
            ButtonModule,
            ToastModule,
            TableModule,
            MessageModule,
            MessagesModule,
            ConfirmDialogModule,
            PanelModule,
            InputTextareaModule,
            DropdownModule,
            CheckboxModule,
            CalendarModule,
            DialogModule,
            TooltipModule,
            SplitButtonModule,
            CardModule,
            TabViewModule,
            RadioButtonModule,
            FieldsetModule,
            ToggleButtonModule,
            ProgressBarModule],
    providers: [MessageService, ConfirmationService],
})
export class VentaPrimeNgModule {}