using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using EMPManagementFinal.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;

namespace EMPManagementFinal.Controllers
{
    public class EmployeesController : Controller
    {
        private readonly EmpDBContext _context;

        public EmployeesController(EmpDBContext context)
        {
            _context = context;
        }

        // GET: Employees (Load All Employees Initially)
        public async Task<IActionResult> Index()
        {
            var employees = await _context.Employees
                .Include(e => e.City)
                .Include(e => e.Department)
                .ToListAsync();

            return View(employees);
        }

        // POST: Employees (Search Employees)
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Index(string searchString)
        {
            var employees = _context.Employees
                .Include(e => e.City)
                .Include(e => e.Department)
                .AsQueryable();

            if (!string.IsNullOrEmpty(searchString))
            {
                employees = employees.Where(e => e.EmpName.ToLower().Contains(searchString.ToLower()));
            }

            return View(await employees.ToListAsync());
        }

        // GET: Employees/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                TempData["ErrorMessage"] = "Invalid request!";
                return RedirectToAction(nameof(Index));
            }

            var employee = await _context.Employees
                .Include(e => e.City)
                .Include(e => e.Department)
                .FirstOrDefaultAsync(m => m.EmpId == id);

            if (employee == null)
            {
                TempData["ErrorMessage"] = "Employee not found!";
                return RedirectToAction(nameof(Index));
            }

            return View(employee);
        }

        // GET: Employees/CreateOrEdit/5
        public async Task<IActionResult> CreateOrEdit(int? id)
        {
            var employee = await _context.Employees.FindAsync(id) ?? new Employee();

            ViewData["CityId"] = new SelectList(_context.Cities, "CityId", "CityName", employee.CityId);
            ViewData["DeptId"] = new SelectList(_context.Departments, "DeptId", "DeptName", employee.DeptId);

            return View(employee);
        }

        // POST: Employees/CreateOrEdit
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateOrEdit(int id, [Bind("EmpId,EmpName,Email,Phone,Gender,DOB,DeptId,CityId")] Employee employee)
        {
            if (employee.DOB > DateTime.Today)
            {
                ModelState.AddModelError("DOB", "Future dates are not allowed.");
            }

            if (!ModelState.IsValid)
            {
                ViewData["CityId"] = new SelectList(_context.Cities, "CityId", "CityName", employee.CityId);
                ViewData["DeptId"] = new SelectList(_context.Departments, "DeptId", "DeptName", employee.DeptId);
                return View(employee);
            }

            if (id == 0)
            {
                _context.Add(employee);
                TempData["SuccessMessage"] = "Employee created successfully!";
            }
            else
            {
                var existingEmployee = await _context.Employees.FindAsync(id);
                if (existingEmployee == null)
                {
                    TempData["ErrorMessage"] = "Employee not found!";
                    return RedirectToAction(nameof(Index));
                }

                existingEmployee.EmpName = employee.EmpName;
                existingEmployee.Email = employee.Email;
                existingEmployee.Phone = employee.Phone;
                existingEmployee.Gender = employee.Gender;
                existingEmployee.DOB = employee.DOB;
                existingEmployee.DeptId = employee.DeptId;
                existingEmployee.CityId = employee.CityId;

                _context.Update(existingEmployee);
                TempData["SuccessMessage"] = "Employee updated successfully!";
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        // GET: Employees/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                TempData["ErrorMessage"] = "Invalid request!";
                return RedirectToAction(nameof(Index));
            }

            var employee = await _context.Employees
                .Include(e => e.City)
                .Include(e => e.Department)
                .FirstOrDefaultAsync(m => m.EmpId == id);
            if (employee == null)
            {
                TempData["ErrorMessage"] = "Employee not found!";
                return RedirectToAction(nameof(Index));
            }

            return View(employee);
        }

        // POST: Employees/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                TempData["ErrorMessage"] = "Employee not found!";
                return RedirectToAction(nameof(Index));
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            TempData["SuccessMessage"] = "Employee deleted successfully!";
            return RedirectToAction(nameof(Index));
        }
    }
}
