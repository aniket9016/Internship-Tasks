using Domain.Models;
using Domain.ViewModel;
using Repository.Repo;
using Service.Custom.UserTypeSer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Service.Custom.SupplierSer
{
    public class SupplierService : ISupplierService
    {
        private readonly IRepositoryCommon<User> _repository;
        private readonly IRepositoryCommon<UserType> _userTypeRepository;
        private readonly IUserTypeService _userTypeService;

        public SupplierService(IRepositoryCommon<User> repository, IUserTypeService userTypeService, IRepositoryCommon<UserType> userTypeRepository)
        {
            _repository = repository;
            _userTypeService = userTypeService;
            _userTypeRepository = userTypeRepository;
        }

        public async Task<IEnumerable<UserViewModel>> GetAll()
        {
            var supplierType = await _userTypeService.Find(x => x.TypeName.ToLower() == "supplier");
            if (supplierType == null) return Enumerable.Empty<UserViewModel>();

            var users = await _repository.FindAll(x => x.UserTypeId == supplierType.Id);

            var result = users.Select(user => new UserViewModel
            {
                UserId = user.UserId,
                UserName = user.UserName,
                Email = user.Email,
                Password = user.Password,
                Address = user.Address,
                PhoneNumber = user.PhoneNumber,
                Photo = user.Photo,
                UserType = supplierType.TypeName,
                UserTypeViewModels = new List<UserTypeViewModel>
                {
                    new UserTypeViewModel
                    {
                        Id = supplierType.Id,
                        TypeName = supplierType.TypeName
                    }
                }
            });

            return result;
        }

        public async Task<UserViewModel?> GetById(Guid id)
        {
            var supplierType = await _userTypeService.Find(x => x.TypeName.ToLower() == "supplier");
            if (supplierType == null) return null;

            var user = await _repository.Find(x => x.Id == id && x.UserTypeId == supplierType.Id);
            if (user == null) return null;

            return new UserViewModel
            {
                UserId = user.UserId,
                UserName = user.UserName,
                Email = user.Email,
                Password = user.Password,
                Address = user.Address,
                PhoneNumber = user.PhoneNumber,
                Photo = user.Photo,
                UserType = supplierType.TypeName,
                UserTypeViewModels = new List<UserTypeViewModel>
                {
                    new UserTypeViewModel
                    {
                        Id = supplierType.Id,
                        TypeName = supplierType.TypeName
                    }
                }
            };
        }

        public async Task<bool> Insert(UserInsertModel model, string photoFileName)
        {
            var supplierType = await _userTypeService.Find(x => x.TypeName.ToLower() == "supplier");
            if (supplierType == null) return false;

            var user = new User
            {
                Id = Guid.NewGuid(),
                UserId = model.UserId,
                UserName = model.UserName,
                Email = model.Email,
                Password = model.Password,
                Address = model.Address,
                PhoneNumber = model.PhoneNumber,
                Photo = photoFileName,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                UserTypeId = supplierType.Id
            };

            return await _repository.Insert(user);
        }

        public async Task<bool> Update(UserUpdateModel model, string photoFileName)
        {
            var supplierType = await _userTypeService.Find(x => x.TypeName.ToLower() == "supplier");
            if (supplierType == null) return false;

            var user = await _repository.Find(x => x.Id == model.Id && x.UserTypeId == supplierType.Id);
            if (user == null) return false;

            user.UserName = model.UserName;
            user.Email = model.Email;
            user.Password = model.Password;
            user.Address = model.Address;
            user.PhoneNumber = model.PhoneNumber;
            user.Photo = photoFileName;
            user.UpdatedAt = DateTime.Now;
            return await _repository.Update(user);
        }

        public async Task<bool> Delete(Guid id)
        {
            var supplierType = await _userTypeService.Find(x => x.TypeName.ToLower() == "supplier");
            if (supplierType == null) return false;

            var user = await _repository.Find(x => x.Id == id && x.UserTypeId == supplierType.Id);
            if (user == null) return false;

            return await _repository.Delete(user);
        }

        public async Task<User> Find(Expression<Func<User, bool>> match)
        {
            var supplierType = await _userTypeService.Find(x => x.TypeName.ToLower() == "supplier");
            return await _repository.Find(x => x.UserTypeId == supplierType.Id && match.Compile().Invoke(x));
        }

        public async Task<ICollection<User>> FindAll(Expression<Func<User, bool>> match)
        {
            var supplierType = await _userTypeService.Find(x => x.TypeName.ToLower() == "supplier");
            var allSuppliers = await _repository.FindAll(x => x.UserTypeId == supplierType.Id);
            return allSuppliers.Where(match.Compile()).ToList();
        }
    }
}
