using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace multithreading
{
    internal class JoinExample
    {
        static void Method1()
        {
            for (int i = 1; i <= 50; i++)
            {
                Console.WriteLine("Method 1 :-" + i);
            }
            Console.WriteLine("-----------Exiting thread 1-----------");
        }
        static void Method2()
        {
            for (int i = 1; i <= 50; i++)
            {
                if (i == 25)
                {
                    Console.WriteLine("Thread 2 is going to sleep");
                    Thread.Sleep(5000);
                    Console.WriteLine("Thread 2 woke up");
                }
                Console.WriteLine("Method 2 :-" + i);
            }
            Console.WriteLine("-----------Exiting thread 2-----------");
        }
        static void Method3()
        {
            for (int i = 1; i <= 50; i++)
            {
                Console.WriteLine("Method 3 :-" + i);
            }
            Console.WriteLine("-----------Exiting thread 3-----------");
        }
        static void Main(string[] args)
        {
            Thread t1 = new Thread(Method1);
            Thread t2 = new Thread(Method2);
            Thread t3 = new Thread(Method3);
            t1.Start();
            t2.Start();
            t3.Start();
            t1.Join();
            t2.Join();
            t3.Join();
            Console.WriteLine("----Exiting main thread--------------");
            Console.ReadLine();
        }
    }
}
