using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Generic_NonGenericCollection
{
    internal class TuplesEx
    {
        public static void Main()
        {
            var tup = Tuple.Create(1, "bill", "gates");
            Console.WriteLine(tup.Item1);
            Console.WriteLine(tup.Item2);
            Console.WriteLine(tup.Item3);
            var tup2 = Tuple.Create(1, 2, 9, 10, 11, 12, 13, Tuple.Create(3, 4, 5, 6, 7, 8));
            Console.WriteLine(tup2.Item1);
            Console.WriteLine(tup2.Item2);
            Console.WriteLine(tup2.Item3);
            Console.WriteLine(tup2.Item4);
            Console.WriteLine(tup2.Item5);
            Console.WriteLine(tup2.Item6);
            Console.WriteLine(tup2.Item7);
            Console.WriteLine(tup2.Rest);
            Console.ReadLine();
        }
    }
}
