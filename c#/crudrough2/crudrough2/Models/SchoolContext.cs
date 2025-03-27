using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace crudrough2.Models
{
    public class SchoolContext:DbContext
    {
        public SchoolContext():base() 
        { 
        }
        public DbSet<Student> Students { get; set; }
        public DbSet<Grade> Grades  { get; set; }

    }
}