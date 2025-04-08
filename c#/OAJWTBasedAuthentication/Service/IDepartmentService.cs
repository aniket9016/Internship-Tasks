using Data;
using System;
using System.Collections.Generic;

namespace Services
{
    public interface IDepartmentService
    {
        IEnumerable<Department> GetDepartments();
        Department GetDepartment(Guid id);
        void InsertDepartment(Department department);
        void UpdateDepartment(Department department);
        void DeleteDepartment(Guid id);
    }
}
