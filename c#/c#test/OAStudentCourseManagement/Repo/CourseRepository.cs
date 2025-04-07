using Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Repo
{
    public class CourseRepository : ICourseRepository<Course>
    {
        private readonly AppDBcontext context;
        private DbSet<Course> entities;

        public CourseRepository(AppDBcontext context)
        {
            this.context = context;
            entities = context.Set<Course>();
        }

        public IEnumerable<Course> GetAll()
        {
            return entities.AsEnumerable();
        }

        public Course Get(long id)
        {
            return entities.SingleOrDefault(s => s.Id == id);
        }

        public void Insert(Course course)
        {
            entities.Add(course);
            context.SaveChanges();
        }

        public void Update(Course course)
        {
            var existingUser = context.Courses.Find(course.Id);
            if (existingUser != null)
            {
                context.Entry(existingUser).CurrentValues.SetValues(course);
                context.SaveChanges();
            }
        }


        public void Delete(Course course)
        {
            entities.Remove(course);
            context.SaveChanges();
        }

        public void Remove(Course course)
        {
            entities.Remove(course);
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }
    }
}
