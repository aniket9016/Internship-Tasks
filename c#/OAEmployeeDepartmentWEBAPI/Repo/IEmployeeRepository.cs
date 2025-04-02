using Data;
using System.Linq;

namespace Repo
{
    public interface IEmployeeRepository<T> where T : BaseEntity
    {
        IQueryable<T> GetAllEmployees();
        T GetEmployeeById(int id);
        bool AddEmployee(T employee);
        bool UpdateEmployee(T employee);
        bool DeleteEmployee(int id);
    }
}