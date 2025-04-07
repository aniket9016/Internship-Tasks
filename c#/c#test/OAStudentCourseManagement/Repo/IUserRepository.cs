using Data;
using System.Collections.Generic;

namespace Repo
{
    public interface IUserRepository<T> where T : BaseEntity
    {
        IEnumerable<User> GetAll();
        T Get(long id);
        void Insert(User user);
        void Update(User user);
        void Delete(User user);
        void Remove(User user);
        void SaveChanges();
    }
}
