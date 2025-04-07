using Data;
using System.Collections.Generic;

namespace Repo
{
    public interface IStudentRepository<T> where T : BaseEntity
    {
        IEnumerable<Student> GetAll();
        T Get(long id);
        void Insert(Student student);
        void Update(Student student);
        void Delete(Student student);
        void Remove(Student student);
        void SaveChanges();
    }
}
