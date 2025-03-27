using System;
using System.Security.Cryptography;
using System.Text;

namespace SessionBasedAuthenticationDemo
{
    public static class Helper
    {
        public static string GenerateHash(string input, string salt)
        {
            using var alg = new HMACSHA512(GetBytes(salt));
            var result = alg.ComputeHash(GetBytes(input));
            return Convert.ToBase64String(result);
        }

        public static string GenerateSalt()
        {
            byte[] buff = new byte[32];
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
