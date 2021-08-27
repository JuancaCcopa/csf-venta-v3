import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PageInicialComponent } from './components/page-inicial/page-inicial.component';

const routes: Routes = [
    {path: 'bienvenido', component: PageInicialComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PageBienvenidaRoutingModule {}
