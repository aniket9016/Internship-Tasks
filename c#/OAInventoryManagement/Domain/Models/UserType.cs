using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class UserType : BaseEntity
    {
        [Required(ErrorMessage = "TypeName is required")]
        public string TypeName { get; set; }

        public virtual List<User>? Users { get; set; }
    }
}
