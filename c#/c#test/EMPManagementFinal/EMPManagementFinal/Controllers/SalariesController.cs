using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EMPManagementFinal.Models;

namespace EMPManagementFinal.Controllers
{
    public class SalariesController : Controller
    {
        private readonly EmpDBContext _context;

        public SalariesController(EmpDBContext context)
        {
            _context = context;
        }

        // GET: Salaries
        public async Task<IActionResult> Index()
        {
            var salaries = _context.Salaries.Include(s => s.Employee).OrderByDescending(s => s.Date);

            // Fetch unique years from Salary records
            ViewBag.Years = await _context.Salaries
                .Select(s => s.Date.Year)
                .Distinct()
                .OrderByDescending(y => y)
                .ToListAsync();

            return View(await salaries.ToListAsync());
        }

        // GET: Salaries/Create
        public IActionResult Create()
        {
            ViewData["EmpId"] = new SelectList(_context.Employees, "EmpId", "EmpName");
            return View();
        }

        // POST: Salaries/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("SalaryId,EmpId,Amount,Date")] Salary salary)
        {
            if (ModelState.IsValid)
            {
                _context.Add(salary);
                await _context.SaveChangesAsync();

                TempData["SuccessMessage"] = "Salary record created successfully!";
                return RedirectToAction(nameof(Index));
            }

            ViewData["EmpId"] = new SelectList(_context.Employees, "EmpId", "EmpName", salary.EmpId);
            return View(salary);
        }

        // GET: Salaries/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null) return NotFound();

            var salary = await _context.Salaries.FindAsync(id);
            if (salary == null) return NotFound();

            ViewData["EmpId"] = new SelectList(_context.Employees, "EmpId", "EmpName", salary.EmpId);
            return View(salary);
        }

        // POST: Salaries/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("SalaryId,EmpId,Amount,Date")] Salary salary)
        {
            if (id != salary.SalaryId) return NotFound();

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(salary);
                    await _context.SaveChangesAsync();

                    TempData["SuccessMessage"] = "Salary record updated successfully!";
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SalaryExists(salary.SalaryId)) return NotFound();
                    throw;
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["EmpId"] = new SelectList(_context.Employees, "EmpId", "EmpName", salary.EmpId);
            return View(salary);
        }

        // GET: Salaries/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null) return NotFound();

            var salary = await _context.Salaries
                .Include(s => s.Employee)
                .FirstOrDefaultAsync(m => m.SalaryId == id);
            if (salary == null) return NotFound();

            return View(salary);
        }

        // POST: Salaries/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var salary = await _context.Salaries.FindAsync(id);
            if (salary != null)
            {
                _context.Salaries.Remove(salary);
                await _context.SaveChangesAsync();

                TempData["SuccessMessage"] = "Salary record deleted successfully!";
            }

            return RedirectToAction(nameof(Index));
        }

        private bool SalaryExists(int id)
        {
            return _context.Salaries.Any(e => e.SalaryId == id);
        }

        // Department-wise monthly salary amount for a given year
        public async Task<IActionResult> DepartmentWiseMonthlySalary(int year)
        {
            var report = await _context.Salaries
                .Include(s => s.Employee)
                .ThenInclude(e => e.Department)
                .Where(s => s.Date.Year == year)
                .GroupBy(s => new { s.Employee.Department.DeptName, s.Date.Month })
                .Select(g => new
                {
                    Department = g.Key.DeptName,
                    Month = g.Key.Month,
                    TotalSalary = g.Sum(s => s.Amount)
                })
                .OrderBy(g => g.Month)
                .ToListAsync();

            return Json(report);
        }
    }
}
