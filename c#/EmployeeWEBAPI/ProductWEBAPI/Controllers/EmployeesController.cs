using Microsoft.AspNetCore.Mvc;
using EmployeeWEBAPI.Models;
using EmployeeWEBAPI.Repository;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System;

namespace EmployeeWEBAPI.Controllers
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
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await Task.FromResult(_repository.GetAllEmployees());
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public IActionResult GetEmployeeById(int id)
        {
            var employee = _repository.GetEmployeeById(id);
            return employee == null ? NotFound(new { message = "Employee not found" }) : Ok(employee);
        }


        [HttpPost]
        public async Task<IActionResult> CreateEmployee([FromForm] Employee employee, IFormFile imageFile)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (imageFile != null)
            {
                var imageResult = await SaveImageAsync(imageFile);
                if (!imageResult.success)
                {
                    return StatusCode(500, new { message = imageResult.message });
                }
                employee.Image = imageResult.filePath;
            }

            var result = _repository.AddEmployee(employee);
            if (!result) return StatusCode(500, new { message = "Failed to add employee" });

            return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.Id }, employee);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, [FromForm] Employee employee, IFormFile imageFile)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var existingEmployee = _repository.GetEmployeeById(id);
            if (existingEmployee == null) return NotFound(new { message = "Employee not found" });

            existingEmployee.Name = employee.Name;
            existingEmployee.Departmentname = employee.Departmentname;
            existingEmployee.DOB = employee.DOB;
            existingEmployee.Salary = employee.Salary;
            existingEmployee.Address = employee.Address;

            if (imageFile != null)
            {
                if (!string.IsNullOrEmpty(existingEmployee.Image))
                {
                    DeleteImage(existingEmployee.Image);
                }

                var imageResult = await SaveImageAsync(imageFile);
                if (!imageResult.success)
                {
                    return StatusCode(500, new { message = imageResult.message });
                }

                existingEmployee.Image = imageResult.filePath;
            }

            var result = _repository.UpdateEmployee(existingEmployee);
            if (!result) return StatusCode(500, new { message = "Failed to update employee" });

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var existingEmployee = _repository.GetEmployeeById(id);
            if (existingEmployee == null) return NotFound(new { message = "Employee not found" });

            if (!string.IsNullOrEmpty(existingEmployee.Image))
            {
                var deleteResult = DeleteImage(existingEmployee.Image);
                if (!deleteResult.success)
                {
                    return StatusCode(500, new { message = deleteResult.message });
                }
            }

            var result = _repository.DeleteEmployee(id);
            if (!result) return StatusCode(500, new { message = "Failed to delete employee" });

            return NoContent();
        }

        private async Task<(bool success, string filePath, string message)> SaveImageAsync(IFormFile imageFile)
        {
            try
            {
                var uploadsFolder = Path.Combine("wwwroot", "uploads");
                Directory.CreateDirectory(uploadsFolder);
                var filePath = Path.Combine(uploadsFolder, imageFile.FileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }

                return (true, $"/uploads/{imageFile.FileName}", "Image saved successfully");
            }
            catch (Exception ex)
            {
                return (false, "", $"Error saving image: {ex.Message}");
            }
        }

        private (bool success, string message) DeleteImage(string imagePath)
        {
            try
            {
                var fullPath = Path.Combine("wwwroot", imagePath.TrimStart('/'));
                if (System.IO.File.Exists(fullPath))
                {
                    System.IO.File.Delete(fullPath);
                }
                return (true, "Image deleted successfully");
            }
            catch (Exception ex)
            {
                return (false, $"Error deleting image: {ex.Message}");
            }
        }
    }
}
