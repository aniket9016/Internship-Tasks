using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Generic_NonGenericCollection
{
     delegate void AddDelegate(int a, int b);
     delegate string NameDelegate(string str);
    class DelegatesEx
    {
        void Add(int a,int b)
        {
            Console.WriteLine(a+b);
        }
        public static string Name(string str)
        { 
            return "Hello "+str; 
        }
        public static void Main()
        {
            DelegatesEx e=new DelegatesEx();
            AddDelegate a = new AddDelegate(e.Add);
            NameDelegate n=new NameDelegate(Name);
            a(100, 500); 
            a.Invoke(100, 500);
            string str = n("Suraj");
            Console.WriteLine(str);
            Console.ReadLine();
        }
    }
}
