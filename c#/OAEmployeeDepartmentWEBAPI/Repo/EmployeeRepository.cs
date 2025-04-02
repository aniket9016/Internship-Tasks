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
            _context.Set<Employee>().Update(employee);
            _context.SaveChanges();
            return true;
        }

        public bool DeleteEmployee(int id)
        {
            var employee = new Employee { Id = id };
            _context.Set<Employee>().Remove(employee);
            _context.SaveChanges();
            return true;
        }
    }
}