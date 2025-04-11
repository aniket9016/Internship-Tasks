using Domain.Models;
using Domain.ViewModel;
using Repository.Repo;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Service.Custom.SupplierSer
{
    public class SupplierService : ISupplierService
    {
        private readonly IRepositoryCommon<User> _repository;

        public SupplierService(IRepositoryCommon<User> repository)
        {
            _repository = repository;
        }

        public async Task<ICollection<UserViewModel>> GetAll()
        {
            var users = await _repository.GetAll();
            return users.Select(u => new UserViewModel
            {
                UserId = u.UserId,
                UserName = u.UserName,
                Email = u.Email,
                Address = u.Address,
                PhoneNumber = u.PhoneNumber,
                Photo = u.Photo
            }).ToList();
        }

        public async Task<UserViewModel?> GetById(Guid id)
        {
            var user = await _repository.Get(id);
            if (user == null) return null;

            return new UserViewModel
            {
                UserId = user.UserId,
                UserName = user.UserName,
                Email = user.Email,
                Address = user.Address,
                PhoneNumber = user.PhoneNumber,
                Photo = user.Photo
            };
        }

        public async Task<bool> Insert(UserInsertModel model)
        {
            string photoPath = null;
            if (model.Photo != null)
            {
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", model.Photo.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await model.Photo.CopyToAsync(stream);
                }
                photoPath = filePath;
            }

            var user = new User
            {
                UserId = Guid.NewGuid().ToString(),
                UserName = model.UserName,
                Email = model.Email,
                Password = model.Password,
                Address = model.Address,
                PhoneNumber = model.PhoneNumber,
                Photo = photoPath
            };

            return await _repository.Insert(user);
        }

        public async Task<bool> Update(UserUpdateModel model)
        {
            var user = await _repository.Get(model.Id);
            if (user == null) return false;

            string photoPath = user.Photo;
            if (model.Photo != null)
            {
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", model.Photo.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await model.Photo.CopyToAsync(stream);
                }
                photoPath = filePath;
            }

            user.UserName = model.UserName;
            user.Email = model.Email;
            user.Password = model.Password;
            user.Address = model.Address;
            user.PhoneNumber = model.PhoneNumber;
            user.Photo = photoPath;

            return await _repository.Update(user);
        }

        public async Task<bool> Delete(Guid id)
        {
            var user = await _repository.Get(id);
            if (user == null) return false;

            return await _repository.Delete(user);
        }
    }
}
