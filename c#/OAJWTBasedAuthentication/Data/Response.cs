﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class Response<T>
    {
        public string Message { get; set; }
        public int Status { get; set; }

    }
}
