using System;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Collections.Generic;


namespace StudentCourseSubscriptionMVCCRUD.Models
{
    public class SCSContext : DbContext
    {
        public SCSContext() : base("ConSCS") { }

        public DbSet<Student> Students { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }

    }
}