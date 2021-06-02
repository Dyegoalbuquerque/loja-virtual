using loja_virtual_web_api.modelos;
using loja_virtual_web_api.repositorios;
using loja_virtual_web_api.servicos;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace loja_virtual_web_api
{
    public class Startup
    {
        readonly string cors = "_corsLojaVirtual";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddMvc();

            services.AddDbContext<LojaVirtualDBContext>();
            
            services.AddTransient<IProdutoRepository, ProdutoRepository>();
            services.AddTransient<IProdutoService, ProdutoService>();   

            services.AddCors(options =>
            {   
                options.AddPolicy(cors,
                builder =>
                {
                     builder.AllowAnyOrigin() 
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                });               
            });       

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "loja virtual API", Version = "v1" });               
            }); 
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseCors(options => options.AllowAnyOrigin());  

            app.UseRouting();

            app.UseSwagger();
          
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "loja-virtual API");
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
