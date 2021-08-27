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
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { FieldsetModule } from 'primeng/fieldset';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { TreeModule } from 'primeng/tree';
import { PickListModule } from 'primeng/picklist';
import { FileUploadModule } from 'primeng/fileupload';
import { ToggleButtonModule } from 'primeng/togglebutton';

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
            InputSwitchModule,
            CheckboxModule,
            FieldsetModule,
            PasswordModule,
            DropdownModule,
            TreeModule,
            PickListModule,
            FileUploadModule,
            ToggleButtonModule],
    providers: [MessageService, ConfirmationService],
})
export class SeguridadPrimeNgModule {}