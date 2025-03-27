using EMPManagementFinal.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

public class CityController : Controller
{
    private readonly EmpDBContext _context;

    public CityController(EmpDBContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index()
    {
        return View(await _context.Cities.ToListAsync());
    }

    public async Task<IActionResult> CreateOrEdit(int id = 0)
    {
        if (id == 0)
            return View(new City());
        else
        {
            var city = await _context.Cities.FindAsync(id);
            if (city == null)
                return NotFound();
            return View(city);
        }
    }

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
                    TempData["SuccessMessage"] = "City saved successfully!";
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

    public async Task<IActionResult> Delete(int id)
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
