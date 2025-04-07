using Microsoft.AspNetCore.Mvc;
using Data;
using Services;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;

        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        [HttpGet]
        public IActionResult GetStudents()
        {
            return Ok(_studentService.GetStudents());
        }

        [HttpGet("{id}")]
        public IActionResult GetStudent(long id)
        {
            var student = _studentService.GetStudent(id);
            if (student == null)
                return NotFound("Student not found");

            return Ok(student);
        }

        [HttpPost]
        public IActionResult AddStudent(Student student)
        {
            _studentService.InsertStudent(student);
            return CreatedAtAction(nameof(GetStudent), new { id = student.Id }, student);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateStudent(long id, Student student)
        {
            if (id != student.Id)
                return BadRequest("ID mismatch");

            var existing = _studentService.GetStudent(id);
            if (existing == null)
                return NotFound("Student not found");

            _studentService.UpdateStudent(student);
            return Ok("Student updated successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteStudent(long id)
        {
            var student = _studentService.GetStudent(id);
            if (student == null)
                return NotFound("Student not found");

            _studentService.DeleteStudent(id);
            return Ok("Student deleted");
        }
    }
}
