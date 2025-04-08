using Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Repo
{
    public class EmployeeRepository : IEmployeeRepository<Employee>
    {
        private readonly AppDBContext context;
        private DbSet<Employee> entities;

        public EmployeeRepository(AppDBContext context)
        {
            this.context = context;
            entities = context.Set<Employee>();
        }

        public IEnumerable<Employee> GetAll()
        {
            return entities.Include(e => e.Department).AsEnumerable();
        }

        public Employee Get(Guid id)
        {
            return entities.Include(e => e.Department).SingleOrDefault(e => e.Id == id);
        }

        public void Insert(Employee employee)
        {
            entities.Add(employee);
            context.SaveChanges();
        }

        public void Update(Employee employee)
        {
            var existing = context.Employees.Find(employee.Id);
            if (existing != null)
            {
                context.Entry(existing).CurrentValues.SetValues(employee);
                context.SaveChanges();
            }
        }

        public void Delete(Employee employee)
        {
            entities.Remove(employee);
            context.SaveChanges();
        }

        public void Remove(Employee employee)
        {
            entities.Remove(employee);
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }
    }
}
