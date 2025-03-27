using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library_Management_System
{
    public class Employee
    {
        public string Name { get; set; }
        public int ID { get; set; }
        public decimal Salary { get; protected set; }
        public Department Department { get; set; }
        public Address Address { get; set; }

        public Employee(string name, int id, Address address)
        {
            this.Name= name;
            this.ID= id;
            this.Address = address;
        }

        public virtual void CalculateSalary()
        {
        }

        public override string ToString()
        {
            return $"ID: {ID}, Name: {Name}, Salary: {Salary}, Department: {Department?.Name}, Address: {Address}";
        }
    }

    public class FullTimeEmployee : Employee
    {
        private decimal monthlySalary;

        public FullTimeEmployee(string name, int id, Address address, decimal monthlySalary)
            : base(name, id, address)
        {
            this.monthlySalary = monthlySalary;
            CalculateSalary();
        }

        public override void CalculateSalary()
        {
            this.Salary = monthlySalary;
        }
    }

    public class PartTimeEmployee : Employee
    {
        private decimal hourlyRate;
        private int hoursWorked;

        public PartTimeEmployee(string name, int id, Address address, decimal hourlyRate, int hoursWorked)
            : base(name, id, address)
        {
            this.hourlyRate = hourlyRate;
            this.hoursWorked = hoursWorked;
            CalculateSalary();
        }

        public override void CalculateSalary()
        {
            this.Salary = hourlyRate * hoursWorked;
        }
    }

    public class Department
    {
        public string Name { get; set; }
        public List<Employee> Employees { get; set; } = new List<Employee>();

        public Department(string name)
        {
            this.Name = name;
        }

        public void AddEmployee(Employee employee)
        {
            Employees.Add(employee);
            employee.Department = this;
        }
    }

    public class Address
    {
        public string Street { get; set; }
        public string City { get; set; }

        public Address(string street, string city)
        {
            this.Street = street;
            this.City = city;
        }

        public override string ToString()
        {
            return $"{Street}, {City}";
        }
    }

    public class EmployeeManagementSystem
    {
        private List<Employee> employees = new List<Employee>();

        public void AddEmployee(Employee employee)
        {
            employees.Add(employee);
        }

        public void RemoveEmployee(int id)
        {
            employees.RemoveAll(e => e.ID == id);
        }

        public void ListEmployees()
        {
            if (employees.Count == 0)
            {
                Console.WriteLine("No employees found.\n");
                return;
            }
            foreach (var emp in employees)
            {
                Console.WriteLine(emp);
            }
        }

        public Employee GetEmployeeById(int id)
        {
            return employees.Find(e => e.ID == id);
        }
    }

    class EmployeeEx
    {
        static void Main()
        {
            EmployeeManagementSystem system = new EmployeeManagementSystem();
            Department IT = new Department("IT");
            Department HR = new Department("HR");

            while (true)
            {
                Console.WriteLine("----------------Employee Management System---------------");
                Console.WriteLine("1. Add Employee");
                Console.WriteLine("2. List All Employees");
                Console.WriteLine("3. Remove Employee");
                Console.WriteLine("4. Display Employee Details");
                Console.WriteLine("5. Exit");
                Console.Write("Enter your choice: ");
                string choice = Console.ReadLine();

                switch (choice)
                {
                    case "1":
                        Console.Write("Enter Employee Name: ");
                        string name = Console.ReadLine();

                        Console.Write("Enter Employee ID: ");
                        int id = int.Parse(Console.ReadLine());

                        Console.Write("Enter Employee Street Address: ");
                        string street = Console.ReadLine();

                        Console.Write("Enter Employee City: ");
                        string city = Console.ReadLine();

                        Address address = new Address(street, city);

                        Console.Write("Is the employee Full-Time? (yes/no): ");
                        string type = Console.ReadLine().ToLower();

                        Employee employee;

                        if (type == "yes")
                        {
                            Console.Write("Enter Monthly Salary: ");
                            decimal salary = decimal.Parse(Console.ReadLine());
                            employee = new FullTimeEmployee(name, id, address, salary);
                        }
                        else
                        {
                            Console.Write("Enter Hourly Rate: ");
                            decimal hourlyRate = decimal.Parse(Console.ReadLine());
                            Console.Write("Enter Hours Worked: ");
                            int hoursWorked = int.Parse(Console.ReadLine());
                            employee = new PartTimeEmployee(name, id, address, hourlyRate, hoursWorked);
                        }

                        Console.Write("Assign to Department (IT/HR): ");
                        string dept = Console.ReadLine();
                        if (dept == "IT")
                            IT.AddEmployee(employee);
                        else
                            HR.AddEmployee(employee);

                        system.AddEmployee(employee);
                        Console.WriteLine("Employee added successfully!\n");
                        break;

                    case "2":
                        Console.WriteLine("\nList of Employees:");
                        system.ListEmployees();
                        break;

                    case "3":
                        Console.Write("Enter Employee ID to Remove: ");
                        int removeId = int.Parse(Console.ReadLine());
                        system.RemoveEmployee(removeId);
                        Console.WriteLine("Employee removed successfully!\n");
                        break;

                    case "4":
                        Console.Write("Enter Employee ID to Display: ");
                        int displayId = int.Parse(Console.ReadLine());
                        Employee foundEmployee = system.GetEmployeeById(displayId);
                        if (foundEmployee != null)
                        {
                            Console.WriteLine("\nEmployee Details:");
                            Console.WriteLine(foundEmployee);

                        }
                        else
                        {
                            Console.WriteLine("Employee not found.\n");
                        }
                        break;

                    case "5":
                        Console.WriteLine("Exiting system...");
                        return;

                    default:
                        Console.WriteLine("Invalid option. Please try again.");
                        break;
                }
            }
        }
    }
}