using Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Repo
{
    public class StudentRepository : IStudentRepository<Student>
    {
        private readonly AppDBcontext context;
        private DbSet<Student> entities;
        string errorMessage = string.Empty;

        public StudentRepository(AppDBcontext context)
        {
            this.context = context;
            entities = context.Set<Student>();
        }

        public IEnumerable<Student> GetAll()
        {
            return entities.AsEnumerable();
        }

        public Student Get(long id)
        {
            return entities.SingleOrDefault(s => s.Id == id);
        }

        public void Insert(Student student)
        {
            entities.Add(student);
            context.SaveChanges();
        }

        public void Update(Student student)
        {
            var existingUser = context.Students.Find(student.Id);
            if (existingUser != null)
            {
                context.Entry(existingUser).CurrentValues.SetValues(student);
                context.SaveChanges();
            }
        }


        public void Delete(Student student)
        {
            entities.Remove(student);
            context.SaveChanges();
        }

        public void Remove(Student student)
        {
            entities.Remove(student);
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }
    }
}
