using EmpDeptWebApi.Models;
using EmpDeptWebApi.Repository;
using Microsoft.AspNetCore.Mvc;

namespace EmpDeptWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepository _repository;

        public EmployeesController(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            var employees = _repository.GetAllEmployees();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public IActionResult GetEmployeeById(int id)
        {
            var employee = _repository.GetEmployeeById(id);
            return employee == null ? NotFound(new { message = "Employee not found" }) : Ok(employee);
        }

        [HttpPost]
        public IActionResult CreateEmployee([FromBody] Employee employee)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var result = _repository.AddEmployee(employee);
            if (!result) return StatusCode(500, new { message = "Failed to add employee" });

            return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.EmployeeId }, employee);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEmployee(int id, [FromBody] Employee employee)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != employee.EmployeeId) return BadRequest(new { message = "Employee ID mismatch" });

            var existingEmployee = _repository.GetEmployeeById(id);
            if (existingEmployee == null) return NotFound(new { message = "Employee not found" });

            existingEmployee.EmployeeName = employee.EmployeeName;
            existingEmployee.Designation = employee.Designation;
            existingEmployee.DepartmentId = employee.DepartmentId;

            var result = _repository.UpdateEmployee(existingEmployee);
            if (!result) return StatusCode(500, new { message = "Failed to update employee" });

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            var existingEmployee = _repository.GetEmployeeById(id);
            if (existingEmployee == null) return NotFound(new { message = "Employee not found" });

            var result = _repository.DeleteEmployee(id);
            if (!result) return StatusCode(500, new { message = "Failed to delete employee" });

            return NoContent();
        }
    }
}
