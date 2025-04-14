using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModel
{
    public class ItemViewModel
    {
        public string ItemCode { get; set; }
        public string ItemName { get; set; }
        public string ItemDescription { get; set; }
        public int Price { get; set; }
        public List<ItemImageViewModel> ItemImages { get; set; }
        public List<CategoryViewModel> CategoryViewModels{ get; set; }
        public List<UserViewModel> UserViewModels { get; set; }
    }

    public class ItemInsertModel
    {
        public string ItemCode { get; set; }
        public string ItemName { get; set; }
        public string ItemDescription { get; set; }
        public Guid CategoryId { get; set; }
        public int Price { get; set; }
    }

    public class ItemUpdateModel:ItemInsertModel
    {
        public Guid Id { get; set; }
    }

    public class ItemImageViewModel
    {
        public string ItemImage { get; set; }
    }
    public class UserView
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string? Photo { get; set; }
        public string TypeName { get; set; }
    }

}
