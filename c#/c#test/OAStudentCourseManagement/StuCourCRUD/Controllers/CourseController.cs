using Microsoft.AspNetCore.Mvc;
using Data;
using Services;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpGet]
        public IActionResult GetCourses()
        {
            return Ok(_courseService.GetCourses());
        }

        [HttpGet("{id}")]
        public IActionResult GetCourse(long id)
        {
            var course = _courseService.GetCourse(id);
            if (course == null)
                return NotFound("Course not found");

            return Ok(course);
        }

        [HttpPost]
        public IActionResult AddCourse(Course course)
        {
            _courseService.InsertCourse(course);
            return CreatedAtAction(nameof(GetCourse), new { id = course.Id }, course);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCourse(long id, Course course)
        {
            if (id != course.Id)
                return BadRequest("ID mismatch");

            var existing = _courseService.GetCourse(id);
            if (existing == null)
                return NotFound("Course not found");

            _courseService.UpdateCourse(course);
            return Ok("Course updated successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCourse(long id)
        {
            var course = _courseService.GetCourse(id);
            if (course == null)
                return NotFound("Course not found");

            _courseService.DeleteCourse(id);
            return Ok("Course deleted");
        }
    }
}
