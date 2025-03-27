using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Generic_NonGenericCollection
{
    class HashSetEx
    {
        public static void Main()
        {
            string[] arr =
            {
                "bus",
                "car",
                "truck",
                "bus"
            };
            var hset = new HashSet<string>(arr);
            foreach (var item in hset)
            {
                Console.WriteLine(item);
            }
            Console.ReadLine();
        }
    }
}
