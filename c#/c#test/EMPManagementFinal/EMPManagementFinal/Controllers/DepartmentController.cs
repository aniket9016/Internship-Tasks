using EMPManagementFinal.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace EMPManagementFinal.Controllers
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
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateOrEdit(Department department)
        {
            if (!ModelState.IsValid)
            {
                TempData["ErrorMessage"] = "Invalid data provided.";
                return RedirectToAction(nameof(Index));
            }

            if (department.DeptId == 0) // Add New Department
            {
                _context.Departments.Add(department);
                TempData["SuccessMessage"] = "Department added successfully.";
            }
            else // Edit Existing Department
            {
                var existingDepartment = await _context.Departments.FindAsync(department.DeptId);
                if (existingDepartment != null)
                {
                    existingDepartment.DeptName = department.DeptName;
                    _context.Entry(existingDepartment).State = EntityState.Modified;
                    TempData["SuccessMessage"] = "Department updated successfully.";
                }
                else
                {
                    TempData["ErrorMessage"] = "Department not found.";
                    return RedirectToAction(nameof(Index));
                }
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(int DeptId)
        {
            var department = await _context.Departments.FindAsync(DeptId);
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
