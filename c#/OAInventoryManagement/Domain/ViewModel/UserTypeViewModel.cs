using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModel
{
    public class UserTypeViewModel
    {
        public Guid Id { get; set; }
        public string TypeName { get; set; }
    }

    public class UserTypeInsertModel
    {
        public string TypeName { get; set; }
    }

    public class UserTypeUpdateModel: UserTypeInsertModel
    {
        public Guid Id { get; set; }
    }
}
