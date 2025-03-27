using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace arrayexample
{
    internal class MyLinqQuery
    {
        public static void Main()
        {
            //string[] names = { "Bill", "Steve", "James", "Mohan" };
            //var myLinqQuery = from name in names
            //                  where name.Contains('e')
            //                  select name;
            //foreach (var name in myLinqQuery)
            //    Console.Write(name + " ");

            //Console.ReadLine();
            IList<Student> studentList = new List<Student>() {
                new Student() { StudentID = 1, StudentName = "John", Age = 13} ,
                new Student() { StudentID = 2, StudentName = "Moin",  Age = 21 } ,
                new Student() { StudentID = 3, StudentName = "Bill",  Age = 18 } ,
                new Student() { StudentID = 4, StudentName = "Ram" , Age = 20} ,
                new Student() { StudentID = 5, StudentName = "Ron" , Age = 15 }
            };

            // LINQ Query Syntax to find out teenager students
            var teenAgerStudent = from s in studentList
                                  where s.Age > 12 && s.Age < 20
                                  select s;
            Console.WriteLine("Teen age Students:");

            foreach (Student std in teenAgerStudent)
            {
                Console.WriteLine("id: {0}, name: {1}, age: {2} ",std.StudentID,std.StudentName,std.Age);
            }
            Console.ReadLine();
        }
    }
    public class Student
    {

        public int StudentID { get; set; }
        public string StudentName { get; set; }
        public int Age { get; set; }

    }
}
