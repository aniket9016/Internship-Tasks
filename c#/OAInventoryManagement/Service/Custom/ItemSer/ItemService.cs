using Domain.Models;
using Domain.ViewModel;
using Microsoft.AspNetCore.Http;
using Repository.Repo;
using Service.Custom.CategorySer;
using Service.Custom.CustomerSer;
using Service.Custom.SupplierSer;
using Service.Custom.UserTypeSer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Service.Custom.ItemSer
{
    public class ItemService : IItemService
    {
        private readonly IRepositoryCommon<Item> _itemRepo;
        private readonly IRepositoryCommon<ItemImages> _itemImageRepo;
        private readonly IRepositoryCommon<CustomerItem> _customerItemRepo;
        private readonly IRepositoryCommon<SupplierItem> _supplierItemRepo;
        private readonly IRepositoryCommon<User> _userRepo;
        private readonly ICategoryService _categoryService;
        private readonly ICustomerService _customerService;
        private readonly ISupplierService _supplierService;
        private readonly IUserTypeService _userTypeService;

        public ItemService(
            IRepositoryCommon<Item> itemRepo,
            IRepositoryCommon<ItemImages> itemImageRepo,
            IRepositoryCommon<CustomerItem> customerItemRepo,
            IRepositoryCommon<SupplierItem> supplierItemRepo,
            IRepositoryCommon<User> userRepo,
            ICategoryService categoryService,
            ICustomerService customerService,
            ISupplierService supplierService,
            IUserTypeService userTypeService)
        {
            _itemRepo = itemRepo;
            _itemImageRepo = itemImageRepo;
            _customerItemRepo = customerItemRepo;
            _supplierItemRepo = supplierItemRepo;
            _userRepo = userRepo;
            _categoryService = categoryService;
            _customerService = customerService;
            _supplierService = supplierService;
            _userTypeService = userTypeService;
        }

        public async Task<ICollection<ItemViewModel>> GetAll()
        {
            var items = await _itemRepo.GetAll();
            var itemViewModels = new List<ItemViewModel>();

            foreach (var item in items)
            {
                var itemImages = await _itemImageRepo.FindAll(x => x.ItemId == item.Id);
                var supplierItems = await _supplierItemRepo.FindAll(x => x.ItemId == item.Id);
                var customerItems = await _customerItemRepo.FindAll(x => x.ItemId == item.Id);
                var category = await _categoryService.GetById(item.CategoryId);

                var viewModel = new ItemViewModel
                {
                    ItemCode = item.ItemCode,
                    ItemName = item.ItemName,
                    ItemDescription = item.ItemDescription,
                    Price = item.Price,
                    ItemImages = itemImages.Select(img => new ItemImageViewModel
                    {
                        ItemImage = img.ItemImage
                    }).ToList(),
                    CategoryViewModels = category != null ?
                        new List<CategoryViewModel> { category } :
                        new List<CategoryViewModel>(),
                    UserViewModels = new List<UserViewModel>()
                };

                foreach (var supplierItem in supplierItems)
                {
                    if (supplierItem.UserId != Guid.Empty)
                    {
                        var user = await _userRepo.Get(supplierItem.UserId);
                        if (user != null)
                        {
                            var supplier = await _supplierService.GetById(supplierItem.UserId);
                            if (supplier != null)
                            {
                                viewModel.UserViewModels.Add(supplier);
                            }
                        }
                    }
                }

                foreach (var customerItem in customerItems)
                {
                    if (customerItem.UserId != Guid.Empty)
                    {
                        var user = await _userRepo.Get(customerItem.UserId);
                        if (user != null)
                        {
                            var customer = await _customerService.GetById(customerItem.UserId);
                            if (customer != null)
                            {
                                viewModel.UserViewModels.Add(customer);
                            }
                        }
                    }
                }

                itemViewModels.Add(viewModel);
            }

            return itemViewModels;
        }

        public async Task<ItemViewModel?> GetById(Guid id)
        {
            var item = await _itemRepo.Get(id);
            if (item == null) return null;

            var itemImages = await _itemImageRepo.FindAll(x => x.ItemId == item.Id);
            var supplierItems = await _supplierItemRepo.FindAll(x => x.ItemId == item.Id);
            var customerItems = await _customerItemRepo.FindAll(x => x.ItemId == item.Id);
            var category = await _categoryService.GetById(item.CategoryId);

            var viewModel = new ItemViewModel
            {
                ItemCode = item.ItemCode,
                ItemName = item.ItemName,
                ItemDescription = item.ItemDescription,
                Price = item.Price,
                ItemImages = itemImages.Select(img => new ItemImageViewModel
                {
                    ItemImage = img.ItemImage
                }).ToList(),
                CategoryViewModels = category != null ?
                    new List<CategoryViewModel> { category } :
                    new List<CategoryViewModel>(),
                UserViewModels = new List<UserViewModel>()
            };

            foreach (var supplierItem in supplierItems)
            {
                if (supplierItem.UserId != Guid.Empty)
                {
                    var user = await _userRepo.Get(supplierItem.UserId);
                    if (user != null)
                    {
                        var supplier = await _supplierService.GetById(supplierItem.UserId);
                        if (supplier != null)
                        {
                            viewModel.UserViewModels.Add(supplier);
                        }
                    }
                }
            }

            foreach (var customerItem in customerItems)
            {
                if (customerItem.UserId != Guid.Empty)
                {
                    var user = await _userRepo.Get(customerItem.UserId);
                    if (user != null)
                    {
                        var customer = await _customerService.GetById(customerItem.UserId);
                        if (customer != null)
                        {
                            viewModel.UserViewModels.Add(customer);
                        }
                    }
                }
            }

            return viewModel;
        }

        public async Task<bool> Insert(ItemInsertModel model, string imageFileName)
        {
            var entity = new Item
            {
                Id = Guid.NewGuid(),
                ItemCode = model.ItemCode,
                ItemName = model.ItemName,
                ItemDescription = model.ItemDescription,
                Price = model.Price,
                CategoryId = model.CategoryId,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                CreatedBy = "System",
                UpdatedBy = "System",
                IsActive = true
            };

            var inserted = await _itemRepo.Insert(entity);

            if (inserted && !string.IsNullOrEmpty(imageFileName))
            {
                var image = new ItemImages
                {
                    Id = Guid.NewGuid(),
                    ItemId = entity.Id,
                    ItemImage = imageFileName,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    CreatedBy = "System",
                    UpdatedBy = "System",
                    IsActive = true
                };
                await _itemImageRepo.Insert(image);
            }

            return inserted;
        }

        public async Task<bool> Update(ItemUpdateModel model, string imageFileName)
        {
            var entity = await _itemRepo.Get(model.Id);
            if (entity == null) return false;

            entity.ItemCode = model.ItemCode;
            entity.ItemName = model.ItemName;
            entity.ItemDescription = model.ItemDescription;
            entity.Price = model.Price;
            entity.CategoryId = model.CategoryId;
            entity.UpdatedAt = DateTime.Now;
            entity.UpdatedBy = "System";

            var updated = await _itemRepo.Update(entity);

            if (updated && !string.IsNullOrEmpty(imageFileName))
            {
                var existingImages = await _itemImageRepo.FindAll(x => x.ItemId == entity.Id);
                foreach (var img in existingImages)
                {
                    await _itemImageRepo.Delete(img);
                }

                var newImage = new ItemImages
                {
                    Id = Guid.NewGuid(),
                    ItemId = entity.Id,
                    ItemImage = imageFileName,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    CreatedBy = "System",
                    UpdatedBy = "System",
                    IsActive = true
                };
                await _itemImageRepo.Insert(newImage);
            }

            return updated;
        }

        public async Task<bool> Delete(Guid id)
        {
            var entity = await _itemRepo.Get(id);
            if (entity == null) return false;

            var images = await _itemImageRepo.FindAll(x => x.ItemId == id);
            foreach (var img in images)
            {
                await _itemImageRepo.Delete(img);
            }

            var customerItems = await _customerItemRepo.FindAll(x => x.ItemId == id);
            foreach (var ci in customerItems)
            {
                await _customerItemRepo.Delete(ci);
            }

            var supplierItems = await _supplierItemRepo.FindAll(x => x.ItemId == id);
            foreach (var si in supplierItems)
            {
                await _supplierItemRepo.Delete(si);
            }

            return await _itemRepo.Delete(entity);
        }

        public async Task<Item> Find(Expression<Func<Item, bool>> match)
        {
            return await _itemRepo.Find(match);
        }

        public async Task<ICollection<Item>> FindAll(Expression<Func<Item, bool>> match)
        {
            return await _itemRepo.FindAll(match);
        }

        public async Task<ICollection<ItemViewModel>> GetItemsBySuppliers()
        {
            var userType = (await _userTypeService.GetAll())
                           .FirstOrDefault(ut => ut.TypeName.ToLower() == "supplier");

            if (userType == null) return new List<ItemViewModel>();

            var users = await _userRepo.FindAll(u => u.UserTypeId == userType.Id);
            var supplierItems = new List<SupplierItem>();

            foreach (var user in users)
            {
                var items = await _supplierItemRepo.FindAll(si => si.UserId == user.Id);
                supplierItems.AddRange(items);
            }

            var result = new List<ItemViewModel>();

            foreach (var supplierItem in supplierItems)
            {
                var item = await GetById(supplierItem.ItemId);
                if (item != null)
                {
                    result.Add(item);
                }
            }

            return result;
        }

        public async Task<ICollection<ItemViewModel>> GetItemsByCustomers()
        {
            var userType = (await _userTypeService.GetAll())
                           .FirstOrDefault(ut => ut.TypeName.ToLower() == "customer");

            if (userType == null) return new List<ItemViewModel>();

            var users = await _userRepo.FindAll(u => u.UserTypeId == userType.Id);
            var customerItems = new List<CustomerItem>();

            foreach (var user in users)
            {
                var items = await _customerItemRepo.FindAll(ci => ci.UserId == user.Id);
                customerItems.AddRange(items);
            }

            var result = new List<ItemViewModel>();

            foreach (var customerItem in customerItems)
            {
                var item = await GetById(customerItem.ItemId);
                if (item != null)
                {
                    result.Add(item);
                }
            }

            return result;
        }

        public async Task<bool> AddItemToCustomer(Guid itemId, Guid customerId)
        {
            var item = await _itemRepo.Get(itemId);
            if (item == null) return false;

            var user = await _userRepo.Get(customerId);
            if (user == null) return false;

            var existing = await _customerItemRepo.Find(ci => ci.ItemId == itemId && ci.UserId == customerId);
            if (existing != null) return true;

            var customerItem = new CustomerItem
            {
                Id = Guid.NewGuid(),
                ItemId = itemId,
                UserId = customerId,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                CreatedBy = "System",
                UpdatedBy = "System",
                IsActive = true
            };

            return await _customerItemRepo.Insert(customerItem);
        }

        public async Task<bool> AddItemToSupplier(Guid itemId, Guid supplierId)
        {
            var item = await _itemRepo.Get(itemId);
            if (item == null) return false;

            var user = await _userRepo.Get(supplierId);
            if (user == null) return false;

            var existing = await _supplierItemRepo.Find(si => si.ItemId == itemId && si.UserId == supplierId);
            if (existing != null) return true;

            var supplierItem = new SupplierItem
            {
                Id = Guid.NewGuid(),
                ItemId = itemId,
                UserId = supplierId,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                CreatedBy = "System",
                UpdatedBy = "System",
                IsActive = true
            };

            return await _supplierItemRepo.Insert(supplierItem);
        }

        public async Task<bool> RemoveItemFromCustomer(Guid itemId, Guid customerId)
        {
            var customerItem = await _customerItemRepo.Find(ci => ci.ItemId == itemId && ci.UserId == customerId);
            if (customerItem == null) return false;

            return await _customerItemRepo.Delete(customerItem);
        }

        public async Task<bool> RemoveItemFromSupplier(Guid itemId, Guid supplierId)
        {
            var supplierItem = await _supplierItemRepo.Find(si => si.ItemId == itemId && si.UserId == supplierId);
            if (supplierItem == null) return false;

            return await _supplierItemRepo.Delete(supplierItem);
        }

        public async Task<ICollection<ItemViewModel>> GetItemsByCategory(Guid categoryId)
        {
            var items = await _itemRepo.FindAll(i => i.CategoryId == categoryId);
            var itemViewModels = new List<ItemViewModel>();

            foreach (var item in items)
            {
                var viewModel = await GetById(item.Id);
                if (viewModel != null)
                {
                    itemViewModels.Add(viewModel);
                }
            }

            return itemViewModels;
        }

        public async Task<ICollection<ItemViewModel>> GetItemsBySupplier(Guid supplierId)
        {
            var user = await _userRepo.Get(supplierId);
            if (user == null) return new List<ItemViewModel>();

            var supplierItems = await _supplierItemRepo.FindAll(si => si.UserId == supplierId);
            var itemViewModels = new List<ItemViewModel>();

            foreach (var supplierItem in supplierItems)
            {
                var viewModel = await GetById(supplierItem.ItemId);
                if (viewModel != null)
                {
                    itemViewModels.Add(viewModel);
                }
            }

            return itemViewModels;
        }

        public async Task<ICollection<ItemViewModel>> GetItemsByCustomer(Guid customerId)
        {
            var user = await _userRepo.Get(customerId);
            if (user == null) return new List<ItemViewModel>();

            var customerItems = await _customerItemRepo.FindAll(ci => ci.UserId == customerId);
            var itemViewModels = new List<ItemViewModel>();

            foreach (var customerItem in customerItems)
            {
                var viewModel = await GetById(customerItem.ItemId);
                if (viewModel != null)
                {
                    itemViewModels.Add(viewModel);
                }
            }

            return itemViewModels;
        }
    }
}