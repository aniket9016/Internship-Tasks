using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmpMan.Models
{
    public class City
    {
        [Key]
        public int CityId { get; set; }

        [Required]
        public string CityName { get; set; }

        public virtual ICollection<Employee> Employees { get; set; } 
    }
}
