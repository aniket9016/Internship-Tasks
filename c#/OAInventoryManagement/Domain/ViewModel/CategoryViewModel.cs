using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModel
{
    public class CategoryViewModel
    {
        public Guid Id { get; set; }
        public string CategoryName { get; set; }
    }

    public class CategoryInsertModel
    {
        public string CategoryName { get; set; }
    }

    public class CategoryUpdateModel: CategoryInsertModel
    {
        public Guid Id { get; set; }
    }

}
