
namespace loja_virtual_web_api.modelos
{
    public class Produto : Entity
    {
        public string Nome { get; set; }

        public decimal Valor { get; set; }

        public string UrlImagem { get; set; }
    }
}
