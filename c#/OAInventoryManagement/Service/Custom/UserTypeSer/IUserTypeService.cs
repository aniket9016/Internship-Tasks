using Domain.Models;
using Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Service.Custom.UserTypeSer
{
    public interface IUserTypeService
    {
        Task<IEnumerable<UserTypeViewModel>> GetAll();
        Task<UserTypeViewModel> GetById(Guid id);
        Task<bool> Insert(UserTypeInsertModel model);
        Task<bool> Update(UserTypeUpdateModel model);
        Task<bool> Delete(Guid id);
        Task<UserType> Find(Expression<Func<UserType, bool>> match);
        Task<ICollection<UserType>> FindAll(Expression<Func<UserType, bool>> match);
    }
}
