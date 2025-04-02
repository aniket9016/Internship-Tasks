using EmployeeWEBAPI.Models;
using System.Collections.Generic;
using System.Linq;

namespace EmployeeWEBAPI.Repository
{
    public interface IEmployeeRepository
    {
        IQueryable<Employee> GetAllEmployees();
        Employee GetEmployeeById(int id);
        bool AddEmployee(Employee employee);
        bool UpdateEmployee(Employee employee);
        bool DeleteEmployee(int id);
    }
}
