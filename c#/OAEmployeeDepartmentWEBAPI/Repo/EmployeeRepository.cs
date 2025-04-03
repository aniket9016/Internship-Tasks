using Data;
using Repo;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace Repo
{
    public class EmployeeRepository : IEmployeeRepository<Employee>
    {
        private readonly AppDBcontext _context;

        public EmployeeRepository(AppDBcontext context)
        {
            _context = context;
        }

        public IQueryable<Employee> GetAllEmployees()
        {
            return _context.Set<Employee>();
        }

        public Employee GetEmployeeById(int id)
        {
            return _context.Set<Employee>().Find(id);
        }

        public bool AddEmployee(Employee employee)
        {
            _context.Set<Employee>().Add(employee);
            _context.SaveChanges();
            return true;
        }

        public bool UpdateEmployee(Employee employee)
        {
            var existingEmployee = _context.Employees.Find(employee.Id);

            if (existingEmployee == null)
                return false;

            _context.Entry(existingEmployee).CurrentValues.SetValues(employee);
            _context.SaveChanges();

            return true; 
        }

        public bool DeleteEmployee(int id)
        {
            var employee = _context.Set<Employee>().Find(id); 

            if (employee == null)
            {
                return false; 
            }

            _context.Set<Employee>().Remove(employee); 
            _context.SaveChanges();

            return true; 
        }

    }
}