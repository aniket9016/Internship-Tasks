using Microsoft.AspNetCore.Mvc;
using Services;
using Data;
using Service;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly ITokenService _tokenService;

        public AuthController(IEmployeeService employeeService, ITokenService tokenService)
        {
            _employeeService = employeeService;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel login)
        {
            var employee = _employeeService.GetEmployees()
                .FirstOrDefault(x => x.Email == login.Email && x.Password == login.Password);

            if (employee == null)
                return Unauthorized("Invalid email or password");

            var token = _tokenService.GenerateToken(employee.Email, employee.Role);
            return Ok(new { Token = token });
        }

    }
}
