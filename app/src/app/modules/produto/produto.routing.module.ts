import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticacaoGuardService } from 'src/app/core/autenticacao/autenticacao.guard.service';
import { ProdutoFormularioComponent } from './components/formulario/produto.formulario.component';
import { ProdutoListagemComponent } from './components/listagem/produto.listagem.component';

const routes: Routes = [
  { path: '', redirectTo: 'listagem', pathMatch: 'full'},
  { path: 'listagem', component:  ProdutoListagemComponent,
    canActivate: [ AutenticacaoGuardService ]},
  { path: 'formulario', component: ProdutoFormularioComponent,
    canActivate: [ AutenticacaoGuardService ]},
  { path: 'formulario/:id', component: ProdutoFormularioComponent,
    canActivate: [ AutenticacaoGuardService ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }