using JQueryAjaxCRUD.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace JQueryAjaxCRUD.Controllers
{
    public class TransactionController : Controller
    {
        private readonly TransactionDbContext _context;

        public TransactionController(TransactionDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GetAll()
        {
            return PartialView("_ViewAll", await _context.Transactions.ToListAsync());
        }

        public async Task<IActionResult> AddOrEdit(int id = 0)
        {
            if (id == 0)
                return View(new Transaction());
            else
                return View(await _context.Transactions.FindAsync(id));
        }

        [HttpPost]
        public async Task<IActionResult> AddOrEdit(int id, Transaction transaction)
        {
            if (ModelState.IsValid)
            {
                if (id == 0)
                    _context.Transactions.Add(transaction);
                else
                    _context.Transactions.Update(transaction);

                await _context.SaveChangesAsync();
                return Json(new { isValid = true, html = Helper.RenderRazorViewToString(this, "_ViewAll", _context.Transactions.ToList()) });
            }
            return Json(new { isValid = false, html = Helper.RenderRazorViewToString(this, "AddOrEdit", transaction) });
        }

        public async Task<IActionResult> Delete(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();
            return Json(new { html = await Helper.RenderRazorViewToString(this, "_ViewAll", _context.Transactions.ToList()) });
        }
    }
}
