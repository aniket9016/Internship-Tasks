using Data;
using Repo;
using System;
using System.Collections.Generic;

namespace Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository<Department> _departmentRepository;

        public DepartmentService(IDepartmentRepository<Department> departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }

        public IEnumerable<Department> GetDepartments()
        {
            return _departmentRepository.GetAll();
        }

        public Department GetDepartment(Guid id)
        {
            return _departmentRepository.Get(id);
        }

        public void InsertDepartment(Department department)
        {
            _departmentRepository.Insert(department);
        }

        public void UpdateDepartment(Department department)
        {
            _departmentRepository.Update(department);
        }

        public void DeleteDepartment(Guid id)
        {
            var department = _departmentRepository.Get(id);
            _departmentRepository.Remove(department);
            _departmentRepository.SaveChanges();
        }
    }
}
