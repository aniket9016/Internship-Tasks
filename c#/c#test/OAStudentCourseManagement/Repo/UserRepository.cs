using Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Repo
{
    public class UserRepository : IUserRepository<User>
    {
        private readonly AppDBcontext context;
        private DbSet<User> entities;

        public UserRepository(AppDBcontext context)
        {
            this.context = context;
            entities = context.Set<User>();
        }

        public IEnumerable<User> GetAll()
        {
            return entities.AsEnumerable();
        }

        public User Get(long id)
        {
            return entities.SingleOrDefault(s => s.Id == id);
        }

        public void Insert(User user)
        {
            entities.Add(user);
            context.SaveChanges();
        }

        public void Update(User user)
        {
            var existingUser = context.Users.Find(user.Id);
            if (existingUser != null)
            {
                context.Entry(existingUser).CurrentValues.SetValues(user);
                context.SaveChanges();
            }
        }

        public void Delete(User user)
        {
            entities.Remove(user);
            context.SaveChanges();
        }

        public void Remove(User user)
        {
            entities.Remove(user);
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }
    }
}
