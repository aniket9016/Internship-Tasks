using Data;
using Repo;
using System.Collections.Generic;

namespace Services
{
    public class CourseService : ICourseService
    {
        private readonly ICourseRepository<Course> _courseRepository;

        public CourseService(ICourseRepository<Course> courseRepository)
        {
            _courseRepository = courseRepository;
        }

        public IEnumerable<Course> GetCourses()
        {
            return _courseRepository.GetAll();
        }

        public Course GetCourse(long id)
        {
            return _courseRepository.Get(id);
        }

        public void InsertCourse(Course course)
        {
            _courseRepository.Insert(course);
        }

        public void UpdateCourse(Course course)
        {
            _courseRepository.Update(course);
        }

        public void DeleteCourse(long id)
        {
            Course course = _courseRepository.Get(id);
            _courseRepository.Remove(course);
            _courseRepository.SaveChanges();
        }
    }
}
