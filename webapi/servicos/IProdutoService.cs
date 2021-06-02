using System.Collections.Generic;
using System.Threading.Tasks;
using loja_virtual_web_api.modelos;

namespace loja_virtual_web_api.servicos
{
    public interface IProdutoService
    {
        Task<Produto> BuscarPorId(int id);
        Task Adicionar(Produto item);
        Task<Produto> Atualizar(int id, Produto item);
        Task<List<Produto>> ObterTodos();
        Task Remover(int id);
        Task SalvarMudancas();
    }
}