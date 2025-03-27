using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BankTransactions.Models;
using System;
using System.Threading.Tasks;

namespace BankTransactions.Controllers
{
    public class TransactionController : Controller
    {
        private readonly TransactionDBContext _context;

        public TransactionController(TransactionDBContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            ViewBag.SuccessMessage = TempData["SuccessMessage"];
            var transactions = await _context.Transactions.ToListAsync();
            return View(transactions);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrUpdate(Transaction transaction)
        {
            if (!ModelState.IsValid)
            {
                // If we're using AJAX
                if (Request.Headers["X-Requested-With"] == "XMLHttpRequest")
                {
                    var errors = ModelState.ToDictionary(
                        kvp => kvp.Key,
                        kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
                    );
                    return Json(new { success = false, errors = errors });
                }
                // For regular form submission
                return View("Index", await _context.Transactions.ToListAsync());
            }

            try
            {
                transaction.AccountNumber = transaction.AccountNumber?.Trim();
                transaction.BeneficiaryName = transaction.BeneficiaryName?.Trim();
                transaction.BankName = transaction.BankName?.Trim();
                transaction.SWIFTCode = transaction.SWIFTCode?.Trim();

                if (transaction.TransactionId == 0)
                {
                    _context.Transactions.Add(transaction);
                    TempData["SuccessMessage"] = "Transaction added successfully!";
                }
                else
                {
                    var existingTransaction = await _context.Transactions.FindAsync(transaction.TransactionId);
                    if (existingTransaction == null) return NotFound();
                    _context.Entry(existingTransaction).CurrentValues.SetValues(transaction);
                    TempData["SuccessMessage"] = "Transaction updated successfully!";
                }

                await _context.SaveChangesAsync();

                // If AJAX request
                if (Request.Headers["X-Requested-With"] == "XMLHttpRequest")
                {
                    return Json(new { success = true });
                }

                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                TempData["ErrorMessage"] = "An error occurred while processing your request.";

                // If AJAX request
                if (Request.Headers["X-Requested-With"] == "XMLHttpRequest")
                {
                    return Json(new { success = false, message = "An error occurred while processing your request." });
                }

                return RedirectToAction("Index");
            }
        }

        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var transaction = await _context.Transactions.FindAsync(id);
                if (transaction == null) return NotFound();

                _context.Transactions.Remove(transaction);
                await _context.SaveChangesAsync();
                TempData["SuccessMessage"] = "Transaction deleted successfully!";
            }
            catch (Exception)
            {
                TempData["ErrorMessage"] = "Error deleting transaction.";
            }

            return RedirectToAction("Index");
        }
    }
}
