using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileHandling
{
    internal class File6
    {
        static void Main()
        {
            string filePath = @"D:\MyTextFile.txt";
            using (StreamWriter streamWriter = new StreamWriter(filePath))
            {
                streamWriter.WriteLine("Welcome to DotNetTutorials");
                streamWriter.WriteLine("You are Learning File Handling in C#");
            }
            Console.WriteLine("\nReading Approach 1: using ReadToEnd Method");
            using (StreamReader reader = new StreamReader(filePath))
            {
                Console.WriteLine(reader.ReadToEnd());
            }
            Console.WriteLine("\nReading Approach 2: using ReadLine Method");
            StreamReader streamReader = new StreamReader(filePath);
            streamReader.BaseStream.Seek(0, SeekOrigin.Begin);
            string strData = streamReader.ReadLine();
            while (strData != null)
            {
                Console.WriteLine(strData);
                strData = streamReader.ReadLine();
            }
            Console.ReadKey();
        }
    }
}
