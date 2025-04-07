using Data;
using Repo;
using System.Collections.Generic;

namespace Service
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository _studentRepository;

        public StudentService(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        public IEnumerable<Student> GetStudents()
        {
            return _studentRepository.GetAll();
        }

        public Student GetStudent(long id)
        {
            return _studentRepository.Get(id);
        }

        public void InsertStudent(Student student)
        {
            _studentRepository.Insert(student);
        }

        public void UpdateStudent(Student student)
        {
            _studentRepository.Update(student);
        }

        public void DeleteStudent(long id)
        {
            Student student = _studentRepository.Get(id);
            _studentRepository.Remove(student);
            _studentRepository.SaveChanges();
        }
    }
}
