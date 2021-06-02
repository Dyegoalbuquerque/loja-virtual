using System.Linq;
using System.Threading.Tasks;
using loja_virtual_web_api.modelos;

namespace loja_virtual_web_api.repositorios 
{ 
public interface IRepository<TEntity> where TEntity : Entity
    {   
    IQueryable<TEntity> ObterTodos();
 
    Task<TEntity> BuscarPorId(int id);
 
    void Adicionar(TEntity entity);
 
    void Atualizar(int id, TEntity entity);
 
    void Remover(TEntity entity);
    
    Task SalvarMudancas();
    }
}