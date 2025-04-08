using Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Repo
{
    public class DepartmentRepository : IDepartmentRepository<Department>
    {
        private readonly AppDBContext context;
        private DbSet<Department> entities;

        public DepartmentRepository(AppDBContext context)
        {
            this.context = context;
            entities = context.Set<Department>();
        }

        public IEnumerable<Department> GetAll()
        {
            return entities.Include(d => d.Employees).AsEnumerable();
        }

        public Department Get(Guid id)
        {
            return entities.Include(d => d.Employees).SingleOrDefault(d => d.Id == id);
        }

        public void Insert(Department department)
        {
            entities.Add(department);
            context.SaveChanges();
        }

        public void Update(Department department)
        {
            var existing = context.Departments.Find(department.Id);
            if (existing != null)
            {
                context.Entry(existing).CurrentValues.SetValues(department);
                context.SaveChanges();
            }
        }

        public void Delete(Department department)
        {
            entities.Remove(department);
            context.SaveChanges();
        }

        public void Remove(Department department)
        {
            entities.Remove(department);
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }
    }
}
