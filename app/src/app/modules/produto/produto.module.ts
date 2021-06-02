import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoRoutingModule } from './produto.routing.module';
import { ProdutoListagemComponent } from './components/listagem/produto.listagem.component';
import { ProdutoFormularioComponent } from './components/formulario/produto.formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule, MatTableModule } from '@angular/material';
import { ProdutoRemocaoDialogComponent } from './components/remocao-dialog/produto.remocao.dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProdutoRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatPaginatorModule, 
    MatDialogModule,
    MatTableModule
  ],
  entryComponents: [ProdutoRemocaoDialogComponent],
  declarations: [ProdutoListagemComponent, ProdutoFormularioComponent, ProdutoRemocaoDialogComponent]
})
export class ProdutoModule { }