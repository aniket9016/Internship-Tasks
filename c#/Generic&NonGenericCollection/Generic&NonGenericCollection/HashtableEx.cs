using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Generic_NonGenericCollection
{
    internal class HashtableEx
    {
        public static void Main()
        {
            Console.WriteLine("-------------Before adding------------");
            var citykeyValuePairs = new Hashtable()
            {
                {0,"Surat, Valsad, Vapi" },
                {1,"Mumbai, Pune, Nashik" },
                {2,"Jaipur, Udaipur , Jasalmer"}
            };
            foreach (DictionaryEntry kvp in citykeyValuePairs)
            {
                Console.WriteLine("Key: {0}, Value: {1}", kvp.Key, kvp.Value);
            }
            Console.WriteLine("-------------After adding------------");
            Console.BackgroundColor = ConsoleColor.Blue;
            citykeyValuePairs.Add(5, "Jaunpur, Mirzapur , Kanpur");
            citykeyValuePairs.Add(4, "Bengaluru, Chennai , Kolkata");
            citykeyValuePairs.Add(3, "Jaunpur, Mirzapur , Kanpur");
            foreach (DictionaryEntry kvp in citykeyValuePairs)
            {
                Console.WriteLine("Key: {0}, Value: {1}", kvp.Key, kvp.Value);
            }
            Console.WriteLine("-------------After Removing------------");
            Console.BackgroundColor = ConsoleColor.Red;
            citykeyValuePairs.Remove(3);
            citykeyValuePairs.Remove(4);
            citykeyValuePairs.Remove(5);
            foreach (DictionaryEntry kvp in citykeyValuePairs)
            {
                Console.WriteLine("Key: {0}, Value: {1}", kvp.Key, kvp.Value);
            }
            Console.WriteLine("------------------------------");
            Console.WriteLine("-------------Before adding------------");
            var countrtcitykeyValuePairs = new Hashtable()
            {
                {"Gujarat","Surat, Valsad, Vapi" },
                {"Maharastra","Mumbai, Pune, Nashik" },
                {"Rajasthan","Jaipur, Udaipur , Jasalmer"}
            };
            foreach (DictionaryEntry kp in countrtcitykeyValuePairs)
            {
                Console.WriteLine("Key: {0}, Value: {1}", kp.Key, kp.Value);
            }
            Console.WriteLine("-------------After adding------------");
            Console.BackgroundColor = ConsoleColor.Blue;
            countrtcitykeyValuePairs.Add("Uttar Pradesh", "Jaunpur, Mirzapur , Kanpur");
            countrtcitykeyValuePairs.Add("karnataka", "Bengaluru, Chennai , Kolkata");
            foreach (DictionaryEntry kvp in countrtcitykeyValuePairs)
            {
                Console.WriteLine("Key: {0}, Value: {1}", kvp.Key, kvp.Value);
            }
            Console.WriteLine("-------------After Removing------------");
            Console.BackgroundColor = ConsoleColor.Red;
            countrtcitykeyValuePairs.Remove("Uttar Pradesh");
            countrtcitykeyValuePairs.Remove("karnataka");
            foreach (DictionaryEntry kvp in countrtcitykeyValuePairs)
            {
                Console.WriteLine("Key: {0}, Value: {1}", kvp.Key, kvp.Value);
            }
            var ht=new Hashtable()
            {
                {"Eno",1001 },
                {"Ename","Aniket" },
                {"Phone",7845784554 },
                {"Email","aniket@gmail.com" },
                {"Dname","IT" },
                {"Location","Surat" },
                {"DID",78 }
            };
            Console.WriteLine("-------------------------------------------");
            
            foreach(DictionaryEntry items in ht)
            {
                Console.WriteLine("{0} : {1}",items.Key,items.Value);
            }
            Console.ReadLine();
        }
    }
}
