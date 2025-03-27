using Microsoft.AspNetCore.Mvc;
using HospitalManagementSystem.Data;
using HospitalManagementSystem.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace HospitalManagementSystem.Controllers
{
    public class DoctorsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public DoctorsController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            return View(await _context.Doctors.ToListAsync());
        }

        public async Task<IActionResult> AddOrEdit(int id = 0)
        {
            if (id == 0)
                return PartialView("_DoctorForm", new Doctor());
            else
            {
                var doctor = await _context.Doctors.FindAsync(id);
                if (doctor == null) return NotFound();
                return PartialView("_DoctorForm", doctor);
            }
        }

        [HttpPost]
        public async Task<IActionResult> SaveDoctor(Doctor doctor)
        {
            if (ModelState.IsValid)
            {
                if (doctor.Id == 0)
                    _context.Doctors.Add(doctor);
                else
                    _context.Doctors.Update(doctor);

                await _context.SaveChangesAsync();
                return Json(new { success = true });
            }
            return Json(new { success = false, message = "Validation failed!" });
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null) return Json(new { success = false });

            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();
            return Json(new { success = true });
        }
    }
}
