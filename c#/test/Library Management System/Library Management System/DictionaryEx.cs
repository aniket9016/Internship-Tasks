using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library_Management_System
{
    internal class DictionaryEx
    {
        static void Main()
        {
            int[] array = { 0, 1, 1, 1, 2, 3, 2, 2, 0, 2, 2, 3, 1 };
            Dictionary<int, int> freqDict = new Dictionary<int, int>();
            foreach (int num in array)
            {
                if (freqDict.ContainsKey(num))
                    freqDict[num]++;
                else
                    freqDict[num] = 1;
            }
            Array.Sort(array, (a, b) =>
            {
                int freqCompare = freqDict[b].CompareTo(freqDict[a]);
                if (freqCompare != 0)
                    return freqCompare;
                return a.CompareTo(b);
            });
            Console.WriteLine(string.Join(", ", array));
            Console.ReadLine();
        }
    }
}

