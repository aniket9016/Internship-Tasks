using EmpDeptWebApi.Models;
using EmpDeptWebApi.Repository;
using Microsoft.AspNetCore.Mvc;

namespace EmpDeptWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentsController : ControllerBase
    {
        private readonly IDepartmentRepository _repository;

        public DepartmentsController(IDepartmentRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAllDepartments()
        {
            var departments = _repository.GetAllDepartments();
            return Ok(departments);
        }

        [HttpGet("{id}")]
        public IActionResult GetDepartmentById(int id)
        {
            var department = _repository.GetDepartmentById(id);
            return department == null ? NotFound(new { message = "Department not found" }) : Ok(department);
        }

        [HttpPost]
        public IActionResult CreateDepartment([FromBody] Department department)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var result = _repository.AddDepartment(department);
            if (!result) return StatusCode(500, new { message = "Failed to add department" });

            return CreatedAtAction(nameof(GetDepartmentById), new { id = department.DepartmentId }, department);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateDepartment(int id, [FromBody] Department department)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != department.DepartmentId) return BadRequest(new { message = "Department ID mismatch" });

            var existingDepartment = _repository.GetDepartmentById(id);
            if (existingDepartment == null) return NotFound(new { message = "Department not found" });

            existingDepartment.DepartmentName = department.DepartmentName;

            var result = _repository.UpdateDepartment(existingDepartment);
            if (!result) return StatusCode(500, new { message = "Failed to update department" });

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteDepartment(int id)
        {
            var existingDepartment = _repository.GetDepartmentById(id);
            if (existingDepartment == null) return NotFound(new { message = "Department not found" });

            var result = _repository.DeleteDepartment(id);
            if (!result) return StatusCode(500, new { message = "Failed to delete department" });

            return NoContent();
        }
    }
}
