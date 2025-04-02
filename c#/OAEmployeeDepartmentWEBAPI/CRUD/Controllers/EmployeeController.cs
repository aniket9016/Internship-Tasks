using Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public EmployeeController(IEmployeeService employeeService, IWebHostEnvironment webHostEnvironment)
        {
            _employeeService = employeeService;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        public IActionResult GetEmployees()
        {
            var employees = _employeeService.GetEmployees();
            return Ok(new { success = true, message = "Employees retrieved successfully", data = employees });
        }

        [HttpGet("{id}")]
        public IActionResult GetEmployee(long id)
        {
            var employee = _employeeService.GetEmployee(id);
            if (employee == null)
                return NotFound(new { success = false, message = "Employee not found" });
            return Ok(new { success = true, message = "Employee retrieved successfully", data = employee });
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromForm] Employee employee, IFormFile profilePic)
        {
            if (profilePic != null)
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "Images");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                string uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(profilePic.FileName);
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await profilePic.CopyToAsync(stream);
                }

                employee.ProfilePic = "/Images/" + uniqueFileName;
            }

            _employeeService.InsertEmployee(employee);
            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, new { success = true, message = "Employee added successfully", data = employee });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(long id, [FromForm] Employee employee, IFormFile profilePic)
        {
            if (id != employee.Id)
                return BadRequest(new { success = false, message = "ID mismatch" });

            if (profilePic != null)
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "Images");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                string uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(profilePic.FileName);
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await profilePic.CopyToAsync(stream);
                }

                employee.ProfilePic = "/Images/" + uniqueFileName;
            }

            _employeeService.UpdateEmployee(employee);
            return Ok(new { success = true, message = "Employee updated successfully" });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(long id)
        {
            _employeeService.DeleteEmployee(id);
            return Ok(new { success = true, message = "Employee deleted successfully" });
        }
    }
}