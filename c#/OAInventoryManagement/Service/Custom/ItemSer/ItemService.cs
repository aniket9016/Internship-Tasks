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
                var customerUsers = await _customerItemRepo.FindAll(x => x.ItemId == item.Id);
                var supplierUsers = await _supplierItemRepo.FindAll(x => x.ItemId == item.Id);

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
                    CategoryViewModels = (await _categoryService.GetAll()).Where(c => c.Id == item.CategoryId).ToList(),
                    UserViewModels = new List<UserViewModel>()
                };

                var customerUsersList = customerUsers.Select(x => x.User);
                var supplierUsersList = supplierUsers.Select(x => x.User);

                var allUsers = customerUsersList.Concat(supplierUsersList).Distinct();

                foreach (var user in allUsers)
                {
                    if (user != null)
                    {
                        viewModel.UserViewModels.Add(new UserViewModel
                        {
                            UserId = user.Id.ToString(),
                            UserName = user.UserName,
                            Email = user.Email,
                            Address = user.Address,
                            PhoneNumber = user.PhoneNumber,
                            Photo = user.Photo,
                            UserTypeViewModels = user.UserTypes != null
                                ? new List<UserTypeViewModel>
                                {
                                    new UserTypeViewModel
                                    {
                                        Id = user.UserTypes.Id,
                                        TypeName = user.UserTypes.TypeName
                                    }
                                }
                                : new List<UserTypeViewModel>()
                        });
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
            var customerUsers = await _customerItemRepo.FindAll(x => x.ItemId == item.Id);
            var supplierUsers = await _supplierItemRepo.FindAll(x => x.ItemId == item.Id);

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
                CategoryViewModels = (await _categoryService.GetAll()).Where(c => c.Id == item.CategoryId).ToList(),
                UserViewModels = new List<UserViewModel>()
            };

            var customerUsersList = customerUsers.Select(x => x.User);
            var supplierUsersList = supplierUsers.Select(x => x.User);
            var allUsers = customerUsersList.Concat(supplierUsersList).Distinct();

            foreach (var user in allUsers)
            {
                if (user != null)
                {
                    viewModel.UserViewModels.Add(new UserViewModel
                    {
                        UserId = user.Id.ToString(),
                        UserName = user.UserName,
                        Email = user.Email,
                        Address = user.Address,
                        PhoneNumber = user.PhoneNumber,
                        Photo = user.Photo,
                        UserTypeViewModels = user.UserTypes != null
                            ? new List<UserTypeViewModel>
                            {
                                new UserTypeViewModel
                                {
                                    Id = user.UserTypes.Id,
                                    TypeName = user.UserTypes.TypeName
                                }
                            }
                            : new List<UserTypeViewModel>()
                    });
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
                CreatedAt = DateTime.Now
            };

            var inserted = await _itemRepo.Insert(entity);

            if (inserted && !string.IsNullOrEmpty(imageFileName))
            {
                var image = new ItemImages
                {
                    Id = Guid.NewGuid(),
                    ItemId = entity.Id,
                    ItemImage = imageFileName,
                    CreatedAt = DateTime.Now
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
            entity.UpdatedAt = DateTime.Now;

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
                    CreatedAt = DateTime.Now
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
    }
}
