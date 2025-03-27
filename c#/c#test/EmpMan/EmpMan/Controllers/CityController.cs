using EmpMan.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace EmpMan.Controllers
{
    public class CityController : Controller
    {
        private readonly EmpDBContext _context;

        public CityController(EmpDBContext context)
        {
            _context = context;
        }

        // GET: City
        public async Task<IActionResult> Index()
        {
            return View(await _context.Cities.ToListAsync());
        }

        // GET: CreateOrEdit (Handles both Create & Edit)
        public async Task<IActionResult> CreateOrEdit(int id = 0)
        {
            if (id == 0)
                return View(new City()); // New City
            else
            {
                var city = await _context.Cities.FindAsync(id);
                if (city == null)
                    return NotFound();
                return View(city);
            }
        }

        // POST: CreateOrEdit
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateOrEdit(City city)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (city.CityId == 0)
                    {
                        _context.Cities.Add(city);
                        TempData["SuccessMessage"] = "City added successfully!";
                    }
                    else
                    {
                        _context.Cities.Update(city);
                        TempData["SuccessMessage"] = "City updated successfully!";
                    }

                    await _context.SaveChangesAsync();
                    return RedirectToAction(nameof(Index));
                }
                catch (Exception ex)
                {
                    TempData["ErrorMessage"] = "Error: " + ex.Message;
                }
            }
            return View(city);
        }

        // POST: Confirm Delete
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var city = await _context.Cities.FindAsync(id);
            if (city == null)
                return NotFound();

            _context.Cities.Remove(city);
            await _context.SaveChangesAsync();
            TempData["SuccessMessage"] = "City deleted successfully!";
            return RedirectToAction(nameof(Index));
        }
    }
}
