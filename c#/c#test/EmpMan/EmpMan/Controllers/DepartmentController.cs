using EmpMan.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        // GET: Department List
        public async Task<IActionResult> Index()
        {
            var departments = await _context.Departments.ToListAsync();
            return View(departments);
        }

        // GET: Department Details
        public async Task<IActionResult> Details(int id)
        {
            var department = await _context.Departments.FindAsync(id);
            if (department == null)
            {
                return NotFound();
            }
            return View(department);
        }

        // GET: Create or Edit Department
        public async Task<IActionResult> CreateOrEdit(int id = 0)
        {
            if (id == 0)
                return View(new Department()); // Creating a new department
            else
            {
                var department = await _context.Departments.FindAsync(id);
                if (department == null)
                    return NotFound();
                return View(department);
            }
        }

        // POST: Create or Edit Department
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateOrEdit(Department department)
        {
            if (!ModelState.IsValid)
            {
                TempData["ErrorMessage"] = "Invalid data provided.";
                return View(department);
            }

            try
            {
                if (department.DeptId == 0) // Create new department
                {
                    _context.Departments.Add(department);
                    TempData["SuccessMessage"] = "Department added successfully.";
                }
                else // Edit existing department
                {
                    var existingDepartment = await _context.Departments.FindAsync(department.DeptId);
                    if (existingDepartment != null)
                    {
                        existingDepartment.DeptName = department.DeptName;
                        _context.Departments.Update(existingDepartment);
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
            catch
            {
                TempData["ErrorMessage"] = "An error occurred while saving data.";
                return View(department);
            }
        }

        // GET: Delete Confirmation
        public async Task<IActionResult> Delete(int id)
        {
            var department = await _context.Departments.FindAsync(id);
            if (department == null)
            {
                return NotFound();
            }
            return View(department);
        }

        // POST: Confirm Delete
        [HttpPost, ActionName("DeleteConfirmed")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var department = await _context.Departments.FindAsync(id);
            if (department == null)
            {
                TempData["ErrorMessage"] = "Department not found.";
                return RedirectToAction(nameof(Index));
            }

            _context.Departments.Remove(department);
            await _context.SaveChangesAsync();
            TempData["SuccessMessage"] = "Department deleted successfully.";
            return RedirectToAction(nameof(Index));
        }
    }
}
