using Microsoft.AspNetCore.Mvc;
using Data;
using Services;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(_userService.GetUsers());
        }

        [HttpGet("{id}")]
        public IActionResult GetUser(long id)
        {
            var user = _userService.GetUser(id);
            if (user == null)
                return NotFound("User not found");

            // Don't return password hash to clients
            //user.Password = null;

            return Ok(user);
        }

        [HttpPost]
        public IActionResult AddUser(User user)
        {
            // Hash password before saving
            user.Password = PasswordHasher.HashWithSalt(user.Password);
            _userService.InsertUser(user);
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(long id, User user)
        {
            if (id != user.Id)
                return BadRequest("ID mismatch");

            var existing = _userService.GetUser(id);
            if (existing == null)
                return NotFound("User not found");

            // If password is changed, hash again
            if (!string.IsNullOrWhiteSpace(user.Password) &&
                !PasswordHasher.Verify(user.Password, existing.Password))
            {
                user.Password = PasswordHasher.HashWithSalt(user.Password);
            }
            else
            {
                user.Password = existing.Password; // keep the original
            }

            _userService.UpdateUser(user);
            return Ok("User updated successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(long id)
        {
            var user = _userService.GetUser(id);
            if (user == null)
                return NotFound("User not found");

            _userService.DeleteUser(id);
            return Ok("User deleted");
        }
    }
}
