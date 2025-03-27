using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Generic_NonGenericCollection
{
    class ArrayListEx
    {
        public static void Main()
        {
            var arraylist1=new ArrayList();
            var arraylist2=new ArrayList()
            {
                1,"Aniket"," ",true,4.55,null,0
            };
            int[] arr = { 100, 200, 300, 400, 500 };
            Queue q= new Queue();
            q.Enqueue("hello");
            q.Enqueue("world");
            arraylist1.AddRange(arraylist2);
            arraylist1.AddRange(arr);
            arraylist1.AddRange(q);
            Console.WriteLine("Elements of arraylist");
            arraylist1.Insert(0, 2);
            for (int i = 0; i < arraylist1.Count; i++)
            {
                Console.WriteLine(arraylist1[i]);
            }
            Console.WriteLine(arraylist1.Capacity);
            Console.WriteLine(arraylist1.Count);
            Console.WriteLine(arraylist1.IsFixedSize);
            Console.WriteLine(arraylist1.IsReadOnly);
            arraylist1.Add("Dubey");
            arraylist1.Insert(2,"Male");
            Console.WriteLine("----------------------Updated----------------");
            Console.WriteLine(arraylist1.Contains("Aniket"));
            foreach (var item in arraylist1)
            {
                Console.WriteLine(item);
            }
            Console.WriteLine("-----------------------------------------------");
            Console.WriteLine(arraylist1[0]);
            Console.WriteLine(arraylist1[1]);
            Console.WriteLine(arraylist1[2]);
            Console.WriteLine(arraylist1[3]);
            Console.WriteLine(arraylist1[4]);
            Console.WriteLine(arraylist1[5]);
            Console.WriteLine(arraylist1[6]);
            Console.WriteLine(arraylist1[7]);
            arraylist1.Clear();
            Console.WriteLine("After clear");
            foreach (var item in arraylist1)
            {
                Console.WriteLine(item);
            }
            Console.ReadLine();
        }
    }
}
