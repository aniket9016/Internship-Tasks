using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace collectionexample2
{
    class Customer:IComparable<Customer>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public double Salary { get; set; }

        public int CompareTo(Customer other)
        {
            if(this.Id>other.Id)
                return 1;
            else if(this.Id<other.Id) 
                return -1;
            else return 0;
        }
    }
    class MainClass
    {
        static void Main()
        {
            Customer c1 = new Customer { Id =1001,Name="Suraj",City="Kim",Salary=25000};
            Customer c2 = new Customer { Id =1002,Name="Aniket",City="Surat",Salary=35000};
            Customer c3 = new Customer { Id =1003,Name="Vishal",City="Kim",Salary=30000};
            Customer c4 = new Customer { Id =1004,Name="Vatsal",City="Surat",Salary=15000};
            Customer c5 = new Customer { Id =1005,Name="Pritesh",City="Surat",Salary=10000};
            List<Customer> list = new List<Customer>() { c1,c2,c3,c4,c5};
            list.Sort();
            foreach (Customer c in list)
            {
                Console.WriteLine("ID : {0} Name: {1} City: {2} Salary: {3}",c.Id,c.Name,c.City,c.Salary);
            }
            Console.ReadLine();
        }

    }

}
