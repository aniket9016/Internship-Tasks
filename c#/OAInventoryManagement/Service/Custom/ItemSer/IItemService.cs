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
        Task<ICollection<ItemViewModel>> GetAll();
        Task<ItemViewModel?> GetById(Guid id);
        Task<bool> Insert(ItemInsertModel model, string imageFileName);
        Task<bool> Update(ItemUpdateModel model, string imageFileName);
        Task<bool> Delete(Guid id);

        Task<Item> Find(Expression<Func<Item, bool>> match);
        Task<ICollection<Item>> FindAll(Expression<Func<Item, bool>> match);

        Task<ICollection<ItemViewModel>> GetItemsBySuppliers();
        Task<ICollection<ItemViewModel>> GetItemsByCustomers();
        Task<ICollection<ItemViewModel>> GetItemsByCategory(Guid categoryId);
        Task<ICollection<ItemViewModel>> GetItemsBySupplier(Guid supplierId);
        Task<ICollection<ItemViewModel>> GetItemsByCustomer(Guid customerId);

        Task<bool> AddItemToSupplier(Guid itemId, Guid supplierId);
        Task<bool> AddItemToCustomer(Guid itemId, Guid customerId);

        Task<bool> RemoveItemFromSupplier(Guid itemId, Guid supplierId);
        Task<bool> RemoveItemFromCustomer(Guid itemId, Guid customerId);
    }
}
