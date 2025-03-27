using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace arrayexample
{
    internal class LINQEx
    {
        public static void Main()
        {
            List<int> list = new List<int>() { 10,20,30,40,500,60,87,86,98};
            List<string> LS = new List<string>() { "one","two",null,"three","four"};
            List<string> emptylist = new List<string>() ;
            List<Student1> emptylistStudent1 = new List<Student1>() ;
            List<string> singlelist = new List<string>() { "one"} ;
            Console.WriteLine("Element at 10 in int list : {0}",list.ElementAt(5));
            Console.WriteLine("Element at 10 in string list : {0}",list.ElementAtOrDefault(10));
            Console.WriteLine("First value in int list : {0}",list.FirstOrDefault());
            Console.WriteLine("First value in string list : {0}",LS.FirstOrDefault());
            Console.WriteLine("First value in empty list : {0}",emptylist.FirstOrDefault());
            Console.WriteLine("Last value in int list : {0}", list.Last());
            Console.WriteLine("Last value in string list : {0}", LS.LastOrDefault());
            Console.WriteLine("Last value in empty list : {0}", emptylist.LastOrDefault());
            Console.WriteLine("Single list : {0}", singlelist.Single());
            Console.WriteLine("Empty single list element: {0}", emptylist.SingleOrDefault());
            Console.WriteLine("Sequence equals: {0}", emptylist.SequenceEqual(singlelist));
            var list3 = singlelist.Concat(LS);
            foreach (var item in list3)
                Console.Write(item+" ");
            Console.WriteLine();
            var newlist= emptylistStudent1.DefaultIfEmpty(new Student1() { StudentID = 0, StudentName = "" });
            Console.WriteLine("Count newlist: "+newlist.Count());
            Console.WriteLine("Element in newlist: "+newlist.ElementAt(0).StudentID);

            var ec1=Enumerable.Empty<string>();
            var ec2=Enumerable.Empty<Student1>();
            Console.WriteLine("Count in ec1: "+ec1.Count());
            Console.WriteLine("Count in ec1: "+ec1.GetType().Name);
            Console.WriteLine("Count in ec2: "+ec2.Count());
            Console.WriteLine("Count in ec1: "+ec2.GetType().Name);
            Console.WriteLine("-----------------enumerable---------------------");
            var e1 = Enumerable.Range(10, 10);
            for (int i = 0; i < e1.Count(); i++)
            {
                Console.WriteLine("value at index {0} is {1}", i, e1.ElementAt(i));
            }
            Console.WriteLine("-------repeat-----------");
            var e2 = Enumerable.Repeat(10, 10);
            for (int i = 0; i < e2.Count(); i++)
            {
                Console.WriteLine("value at index {0} is {1}", i, e2.ElementAt(i));
            }
            Console.WriteLine("-------distinct-----------");
            var list4= new List<string>() { "one","two","three","one","three"};
            var list5= new List<int>() { 10,20,20,50,50,70,80,90,90,55,50};
            var list4Distinct=list4.Distinct();
            var list5Distinct=list5.Distinct();
            foreach (var item in list4Distinct)
            {
                Console.WriteLine(item);
            }
            foreach (var item in list5Distinct)
            {
                Console.WriteLine(item);
            }
            Console.WriteLine("-------except-----------");
            var ex1 = new List<string>() { "one","two","three","four","five","six","seven","eight"};
            var ex2 = new List<string>() { "five","six","seven","eight"};
            var ex3=ex1.Except(ex2);
            foreach (var item in ex3)
                { Console.WriteLine(item); }
            Console.WriteLine("-------intersect-----------");
            var ex4=ex1.Intersect(ex2);
            foreach (var item in ex4)
                { Console.WriteLine(item); }
            Console.WriteLine("-------union-----------");
            var ex5 = ex1.Union(ex2);
            foreach (var item in ex5)
            { Console.WriteLine(item); } 
            Console.WriteLine("-------skip-----------");
            var ex7 = ex1.Skip(2);
            foreach (var item in ex7)
            { Console.WriteLine(item); }
            Console.WriteLine("-------skip while-----------");
            var ex8 = ex1.SkipWhile(s => s.Length < 5);
            foreach (var item in ex8)
            { Console.WriteLine(item); }
            Console.WriteLine("-------take-----------");
            var ex9 = ex1.Take(6);
            foreach (var item in ex9)
            { Console.WriteLine(item); }
            Console.WriteLine("-------take while-----------");
            var ex10 = ex1.TakeWhile(s=>s.Length<5);
            foreach (var item in ex10)
            { Console.WriteLine(item); }
            var dic=new Dictionary<int, object>()
            { {1,"song" }, {2,"movie"},{3,"drama"}};
            Console.WriteLine("--------------dic------------");
            foreach (var item in dic)
                {Console.WriteLine(item.Key+" : "+item.Value); }
            Console.ReadLine();
        }
    }
    public class Student1
    {

        public int StudentID { get; set; }
        public string StudentName { get; set; }

    }
}
