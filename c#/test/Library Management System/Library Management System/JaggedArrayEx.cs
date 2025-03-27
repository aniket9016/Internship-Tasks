using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library_Management_System
{
    internal class JaggedArrayEx
    {
        static void Main(string[] args)
        {
            Console.Write("Enter the number of students: ");
            int studentCount = int.Parse(Console.ReadLine());
            int[][] studentMarks = new int[studentCount][];
            for (int i = 0; i < studentCount; i++)
            {
                Console.Write($"Enter the number of subjects for student {i + 1}: ");
                int subjectCount = int.Parse(Console.ReadLine());
                studentMarks[i] = new int[subjectCount];

                Console.WriteLine($"Enter the marks for student {i + 1}:");
                for (int j = 0; j < subjectCount; j++)
                {
                    Console.Write($"Subject {j + 1}: ");
                    studentMarks[i][j] = int.Parse(Console.ReadLine());
                }
            }
            Console.WriteLine("\nStudent Marks Summary:");
            int studentIndex = 1;
            foreach (var marks in studentMarks)
            {
                Console.WriteLine($"Student {studentIndex}:");
                Console.WriteLine("Marks: ");
                foreach (var mark in marks)
                {
                    Console.Write(mark + " ");
                }
                Console.WriteLine();
                studentIndex++;
            }
            studentIndex = 1;
            foreach (var marks in studentMarks)
            {
                int totalMarks = 0;
                foreach (var mark in marks)
                {
                    totalMarks += mark;
                }

                double averageMarks = (double)totalMarks / marks.Length;
                Console.WriteLine($"Student {studentIndex} - Total Marks: {totalMarks}, Average Marks: {averageMarks:F2}");
                studentIndex++;
            }
            Console.ReadLine();
        }
    }
}
