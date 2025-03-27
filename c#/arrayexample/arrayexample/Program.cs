using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace arrayexample
{
    internal class Program
    {
        static void Main()
        {
            int[] arr = {45,57,20,30,40,50, 10, 23, 57, 68, 29, 45, 25, 89, 97, 25, 86 };
            int count = 0;
            for (int i = 0; i < arr.Length; i++)
            {
                if(arr[i] >40)
                {
                    count++;
                }
            }
            int[] arr2=new int[count];
            int index = 0;
            for(int i = 0;i < arr.Length; i++)
            {
                if (arr[i]>40)
                {
                    arr2[index] = arr[i];
                    index++;
                }
            }
            Array.Sort(arr2);
            Array.Reverse(arr2);
            foreach(int i in arr2)
            {
                Console.Write(i+" ");
            }
            Console.WriteLine();
            var brr=from i 
                    in arr 
                    where i>40 
                    orderby i descending 
                    select i;
            foreach(int x in brr)
            {
                Console.Write(x+" ");
            }
            Console.ReadLine();
        }
    }
}
