using Data;
using System.Collections.Generic;

namespace Repo
{
    public interface IDepartmentRepository<T> where T : BaseEntity
    {
        IEnumerable<Department> GetAll();
        T Get(Guid id);
        void Insert(Department department);
        void Update(Department department);
        void Delete(Department department);
        void Remove(Department department);
        void SaveChanges();
    }
}
