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
            var customerType = await _userTypeService.Find(x => x.TypeName.ToLower() == "customer");
            if (customerType == null) return new List<UserViewModel>();

            var users = await _repository.FindAll(x => x.UserTypeId == customerType.Id);

            var result = users.Select(user => new UserViewModel
            {
                UserId = user.UserId,
                UserName = user.UserName,
                Email = user.Email,
                Password = user.Password,
                Address = user.Address,
                PhoneNumber = user.PhoneNumber,
                Photo = user.Photo,
                UserType = customerType.TypeName,
                UserTypeViewModels = new List<UserTypeViewModel>
                {
                    new UserTypeViewModel
                    {
                        Id = customerType.Id,
                        TypeName = customerType.TypeName
                    }
                }
            }).ToList();

            return result;
        }

        public async Task<UserViewModel?> GetById(Guid id)
        {
            var customerType = await _userTypeService.Find(x => x.TypeName.ToLower() == "customer");
            if (customerType == null) return null;

            var user = await _repository.Find(x => x.Id == id && x.UserTypeId == customerType.Id);
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
                UserType = customerType.TypeName,
                UserTypeViewModels = new List<UserTypeViewModel>
                {
                    new UserTypeViewModel
                    {
                        Id = customerType.Id,
                        TypeName = customerType.TypeName
                    }
                }
            };
        }

        public async Task<bool> Insert(UserInsertModel model, string photoFileName)
        {
            var customerType = await _userTypeService.Find(x => x.TypeName.ToLower() == "customer");
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
                UserTypeId = customerType.Id
            };

            return await _repository.Insert(user);
        }

        public async Task<bool> Update(UserUpdateModel model, string photoFileName)
        {
            var customerType = await _userTypeService.Find(x => x.TypeName.ToLower() == "customer");
            if (customerType == null) return false;

            var user = await _repository.Find(x => x.Id == model.Id && x.UserTypeId == customerType.Id);
            if (user == null) return false;

            user.UserId = model.UserId;
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
            var customerType = await _userTypeService.Find(x => x.TypeName.ToLower() == "customer");
            if (customerType == null) return false;

            var user = await _repository.Find(x => x.Id == id && x.UserTypeId == customerType.Id);
            if (user == null) return false;

            return await _repository.Delete(user);
        }

        public async Task<User> Find(Expression<Func<User, bool>> match)
        {
            var customerType = await _userTypeService.Find(x => x.TypeName.ToLower() == "customer");
            if (customerType == null) return null;

            Expression<Func<User, bool>> customerFilter = x => x.UserTypeId == customerType.Id;
            var combinedFilter = customerFilter.And(match);

            return await _repository.Find(combinedFilter);
        }

        public async Task<ICollection<User>> FindAll(Expression<Func<User, bool>> match)
        {
            var customerType = await _userTypeService.Find(x => x.TypeName.ToLower() == "customer");
            if (customerType == null) return new List<User>();

            Expression<Func<User, bool>> customerFilter = x => x.UserTypeId == customerType.Id;
            var combinedFilter = customerFilter.And(match);

            return await _repository.FindAll(combinedFilter);
        }
    }

    // Reusable expression extension method for combining filters
    public static class ExpressionExtensions
    {
        public static Expression<Func<T, bool>> And<T>(
            this Expression<Func<T, bool>> expr1,
            Expression<Func<T, bool>> expr2)
        {
            var parameter = Expression.Parameter(typeof(T));

            var body = Expression.AndAlso(
                Expression.Invoke(expr1, parameter),
                Expression.Invoke(expr2, parameter));

            return Expression.Lambda<Func<T, bool>>(body, parameter);
        }
    }
}
