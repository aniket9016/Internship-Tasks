using Data;
using System.Collections.Generic;

namespace Repo
{
    public interface ICourseRepository<T> where T : BaseEntity
    {
        IEnumerable<Course> GetAll();
        T Get(long id);
        void Insert(Course course);
        void Update(Course course);
        void Delete(Course course);
        void Remove(Course course);
        void SaveChanges();
    }
}
