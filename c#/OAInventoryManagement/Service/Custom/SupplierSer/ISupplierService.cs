using Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Custom.SupplierSer
{
    public interface ISupplierService
    {
        Task<ICollection<UserViewModel>> GetAll();
        Task<UserViewModel?> GetById(Guid id);
        Task<bool> Insert(UserInsertModel model);
        Task<bool> Update(UserUpdateModel model);
        Task<bool> Delete(Guid id);
    }
}
