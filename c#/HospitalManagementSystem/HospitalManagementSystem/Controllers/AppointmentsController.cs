using Microsoft.AspNetCore.Mvc;
using HospitalManagementSystem.Data;
using HospitalManagementSystem.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalManagementSystem.Controllers
{
    public class AppointmentsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AppointmentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var appointments = _context.Appointments.Include(a => a.Patient).Include(a => a.Doctor);
            return View(await appointments.ToListAsync());
        }

        public async Task<IActionResult> AddOrEdit(int id = 0)
        {
            if (id == 0)
                return PartialView("_AppointmentForm", new Appointment());
            else
            {
                var appointment = await _context.Appointments.FindAsync(id);
                if (appointment == null) return NotFound();
                return PartialView("_AppointmentForm", appointment);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddOrEdit(Appointment appointment)
        {
            if (ModelState.IsValid)
            {
                if (appointment.Id == 0)
                    _context.Appointments.Add(appointment);
                else
                    _context.Appointments.Update(appointment);

                await _context.SaveChangesAsync();
                return Json(new { success = true });
            }
            return PartialView("_AppointmentForm", appointment);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment == null) return Json(new { success = false });

            _context.Appointments.Remove(appointment);
            await _context.SaveChangesAsync();
            return Json(new { success = true });
        }
    }
}
