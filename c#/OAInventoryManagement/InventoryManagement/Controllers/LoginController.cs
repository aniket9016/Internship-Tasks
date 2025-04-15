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
using Domain.Models;
using Microsoft.AspNetCore.Authorization;

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

        public LoginController(
            ICustomerService customerService,
            ISupplierService supplierService,
            IWebHostEnvironment webHostEnvironment,
            ITokenService tokenService)
        {
            _customerService = customerService;
            _supplierService = supplierService;
            _webHostEnvironment = webHostEnvironment;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(new Response<string> { Message = "Invalid input", Status = 400 });

            var customer = await _customerService.Find(u =>
                u.Email == model.Email &&
                u.Password == model.Password);

            if (customer != null)
            {
                var token = _tokenService.GenerateToken(model);
                return Ok(token); 
            }

            var supplier = await _supplierService.Find(u =>
                u.Email == model.Email &&
                u.Password == model.Password);

            if (supplier != null)
            {
                var token = _tokenService.GenerateToken(model);
                return Ok(token); 
            }

            return BadRequest(new Response<string> { Message = "Invalid credentials", Status = 400 });
        }

        [HttpPost("RegisterAsCustomer")]
        public async Task<IActionResult> RegisterAsCustomer([FromForm] UserInsertModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(new Response<string> { Message = "Invalid input", Status = 400 });

            var exists = await _customerService.Find(u => u.Email == model.Email) ??
                         await _supplierService.Find(u => u.Email == model.Email);

            if (exists != null)
                return BadRequest(new Response<string> { Message = "Email is already in use", Status = 400 });

            string photoFileName = await UploadPhoto(model.Photo);
            bool success = await _customerService.Insert(model, photoFileName);

            if (!success)
                return StatusCode(500, new Response<string> { Message = "Failed to register customer", Status = 500 });

            return Ok(new Response<string> { Message = "Customer registration successful", Status = 200 });
        }

        [HttpPost("RegisterAsSupplier")]
        public async Task<IActionResult> RegisterAsSupplier([FromForm] UserInsertModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(new Response<string> { Message = "Invalid input", Status = 400 });

            var exists = await _customerService.Find(u => u.Email == model.Email) ??
                         await _supplierService.Find(u => u.Email == model.Email);

            if (exists != null)
                return BadRequest(new Response<string> { Message = "Email is already in use", Status = 400 });

            string photoFileName = await UploadPhoto(model.Photo);
            bool success = await _supplierService.Insert(model, photoFileName);

            if (!success)
                return StatusCode(500, new Response<string> { Message = "Failed to register supplier", Status = 500 });

            return Ok(new Response<string> { Message = "Supplier registration successful", Status = 200 });
        }

        private async Task<string> UploadPhoto(IFormFile photo)
        {
            if (photo == null || photo.Length == 0)
                return string.Empty;

            var fileName = Guid.NewGuid() + Path.GetExtension(photo.FileName);
            var uploadPath = Path.Combine(_webHostEnvironment.WebRootPath ?? "wwwroot", "images");

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
