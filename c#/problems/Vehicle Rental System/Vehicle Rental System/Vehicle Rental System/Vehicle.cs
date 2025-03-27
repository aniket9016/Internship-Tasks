using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vehicle_Rental_System
{
    public abstract class Vehicle
    {     
        public abstract void CalculateRentalCost(int price, int hour,int age,string licensenumber);
        
    }
    public class Car : Vehicle
    {
        public Car(int age) 
        {
            if(age<18)
            {
                Console.WriteLine("Age must be above 18");
            }
        }
        public override void CalculateRentalCost(int price,int hour,int age, string licensenumber)
        {
            Console.WriteLine("Rental cost price of car is: "+price*hour);
        }
    }
    public class Bike : Vehicle
    {
        public Bike(int age)
        {
            if (age < 18)
            {
                Console.WriteLine("Age must be above 18");
            }
        }
        public override void CalculateRentalCost(int price, int hour, int age, string licensenumber)
        {
            Console.WriteLine("Rental cost price of bike is: " + price * hour);
        }
    }
    public class Truck : Vehicle
    {

        public Truck(int age,string comerciallicensenumber)
        {
            if (age < 18)
            {
                Console.WriteLine("Age must be above 18");
            }else if(comerciallicensenumber=="")
            {
                Console.WriteLine("User must contain commercial driving license");
            }
        }
        public override void CalculateRentalCost(int price, int hour, int age, string licensenumber)
        {
            Console.WriteLine("Rental cost price of Truck is: " + price * hour);
        }
    }
    public class MainClass
    {
        static void Main(string[] args)
        {
            Car c = new Car(18);
            Bike b = new Bike(19);
            Truck t = new Truck(20,"LW6920");
            c.CalculateRentalCost(100,8,18,"ABCD9090");
            b.CalculateRentalCost(200, 5, 18, "ABCD9090");
            t.CalculateRentalCost(300, 20, 18, "ABCD9090");
            Console.ReadLine();
        }
    }
}
