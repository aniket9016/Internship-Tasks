using ChatApp.DataService;
using ChatApp.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register SignalR
builder.Services.AddSignalR();

// Register SharedDb as singleton to maintain connection state across requests
builder.Services.AddSingleton<SharedDb>();

// Allow CORS for frontend React app
builder.Services.AddCors(options =>
{
    options.AddPolicy("reactapp", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // React frontend URL
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // needed for SignalR
    });
});

var app = builder.Build();

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("reactapp");

app.UseAuthorization();

app.MapControllers();

// Map SignalR hub at /chat
app.MapHub<ChatHub>("/chat");

app.Run();
