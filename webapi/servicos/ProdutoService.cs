using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using loja_virtual_web_api.modelos;
using loja_virtual_web_api.repositorios;
using Microsoft.EntityFrameworkCore;

namespace loja_virtual_web_api.servicos
{
public class ProdutoService : IProdutoService
{
        private IProdutoRepository Repository { get; set;}
        public ProdutoService(IProdutoRepository repository)
        {
            this.Repository = repository;
        }

        public async Task Adicionar(Produto item)
        {
            if (item == null)
            {
                throw new ArgumentException("Argumento item não pode ser nulo");
            }    

            this.Repository.Adicionar(item);

            await this.SalvarMudancas();
        }

        public async Task<Produto> Atualizar(int id, Produto item)
        {
            if (item == null)
            {
                throw new ArgumentException("Argumento item não pode ser nulo");
            }    

            this.Repository.Atualizar(id, item);

            await this.SalvarMudancas();
            
            return item;
        }
      
        public async Task<List<Produto>> ObterTodos()
        {
            return await this.Repository.ObterTodos().ToListAsync();
        }

        public async Task<Produto> BuscarPorId(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("Id não pode ser menor ou igual a zero");
            }
            return  await this.Repository.BuscarPorId(id);
        }
    
        public async Task Remover(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("Id não pode ser menor ou igual a zero");
            }
            var item = await this.Repository.BuscarPorId(id);

            if (item == null)
            {
                throw new ArgumentException("Id não encontrado");
            }

            this.Repository.Remover(item);
            await this.SalvarMudancas();
        }
   
        public async Task SalvarMudancas()
        {
            await this.Repository.SalvarMudancas();
        }
    }
}