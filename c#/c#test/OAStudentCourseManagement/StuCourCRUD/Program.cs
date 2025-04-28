using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Repo;
using Data;
using Services;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Serilog Configuration
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.File("Logs/log.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add Database context
builder.Services.AddDbContext<AppDBcontext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection")));

// Register Repositories
builder.Services.AddScoped<IUserRepository<User>, UserRepository>();
builder.Services.AddScoped<IStudentRepository<Student>, StudentRepository>();
builder.Services.AddScoped<ICourseRepository<Course>, CourseRepository>();

// Register Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddScoped<ICourseService, CourseService>();

// Register HttpContext Accessor
builder.Services.AddHttpContextAccessor();

// Add Cookie-based Authentication
builder.Services.AddAuthentication("MyCookieAuth")
    .AddCookie("MyCookieAuth", options =>
    {
        options.Cookie.Name = "MyAuthCookie";
        options.LoginPath = "/api/auth/login";
        options.LogoutPath = "/api/auth/logout";
        options.ExpireTimeSpan = TimeSpan.FromMinutes(30); 
        options.SlidingExpiration = true;
        options.Cookie.HttpOnly = true;
        options.Cookie.SameSite = SameSiteMode.Strict;
    });

builder.Services.AddAuthorization();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy
            .WithOrigins("http://localhost:3000") // React app URL
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials() // Allow cookies / auth headers
    );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowReactApp");


// Add authentication and authorization middleware
app.UseAuthentication(); 
app.UseAuthorization();

app.MapControllers();

app.Run();