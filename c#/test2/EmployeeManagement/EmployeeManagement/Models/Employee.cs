using System;
using System.Collections.Generic;

namespace EmployeeManagement.Models;

public partial class Employee
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Gender { get; set; } = null!;

    public DateTime Dob { get; set; }

    public int DeptId { get; set; }

    public int CityId { get; set; }

    public virtual City City { get; set; } = null!;

    public virtual Department Dept { get; set; } = null!;

    public virtual ICollection<Salary> Salaries { get; set; } = new List<Salary>();
}
