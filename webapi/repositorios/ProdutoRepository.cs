
using loja_virtual_web_api.modelos;

namespace loja_virtual_web_api.repositorios
{
    public class ProdutoRepository : Repository<Produto>, IProdutoRepository
    {
        public ProdutoRepository(LojaVirtualDBContext dbContext) : base(dbContext) { }
    }
}