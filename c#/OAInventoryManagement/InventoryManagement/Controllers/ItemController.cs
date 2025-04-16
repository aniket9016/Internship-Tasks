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
            var result = await _itemService.GetItemsBySupplier(supplierId);
            return Ok(result);
        }

        [HttpGet("customer/{customerId}")]
        public async Task<IActionResult> GetAllItemsByCustomer(Guid customerId)
        {
            var result = await _itemService.GetItemsByCustomer(customerId);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetItem(Guid id)
        {
            var result = await _itemService.GetById(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost("add-supplier-item")]
        public async Task<IActionResult> AddSupplierItem([FromQuery] Guid itemId, [FromQuery] Guid supplierId)
        {
            var success = await _itemService.AddItemToSupplier(itemId, supplierId);
            return success ? Ok("Item added to supplier.") : BadRequest("Failed to add item to supplier.");
        }

        [HttpPost("add-customer-item")]
        public async Task<IActionResult> AddCustomerItem([FromQuery] Guid itemId, [FromQuery] Guid customerId)
        {
            var success = await _itemService.AddItemToCustomer(itemId, customerId);
            return success ? Ok("Item added to customer.") : BadRequest("Failed to add item to customer.");
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateItem([FromForm] ItemInsertModel model, IFormFile photo)
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

            var success = await _itemService.Insert(model, fileName);
            return success ? Ok("Item created successfully.") : BadRequest("Item creation failed.");
        }

        [HttpPut("edit")]
        public async Task<IActionResult> EditItem([FromForm] ItemUpdateModel model, IFormFile? photo)
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

            var success = await _itemService.Update(model, fileName);
            return success ? Ok("Item updated successfully.") : BadRequest("Item update failed.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(Guid id)
        {
            var success = await _itemService.Delete(id);
            return success ? Ok("Item deleted successfully.") : NotFound("Item not found.");
        }
    }
}
