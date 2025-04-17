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
        private readonly IRepositoryCommon<Item> _itemRepository;
        private readonly IRepositoryCommon<ItemImages> _itemImagesRepository;
        private readonly IRepositoryCommon<CustomerItem> _customerItemRepository;
        private readonly IRepositoryCommon<SupplierItem> _supplierItemRepository;
        private readonly IRepositoryCommon<User> _userRepository;
        private readonly ICategoryService _categoryService;
        private readonly IUserTypeService _userTypeService;
        private readonly ICustomerService _customerService;
        private readonly ISupplierService _supplierService;

        public ItemService(
            IRepositoryCommon<Item> itemRepository,
            IRepositoryCommon<ItemImages> itemImagesRepository,
            IRepositoryCommon<CustomerItem> customerItemRepository,
            IRepositoryCommon<SupplierItem> supplierItemRepository,
            IRepositoryCommon<User> userRepository,
            ICategoryService categoryService,
            IUserTypeService userTypeService,
            ICustomerService customerService,
            ISupplierService supplierService)
        {
            _itemRepository = itemRepository;
            _itemImagesRepository = itemImagesRepository;
            _customerItemRepository = customerItemRepository;
            _supplierItemRepository = supplierItemRepository;
            _userRepository = userRepository;
            _categoryService = categoryService;
            _userTypeService = userTypeService;
            _customerService = customerService;
            _supplierService = supplierService;
        }

        public async Task<ICollection<ItemViewModel>> GetAllItemsBySupplier(Guid supplierId)
        {
            // Verify that the user exists and is a supplier
            var supplier = await _userRepository.Get(supplierId);
            if (supplier == null) return new List<ItemViewModel>();

            var userType = await _userTypeService.Find(x => x.Id == supplier.UserTypeId && x.TypeName.ToLower() == "supplier");
            if (userType == null) return new List<ItemViewModel>();

            // Get all supplier items for this supplier
            var supplierItems = await _supplierItemRepository.FindAll(x => x.UserId == supplierId);
            if (supplierItems == null || !supplierItems.Any()) return new List<ItemViewModel>();

            var result = new List<ItemViewModel>();

            foreach (var supplierItem in supplierItems)
            {
                var item = await _itemRepository.Get(supplierItem.ItemId);
                if (item != null)
                {
                    var itemViewModel = await BuildItemViewModel(item);
                    result.Add(itemViewModel);
                }
            }

            return result;
        }

        public async Task<ICollection<ItemViewModel>> GetAllItemsByCustomer(Guid customerId)
        {
            // Verify that the user exists and is a customer
            var customer = await _userRepository.Get(customerId);
            if (customer == null) return new List<ItemViewModel>();

            var userType = await _userTypeService.Find(x => x.Id == customer.UserTypeId && x.TypeName.ToLower() == "customer");
            if (userType == null) return new List<ItemViewModel>();

            // Get all customer items for this customer
            var customerItems = await _customerItemRepository.FindAll(x => x.UserId == customerId);
            if (customerItems == null || !customerItems.Any()) return new List<ItemViewModel>();

            var result = new List<ItemViewModel>();

            foreach (var customerItem in customerItems)
            {
                var item = await _itemRepository.Get(customerItem.ItemId);
                if (item != null)
                {
                    var itemViewModel = await BuildItemViewModel(item);
                    result.Add(itemViewModel);
                }
            }

            return result;
        }

        public async Task<ItemViewModel> GetItem(Guid itemId)
        {
            var item = await _itemRepository.Get(itemId);
            if (item == null) return null;

            return await BuildItemViewModel(item);
        }

        public async Task<bool> AddSupplierItem(ItemInsertModel model, string imageFileName, Guid supplierId)
        {
            // Verify that the user exists and is a supplier
            var supplier = await _userRepository.Get(supplierId);
            if (supplier == null) return false;

            var userType = await _userTypeService.Find(x => x.Id == supplier.UserTypeId && x.TypeName.ToLower() == "supplier");
            if (userType == null) return false;

            // Create new item
            var item = new Item
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

            // Save the item
            var itemInserted = await _itemRepository.Insert(item);
            if (!itemInserted) return false;

            // Create supplier-item relationship
            var supplierItem = new SupplierItem
            {
                Id = Guid.NewGuid(),
                ItemId = item.Id,
                UserId = supplierId,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                CreatedBy = "System",
                UpdatedBy = "System",
                IsActive = true
            };

            var supplierItemInserted = await _supplierItemRepository.Insert(supplierItem);
            if (!supplierItemInserted)
            {
                // Roll back item creation if supplier-item relationship fails
                await _itemRepository.Delete(item);
                return false;
            }

            // Add image if available
            if (!string.IsNullOrEmpty(imageFileName))
            {
                var itemImage = new ItemImages
                {
                    Id = Guid.NewGuid(),
                    ItemId = item.Id,
                    ItemImage = imageFileName,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    CreatedBy = "System",
                    UpdatedBy = "System",
                    IsActive = true
                };

                await _itemImagesRepository.Insert(itemImage);
            }

            return true;
        }

        public async Task<bool> AddCustomerItem(ItemInsertModel model, string imageFileName, Guid customerId)
        {
            // Verify that the user exists and is a customer
            var customer = await _userRepository.Get(customerId);
            if (customer == null) return false;

            var userType = await _userTypeService.Find(x => x.Id == customer.UserTypeId && x.TypeName.ToLower() == "customer");
            if (userType == null) return false;

            // Create new item
            var item = new Item
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

            // Save the item
            var itemInserted = await _itemRepository.Insert(item);
            if (!itemInserted) return false;

            // Create customer-item relationship
            var customerItem = new CustomerItem
            {
                Id = Guid.NewGuid(),
                ItemId = item.Id,
                UserId = customerId,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                CreatedBy = "System",
                UpdatedBy = "System",
                IsActive = true
            };

            var customerItemInserted = await _customerItemRepository.Insert(customerItem);
            if (!customerItemInserted)
            {
                // Roll back item creation if customer-item relationship fails
                await _itemRepository.Delete(item);
                return false;
            }

            // Add image if available
            if (!string.IsNullOrEmpty(imageFileName))
            {
                var itemImage = new ItemImages
                {
                    Id = Guid.NewGuid(),
                    ItemId = item.Id,
                    ItemImage = imageFileName,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    CreatedBy = "System",
                    UpdatedBy = "System",
                    IsActive = true
                };

                await _itemImagesRepository.Insert(itemImage);
            }

            return true;
        }

        public async Task<bool> EditItem(ItemUpdateModel model, string imageFileName)
        {
            // Get the item to update
            var item = await _itemRepository.Get(model.Id);
            if (item == null) return false;

            // Update item properties
            item.ItemCode = model.ItemCode;
            item.ItemName = model.ItemName;
            item.ItemDescription = model.ItemDescription;
            item.Price = model.Price;
            item.CategoryId = model.CategoryId;
            item.UpdatedAt = DateTime.Now;
            item.UpdatedBy = "System";

            // Update the item
            var updated = await _itemRepository.Update(item);
            if (!updated) return false;

            // Update image if provided
            if (!string.IsNullOrEmpty(imageFileName))
            {
                // Delete existing images
                var existingImages = await _itemImagesRepository.FindAll(x => x.ItemId == item.Id);
                foreach (var existingImage in existingImages)
                {
                    await _itemImagesRepository.Delete(existingImage);
                }

                // Add new image
                var itemImage = new ItemImages
                {
                    Id = Guid.NewGuid(),
                    ItemId = item.Id,
                    ItemImage = imageFileName,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    CreatedBy = "System",
                    UpdatedBy = "System",
                    IsActive = true
                };

                await _itemImagesRepository.Insert(itemImage);
            }

            return true;
        }

        public async Task<bool> DeleteItem(Guid itemId)
        {
            var item = await _itemRepository.Get(itemId);
            if (item == null) return false;

            // Delete related records first

            // Delete images
            var images = await _itemImagesRepository.FindAll(x => x.ItemId == itemId);
            foreach (var image in images)
            {
                await _itemImagesRepository.Delete(image);
            }

            // Delete supplier relationships
            var supplierItems = await _supplierItemRepository.FindAll(x => x.ItemId == itemId);
            foreach (var supplierItem in supplierItems)
            {
                await _supplierItemRepository.Delete(supplierItem);
            }

            // Delete customer relationships
            var customerItems = await _customerItemRepository.FindAll(x => x.ItemId == itemId);
            foreach (var customerItem in customerItems)
            {
                await _customerItemRepository.Delete(customerItem);
            }

            // Delete the item itself
            return await _itemRepository.Delete(item);
        }

        public async Task<Item> Find(Expression<Func<Item, bool>> match)
        {
            return await _itemRepository.Find(match);
        }

        public async Task<ICollection<Item>> FindAll(Expression<Func<Item, bool>> match)
        {
            return await _itemRepository.FindAll(match);
        }

        // Helper method to build ItemViewModel from Item
        private async Task<ItemViewModel> BuildItemViewModel(Item item)
        {
            // Get category
            var category = await _categoryService.GetById(item.CategoryId);
            var categoryViewModels = new List<CategoryViewModel>();
            if (category != null)
            {
                categoryViewModels.Add(category);
            }

            // Get images
            var images = await _itemImagesRepository.FindAll(x => x.ItemId == item.Id);
            var imageViewModels = images.Select(img => new ItemImageViewModel
            {
                ItemImage = img.ItemImage
            }).ToList();

            // Get related users
            var userViewModels = new List<UserViewModel>();

            // Get supplier
            var supplierItems = await _supplierItemRepository.FindAll(x => x.ItemId == item.Id);
            foreach (var supplierItem in supplierItems)
            {
                var supplierViewModel = await _supplierService.GetById(supplierItem.UserId);
                if (supplierViewModel != null)
                {
                    userViewModels.Add(supplierViewModel);
                }
            }

            // Get customers
            var customerItems = await _customerItemRepository.FindAll(x => x.ItemId == item.Id);
            foreach (var customerItem in customerItems)
            {
                var customerViewModel = await _customerService.GetById(customerItem.UserId);
                if (customerViewModel != null)
                {
                    userViewModels.Add(customerViewModel);
                }
            }

            // Build the view model
            var itemViewModel = new ItemViewModel
            {
                ItemCode = item.ItemCode,
                ItemName = item.ItemName,
                ItemDescription = item.ItemDescription,
                Price = item.Price,
                ItemImages = imageViewModels,
                CategoryViewModels = categoryViewModels,
                UserViewModels = userViewModels
            };

            return itemViewModel;
        }
    }
}