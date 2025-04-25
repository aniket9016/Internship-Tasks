using Domain.Models;
using Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Custom.TokenSer
{
    public interface ITokenService
    {
        string GenerateToken(string email);
    }
}
