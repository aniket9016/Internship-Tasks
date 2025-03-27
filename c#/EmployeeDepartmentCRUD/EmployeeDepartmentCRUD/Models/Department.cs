using System.Collections.Generic;

namespace EmployeeDepartmentCRUD.Models
{
    public class Department : BaseEntity
    {

        public string DepartmentName { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
    }
}
