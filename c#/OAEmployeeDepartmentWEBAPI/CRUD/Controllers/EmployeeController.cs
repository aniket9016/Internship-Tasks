using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Service;
using Data;
using System.IO;
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
            return Ok(_employeeService.GetEmployees());
        }

        [HttpGet("{id}")]
        public IActionResult GetEmployee(long id)
        {
            var employee = _employeeService.GetEmployee(id);
            if (employee == null)
                return NotFound("Employee not found");

            return Ok(employee);
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromForm] Employee employee, IFormFile profilePic)
        {
            if (profilePic != null)
            {
                employee.ProfilePic = await SaveImageAsync(profilePic);
            }

            _employeeService.InsertEmployee(employee);
            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(long id, [FromForm] Employee employee, IFormFile profilePic)
        {
            if (id != employee.Id)
                return BadRequest(new { success = false, message = "ID mismatch" });

            var existingEmployee = _employeeService.GetEmployee(id);
            if (existingEmployee == null)
                return NotFound(new { success = false, message = "Employee not found" });

            if (profilePic != null)
            {
                if (!string.IsNullOrEmpty(existingEmployee.ProfilePic))
                {
                    DeleteImage(existingEmployee.ProfilePic);
                }
                employee.ProfilePic = await SaveImageAsync(profilePic);
            }
            else
            {
                employee.ProfilePic = existingEmployee.ProfilePic;
            }

            bool isUpdated = _employeeService.UpdateEmployee(employee);

            if (!isUpdated)
                return StatusCode(500, new { success = false, message = "Employee update failed" });

            return Ok(new { success = true, message = "Employee updated successfully" });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(long id)
        {
            var employee = _employeeService.GetEmployee(id);
            if (employee == null)
                return NotFound("Employee not found");

            if (!string.IsNullOrEmpty(employee.ProfilePic))
            {
                DeleteImage(employee.ProfilePic);
            }

            _employeeService.DeleteEmployee(id);
            return Ok("Employee deleted");
        }

        private async Task<string> SaveImageAsync(IFormFile file)
        {
            string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "Images");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            string filePath = Path.Combine(uploadsFolder, fileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);

            return "/Images/" + fileName;
        }

        private void DeleteImage(string filePath)
        {
            string fileName = Path.GetFileName(filePath); // Extract just the file name
            string fullPath = Path.Combine(_webHostEnvironment.WebRootPath, "Images", fileName);
            if (System.IO.File.Exists(fullPath))
            {
                try
                {
                    System.IO.File.Delete(fullPath);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error deleting image: {ex.Message}");
                }
            }
        }

    }
}
