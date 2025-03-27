using System;
using System.Collections.Generic;

namespace EmployeeManagement.Models;

public partial class Salary
{
    public int Id { get; set; }

    public int EmpId { get; set; }

    public decimal Amount { get; set; }

    public DateTime Date { get; set; }

    public virtual Employee Emp { get; set; } = null!;
}
