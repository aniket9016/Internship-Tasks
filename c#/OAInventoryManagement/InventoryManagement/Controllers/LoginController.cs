using Microsoft.AspNetCore.Mvc;
using Domain.ViewModel;
using Service.Custom.CustomerSer;
using Service.Custom.SupplierSer;
using Service.Custom.TokenSer;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Domain.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using System;

namespace InventoryManagement.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ICustomerService _customerService;
        private readonly ISupplierService _supplierService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly ITokenService _tokenService;
        private readonly ILogger<LoginController> _logger;

        public LoginController(
            ICustomerService customerService,
            ISupplierService supplierService,
            IWebHostEnvironment webHostEnvironment,
            ITokenService tokenService,
            ILogger<LoginController> logger)
        {
            _customerService = customerService;
            _supplierService = supplierService;
            _webHostEnvironment = webHostEnvironment;
            _tokenService = tokenService;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid login model received.");
                return BadRequest(new Response<string> { Message = "Invalid input", Status = 400 });
            }

            _logger.LogInformation("Login attempt for email: {Email}", model.Email);

            var customer = await _customerService.Find(u =>
                u.Email == model.Email && u.Password == model.Password);
            _logger.LogInformation("Customer found: {Email}", customer?.Email);

            if (customer != null)
            {
                _logger.LogInformation("Customer login successful for email: {Email}", model.Email);
                var token = _tokenService.GenerateToken(customer);
                return Ok(new Response<string> { Message = "Login successful", Status = 200, Data = token });
            }

            var supplier = await _supplierService.Find(u =>
                u.Email == model.Email && u.Password == model.Password);

            if (supplier != null)
            {
                _logger.LogInformation("Supplier login successful for email: {Email}", model.Email);
                var token = _tokenService.GenerateToken(supplier);
                return Ok(new Response<string> { Message = "Login successful", Status = 200, Data = token });
            }

            _logger.LogWarning("Login failed for email: {Email}", model.Email);
            return BadRequest(new Response<string> { Message = "Invalid credentials", Status = 400 });
        }

        [HttpPost("RegisterAsCustomer")]
        public async Task<IActionResult> RegisterAsCustomer([FromForm] UserInsertModel model)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid customer registration model.");
                return BadRequest(new Response<string> { Message = "Invalid input", Status = 400 });
            }

            var exists = await _customerService.Find(u => u.Email == model.Email) ??
                         await _supplierService.Find(u => u.Email == model.Email);

            if (exists != null)
            {
                _logger.LogWarning("Registration attempt failed: Email already in use - {Email}", model.Email);
                return BadRequest(new Response<string> { Message = "Email already in use", Status = 400 });
            }

            try
            {
                var photoFileName = await UploadPhoto(model.Photo);
                var success = await _customerService.Insert(model, photoFileName);

                if (!success)
                {
                    _logger.LogError("Customer registration failed for email: {Email}", model.Email);
                    return StatusCode(500, new Response<string> { Message = "Customer registration failed", Status = 500 });
                }

                _logger.LogInformation("Customer registered successfully: {Email}", model.Email);
                return Ok(new Response<string> { Message = "Customer registered successfully", Status = 200 });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception during customer registration.");
                return StatusCode(500, new Response<string> { Message = "An error occurred", Status = 500 });
            }
        }

        [HttpPost("RegisterAsSupplier")]
        public async Task<IActionResult> RegisterAsSupplier([FromForm] UserInsertModel model)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid supplier registration model.");
                return BadRequest(new Response<string> { Message = "Invalid input", Status = 400 });
            }

            var exists = await _customerService.Find(u => u.Email == model.Email) ??
                         await _supplierService.Find(u => u.Email == model.Email);

            if (exists != null)
            {
                _logger.LogWarning("Registration attempt failed: Email already in use - {Email}", model.Email);
                return BadRequest(new Response<string> { Message = "Email already in use", Status = 400 });
            }

            try
            {
                var photoFileName = await UploadPhoto(model.Photo);
                var success = await _supplierService.Insert(model, photoFileName);

                if (!success)
                {
                    _logger.LogError("Supplier registration failed for email: {Email}", model.Email);
                    return StatusCode(500, new Response<string> { Message = "Supplier registration failed", Status = 500 });
                }

                _logger.LogInformation("Supplier registered successfully: {Email}", model.Email);
                return Ok(new Response<string> { Message = "Supplier registered successfully", Status = 200 });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception during supplier registration.");
                return StatusCode(500, new Response<string> { Message = "An error occurred", Status = 500 });
            }
        }

        private async Task<string> UploadPhoto(IFormFile photo)
        {
            if (photo == null || photo.Length == 0)
                return string.Empty;

            var fileName = Guid.NewGuid() + Path.GetExtension(photo.FileName);
            var uploadPath = Path.Combine(_webHostEnvironment.WebRootPath ?? "wwwroot", "images", "User");

            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            var filePath = Path.Combine(uploadPath, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await photo.CopyToAsync(stream);
            }

            return fileName;
        }
    }
}
