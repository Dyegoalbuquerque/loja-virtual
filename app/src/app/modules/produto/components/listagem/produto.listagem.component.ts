import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Produto } from '../../models/produto'
import { Paginacao } from 'src/app/shared/models/paginacao';
import { ProdutoService } from '../../produto.service';
import { ProdutoRemocaoDialogComponent } from '../remocao-dialog/produto.remocao.dialog.component';

@Component({
  selector: 'produto-listagem-component',
  templateUrl: './produto.listagem.component.html',
  styleUrls: ['./produto.listagem.component.css']
})

export class ProdutoListagemComponent implements AfterViewInit {
 
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  title = 'loja-virtual';

  colunas: string[] = ['urlImagem', 'nome', 'valor', 'remover', 'detalhe'];
  dataSourceProduto : MatTableDataSource<Produto>;
  paginacao: Paginacao;

  constructor(public dialog: MatDialog, private produtoService: ProdutoService){
    this.paginacao = new Paginacao(1, 100);
  }

  async ngAfterViewInit() {
   await this.atualizarTabela();
  }

  async obterProdutos(paginacao: Paginacao){
    let retorno = await this.produtoService.obterProdutos(paginacao);

    return retorno;
  }

  async atualizarTabela(){
    let produtos = await this.obterProdutos(this.paginacao);
    this.dataSourceProduto = new MatTableDataSource(produtos);
    this.dataSourceProduto.paginator = this.paginator;
  }

  async abrirDialogRemover(id: number) {
      const dialogRef = this.dialog.open(ProdutoRemocaoDialogComponent, {
        width: '400px',
        height: '320px',
        data: new Produto(id)
      });
  
      dialogRef.afterClosed().subscribe(async result => {
        await this.atualizarTabela();
      });
  }
}

