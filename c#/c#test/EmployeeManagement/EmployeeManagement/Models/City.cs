using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeManagement.Models
{
    public class City
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CityId { get; set; }

        [Required]
        public string CityName { get; set; }

        // One City can have multiple Employees
        public virtual ICollection<Employee> Employees { get; set; } = new HashSet<Employee>();
    }
}
