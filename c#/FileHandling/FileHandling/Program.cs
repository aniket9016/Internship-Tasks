using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileHandling
{
    internal class Program
    {
        static void Main()
        {
            //1st
            //string FilePath = @"E:\aniket\c#\fileHandlingFiles\first.txt";
            //FileStream fs = new FileStream(FilePath,FileMode.Create);
            //fs.Close();
            //Console.WriteLine("File created with path E:\\aniket\\c#\\fileHandlingFiles\\first.txt");
            //Console.ReadLine();
            //2nd
            //string FilePath = @"E:\aniket\c#\fileHandlingFiles\first.txt";
            //FileStream fs = new FileStream(FilePath, FileMode.Append);
            //byte[] bytedata= Encoding.Default.GetBytes("C# is an object oriented programming");
            //fs.Write(bytedata, 0, bytedata.Length);
            //fs.Close();
            //Console.WriteLine("Successfully saved file with data : C# Is an Object Oriented Programming Language");
            //Console.ReadLine();
            //3rd
            //string data,FilePath = @"E:\aniket\c#\fileHandlingFiles\first.txt";
            //FileStream fs = new FileStream(FilePath, FileMode.Open,FileAccess.Read);
            //using (StreamReader sr = new StreamReader(fs)) 
            //{ 
            //    data=sr.ReadToEnd(); 
            //}
            //Console.WriteLine(data);
            //Console.ReadLine();
            StreamWriter sw = new StreamWriter("E://aniket/c#/fileHandlingFiles/second.txt");
            Console.WriteLine("Enter text to add");
            string id=Console.ReadLine();
            sw.Write(id);
            Console.WriteLine("Data added in file");
            sw.Flush();
            sw.Close();
            Console.ReadLine();
        }
    }
}
