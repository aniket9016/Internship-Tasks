using EmpDeptWebApi.Models;
using System.Linq;

namespace EmpDeptWebApi.Repository
{
    public interface IDepartmentRepository
    {
        IQueryable<Department> GetAllDepartments();
        Department GetDepartmentById(int id);
        bool AddDepartment(Department department);
        bool UpdateDepartment(Department department);
        bool DeleteDepartment(int id);
    }
}
