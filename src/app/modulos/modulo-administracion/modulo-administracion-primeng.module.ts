import { NgModule } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
// Sevices
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@NgModule({
    declarations: [],
    imports: [ ],
    exports: [ CalendarModule,
        TableModule,
        SplitButtonModule,
        DialogModule,
        MessageModule,
        MessagesModule,
        ConfirmDialogModule,
        PanelModule,
        DropdownModule,
        ToolbarModule,
        InputTextModule,
        FileUploadModule,
        InputTextareaModule],
    providers: [ ConfirmationService, MessageService],
})
export class AdministracionPrimeNgModule {}