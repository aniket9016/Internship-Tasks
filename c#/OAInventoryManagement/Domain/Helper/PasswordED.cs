using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Helper
{
    public class PasswordED
    {
        public static string HashWithSalt(string password)
        {
            var salt = GenerateSalt();
            var hash = GenerateHash(password, salt);
            return $"{salt}:{hash}";
        }

        public static bool Verify(string inputPassword, string storedPassword)
        {
            var parts = storedPassword.Split(':');
            if (parts.Length != 2) return false;

            var salt = parts[0];
            var hash = parts[1];
            var inputHash = GenerateHash(inputPassword, salt);

            return hash == inputHash;
        }

        public static string GenerateHash(string input, string salt)
        {
            using var alg = new HMACSHA256(GetBytes(salt));
            var result = alg.ComputeHash(GetBytes(input));
            return Convert.ToBase64String(result);
        }

        public static string GenerateSalt(int size = 32)
        {
            byte[] buff = new byte[size];
            using RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
            rng.GetBytes(buff);
            return Convert.ToBase64String(buff);
        }

        private static byte[] GetBytes(string str)
        {
            return Encoding.UTF8.GetBytes(str);
        }
    }
}
