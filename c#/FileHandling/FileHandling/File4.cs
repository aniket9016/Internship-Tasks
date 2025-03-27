using System;
using System.IO;
namespace FileHandlinDemo
{
    class File4
    {
        static void Main()
        {
            string filePath = "D://MyFile.txt";

            StreamReader streamReader = new StreamReader(filePath);

            Console.WriteLine("Content of the File");
            streamReader.BaseStream.Seek(0, SeekOrigin.Begin);
            string strData = streamReader.ReadLine();
            while (strData != null)
            {
                Console.WriteLine(strData);
                strData = streamReader.ReadLine();
            }
            Console.ReadLine();
            streamReader.Close();
            Console.ReadKey();
        }
    }
}