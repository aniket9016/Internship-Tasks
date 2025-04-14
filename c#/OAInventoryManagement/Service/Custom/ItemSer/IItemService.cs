using Domain.Models;
using Domain.ViewModel;
using Microsoft.AspNetCore.Http;
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
        Task<bool> Insert(ItemInsertModel model, string imageFiles);
        Task<bool> Update(ItemUpdateModel model, string imageFiles);
        Task<bool> Delete(Guid id);
        Task<Item> Find(Expression<Func<Item, bool>> match);
        Task<ICollection<Item>> FindAll(Expression<Func<Item, bool>> match);
    }
}
