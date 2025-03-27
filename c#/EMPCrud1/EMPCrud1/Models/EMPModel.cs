using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EMPCrud1.Models
{
    public class EMPModel
    {
        public int Id { get; set; }
        public string Ename { get; set; }
        public string Job { get; set; }
        public double Salary { get; set; }
        public string Dname { get; set; }
    }
}