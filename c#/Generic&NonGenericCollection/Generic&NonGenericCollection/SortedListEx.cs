using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Generic_NonGenericCollection
{
    internal class SortedListEx
    {
        public static void Main(string[] args)
        {
            SortedList<int,string> NumberName = new SortedList<int,string>()
            {
                { 1,"Suraj" },
                { 3,"Manish" },
                { 5,"Manish" },
                { 4,"Vaibhav" },
                { 2,"Anand" }
            };
            foreach(KeyValuePair<int,string> pair in NumberName)
            {
                Console.WriteLine("key : {0}, Value: {1}",pair.Key,pair.Value);
            }
            Console.WriteLine("------------After Adding-------------");
            Console.BackgroundColor = ConsoleColor.Blue;
            NumberName[2]= "Shivam";
            NumberName.Add(0, "Satyam");
            NumberName.Add(6, "Akash");
            NumberName.Add(8, "Niraj");
            NumberName.Add(7, "Bhanu");
            foreach (KeyValuePair<int, string> pair in NumberName)
            {
                Console.WriteLine("key : {0}, Value: {1}", pair.Key, pair.Value);
            }
            Console.WriteLine("------------After Removing-------------");
            Console.BackgroundColor = ConsoleColor.Red;
            NumberName.Remove(0);
            NumberName.Remove(6);
            NumberName.Remove(8);
            NumberName.Remove(7);
            foreach (KeyValuePair<int, string> pair in NumberName)
            {
                Console.WriteLine("key : {0}, Value: {1}", pair.Key, pair.Value);
            }
            Console.ReadLine();
        }
    }
}
