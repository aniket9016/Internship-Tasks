using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PracticalTest
{
    class Employee
    {
        public static int TotalEmployees = 0;
        private static int nextId = 1001;
        readonly int id;
        private string name;
        private string department;
        private double salary;

        public int Id { get => id; }
        public string Name { get => name; set => name = value; }
        public string Department
        {
            get => department;
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    Console.WriteLine("Department name cannot be empty. Please enter a valid department.");
                    department = "Unknown";
                }
                else
                {
                    department = value;
                }
            }
        }
        public double Salary
        {
            get => salary;
            set
            {
                if (value < 0)
                {
                    Console.WriteLine("Salary cannot be negative. Setting salary to 0.");
                    salary = 0;
                }
                else
                {
                    salary = value;
                }
            }
        }

        public Employee(string name, string department, double salary)
        {
            this.id = nextId++;
            Name = name;
            Department = department;
            Salary = salary;
            TotalEmployees++;
        }

        public virtual void DisplayDetails()
        {
            Console.WriteLine($"ID: {Id}, Name: {Name}, Department: {Department}, Salary: {Salary}");
        }
    }

    class Manager : Employee
    {
        public int TeamSize { get; set; }

        public Manager(string name, string department, double salary, int teamSize)
            : base(name, department, salary)
        {
            TeamSize = teamSize;
        }

        public override void DisplayDetails()
        {
            base.DisplayDetails();
            Console.WriteLine($"Team Size: {TeamSize}");
        }
    }

    class Developer : Employee
    {
        public List<string> ProgrammingLanguages { get; set; }

        public Developer(string name, string department, double salary, List<string> programmingLanguages)
            : base(name, department, salary)
        {
            ProgrammingLanguages = programmingLanguages;
        }

        public override void DisplayDetails()
        {
            base.DisplayDetails();
            Console.WriteLine($"Programming Languages: {string.Join(", ", ProgrammingLanguages)}");
        }
    }

    class EmployeeManagementSystem
    {
        readonly List<Employee> employees = new List<Employee>();

        public void AddEmployee(Employee employee)
        {
            employees.Add(employee);
        }

        public bool RemoveEmployee(int empId)
        {
            Employee employee = employees.Find(e => e.Id == empId);
            if (employee != null)
            {
                employees.Remove(employee);
                Employee.TotalEmployees--;
                return true;
            }
            return false;
        }

        public bool UpdateEmployee(int empId)
        {
            Employee employee = employees.Find(e => e.Id == empId);
            if (employee != null)
            {
                Console.Write("Enter new Name (press Enter to skip): ");
                string name = Console.ReadLine();
                if (!string.IsNullOrEmpty(name)) employee.Name = name;

                Console.Write("Enter new Department (press Enter to skip): ");
                string department = Console.ReadLine();
                if (!string.IsNullOrEmpty(department)) employee.Department = department;

                Console.Write("Enter new Salary (press Enter to skip): ");
                string salaryInput = Console.ReadLine();
                if (!string.IsNullOrEmpty(salaryInput) && double.TryParse(salaryInput, out double salary) && salary >= 0)
                {
                    employee.Salary = salary;
                }

                if (employee is Manager manager)
                {
                    Console.Write("Enter new Team Size (press Enter to skip): ");
                    string teamSizeInput = Console.ReadLine();
                    if (!string.IsNullOrEmpty(teamSizeInput) && int.TryParse(teamSizeInput, out int teamSize))
                    {
                        manager.TeamSize = teamSize;
                    }
                }
                else if (employee is Developer developer)
                {
                    Console.Write("Enter new Programming Languages (comma-separated, press Enter to skip): ");
                    string languagesInput = Console.ReadLine();
                    if (!string.IsNullOrEmpty(languagesInput))
                    {
                        developer.ProgrammingLanguages = new List<string>(languagesInput.Split(','));
                    }
                }
                return true;
            }
            return false;
        }

        public void DisplayAllEmployees()
        {
            foreach (var emp in employees)
            {
                Console.WriteLine("------------------------------------------------------");
                emp.DisplayDetails();
            }
            Console.WriteLine("------------------------------------------------------");
            Console.WriteLine($"Total Employees: {Employee.TotalEmployees}");
        }
    }

    class Practical1
    {
        static void Main()
        {
            EmployeeManagementSystem system = new EmployeeManagementSystem();

            while (true)
            {
                Console.WriteLine("------------------------------------------------------");
                Console.WriteLine("1. Add Employee\n2. Remove Employee\n3. Update Employee\n4. Display All Employees\n5. Exit");
                Console.Write("Enter your choice: ");
                int choice = int.Parse(Console.ReadLine());

                if (choice == 1)
                {
                    Console.Write("Enter Name: ");
                    string name = Console.ReadLine();
                    Console.Write("Enter Department: ");
                    string department = Console.ReadLine();

                    while (string.IsNullOrEmpty(department))
                    {
                        Console.Write("Department cannot be empty. Enter Department again: ");
                        department = Console.ReadLine();
                    }

                    Console.Write("Enter Salary: ");
                    double salary;
                    while (!double.TryParse(Console.ReadLine(), out salary) || salary < 0)
                    {
                        Console.Write("Invalid salary. Enter a positive number: ");
                    }

                    Console.Write("Enter Type (Manager/Developer): ");
                    string type = Console.ReadLine();

                    if (type.ToLower() == "manager")
                    {
                        Console.Write("Enter Team Size: ");
                        int teamSize = int.Parse(Console.ReadLine());
                        system.AddEmployee(new Manager(name, department, salary, teamSize));
                    }
                    else if (type.ToLower() == "developer")
                    {
                        Console.Write("Enter Programming Languages (comma-separated): ");
                        List<string> languages = new List<string>(Console.ReadLine().Split(','));
                        system.AddEmployee(new Developer(name, department, salary, languages));
                    }
                }
                else if (choice == 2)
                {
                    Console.Write("Enter Employee ID to Remove: ");
                    int id = int.Parse(Console.ReadLine());
                    system.RemoveEmployee(id);
                }
                else if (choice == 3)
                {
                    Console.Write("Enter Employee ID to Update: ");
                    int id = int.Parse(Console.ReadLine());
                    system.UpdateEmployee(id);
                }
                else if (choice == 4)
                {
                    system.DisplayAllEmployees();
                }
                else if (choice == 5)
                {
                    break;
                }
            }
        }
    }
}