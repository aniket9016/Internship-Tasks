using Data;
using System.Collections.Generic;

namespace Repo
{
    public interface IEmployeeRepository<T> where T : BaseEntity
    {
        IEnumerable<Employee> GetAll();
        T Get(Guid id);
        void Insert(Employee employee);
        void Update(Employee employee);
        void Delete(Employee employee);
        void Remove(Employee employee);
        void SaveChanges();
    }
}
