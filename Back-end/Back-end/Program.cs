using DSIN.Business.Interfaces.IRepositories;
using DSIN.Data.Contexts;
using DSIN.Data.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BackEndDsin
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // ----------------------------------------------------
            // 🔧 1) Configurar conexão com MySQL
            // ----------------------------------------------------
            var connectionString = builder.Configuration.GetConnectionString("Default");

            builder.Services.AddDbContext<TicketingDbContext>(options =>
                options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
            );

            // ----------------------------------------------------
            // 🧱 2) Registrar Repositórios e UnitOfWork no DI
            // ----------------------------------------------------
            builder.Services.AddScoped<IAgentRepository, AgentRepository>();
            builder.Services.AddScoped<IDriverRepository, DriverRepository>();
            builder.Services.AddScoped<IVehicleRepository, VehicleRepository>();
            builder.Services.AddScoped<ITicketBookRepository, TicketBookRepository>();
            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

            // ----------------------------------------------------
            // 🧩 3) MVC + Swagger
            // ----------------------------------------------------
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // ----------------------------------------------------
            // 🌐 4) Pipeline HTTP
            // ----------------------------------------------------
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();

            // ----------------------------------------------------
            // 🚀 5) Iniciar aplicação
            // ----------------------------------------------------
            app.Run();
        }
    }
}
