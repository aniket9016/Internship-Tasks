using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Generic_NonGenericCollection
{
    internal class QueueEx
    {
        public static void Main()
        {
            Console.WriteLine("----------------int queue--------------");
            Queue<int> que=new Queue<int>();
            que.Enqueue(10);
            que.Enqueue(20);
            que.Enqueue(30);
            que.Enqueue(40);
            que.Enqueue(50);
            Console.WriteLine("----------------enqueue elements--------------");
            Console.WriteLine("No of elements in queue:- {0}",que.Count);
            foreach (var i in que)
            {
                Console.WriteLine(i);
            }
            que.Dequeue();
            que.Dequeue();
            Console.WriteLine("----------------After dequeue 2 elements--------------");
            Console.BackgroundColor = ConsoleColor.Blue;
            Console.WriteLine("No of elements in queue:- {0}", que.Count);
            foreach (var i in que)
            {
                Console.WriteLine(i);
            }
            Console.BackgroundColor = ConsoleColor.Red;
            Console.WriteLine("----------------After clearing --------------");
            que.Clear();
            Console.WriteLine("No of elements in queue:- {0}", que.Count);
            foreach (var i in que)
            {
                Console.WriteLine(i);
            }
            Console.WriteLine("----------------String queue--------------");
            var strque = new Queue<string>();
            strque.Enqueue("Aniket");
            strque.Enqueue("Suraj");
            strque.Enqueue("Vishal");
            strque.Enqueue("Mayank");
            strque.Enqueue("Satyam");
            strque.Enqueue("Shahil");
            Console.WriteLine("----------------enqueue elements--------------");
            Console.WriteLine("No of elements in queue:-{0} ", strque.Count);
            foreach (var i in strque)
            {
                Console.WriteLine(i);
            }
            strque.Dequeue();
            strque.Dequeue();
            Console.WriteLine("----------------After dequeue 2 elements--------------");
            Console.BackgroundColor = ConsoleColor.Blue;
            Console.WriteLine("No of elements in queue:- {0}", strque.Count);
            foreach (var i in strque)
            {
                Console.WriteLine(i);
            }
            Console.BackgroundColor = ConsoleColor.Red;
            Console.WriteLine("----------------After clearing --------------");
            strque.Clear();
            Console.WriteLine("No of elements in queue:- {0}", strque.Count);
            foreach (var i in strque)
            {
                Console.WriteLine(i);
            }

            Console.ReadLine();
        }
    }
}
