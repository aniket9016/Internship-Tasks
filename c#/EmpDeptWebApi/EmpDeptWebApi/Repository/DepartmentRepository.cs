using EmpDeptWebApi.Models;
using System;
using System.Linq;

namespace EmpDeptWebApi.Repository
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly AppDbContext _context;

        public DepartmentRepository(AppDbContext context)
        {
            _context = context;
        }

        // Get all departments
        public IQueryable<Department> GetAllDepartments()
        {
            return _context.Departments;
        }

        // Get a department by ID
        public Department GetDepartmentById(int id)
        {
            return _context.Departments.FirstOrDefault(d => d.DepartmentId == id);
        }

        // Add a new department
        public bool AddDepartment(Department department)
        {
            try
            {
                _context.Departments.Add(department);
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        // Update an existing department
        public bool UpdateDepartment(Department department)
        {
            try
            {
                _context.Departments.Update(department);
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        // Delete a department by ID
        public bool DeleteDepartment(int id)
        {
            try
            {
                var department = _context.Departments.FirstOrDefault(d => d.DepartmentId == id);
                if (department != null)
                {
                    _context.Departments.Remove(department);
                    _context.SaveChanges();
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }
    }
}
