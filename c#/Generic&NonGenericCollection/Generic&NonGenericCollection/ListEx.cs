using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Generic_NonGenericCollection
{
    class ListEx
    {
        public static void Main()
        {
            List <string> citylist=new List<string>();
            var cities=new List<string>()
            {
                "Mumbai","Pune","Goa","Delhi","Kerela"
            };
            Console.WriteLine("-------------------------------------");
            citylist.AddRange(cities);
            foreach(var c in citylist)
            {
                Console.WriteLine(c);
            }
            Console.WriteLine(citylist.Count);
            Console.WriteLine("-------------------------------------");
            Console.WriteLine(citylist[0]);
            Console.WriteLine(citylist[1]);
            Console.WriteLine(citylist[2]);
            Console.WriteLine(citylist[3]);
            Console.WriteLine(citylist[4]);
            Console.WriteLine("-------------------------------------");
            citylist.Add("Surat");
            //citylist.Clear();
            foreach (var c in citylist)
            {
                Console.WriteLine(c);
            }
            Console.WriteLine(citylist.BinarySearch("Surat"));
            Console.WriteLine(citylist.Contains("Surat"));
            Console.WriteLine(citylist.Remove("Kerela"));
            citylist.Sort();
            Console.WriteLine("------------------------------------------");
            foreach (var c in citylist)
            {
                Console.WriteLine(c);
            }
            var Cu = new List<int>
            {
                101,
                102,
                103
            };
            Console.WriteLine("------------------------------------------");
            //for (int i=0;i<Cu.Count;i++)
            //{
            //    Console.WriteLine(Cu[i]);
            //}
            foreach (var c in Cu)
            {
                Console.Write(c+" ");
            }
            Console.WriteLine();
            Console.ReadLine();

        }
    }
    public class  Customer
    {
        internal string City;

        public int CustId { get; set; }
        public string Name { get; set; }
        public double Balance { get; set; }
        public int Id { get; internal set; }
    }
    
}
