using System;
using System.IO;
namespace FileHandlinDemo
{
    class File3
    {
        static void Main(string[] args)
        {
            string filePath = @"D:\MyFile.txt";
            int a, b, result;
            a = 15;
            b = 20;
            result = a + b;
            using (StreamWriter streamWriter = new StreamWriter(filePath))
            {
                streamWriter.Write($"Sum of {a} + {b} = {result}");
            }
            Console.WriteLine("Variable Data is Saved into the File");
            Console.ReadKey();
        }
    }
}