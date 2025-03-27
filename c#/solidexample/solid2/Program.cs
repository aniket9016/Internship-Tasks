using System;
using System.Collections.Generic;

namespace SolidExample
{
    interface IEmployee
    {
        decimal CalculateSalary();
    }

    abstract class Employee
    {
        public int EMPId { get; set; }
        public string Name { get; set; }
        public string EMPType { get; set; }

        protected Employee(int id, string name, string type)
        {
            EMPId = id;
            Name = name;
            EMPType = type;
        }

        public virtual void DisplayDetails()
        {
            Console.WriteLine($"EMPId: {EMPId}, Name: {Name}, EMPType: {EMPType}");
        }
    }

    class FullTimeEmp : Employee, IEmployee
    {
        private decimal salary;

        public FullTimeEmp(int id, string name, string type, decimal salary) : base(id, name, type)
        {
            this.salary = salary;
        }

        public decimal CalculateSalary() => salary;
    }

    class Intern : Employee, IEmployee
    {
        private decimal stipend;

        public Intern(int id, string name, string type, decimal stipend) : base(id, name, type)
        {
            this.stipend = stipend;
        }

        public decimal CalculateSalary() => stipend;
    }

    class Contractor : Employee, IEmployee
    {
        private decimal hourlyRate;
        private int hoursWorked;

        public Contractor(int id, string name, string type, decimal hourlyRate, int hoursWorked)
            : base(id, name, type)
        {
            this.hourlyRate = hourlyRate;
            this.hoursWorked = hoursWorked;
        }

        public decimal CalculateSalary() => hourlyRate * hoursWorked;
    }

    class EmployeeReport
    {
        private List<IEmployee> employees = new List<IEmployee>();

        public void AddEmployee(IEmployee employee)
        {
            employees.Add(employee);
        }

        public void GenerateReport()
        {
            Console.WriteLine("\n---- Employee Salary Report ----");
            foreach (var emp in employees)
            {
                if (emp is Employee employee)
                {
                    employee.DisplayDetails();
                    Console.WriteLine($"Salary: {emp.CalculateSalary()}");
                    Console.WriteLine("----------------------------");
                }
            }
        }
    }

    class Program
    {
        static void Main()
        {
            EmployeeReport report = new EmployeeReport();

            while (true)
            {
                Console.Write("Enter EMPID: ");
                int empId = int.Parse(Console.ReadLine());

                Console.Write("Enter EMPName: ");
                string empName = Console.ReadLine();

                Console.Write("Enter EMPType (FullTime/Intern/Contractor): ");
                string empType = Console.ReadLine();

                Employee employee;
                IEmployee empInstance;

                switch (empType)
                {
                    case "FullTime":
                        Console.Write("Enter Salary: ");
                        decimal fSalary = decimal.Parse(Console.ReadLine());
                        employee = new FullTimeEmp(empId, empName, empType, fSalary);
                        empInstance = (IEmployee)employee;
                        break;

                    case "Intern":
                        Console.Write("Enter Stipend: ");
                        decimal stipend = decimal.Parse(Console.ReadLine());
                        employee = new Intern(empId, empName, empType, stipend);
                        empInstance = (IEmployee)employee;
                        break;

                    case "Contractor":
                        Console.Write("Enter Work hours: ");
                        int workHours = int.Parse(Console.ReadLine());

                        Console.Write("Enter Hourly Rate: ");
                        decimal hourlyRate = decimal.Parse(Console.ReadLine());

                        employee = new Contractor(empId, empName, empType, hourlyRate, workHours);
                        empInstance = (IEmployee)employee;
                        break;

                    default:
                        Console.WriteLine("Invalid Employee Type!");
                        continue;
                }

                report.AddEmployee(empInstance);

                Console.Write("Do you want to add another employee? (y/n): ");
                string choice = Console.ReadLine();
                if (choice.ToLower() != "y")
                    break;
            }

            report.GenerateReport();
        }
    }
}
