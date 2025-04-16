using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Http;
using Domain.ViewModel;
using Service.Custom.SupplierSer;
using Service.Custom.CustomerSer;
using Microsoft.AspNetCore.Hosting;
using Domain.Helper;
using Microsoft.AspNetCore.Authorization;

namespace InventoryManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ISupplierService _supplierService;
        private readonly ICustomerService _customerService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public UserController(
            ISupplierService supplierService,
            ICustomerService customerService,
            IWebHostEnvironment webHostEnvironment)
        {
            _supplierService = supplierService;
            _customerService = customerService;
            _webHostEnvironment = webHostEnvironment;
        }

        #region Supplier Operations
        [HttpGet("GetAllSuppliers")]
        public async Task<IActionResult> GetAllSuppliers()
        {
            try
            {
                var suppliers = await _supplierService.GetAll();
                var response = new Response<ICollection<UserViewModel>>
                {
                    Message = "Suppliers retrieved successfully",
                    Status = 200
                };

                return Ok(new
                {
                    response.Message,
                    response.Status,
                    Data = suppliers
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Response<string>
                {
                    Message = $"Error retrieving suppliers: {ex.Message}",
                    Status = 500
                });
            }
        }

        [HttpGet("GetSupplier/{id}")]
        public async Task<IActionResult> GetSupplier(Guid id)
        {
            try
            {
                var supplier = await _supplierService.GetById(id);
                if (supplier == null)
                {
                    return NotFound(new Response<string>
                    {
                        Message = $"Supplier with ID {id} not found",
                        Status = 404
                    });
                }

                var response = new Response<UserViewModel>
                {
                    Message = "Supplier retrieved successfully",
                    Status = 200
                };

                return Ok(new
                {
                    response.Message,
                    response.Status,
                    Data = supplier
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Response<string>
                {
                    Message = $"Error retrieving supplier: {ex.Message}",
                    Status = 500
                });
            }
        }

        [HttpPut("EditSupplier/{id}")]
        public async Task<IActionResult> EditSupplier(Guid id, [FromForm] UserUpdateModel model)
        {
            if (id != model.Id)
            {
                return BadRequest(new Response<string>
                {
                    Message = "ID mismatch",
                    Status = 400
                });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(new Response<string>
                {
                    Message = "Invalid model state",
                    Status = 400
                });
            }

            try
            {
                string photoFileName = await UploadPhoto(model.Photo);
                var result = await _supplierService.Update(model, photoFileName);

                if (result)
                {
                    return Ok(new Response<string>
                    {
                        Message = "Supplier updated successfully",
                        Status = 200
                    });
                }

                return NotFound(new Response<string>
                {
                    Message = $"Supplier with ID {id} not found or update failed",
                    Status = 404
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Response<string>
                {
                    Message = $"Error updating supplier: {ex.Message}",
                    Status = 500
                });
            }
        }

        [HttpDelete("DeleteSupplier/{id}")]
        public async Task<IActionResult> DeleteSupplier(Guid id)
        {
            try
            {
                var result = await _supplierService.Delete(id);

                if (result)
                {
                    return Ok(new Response<string>
                    {
                        Message = "Supplier deleted successfully",
                        Status = 200
                    });
                }

                return NotFound(new Response<string>
                {
                    Message = $"Supplier with ID {id} not found",
                    Status = 404
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Response<string>
                {
                    Message = $"Error deleting supplier: {ex.Message}",
                    Status = 500
                });
            }
        }
        #endregion

        #region Customer Operations
        [HttpGet("GetAllCustomers")]
        public async Task<IActionResult> GetAllCustomers()
        {
            try
            {
                var customers = await _customerService.GetAll();
                var response = new Response<ICollection<UserViewModel>>
                {
                    Message = "Customers retrieved successfully",
                    Status = 200
                };

                return Ok(new
                {
                    response.Message,
                    response.Status,
                    Data = customers
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Response<string>
                {
                    Message = $"Error retrieving customers: {ex.Message}",
                    Status = 500
                });
            }
        }

        [HttpGet("GetCustomer/{id}")]
        public async Task<IActionResult> GetCustomer(Guid id)
        {
            try
            {
                var customer = await _customerService.GetById(id);
                if (customer == null)
                {
                    return NotFound(new Response<string>
                    {
                        Message = $"Customer with ID {id} not found",
                        Status = 404
                    });
                }

                var response = new Response<UserViewModel>
                {
                    Message = "Customer retrieved successfully",
                    Status = 200
                };

                return Ok(new
                {
                    response.Message,
                    response.Status,
                    Data = customer
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Response<string>
                {
                    Message = $"Error retrieving customer: {ex.Message}",
                    Status = 500
                });
            }
        }

        [HttpPut("EditCustomer/{id}")]
        public async Task<IActionResult> EditCustomer(Guid id, [FromForm] UserUpdateModel model)
        {
            if (id != model.Id)
            {
                return BadRequest(new Response<string>
                {
                    Message = "ID mismatch",
                    Status = 400
                });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(new Response<string>
                {
                    Message = "Invalid model state",
                    Status = 400
                });
            }

            try
            {
                string photoFileName = await UploadPhoto(model.Photo);
                var result = await _customerService.Update(model, photoFileName);

                if (result)
                {
                    return Ok(new Response<string>
                    {
                        Message = "Customer updated successfully",
                        Status = 200
                    });
                }

                return NotFound(new Response<string>
                {
                    Message = $"Customer with ID {id} not found or update failed",
                    Status = 404
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Response<string>
                {
                    Message = $"Error updating customer: {ex.Message}",
                    Status = 500
                });
            }
        }

        [HttpDelete("DeleteCustomer/{id}")]
        public async Task<IActionResult> DeleteCustomer(Guid id)
        {
            try
            {
                var result = await _customerService.Delete(id);

                if (result)
                {
                    return Ok(new Response<string>
                    {
                        Message = "Customer deleted successfully",
                        Status = 200
                    });
                }

                return NotFound(new Response<string>
                {
                    Message = $"Customer with ID {id} not found",
                    Status = 404
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Response<string>
                {
                    Message = $"Error deleting customer: {ex.Message}",
                    Status = 500
                });
            }
        }
        #endregion

        #region Helper Methods
        private async Task<string> UploadPhoto(IFormFile photo)
        {
            if (photo == null || photo.Length == 0)
                return string.Empty;

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(photo.FileName);
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
        #endregion
    }
}