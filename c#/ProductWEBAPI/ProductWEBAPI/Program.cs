using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using EmployeeWEBAPI.Models;
using EmployeeWEBAPI.Repository;
using ProductWEBAPI.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbcontext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "EmployeeWEBAPI",
        Version = "v1",
        Description = "API for Employee Management"
    });

    options.MapType<IFormFile>(() => new OpenApiSchema { Type = "string", Format = "binary" });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "EmployeeWEBAPI v1");
    });
}

app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
