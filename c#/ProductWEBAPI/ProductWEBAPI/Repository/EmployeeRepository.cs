using EmployeeWEBAPI.Models;
using ProductWEBAPI.Models;
using System.Collections.Generic;
using System.Linq;

namespace EmployeeWEBAPI.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly AppDbcontext _context;

        public EmployeeRepository(AppDbcontext context)
        {
            _context = context;
        }

        public IQueryable<Employee> GetAllEmployees()
        {
            return _context.Employees;
        }

        public Employee GetEmployeeById(int id)
        {
            return _context.Employees.FirstOrDefault(e => e.Id == id);
        }

        public bool AddEmployee(Employee employee)
        {
            try
            {
                _context.Employees.Add(employee);
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool UpdateEmployee(Employee employee)
        {
            try
            {
                _context.Employees.Update(employee);
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool DeleteEmployee(int id)
        {
            try
            {
                var employee = _context.Employees.FirstOrDefault(e => e.Id == id);
                if (employee != null)
                {
                    _context.Employees.Remove(employee);
                    _context.SaveChanges();
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }
    }
}
