using HospitalManagementSystem.Data;
using HospitalManagementSystem.Helpers;
using HospitalManagementSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace HospitalManagementSystem.Controllers
{
    public class PatientsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PatientsController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var patients = await _context.Patients.Include(p => p.Doctor).ToListAsync();
            return View(patients);
        }

        [HttpGet]
        public IActionResult AddOrEdit(int id = 0)
        {
            if (id == 0)
                return PartialView("_DoctorForm", new Doctor());
            else
            {
                var doctor = _context.Doctors.Find(id);
                if (doctor == null)
                    return NotFound();
                return PartialView("_DoctorForm", doctor);
            }
        }



        [HttpPost]
        public async Task<IActionResult> AddOrEdit(Patient patient)
        {
            if (ModelState.IsValid)
            {
                if (patient.Id == 0)
                    _context.Patients.Add(patient);
                else
                    _context.Patients.Update(patient);

                await _context.SaveChangesAsync();
                return Json(new { success = true, message = "Saved successfully" });
            }
            return Json(new { success = false, message = "Validation failed" });
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient != null)
            {
                _context.Patients.Remove(patient);
                await _context.SaveChangesAsync();
                return Json(new { success = true, message = "Deleted successfully" });
            }
            return Json(new { success = false, message = "Error while deleting" });
        }
    }
}
