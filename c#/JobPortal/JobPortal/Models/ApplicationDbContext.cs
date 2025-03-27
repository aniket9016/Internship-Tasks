using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace JobPortal.Models
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext() : base("DefaultConnection") { }

        public DbSet<Job> Jobs { get; set; }
        public DbSet<JobApplication> JobApplications { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Company> Companies { get; set; }
    }
}
