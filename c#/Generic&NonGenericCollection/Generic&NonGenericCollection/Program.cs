using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Generic_NonGenericCollection
{
    internal class Program
    {
        static void Main()
        {
            CompareEx<int> ex = new CompareEx<int>();
            ex.Add(10, 20);
            ex.Sub(50, 20);
            ex.Mul(10, 20);
            ex.Div(50, 5);
            Console.ReadLine();
        }
    }
}
