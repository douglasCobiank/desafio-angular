import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitulosListComponent } from './pages/titulos-list/titulos-list.component';
import { TituloFormComponent } from './pages/titulo-form/titulos-form.component';

const routes: Routes = [
  { path: '', component: TitulosListComponent },
  { path: 'create', component: TituloFormComponent },
  { path: 'edit/:id', component: TituloFormComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
