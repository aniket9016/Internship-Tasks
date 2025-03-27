using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileHandling
{
    internal class File5
    {
        static void Main()
        {
            string filePath = "D://MyFile.txt";
            StreamReader streamReader = new StreamReader(filePath);
            Console.WriteLine("Content of the File");
            using (streamReader)
            {
                Console.WriteLine(streamReader.ReadToEnd());
            }

            Console.ReadKey();
        }
    }
}
