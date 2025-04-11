using Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Custom.CategorySer
{
    public interface ICategoryService
    {
        Task<ICollection<CategoryViewModel>> GetAll();
        Task<CategoryViewModel?> GetById(Guid id);
        Task<bool> Insert(CategoryInsertModel model);
        Task<bool> Update(CategoryUpdateModel model);
        Task<bool> Delete(Guid id);
    }
}
