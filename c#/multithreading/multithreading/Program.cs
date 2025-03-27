using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace multithreading
{
    internal class Program
    {
        static void Method1()
        {
            for(int i=1;i<=100;i++)
            {
                Console.WriteLine("Method 1 :-"+i);
            }
        }
        static void Method2()
        {
            for (int i = 1; i <= 100; i++)
            {
                if (i == 50)
                {
                    Console.WriteLine("Program stoped");
                    Thread.Sleep(5000);
                    Console.WriteLine("Program started again");
                }
                Console.WriteLine("Method 2 :-" + i);
            }
        }
        static void Method3()
        {
            for (int i = 1; i <= 100; i++)
            {
                Console.WriteLine("Method 3 :-" + i);
            }
        }
        static void Main(string[] args)
        {
            Thread t=Thread.CurrentThread;
            t.Name = "Main thread";
            Console.WriteLine("Current thread is:- " +Thread.CurrentThread.Name);
            Method1();
            Method2();
            Method3();
            Console.ReadLine();

        }
    }
}
