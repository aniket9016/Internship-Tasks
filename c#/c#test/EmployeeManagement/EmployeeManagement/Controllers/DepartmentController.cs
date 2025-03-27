using EmployeeManagement.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagement.Controllers
{
    public class DepartmentController : Controller
    {
        private readonly EmpDBContext _context;

        public DepartmentController(EmpDBContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var departments = await _context.Departments.ToListAsync();
            return View(departments);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrEdit(Department department)
        {
            if (!ModelState.IsValid)
            {
                TempData["ErrorMessage"] = "Invalid data provided.";
                return RedirectToAction(nameof(Index));
            }

            if (department.Id == 0)
            {
                _context.Departments.Add(department);
                TempData["SuccessMessage"] = "Department added successfully.";
            }
            else
            {
                var existingDepartment = await _context.Departments.FindAsync(department.Id);
                if (existingDepartment != null)
                {
                    existingDepartment.Name = department.Name;
                    _context.Departments.Update(existingDepartment);
                    TempData["SuccessMessage"] = "Department updated successfully.";
                }
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Delete(int id)
        {
            var department = await _context.Departments.FindAsync(id);
            if (department != null)
            {
                _context.Departments.Remove(department);
                await _context.SaveChangesAsync();
                TempData["SuccessMessage"] = "Department deleted successfully.";
            }
            else
            {
                TempData["ErrorMessage"] = "Department not found.";
            }

            return RedirectToAction(nameof(Index));
        }
    }
}
