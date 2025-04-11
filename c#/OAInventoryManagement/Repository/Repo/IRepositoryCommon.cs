using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Repository.Repo
{
    public interface IRepositoryCommon<T> where T : BaseEntity
    {
        Task<ICollection<T>> GetAll();
        Task<T> Get(Guid id);
        Task<bool> Insert(T model);
        Task<bool> Update(T model);
        Task<bool> Delete(T model);
        Task<T> GetLast(Guid id);
        Task<bool> SaveChanges();
        Task<T> Find(Expression<Func<T, bool>> match);
        Task<ICollection<T>> FindAll(Expression<Func<T, bool>> match);
    }
}
