using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EmployeeWEBAPI.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Departmentname { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd.MM.yyyy}", ApplyFormatInEditMode = true)]
        public DateTime? DOB {  get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)] 
        public string? Image { get; set; } 
        public decimal Salary {  get; set; }
        public string Address{  get; set; }
    }
}
