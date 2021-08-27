import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PanelModule } from 'primeng/panel';

@NgModule({
    declarations: [DashboardComponent],
    imports: [ CommonModule, DashboardRoutingModule, PanelModule],
    exports: [],
    providers: [],
})
export class DashboardModule {}