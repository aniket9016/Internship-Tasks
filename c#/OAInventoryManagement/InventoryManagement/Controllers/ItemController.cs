using Microsoft.AspNetCore.Mvc;
using Domain.ViewModel;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.IO;
using Service.Custom.ItemSer;

namespace InventoryManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemService _itemService;

        public ItemController(IItemService itemService)
        {
            _itemService = itemService;
        }

        [HttpGet("supplier/{supplierId}")]
        public async Task<IActionResult> GetAllItemsBySupplier(Guid supplierId)
        {
            var result = await _itemService.GetAllItemsBySupplier(supplierId);
            return Ok(result);
        }

        [HttpGet("customer/{customerId}")]
        public async Task<IActionResult> GetAllItemsByCustomer(Guid customerId)
        {
            var result = await _itemService.GetAllItemsByCustomer(customerId);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetItem(Guid id)
        {
            var result = await _itemService.GetItem(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost("supplier")]
        public async Task<IActionResult> AddSupplierItem([FromForm] ItemInsertModel model, IFormFile photo, [FromQuery] Guid supplierId)
        {
            string fileName = string.Empty;

            if (photo != null)
            {
                var extension = Path.GetExtension(photo.FileName).ToLower();
                if (extension != ".jpg" && extension != ".jpeg" && extension != ".png")
                    return BadRequest("Invalid image format.");

                fileName = $"{Guid.NewGuid()}{extension}";
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images/Item", fileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await photo.CopyToAsync(stream);
                }
            }

            var success = await _itemService.AddSupplierItem(model, fileName, supplierId);
            return success ? Ok("Item added to supplier successfully.") : BadRequest("Failed to add item to supplier.");
        }

        [HttpPost("customer")]
        public async Task<IActionResult> AddCustomerItem([FromForm] ItemInsertModel model, IFormFile photo, [FromQuery] Guid customerId)
        {
            string fileName = string.Empty;

            if (photo != null)
            {
                var extension = Path.GetExtension(photo.FileName).ToLower();
                if (extension != ".jpg" && extension != ".jpeg" && extension != ".png")
                    return BadRequest("Invalid image format.");

                fileName = $"{Guid.NewGuid()}{extension}";
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images/Item", fileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await photo.CopyToAsync(stream);
                }
            }

            var success = await _itemService.AddCustomerItem(model, fileName, customerId);
            return success ? Ok("Item added to customer successfully.") : BadRequest("Failed to add item to customer.");
        }

        [HttpPut("edit")]
        public async Task<IActionResult> EditItem([FromForm] ItemUpdateModel model, IFormFile photo)
        {
            string fileName = string.Empty;

            if (photo != null)
            {
                var extension = Path.GetExtension(photo.FileName).ToLower();
                if (extension != ".jpg" && extension != ".jpeg" && extension != ".png")
                    return BadRequest("Invalid image format.");

                fileName = $"{Guid.NewGuid()}{extension}";
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images/Item", fileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await photo.CopyToAsync(stream);
                }
            }

            var success = await _itemService.EditItem(model, fileName);
            return success ? Ok("Item updated successfully.") : BadRequest("Item update failed.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(Guid id)
        {
            var success = await _itemService.DeleteItem(id);
            return success ? Ok("Item deleted successfully.") : NotFound("Item not found.");
        }
    }
}