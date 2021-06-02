using System;
using System.Net;
using System.Threading.Tasks;
using loja_virtual_web_api.modelos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using loja_virtual_web_api.servicos;

namespace loja_virtual_web_api.Controllers
{
    [ApiController]
    [Route("api/produtos")]
    public class ProdutoController : ControllerBase
    {
        private const string MENSAGEM_ERRO_SERVIDOR = "Ocorreu um problema no servidor";
        private IProdutoService ProdutoService { get; set; }

        public ProdutoController(IProdutoService ProdutoService)
        {
            this.ProdutoService = ProdutoService;
        }
        
        // GET api/produtos
        [HttpGet]
        public async Task<IActionResult> Get()
        {
             try{
                 
                var itens = await this.ProdutoService.ObterTodos();

                return Ok(itens);

            }catch(Exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, MENSAGEM_ERRO_SERVIDOR);
            } 
        }

        // GET api/produtos/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            if(id <= 0){
                return NotFound();
            }

            try{         
                var item =  await this.ProdutoService.BuscarPorId(id);

                if(item == null)
                {
                    return NotFound();
                }
                return Ok(item);

            }catch(ArgumentException e)
            {
                return BadRequest(e.Message);
            }catch(Exception){
               return StatusCode((int)HttpStatusCode.InternalServerError, MENSAGEM_ERRO_SERVIDOR);
            }
        }

        // POST api/produtos
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Produto item)
        {
            if(item == null){
                return BadRequest();
            }

            try{
                await this.ProdutoService.Adicionar(item);
            
                return Created($"api/produtos/{item.Id}", item);
            }catch(ArgumentException e)
            {
                return BadRequest(e.Message);
            }catch(Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, MENSAGEM_ERRO_SERVIDOR);
            } 
        }

        // PUT api/produtos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Produto item)
        {
             if(item == null){
                return BadRequest();
            }

            try{
                item = await this.ProdutoService.Atualizar(id, item);
            
                return Ok(item);
            }catch(ArgumentException e)
            {
                return BadRequest(e.Message);
            }catch(Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, MENSAGEM_ERRO_SERVIDOR);
            } 
        }

        // DELETE api/produtos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
             if(id <= 0){
                return NotFound();
            }
            try{

                await this.ProdutoService.Remover(id);

                return Ok(id);
            }catch(ArgumentException e)
            {
                return NotFound(e.Message);
            }catch(Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, MENSAGEM_ERRO_SERVIDOR);
            }
        }
    }
}
