using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmpMan.Models;
using System.Linq;
using System.Threading.Tasks;

namespace EmpMan.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly EmpDBContext _context;

        public EmployeeController(EmpDBContext context)
        {
            _context = context;
        }

        // LIST: Display all employees
        public async Task<IActionResult> Index()
        {
            var employees = await _context.Employees
                .Include(e => e.Department)
                .Include(e => e.City)
                .ToListAsync();
            return View(employees);
        }

        // GET & POST: Create or Edit Employee (Handles both operations)
        public async Task<IActionResult> CreateOrEdit(int? id)
        {
            ViewBag.Departments = await _context.Departments.ToListAsync();
            ViewBag.Cities = await _context.Cities.ToListAsync();

            if (id == null) // Create mode
                return View(new Employee());

            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
                return NotFound();

            return View(employee);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateOrEdit(Employee employee)
        {
            if (!ModelState.IsValid)
            {
                ViewBag.Departments = await _context.Departments.ToListAsync();
                ViewBag.Cities = await _context.Cities.ToListAsync();
                return View(employee);
            }

            if (employee.EmpId == 0) // Create
                _context.Employees.Add(employee);
            else // Edit
                _context.Employees.Update(employee);

            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        // DELETE: Employee
        public async Task<IActionResult> Delete(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
                return NotFound();

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}
