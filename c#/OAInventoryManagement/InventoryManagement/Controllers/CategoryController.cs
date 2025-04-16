using Microsoft.AspNetCore.Mvc;
using Service.Custom.CategorySer;
using Domain.ViewModel;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace InventoryManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _categoryService.GetAll();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var result = await _categoryService.GetById(id);
            if (result == null) return NotFound("Category not found");
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CategoryInsertModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var success = await _categoryService.Insert(model);
            if (!success) return StatusCode(500, "Could not create category");

            return Ok("Category created successfully");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] CategoryUpdateModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != model.Id) return BadRequest("ID mismatch");

            var success = await _categoryService.Update(model);
            if (!success) return NotFound("Category not found");

            return Ok("Category updated successfully");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var success = await _categoryService.Delete(id);
            if (!success) return NotFound("Category not found");

            return Ok("Category deleted successfully");
        }
    }
}
