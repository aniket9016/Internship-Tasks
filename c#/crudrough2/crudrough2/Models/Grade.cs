using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace crudrough2.Models
{
    public class Grade
    {
        public int GradeId { get; set; }
        public string GradeName{ get; set; }
        public string Section{ get; set; }
        public ICollection<Student> Students { get; set; }
    }
}