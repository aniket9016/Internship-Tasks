using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Repository.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Repository.Repo
{
    public class RepositoryCommon<T> : IRepositoryCommon<T> where T : BaseEntity
    {
        private readonly AppDbContext _context;
        private readonly DbSet<T> _dbSet;

        public RepositoryCommon(AppDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public async Task<ICollection<T>> GetAll()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<T> Get(Guid id)
        {
            return await _dbSet.FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<bool> Insert(T model)
        {
            await _dbSet.AddAsync(model);
            return await SaveChanges();
        }

        public async Task<bool> Update(T model)
        {
            _dbSet.Update(model);
            return await SaveChanges();
        }

        public async Task<bool> Delete(T model)
        {
            _dbSet.Remove(model);
            return await SaveChanges();
        }

        public async Task<T> GetLast(Guid id)
        {
            return await _dbSet.Where(e => e.Id == id)
                               .OrderByDescending(e => e.CreatedAt)
                               .FirstOrDefaultAsync();
        }

        public async Task<T> Find(Expression<Func<T, bool>> match)
        {
            return await _dbSet.FirstOrDefaultAsync(match);
        }

        public async Task<ICollection<T>> FindAll(Expression<Func<T, bool>> match)
        {
            return await _dbSet.Where(match).ToListAsync();
        }

        public async Task<bool> SaveChanges()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
