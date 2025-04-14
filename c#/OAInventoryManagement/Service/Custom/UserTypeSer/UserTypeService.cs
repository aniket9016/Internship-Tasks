using Domain.Models;
using Domain.ViewModel;
using Repository.Repo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Service.Custom.UserTypeSer
{
    public class UserTypeService : IUserTypeService
    {
        private readonly IRepositoryCommon<UserType> _repository;

        public UserTypeService(IRepositoryCommon<UserType> repository)
        {
            _repository = repository;
        }

        public async Task<ICollection<UserTypeViewModel>> GetAll()
        {
            var userTypes = await _repository.GetAll();
            return userTypes.Select(ut => new UserTypeViewModel
            {
                Id = ut.Id,
                TypeName = ut.TypeName
            }).ToList();
        }

        public async Task<UserTypeViewModel> GetById(Guid id)
        {
            var userType = await _repository.Get(id);
            if (userType == null) return null;

            return new UserTypeViewModel
            {
                Id = userType.Id,
                TypeName = userType.TypeName
            };
        }

        public async Task<bool> Insert(UserTypeInsertModel model)
        {
            var entity = new UserType
            {
                Id = Guid.NewGuid(),
                TypeName = model.TypeName,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                CreatedBy = "System",
                UpdatedBy = "System",
                IsActive = true
            };

            return await _repository.Insert(entity);
        }


        public async Task<bool> Update(UserTypeUpdateModel model)
        {
            var entity = await _repository.Get(model.Id);
            if (entity == null) return false;

            entity.TypeName = model.TypeName;
            entity.UpdatedAt = DateTime.Now;

            return await _repository.Update(entity);
        }

        public async Task<bool> Delete(Guid id)
        {
            var entity = await _repository.Get(id);
            if (entity == null) return false;

            return await _repository.Delete(entity);
        }
    }
}
