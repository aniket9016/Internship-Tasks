using Data;
using System.Collections.Generic;

namespace Service
{
    public interface IStudentService
    {
        IEnumerable<Student> GetStudents();
        Student GetStudent(long id);
        void InsertStudent(Student student);
        void UpdateStudent(Student student);
        void DeleteStudent(long id);
    }
}
