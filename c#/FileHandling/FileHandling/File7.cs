using System;
using System.IO;
namespace FileHandling
{
    class File7
    {
        static void Main()
        {
            string FilePath = @"D:\MyFile.txt";
            if (File.Exists(FilePath))
            {
                string[] lines = File.ReadAllLines(FilePath);
                foreach (var line in lines)
                {
                    Console.WriteLine(line);
                }
            }
            else
            {
                Console.WriteLine("MyFile.txt File Does Not Exist in D Directory");
            }
            Console.ReadKey();
        }
    }
}