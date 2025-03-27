using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProCatCrud.Models;

namespace ProCatCrud.Controllers
{
    public class CategoryController : Controller
    {
        private readonly AppPCContext _context;

        public CategoryController(AppPCContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            ViewBag.SuccessMessage = TempData["SuccessMessage"];
            var categories = await _context.Categories.ToListAsync();
            return View(categories);
        }
        [HttpGet]
        public IActionResult CreateOrUpdate(int? id)
        {
            if (id == null) return View(new Category());
            var category = _context.Categories.Find(id);
            if (category == null) return NotFound();
            return View(category);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrUpdate(Category category)
        {
            if (category.CategoryId == 0)
            {
                _context.Categories.Add(category);
                TempData["SuccessMessage"] = "Category added successfully!";
            }
            else
            {
                var existingCategory = await _context.Categories.FindAsync(category.CategoryId);
                if (existingCategory == null) return NotFound();
                _context.Entry(existingCategory).CurrentValues.SetValues(category);
                TempData["SuccessMessage"] = "Category updated successfully!";
            }

            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        public async Task<IActionResult> Delete(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return NotFound();

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            TempData["SuccessMessage"] = "Category deleted successfully!";

            return RedirectToAction("Index");
        }
    }
}
