using Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repo
{
    public class DepartmentRepository : IDepartmentRepository<Department>
    {
        private readonly AppDBcontext context;
        private DbSet<Department> entities;
        string errorMessage = string.Empty;

        public DepartmentRepository(AppDBcontext context)
        {
            this.context = context;
            entities = context.Set<Department>();
        }

        public IEnumerable<Department> GetAll()
        {
            return entities.AsEnumerable();
        }

        public Department Get(long id)
        {
            return entities.SingleOrDefault(s => s.Id == id);
        }

        public void Insert(Department entity)
        {
            entities.Add(entity);
            context.SaveChanges();
        }

        public void Update(Department entity)
        {
            entities.Update(entity); 
            context.SaveChanges();
        }

        public void Delete(Department entity)
        {
            entities.Remove(entity);
            context.SaveChanges();
        }

        public void Remove(Department entity)
        {
            entities.Remove(entity);
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }
    }
}