using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ProCatCrud.Models;
using System.Linq;
using System.Threading.Tasks;

namespace ProCatCrud.Controllers
{
    public class ProductController : Controller
    {
        private readonly AppPCContext _context;

        public ProductController(AppPCContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            ViewBag.SuccessMessage = TempData["SuccessMessage"];
            var products = await _context.Products.Include(p => p.Category).ToListAsync();
            return View(products);
        }

        [HttpGet]
        public async Task<IActionResult> CreateOrUpdate(int? id)
        {
            ViewBag.Categories = new SelectList(await _context.Categories.ToListAsync(), "CategoryId", "CategoryType");
            if (id == null) return View(new Product());

            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();

            return View(product);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrUpdate(Product product)
        {
            if (!ModelState.IsValid)
            {
                ViewBag.Categories = new SelectList(await _context.Categories.ToListAsync(), "CategoryId", "CategoryType", product.CategoryId);
                return View(product);
            }

            if (product.ProductId == 0)
            {
                _context.Products.Add(product);
                TempData["SuccessMessage"] = "Product added successfully!";
            }
            else
            {
                var existingProduct = await _context.Products.FindAsync(product.ProductId);
                if (existingProduct == null) return NotFound();
                _context.Entry(existingProduct).CurrentValues.SetValues(product);
                TempData["SuccessMessage"] = "Product updated successfully!";
            }

            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        public async Task<IActionResult> Delete(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            TempData["SuccessMessage"] = "Product deleted successfully!";

            return RedirectToAction("Index");
        }
    }
}