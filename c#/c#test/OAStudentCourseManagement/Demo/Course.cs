using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class Course:BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
