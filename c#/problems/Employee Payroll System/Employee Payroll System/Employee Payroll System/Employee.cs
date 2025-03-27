using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employee_Payroll_System
{
    public class Employee
    {
        public int ID;
        public string Name;
        public string Email;
        public string Gender;
        public string Hobby;
        public double Mobile;
        public Employee()
        {
            ID = 101;
            Name = "Rohan";
            Email = "Rohan@gmail.com";
            Gender = "Male";
            Hobby = "Chess";
            Mobile = 7878745784;
        }

        public void ShowDetails()
        {
            Console.WriteLine("Employee Detail:-\nID Name Email Gender Hobbies Mobile \n");
            Console.WriteLine( ID + " " + Name + " " + Email + " " + Gender + " " + Hobby + " " + Mobile);
        }

    }
    public class Manager : Employee
    {
        public double bonus;
        public Manager()
        {
            ID = 101;
            Name = "Rohan";
            Email = "Rohan@gmail.com";
            Gender = "Male";
            Hobby = "Travelling";
            Mobile = 7878745784;
            bonus = 500;
        }
        public new void ShowDetails()
        {
            Console.WriteLine("\nEmployee Detail:-\nID Name Email Gender Hobbies Mobile Bonus\n");
            Console.WriteLine(ID + " " + Name + " " + Email + " " + Gender + " " + Hobby + " " + Mobile+" "+bonus);
        }

    }
    class MainClass
    {
        static void Main(string[] args)
        {
            Employee e = new Employee();
            e.ShowDetails();
            Manager m= new Manager();
            m.ShowDetails();
            Console.ReadLine();
        }
    }
}
