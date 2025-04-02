using Data;
using Microsoft.AspNetCore.Mvc;
using Service;

namespace CRUD.Controllers
{
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
            var departments = _departmentService.GetDepartments();
            return Ok(new { success = true, message = "Departments retrieved successfully", data = departments });
        }

        [HttpGet("{id}")]
        public IActionResult GetDepartment(long id)
        {
            var department = _departmentService.GetDepartment(id);
            if (department == null)
                return NotFound(new { success = false, message = "Department not found" });
            return Ok(new { success = true, message = "Department retrieved successfully", data = department });
        }

        [HttpPost]
        public IActionResult AddDepartment([FromBody] Department department)
        {
            _departmentService.InsertDepartment(department);
            return CreatedAtAction(nameof(GetDepartment), new { id = department.Id }, new { success = true, message = "Department added successfully", data = department });
        }

        [HttpPut("{id}")]
        public IActionResult UpdateDepartment(long id, [FromBody] Department department)
        {
            if (id != department.Id)
                return BadRequest(new { success = false, message = "ID mismatch" });

            _departmentService.UpdateDepartment(department);
            return Ok(new { success = true, message = "Department updated successfully" });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteDepartment(long id)
        {
            _departmentService.DeleteDepartment(id);
            return Ok(new { success = true, message = "Department deleted successfully" });
        }
    }
}
