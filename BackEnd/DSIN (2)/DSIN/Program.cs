using DSIN.Data.Repositories;
using DSIN.DSIN.Business.Interfaces.IRepositories;
using DSIN.DSIN.Business.Interfaces.IServices;
using DSIN.DSIN.Business.Services;
using DSIN.DSIN.Data.Contexts;
using DSIN.DSIN.Data.External;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var cs = builder.Configuration.GetConnectionString("Default");
var mysqlVersion = new MySqlServerVersion(new Version(8, 0, 36));

if (!string.IsNullOrWhiteSpace(cs))
{
    builder.Services.AddDbContext<TicketingDbContext>(opt =>
        opt.UseMySql(cs, mysqlVersion,
            b => b.MigrationsAssembly(typeof(TicketingDbContext).Assembly.FullName)));
}
else
{
    builder.Services.AddDbContext<TicketingDbContext>(opt =>
        opt.UseInMemoryDatabase("DevDemoDb"));
}

builder.Services.AddScoped<IAgentRepository, AgentRepository>();
builder.Services.AddScoped<IVehicleRepository, VehicleRepository>();
builder.Services.AddScoped<IDriverRepository, DriverRepository>();
builder.Services.AddScoped<ITicketBookRepository, TicketBookRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddScoped<IAgentService, AgentService>();
builder.Services.AddScoped<ITicketBookService, TicketBookService>();

builder.Services.AddHttpClient<OpenAiOcrClient>((sp, http) =>
{
    var baseUrl = builder.Configuration["OpenAI:BaseUrl"] ?? "https://api.openai.com/v1/";
    http.BaseAddress = new Uri(baseUrl);

    if (int.TryParse(builder.Configuration["OpenAI:TimeoutSeconds"], out var to) && to > 0)
        http.Timeout = TimeSpan.FromSeconds(to);
});
builder.Services.AddScoped<IOcrClient, OpenAiOcrClient>();

var jwtKey = builder.Configuration["Jwt:Key"];
if (string.IsNullOrWhiteSpace(jwtKey))
    throw new InvalidOperationException("Jwt:Key não configurado no appsettings / secrets.");

var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o =>
    {
        o.TokenValidationParameters = new()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = key,
            ClockSkew = TimeSpan.FromSeconds(30)
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("front", p => p
        .WithOrigins(builder.Configuration.GetSection("Cors:Origins").Get<string[]>() ?? Array.Empty<string>())
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

try
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<TicketingDbContext>();
    db.Database.Migrate();
}
catch (Exception ex)
{
    app.Logger.LogWarning(ex, "Não foi possível aplicar migrations agora. Usando DB atual (ou InMemory).");
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseCors("front");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGet("/healthz", () => Results.Ok(new { ok = true, time = DateTimeOffset.UtcNow })).ExcludeFromDescription();


app.Run();
