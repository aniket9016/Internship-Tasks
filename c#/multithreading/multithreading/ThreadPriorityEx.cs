using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace multithreading
{
    internal class ThreadPriorityEx
    {
        static long Count1, Count2;
        public static void IncrementCount1() 
        {
            while (true)
            {
                Count1++; 
                //Console.WriteLine(Count1 + " ");
            }
        }
        public static void IncrementCount2() 
        {
            while (true)
            {
                Count2++; 
                //Console.WriteLine(Count2 + " ");
            }
        }
        public static void Main() 
        {
            Thread t1 = new Thread(IncrementCount1);
            Thread t2 = new Thread(IncrementCount2);

            t1.Priority = ThreadPriority.Lowest;
            t1.Priority = ThreadPriority.Highest;
            t1.Start();
            t2.Start();
            Console.WriteLine("------Main thread is going to sleep---------");
            Thread.Sleep(5000);
            Console.WriteLine("------Main thread is going to woke up---------");
            t1.Abort();
            t2.Abort();
            t1.Join();
            t2.Join();
            Console.WriteLine("value of count1:-"+Count1);
            Console.WriteLine("value of count2:-"+Count2);
            Console.ReadLine();
        }
    }
}
