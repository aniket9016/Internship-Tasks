using System;
using System.Collections.Generic;

namespace solidexample
{
    interface IEmployee
    {
        decimal CalculateSalary();
        void DisplayDetails();
    }

    abstract class Employee : IEmployee
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

        public abstract decimal CalculateSalary();
    }

    class FullTimeEmp : Employee
    {
        public decimal salary;

        public FullTimeEmp(int id, string name, decimal salary)
            : base(id, name, "FullTime")
        {
            this.salary = salary;
        }

        public override decimal CalculateSalary() => salary;
    }

    class Intern : Employee
    {
        public decimal stipend;

        public Intern(int id, string name, decimal stipend)
            : base(id, name, "Intern")
        {
            this.stipend = stipend;
        }

        public override decimal CalculateSalary() => stipend;
    }

    class Contractor : Employee
    {
        public decimal hourlyRate;
        public int hoursWorked;

        public Contractor(int id, string name, decimal hourlyRate, int hoursWorked)
            : base(id, name, "Contractor")
        {
            this.hourlyRate = hourlyRate;
            this.hoursWorked = hoursWorked;
        }

        public override decimal CalculateSalary() => hourlyRate * hoursWorked;
    }

    class EmployeeReport
    {
        public List<IEmployee> employees = new List<IEmployee>();

        public void AddEmployee(IEmployee employee)
        {
            employees.Add(employee);
        }

        public void DisplayAllEmployees()
        {
            if (employees.Count == 0)
            {
                Console.WriteLine("\nNo employees added yet.");
                return;
            }

            Console.WriteLine("\n---- Employee List ----");
            foreach (var emp in employees)
            {
                emp.DisplayDetails();
                Console.WriteLine("----------------------");
            }
        }

        public void GenerateReport()
        {
            if (employees.Count == 0)
            {
                Console.WriteLine("\nNo employees to generate a report.");
                return;
            }

            Console.WriteLine("\n---- Employee Salary Report ----");
            foreach (var emp in employees)
            {
                emp.DisplayDetails();
                Console.WriteLine($"Salary: {emp.CalculateSalary()}");
                Console.WriteLine("----------------------------");
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
                Console.WriteLine("\nEmployee Management System");
                Console.WriteLine("1. Add Employee");
                Console.WriteLine("2. Display All Employees");
                Console.WriteLine("3. Generate Salary Report");
                Console.WriteLine("4. Exit");
                Console.Write("Choose an option: ");

                string option = Console.ReadLine();

                switch (option)
                {
                    case "1":
                        AddEmployee(report);
                        break;
                    case "2":
                        report.DisplayAllEmployees();
                        break;
                    case "3":
                        report.GenerateReport();
                        break;
                    case "4":
                        Console.WriteLine("Exiting the system...");
                        return;
                    default:
                        Console.WriteLine("Invalid option. Please try again.");
                        break;
                }
            }
        }

        static void AddEmployee(EmployeeReport report)
        {
            Console.Write("\nEnter EMPID: ");
            int empId = int.Parse(Console.ReadLine());

            Console.Write("Enter EMPName: ");
            string empName = Console.ReadLine();

            Console.Write("Enter EMPType (FullTime/Intern/Contractor): ");
            string empType = Console.ReadLine();

            Employee employee;

            switch (empType)
            {
                case "FullTime":
                    Console.Write("Enter Salary: ");
                    decimal fSalary = decimal.Parse(Console.ReadLine());
                    employee = new FullTimeEmp(empId, empName, fSalary);
                    break;

                case "Intern":
                    Console.Write("Enter Stipend: ");
                    decimal stipend = decimal.Parse(Console.ReadLine());
                    employee = new Intern(empId, empName, stipend);
                    break;

                case "Contractor":
                    Console.Write("Enter Work hours: ");
                    int workHours = int.Parse(Console.ReadLine());

                    Console.Write("Enter Hourly Rate: ");
                    decimal hourlyRate = decimal.Parse(Console.ReadLine());

                    employee = new Contractor(empId, empName, hourlyRate, workHours);
                    break;

                default:
                    Console.WriteLine("Invalid Employee Type! Try again.");
                    return;
            }

            report.AddEmployee(employee);
            Console.WriteLine("Employee added successfully.");
        }
    }
}
