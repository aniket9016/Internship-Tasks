using Domain.Models;
using Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Service.Custom.ItemSer
{
    public interface IItemService
    {
        Task<ICollection<ItemViewModel>> GetAllItemsBySupplier(Guid supplierId);
        Task<ICollection<ItemViewModel>> GetAllItemsByCustomer(Guid customerId);
        Task<ItemViewModel> GetItem(Guid itemId);
        Task<bool> AddSupplierItem(ItemInsertModel model, string imageFileName, Guid supplierId);
        Task<bool> AddCustomerItem(ItemInsertModel model, string imageFileName, Guid customerId);
        Task<bool> EditItem(ItemUpdateModel model, string imageFileName);
        Task<bool> DeleteItem(Guid itemId);
        Task<Item> Find(Expression<Func<Item, bool>> match);
        Task<ICollection<Item>> FindAll(Expression<Func<Item, bool>> match);
    }
}
