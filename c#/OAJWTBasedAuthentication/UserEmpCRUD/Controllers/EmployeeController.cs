using Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace UserEmpCRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        public IActionResult GetEmployees()
        {
            return Ok(_employeeService.GetEmployees());
        }

        [HttpGet("{id}")]
        public IActionResult GetEmployee(Guid id)
        {
            var employee = _employeeService.GetEmployee(id);
            if (employee == null)
                return NotFound("Employee not found");

            return Ok(employee);
        }

        [HttpPost]
        public IActionResult AddEmployee(Employee employee)
        {
            _employeeService.InsertEmployee(employee);
            return Ok(employee);
        }


        [HttpPut("{id}")]
        public IActionResult UpdateEmployee(Guid id, Employee employee)
        {
            if (id != employee.Id)
                return BadRequest("ID mismatch");

            var existing = _employeeService.GetEmployee(id);
            if (existing == null)
                return NotFound("Employee not found");

            _employeeService.UpdateEmployee(employee);
            return Ok("Employee updated successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(Guid id)
        {
            var employee = _employeeService.GetEmployee(id);
            if (employee == null)
                return NotFound("Employee not found");

            _employeeService.DeleteEmployee(id);
            return Ok("Employee deleted");
        }
    }
}

