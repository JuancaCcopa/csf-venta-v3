import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PanelPerfilComponent } from './components/panel-perfil/panel-perfil.component';
import { PerfilCreateComponent } from './components/panel-perfil/perfil-create/perfil-create.component';
import { PanelPersonaComponent } from './components/panel-persona/panel-persona.component';
import { PersonaCreateComponent } from './components/panel-persona/persona-create/persona-create.component';
import { PersonaUpdateComponent } from './components/panel-persona/persona-update/persona-update.component';
import { PanelMenuComponent } from './components/panel-menu/panel-menu.component';
import { PanelOpcionComponent } from './components/panel-opcion/panel-opcion.component';
import { OpcionCreateComponent } from './components/panel-opcion/opcion-create/opcion-create.component';
import { PanelOpcionPorPerfilComponent } from './components/panel-opcion-por-perfil/panel-opcion-por-perfil.component';
import { PanelConexionComponent } from './components/panel-conexion/panel-conexion.component';
import { PanelSistemaComponent } from './components/panel-sistema/panel-sistema.component';
import { PanelRecuperarClaveComponent } from './components/panel-recuperar-clave/panel-recuperar-clave.component';

const routes: Routes = [
    { path: 'panel-perfil', component: PanelPerfilComponent },
    { path: 'perfil-create', component: PerfilCreateComponent },
    { path: 'panel-persona', component: PanelPersonaComponent },
    { path: 'persona-create', component: PersonaCreateComponent },
    { path: 'persona-update/:id', component: PersonaUpdateComponent },
    { path: 'panel-menu', component: PanelMenuComponent},
    { path: 'panel-opcion', component: PanelOpcionComponent},
    { path: 'opcion-create/:id', component: OpcionCreateComponent},
    { path: 'panel-opcion-x-perfil', component: PanelOpcionPorPerfilComponent},
    { path: 'panel-parametro-conexion', component: PanelConexionComponent},
    { path: 'panel-parametro-sistema', component: PanelSistemaComponent},
    { path: 'panel-recuperar-clave', component: PanelRecuperarClaveComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SeguridadRoutingModule {}
