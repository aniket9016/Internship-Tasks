using Data;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;
using System.Security.Claims;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IUserService userService, ILogger<AuthController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User login)
        {
            _logger.LogInformation("Login attempt for user: {Username}", login.Username);

            var users = _userService.GetUsers();
            var user = users.FirstOrDefault(u => u.Username == login.Username);

            if (user == null || !PasswordHasher.Verify(login.Password, user.Password))
            {
                _logger.LogWarning("Login failed for user: {Username}", login.Username);
                return Unauthorized("Invalid credentials");
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var identity = new ClaimsIdentity(claims, "MyCookieAuth");
            var principal = new ClaimsPrincipal(identity);

            try
            {
                HttpContext.SignInAsync("MyCookieAuth", principal);
                _logger.LogInformation("User logged in successfully: {Username}", user.Username);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during sign-in for user: {Username}", user.Username);
                return StatusCode(500, "Login failed due to server error");
            }

            return Ok("Logged in successfully");
        }

        [HttpPost("logout")]
        [Authorize]
        public IActionResult Logout()
        {
            var username = User.Identity?.Name ?? "Unknown";
            _logger.LogInformation("Logout requested by user: {Username}", username);

            try
            {
                HttpContext.SignOutAsync("MyCookieAuth");
                _logger.LogInformation("User logged out: {Username}", username);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during logout for user: {Username}", username);
                return StatusCode(500, "Logout failed due to server error");
            }

            return Ok("Logged out");
        }
    }
}
