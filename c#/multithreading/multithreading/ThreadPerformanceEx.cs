using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace multithreading
{
    internal class ThreadPerformanceEx
    {
        static long Count1 = 0;
        static long Count2 = 0;
        public static void IC1()
        {
            for (long i = 0; i <= 100000; i++)
            {
                Count1++;
            }
            Console.WriteLine(Count1);
        }
        public static void IC2()
        {
            for (long i = 0; i <= 100000; i++)
            {
                Count2++;
            }
            Console.WriteLine(Count2);
        }
        public static void Main()
        {
            Stopwatch s1 = new Stopwatch();
            s1.Start();
            IC1();
            IC2();
            s1.Stop();
            Console.WriteLine(s1.ElapsedMilliseconds);
            Console.ReadLine();
        }
    }
}
