using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class Role : BaseEntity
    {
        public string RoleName { get; set; }

        public ICollection<Employee> Employees { get; set; } = new List<Employee>();
    }
}
