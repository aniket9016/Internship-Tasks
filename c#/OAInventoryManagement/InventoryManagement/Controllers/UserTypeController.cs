using Microsoft.AspNetCore.Mvc;
using Service.Custom.UserTypeSer;
using Domain.ViewModel;
using System;
using System.Threading.Tasks;

namespace InventoryManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserTypeController : ControllerBase
    {
        private readonly IUserTypeService _userTypeService;

        public UserTypeController(IUserTypeService userTypeService)
        {
            _userTypeService = userTypeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _userTypeService.GetAll();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var result = await _userTypeService.GetById(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UserTypeInsertModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var success = await _userTypeService.Insert(model);
            if (!success) return StatusCode(500, "Could not create user type");

            return Ok("User type created successfully");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UserTypeUpdateModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != model.Id) return BadRequest("ID mismatch");

            var success = await _userTypeService.Update(model);
            if (!success) return NotFound("User type not found");

            return Ok("User type updated successfully");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var success = await _userTypeService.Delete(id);
            if (!success) return NotFound("User type not found");

            return Ok("User type deleted successfully");
        }
    }
}
