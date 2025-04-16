using Domain.Models;
using Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Service.Custom.SupplierSer
{
    public interface ISupplierService
    {
        Task<IEnumerable<UserViewModel>> GetAll();
        Task<UserViewModel?> GetById(Guid id);
        Task<bool> Insert(UserInsertModel model, string photoFileName);
        Task<bool> Update(UserUpdateModel model, string photoFileName);
        Task<bool> Delete(Guid id);
        Task<User> Find(Expression<Func<User, bool>> match);
        Task<ICollection<User>> FindAll(Expression<Func<User, bool>> match);
    }
}
