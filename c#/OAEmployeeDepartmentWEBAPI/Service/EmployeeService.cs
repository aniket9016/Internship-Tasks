using Data;
using Repo;
using System.Collections.Generic;

namespace Service
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository<Employee> _employeeRepository;

        public EmployeeService(IEmployeeRepository<Employee> employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }


        public IEnumerable<Employee> GetEmployees()
        {
            return _employeeRepository.GetAllEmployees();
        }

        public Employee GetEmployee(long id)
        {
            return _employeeRepository.GetEmployeeById((int)id);
        }

        public void InsertEmployee(Employee employee)
        {
            _employeeRepository.AddEmployee(employee);
        }

        public bool UpdateEmployee(Employee employee)
        {
            return _employeeRepository.UpdateEmployee(employee);
        }

        public void DeleteEmployee(long id)
        {
            _employeeRepository.DeleteEmployee((int)id);
        }
    }
}