using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Generic_NonGenericCollection.Properties
{
    public delegate void RectangleDelegate(double length, double breadth);
    class MultiCastDelegateEx
    {
        void AreaOfRectangle(double length,double breadth)
        {
            Console.WriteLine("Area of rectangle is : "+length*breadth);
        }
        void PerimeterOfRectangle(double length, double breadth)
        {
            Console.WriteLine("Perimeter of rectangle is : " + 2*(length + breadth));
        }
        public static void Main()
        {
            MultiCastDelegateEx m=new MultiCastDelegateEx();
            RectangleDelegate rec = m.AreaOfRectangle;
            rec += m.PerimeterOfRectangle;
            rec.Invoke(10.20,20.10);
            Console.WriteLine();
            rec.Invoke(15.56,5.55);
            Console.ReadLine();
        }
    }
}
