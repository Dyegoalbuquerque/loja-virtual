using System.Linq;
using System.Threading.Tasks;
using loja_virtual_web_api.modelos;
using Microsoft.EntityFrameworkCore;

namespace loja_virtual_web_api.repositorios
{
    public class Repository<T> : IRepository<T> where T : Entity
    {
        protected readonly LojaVirtualDBContext DbContext;
 
        public Repository(LojaVirtualDBContext dbContext)
        {
            this.DbContext = dbContext;
        }

        public virtual IQueryable<T> ObterTodos()
        {
            return this.DbContext.Set<T>().AsNoTracking();
        }

        public virtual async Task<T> BuscarPorId(int id)
        {
            return await this.DbContext.Set<T>()
                                        .AsNoTracking()
                                        .FirstOrDefaultAsync(e => e.Id == id);
        }

        public virtual void Adicionar(T entity)
        {
            this.DbContext.Entry(entity).State = EntityState.Added;
            this.DbContext.Set<T>().Add(entity);
        }
 
        public virtual void Atualizar(int id, T entity)
        {
             this.DbContext.Set<T>().Update(entity);
        }
 
        public virtual void Remover(T entity)
        {       
           this.DbContext.Set<T>().Remove(entity);
        }

        public virtual async Task SalvarMudancas()
        {
            await this.DbContext.SaveChangesAsync();
        }
    }
}