import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Produto } from './models/produto';
import { Paginacao } from '../../shared/models/paginacao';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiRoot = environment.urlRoot;
  private apiSufixo = environment.urlSufixo;
  private apiUrl= `${this.apiRoot}${this.apiSufixo}/produtos`; 

  constructor(private httpclient: HttpClient) {} 

  private async obterPorId(id: number): Promise<Produto> {
    let retorno = await this.httpclient.get<Produto>(`${this.apiUrl}/${id}`).toPromise();
    return retorno;
  }

  private async obterComPaginacao(paginacao: Paginacao): Promise<Produto[]> {
    let retorno = await this.httpclient.get<Produto[]>(`${this.apiUrl}?_page=${paginacao.pagina}&_limit=${paginacao.limite}`).toPromise();
    return retorno;
  }

  private async salvar(item: Produto): Promise<Produto> {
    let retorno = await this.httpclient.post<Produto>(`${this.apiUrl}`, item).toPromise();
    return retorno;
  }

  private async atualizar(item: Produto, id: number): Promise<Produto> {
    let retorno = await this.httpclient.put<Produto>(`${this.apiUrl}/${id}`, item).toPromise();
    return retorno;
  }

  private async remover(id: number): Promise<number> {
    let retorno = await this.httpclient.delete<number>(`${this.apiUrl}/${id}`).toPromise();
    return retorno;
  }
  
  public async obterProduto(id: number): Promise<Produto> {
    try {
      return await this.obterPorId(id);
     } catch (err) {
       console.error(err, 'erro ao obter produto - obterProduto(id: number)');
       throw err;
     }
  }

  public async obterProdutos(paginacao: Paginacao) : Promise<Produto[]> {
    try {
      return await this.obterComPaginacao(paginacao);
    }
    catch (e) {
      console.error(e, 'erro ao obter produtos - obterProdutos(paginacao: Paginacao)');
      throw e;
    }
  }

  public async adicionarProduto(produto: Produto): Promise<Produto> {

      try {
       return await this.salvar(produto);
      } catch (err) {
        console.error(err, 'erro ao adicionar produto - método adicionarProduto(produto: Produto)');
        throw err;
      }
  }

  public async atualizarProduto(produto: Produto, id: number): Promise<Produto> {

    try {
     return await this.atualizar(produto, id);
    } catch (err) {
      console.error(err, 'erro ao atualizar produto - método atualizarProduto(produto: Produto)');
      throw err;
    }
}

  public async removerProduto(id: number): Promise<number> {
    try {
      return await this.remover(id);
     } catch (err) {
       console.error(err, 'erro ao remover produto - método removerProduto(id: number)');
       throw err;
     }
  }
}