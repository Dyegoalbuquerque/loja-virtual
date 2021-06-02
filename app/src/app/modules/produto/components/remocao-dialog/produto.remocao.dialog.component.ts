import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProdutoService } from '../../produto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Produto } from '../../models/produto';

@Component({
  selector: 'produto-remocao-dialog-component',
  templateUrl: 'produto.remocao.dialog.component.html',
  styleUrls: ['produto.remocao.dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProdutoRemocaoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProdutoRemocaoDialogComponent>,
             @Inject(MAT_DIALOG_DATA) public data: Produto, private snackBar: MatSnackBar,
             private produtoService: ProdutoService) { }

  produto: Produto;

  async ngOnInit() {
    this.produto = this.data;

    await this.obterProduto(this.produto.id);
  }

  async obterProduto(id: number) {

    try {
      this.produto = await this.produtoService.obterProduto(id);
    } catch (e) {
      this.mostrarMensagem("Ocorreu um problema", "Produto");
    }
}

  async remover(id: number) {

      try {
        await this.produtoService.removerProduto(id);
        this.mostrarMensagem("Removido com sucesso", "Produto");
        this.fechar();
      } catch (e) {
        this.mostrarMensagem("Ocorreu um problema", "Produto remover");
      }
  }

  fechar(): void {
    this.dialogRef.close();
  }

  mostrarMensagem(mensagem: string, acao: string) {
    this.snackBar.open(mensagem, acao,{
      duration: 5 * 1000,
    });
  }
}