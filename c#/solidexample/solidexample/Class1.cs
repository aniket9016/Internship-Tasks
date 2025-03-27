/*using System;
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
        public decimal Salary { get; }

        public FullTimeEmp(int id, string name, decimal salary)
            : base(id, name, "FullTime")
        {
            Salary = salary;
        }

        public override decimal CalculateSalary() => Salary;
    }

    class Intern : Employee
    {
        public decimal Stipend { get; }

        public Intern(int id, string name, decimal stipend)
            : base(id, name, "Intern")
        {
            Stipend = stipend;
        }

        public override decimal CalculateSalary() => Stipend;
    }

    class Contractor : Employee
    {
        public decimal HourlyRate { get; }
        public int HoursWorked { get; }

        public Contractor(int id, string name, decimal hourlyRate, int hoursWorked)
            : base(id, name, "Contractor")
        {
            HourlyRate = hourlyRate;
            HoursWorked = hoursWorked;
        }

        public override decimal CalculateSalary() => HourlyRate * HoursWorked;
    }

    // Factory Interface
    interface IEmployeeFactory
    {
        Employee CreateEmployee();
    }

    // Full-Time Employee Factory
    class FullTimeEmpFactory : IEmployeeFactory
    {
        public Employee CreateEmployee()
        {
            Console.Write("Enter EMPID: ");
            int empId = int.Parse(Console.ReadLine());

            Console.Write("Enter EMPName: ");
            string empName = Console.ReadLine();

            Console.Write("Enter Salary: ");
            decimal salary = decimal.Parse(Console.ReadLine());

            return new FullTimeEmp(empId, empName, salary);
        }
    }

    // Intern Factory
    class InternFactory : IEmployeeFactory
    {
        public Employee CreateEmployee()
        {
            Console.Write("Enter EMPID: ");
            int empId = int.Parse(Console.ReadLine());

            Console.Write("Enter EMPName: ");
            string empName = Console.ReadLine();

            Console.Write("Enter Stipend: ");
            decimal stipend = decimal.Parse(Console.ReadLine());

            return new Intern(empId, empName, stipend);
        }
    }

    // Contractor Factory
    class ContractorFactory : IEmployeeFactory
    {
        public Employee CreateEmployee()
        {
            Console.Write("Enter EMPID: ");
            int empId = int.Parse(Console.ReadLine());

            Console.Write("Enter EMPName: ");
            string empName = Console.ReadLine();

            Console.Write("Enter Work Hours: ");
            int workHours = int.Parse(Console.ReadLine());

            Console.Write("Enter Hourly Rate: ");
            decimal hourlyRate = decimal.Parse(Console.ReadLine());

            return new Contractor(empId, empName, hourlyRate, workHours);
        }
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
        public static Dictionary<string, IEmployeeFactory> employeeFactories = new Dictionary<string, IEmployeeFactory>
        {
            { "FullTime", new FullTimeEmpFactory() },
            { "Intern", new InternFactory() },
            { "Contractor", new ContractorFactory() }
        };

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
            Console.Write("Enter EMPType (FullTime/Intern/Contractor): ");
            string empType = Console.ReadLine();

            if (employeeFactories.ContainsKey(empType))
            {
                Employee employee = employeeFactories[empType].CreateEmployee();
                report.AddEmployee(employee);
                Console.WriteLine("Employee added successfully.");
            }
            else
            {
                Console.WriteLine("Invalid Employee Type! Try again.");
            }
        }
    }
}
*/