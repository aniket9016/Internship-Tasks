using Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace UserEmpCRUD.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentService _departmentService;

        public DepartmentController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }

        [HttpGet]
        public IActionResult GetDepartments()
        {
            return Ok(_departmentService.GetDepartments());
        }

        [HttpGet("{id}")]
        public IActionResult GetDepartment(Guid id)
        {
            var department = _departmentService.GetDepartment(id);
            if (department == null)
                return NotFound("Department not found");

            return Ok(department);
        }

        [HttpPost]
        public IActionResult AddDepartment(Department department)
        {
            _departmentService.InsertDepartment(department);
            return CreatedAtAction(nameof(GetDepartment), new { id = department.Id }, department);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateDepartment(Guid id, Department department)
        {
            if (id != department.Id)
                return BadRequest("ID mismatch");

            var existing = _departmentService.GetDepartment(id);
            if (existing == null)
                return NotFound("Department not found");

            _departmentService.UpdateDepartment(department);
            return Ok("Department updated successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteDepartment(Guid id)
        {
            var department = _departmentService.GetDepartment(id);
            if (department == null)
                return NotFound("Department not found");

            _departmentService.DeleteDepartment(id);
            return Ok("Department deleted");
        }
    }
}
