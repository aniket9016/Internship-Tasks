using Domain.Models;
using Domain.ViewModel;
using Repository.Repo;
using Microsoft.AspNetCore.Http;
using Service.Custom.UserTypeSer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Service.Custom.CustomerSer
{
    public class CustomerService : ICustomerService
    {
        private readonly IRepositoryCommon<User> _repository;
        private readonly IUserTypeService _userTypeService;

        public CustomerService(IRepositoryCommon<User> repository, IUserTypeService userTypeService)
        {
            _repository = repository;
            _userTypeService = userTypeService;
        }

        public async Task<ICollection<UserViewModel>> GetAll()
        {
            var customers = await _repository.FindAll(u => u.UserTypes.TypeName == "customer");
            return customers.Select(u => new UserViewModel
            {
                UserId = u.UserId,
                UserName = u.UserName,
                Email = u.Email,
                Password = u.Password,
                Address = u.Address,
                PhoneNumber = u.PhoneNumber,
                Photo = u.Photo,
                UserTypeViewModels = new List<UserTypeViewModel>
            {
                new UserTypeViewModel { Id = u.UserTypes.Id, TypeName = u.UserTypes.TypeName }
            }
            }).ToList();
        }

        public async Task<UserViewModel?> GetById(Guid id)
        {
            var user = await _repository.Get(id);
            if (user?.UserTypes?.TypeName != "customer") return null;

            return new UserViewModel
            {
                UserId = user.UserId,
                UserName = user.UserName,
                Email = user.Email,
                Password = user.Password,
                Address = user.Address,
                PhoneNumber = user.PhoneNumber,
                Photo = user.Photo,
                UserTypeViewModels = new List<UserTypeViewModel>
            {
                new UserTypeViewModel { Id = user.UserTypes.Id, TypeName = user.UserTypes.TypeName }
            }
            };
        }

        public async Task<bool> Insert(UserInsertModel model, string photoFileName)
        {
            var customerType = (await _userTypeService.GetAll())
                                .FirstOrDefault(x => x.TypeName.ToLower() == "customer");

            if (customerType == null) return false;

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
                CreatedBy = "System",
                UpdatedBy = "System",
                IsActive = true,
                UserTypeId = customerType.Id
            };

            return await _repository.Insert(user);
        }

        public async Task<bool> Update(UserUpdateModel model, string photoFileName)
        {
            var user = await _repository.Get(model.Id);
            if (user == null || user.UserTypes?.TypeName != "customer") return false;

            user.UserName = model.UserName;
            user.Email = model.Email;
            user.Password = model.Password;
            user.Address = model.Address;
            user.PhoneNumber = model.PhoneNumber;
            user.Photo = photoFileName;
            user.UpdatedAt = DateTime.Now;
            user.UpdatedBy = "System";

            return await _repository.Update(user);
        }

        public async Task<bool> Delete(Guid id)
        {
            var user = await _repository.Get(id);
            if (user == null || user.UserTypes?.TypeName != "customer") return false;

            return await _repository.Delete(user);
        }

        public async Task<User> Find(Expression<Func<User, bool>> match)
        {
            return await _repository.Find(match);
        }

        public async Task<ICollection<User>> FindAll(Expression<Func<User, bool>> match)
        {
            return await _repository.FindAll(match);
        }
    }

}
