using Microsoft.EntityFrameworkCore;

namespace loja_virtual_web_api.modelos
{
    public class LojaVirtualDBContext: DbContext
    {
        public LojaVirtualDBContext(DbContextOptions<LojaVirtualDBContext> options) : base(options)
        {   
        }

        public DbSet<Produto> Produto { get; set; } 

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) 
        {
            optionsBuilder
                .UseSqlServer(@"Server=localhost;Database=LojaVirtual;User Id=sa; Password=Sa@12345;");
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Produto>(p =>
            {
                p.Property(v => v.Id).ValueGeneratedOnAdd();
                p.Property(v => v.Nome).HasColumnType("varchar(50)");
                p.Property(v => v.UrlImagem).HasColumnType("varchar(150)");
                p.Property(v => v.Valor).HasColumnType("decimal(13, 2)");
            });
        }
    }
}