using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Generic_NonGenericCollection
{
    internal class StackEx
    {
        public static void Main()
        {
            Console.WriteLine("-----------int stack--------------------");
            var mystack=new Stack<int>();
            mystack.Push(1);
            mystack.Push(2);
            mystack.Push(3);
            mystack.Push(4);
            mystack.Push(5);
            mystack.Push(6);
            mystack.Push(7);
            mystack.Push(8);
            foreach(var i in mystack)
            {
                Console.WriteLine(i);
            }
            Console.WriteLine("-----------------After poping last 3 elements--------------");
            Console.BackgroundColor = ConsoleColor.Blue;
            mystack.Pop();
            mystack.Pop();
            mystack.Pop();
            foreach (var i in mystack)
            {
                Console.WriteLine(i);
            }
            Console.BackgroundColor = ConsoleColor.Magenta;
            Console.WriteLine("---top element");
            Console.WriteLine(mystack.Peek());

            Console.WriteLine("---no of element");
            Console.WriteLine(mystack.Count());
            Console.BackgroundColor = ConsoleColor.Red;
            Console.WriteLine("-----------------After clear--------------");
            mystack.Clear();
            foreach (var i in mystack)
            {
                Console.WriteLine(i);
            }
            Console.WriteLine("-----------string stack--------------------");
            var strStack = new Stack<string>();
            strStack.Push("Suraj");
            strStack.Push("Vishal");
            strStack.Push("Aniket");
            strStack.Push("Manish");
            strStack.Push("Satyam");
            strStack.Push("Rohit");
            strStack.Push("Harshang");
            strStack.Push("Mayank");
            foreach (var i in strStack)
            {
                Console.WriteLine(i);
            }
            Console.WriteLine("-----------------After poping last 3 elements--------------");
            Console.BackgroundColor = ConsoleColor.Blue;
            strStack.Pop();
            strStack.Pop();
            strStack.Pop();
            foreach (var i in strStack)
            {
                Console.WriteLine(i);
            }
            Console.BackgroundColor = ConsoleColor.Magenta;
            Console.WriteLine("---top element");
            Console.WriteLine(strStack.Peek());

            Console.WriteLine("---no of element");
            Console.WriteLine(strStack.Count());
            Console.BackgroundColor = ConsoleColor.Red;
            Console.WriteLine("-----------------After clear--------------");
            strStack.Clear();
            foreach (var i in strStack)
            {
                Console.WriteLine(i);
            }
            Console.ReadLine();
        }
    }
}
