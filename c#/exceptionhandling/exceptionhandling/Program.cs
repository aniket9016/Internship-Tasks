using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace nsp
{
    public class DivideByOddNumberException:ApplicationException
    {
        public override string Message
        {
            get
            {
                return "Attemped to divide by odd number";
            }
        }
    }
}

namespace exceptionhandling
{
    internal class Program: ApplicationException
    {
        public static void Main(string[] args)
        {
                Console.Write("Enter a number: ");
                double x = double.Parse(Console.ReadLine());
                Console.Write("Enter another number: ");
                double y = double.Parse(Console.ReadLine());
                if (y % 2 == 0)
                {
                    //throw new ApplicationException("Divide by odd number");
                    throw new nsp.DivideByOddNumberException();
                    
                }
                double z = x / y;
                Console.WriteLine("Result is : " + z);
            /*
            try
            {
            }
            catch (DivideByZeroException ex1)
            {
                Console.WriteLine(ex1.Message);
            }
            catch (FormatException ex2)
            {
                Console.WriteLine(ex2.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                Console.WriteLine("Finally block executed");
            }*/
            Console.WriteLine("End of program");
            Console.ReadLine();
        }
    }
}
