using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Repository.Repo;
using Repository.Utilities;
using Service.Custom.CategorySer;
using Service.Custom.CustomerSer;
using Service.Custom.ItemSer;
using Service.Custom.SupplierSer;
using Service.Custom.UserTypeSer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
#region Database
// Database context
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection")));
#endregion
// Register Repositories
builder.Services.AddScoped(typeof(IRepositoryCommon<>), typeof(RepositoryCommon<>));

// Register Services
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<ISupplierService, SupplierService>();
builder.Services.AddScoped<IUserTypeService, UserTypeService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
