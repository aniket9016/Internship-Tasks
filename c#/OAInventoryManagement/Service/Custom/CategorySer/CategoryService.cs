using Domain.Models;
using Domain.ViewModel;
using Repository.Repo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Service.Custom.CategorySer
{
    public class CategoryService : ICategoryService
    {
        private readonly IRepositoryCommon<Category> _repository;

        public CategoryService(IRepositoryCommon<Category> repository)
        {
            _repository = repository;
        }

        public async Task<ICollection<CategoryViewModel>> GetAll()
        {
            var categories = await _repository.GetAll();
            return categories.Select(c => new CategoryViewModel
            {
                Id = c.Id,
                CategoryName = c.CategoryName
            }).ToList();
        }

        public async Task<CategoryViewModel?> GetById(Guid id)
        {
            var category = await _repository.Get(id);
            if (category == null) return null;

            return new CategoryViewModel
            {
                Id = category.Id,
                CategoryName = category.CategoryName
            };
        }

        public async Task<bool> Insert(CategoryInsertModel model)
        {
            var entity = new Category
            {
                Id = Guid.NewGuid(),
                CategoryName = model.CategoryName,
                CreatedAt = DateTime.Now
            };

            return await _repository.Insert(entity);
        }

        public async Task<bool> Update(CategoryUpdateModel model)
        {
            var entity = await _repository.Get(model.Id);
            if (entity == null) return false;

            entity.CategoryName = model.CategoryName;
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
