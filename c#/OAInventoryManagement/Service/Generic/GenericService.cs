using Domain.Models;
using Repository.Repo;
using Service.Generic;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Services
{
    public class GenericService<T> : IGenericService<T> where T : BaseEntity
    {
        private readonly IRepositoryCommon<T> _repository;

        public GenericService(IRepositoryCommon<T> repository)
        {
            _repository = repository;
        }

        public Task<ICollection<T>> GetAll()
        {
            return _repository.GetAll();
        }

        public Task<T> Get(Guid id)
        {
            return _repository.Get(id);
        }

        public Task<bool> Insert(T model)
        {
            return _repository.Insert(model);
        }

        public Task<bool> Update(T model)
        {
            return _repository.Update(model);
        }

        public Task<bool> Delete(T model)
        {
            return _repository.Delete(model);
        }

        public Task<T> GetLast(Guid id)
        {
            return _repository.GetLast(id);
        }

        public Task<bool> SaveChanges()
        {
            return _repository.SaveChanges();
        }

        public Task<T> Find(Expression<Func<T, bool>> match)
        {
            return _repository.Find(match);
        }

        public Task<ICollection<T>> FindAll(Expression<Func<T, bool>> match)
        {
            return _repository.FindAll(match);
        }
    }
}
