using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Payment_Processing_System
{
    class CreditCardPayment:Payment
    {
        public override void ProcessPayment()
        {
            Console.WriteLine("Process payment method of CreditCardPayment class");
        }
    }
}
