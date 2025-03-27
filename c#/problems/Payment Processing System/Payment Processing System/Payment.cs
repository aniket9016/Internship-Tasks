using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Payment_Processing_System
{
    class Payment
    {
        
        public virtual void ProcessPayment()
        {
            Console.WriteLine("Process payment method of base class");
        }
        
    }
}
