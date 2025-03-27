using System;
using System.Linq;
using SessionbasedAuthenticationDemo.Models;
using SessionbasedAuthenticationDemo.ViewModel;
using SessionBasedAuthenticationDemo;

namespace SessionbasedAuthenticationDemo.Repository
{
    public class UserRepository : ICookieUserItem
    {
        private readonly AppDbContext _db;

        public UserRepository(AppDbContext db)
        {
            _db = db;
        }

        public CookieUserItem Validate(Login model)
        {
            var emailRecords = _db.Users.Where(x => x.Email == model.Email);

            var results = emailRecords.AsEnumerable()
                .Where(m =>m.PasswordHash== Helper.GenerateHash(model.Password, m.PasswordSalt))
                .Select(m => new CookieUserItem
                {
                    UserId = m.UserId,
                    Email = m.Email,
                    Name = m.Name,
                    DateTimeUtc = m.DateTimeUtc
                });

            return results.FirstOrDefault();
        }

        public CookieUserItem Register(Register model)
        {
            var salt = Helper.GenerateSalt();
            var hashedPassword = Helper.GenerateHash(model.Password, salt);

            var user = new User
            {
                UserId = Guid.NewGuid(),
                Email = model.Email,
                PasswordHash = hashedPassword,
                PasswordSalt = salt,
                Name = model.Name,
                DateTimeUtc = DateTime.UtcNow
            };

            _db.Users.Add(user);
            _db.SaveChanges();

            return new CookieUserItem
            {
                UserId = user.UserId,
                Email = user.Email,
                Name = user.Name,
                DateTimeUtc = user.DateTimeUtc
            };
        }
    }
}
