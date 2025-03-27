using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeDepartmentCRUD.Models
{
    public class Employee : BaseEntity
    {
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string Address { get; set; }
        public int Phone { get; set; }
        public string Gender { get; set; }
        public string City { get; set; }
        public string CompanyName { get; set; }
        public int Pincode { get; set; }
        public string Project { get; set; }
        public int DepartmentId { get; set; }

        [ForeignKey("DepartmentId")]
        public virtual Department Department { get; set; }
    }
}
