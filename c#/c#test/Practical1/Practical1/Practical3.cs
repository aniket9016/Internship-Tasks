using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;

namespace PracticalTest
{
    public class TimeEventArgs:EventArgs
    {
        public DateTime CurrentTime { get; }
        public TimeEventArgs(DateTime currentTime)
        {
            CurrentTime = currentTime;
        }
    }
    public class Clock
    {
        public event EventHandler<TimeEventArgs> SecondChanged;
        public void Start()
        {
            while (true)
            {
                Thread.Sleep(1000);
                OnSecondChanged();
            }
        }
        protected virtual void OnSecondChanged()
        {
            SecondChanged?.Invoke(this, new TimeEventArgs(DateTime.Now));
        }
    }
    public class Display
    {
        public void Subscribe(Clock clock)
        {
            clock.SecondChanged += ShowTime;
        }
        private void ShowTime(object sender, TimeEventArgs e)
        {
            Console.Clear();
            Console.WriteLine($"Current Time: {e.CurrentTime:HH:mm:ss}");
        }
    }
    class Practical3
    {
        public static void Main()
        {
            Clock clock=new Clock();
            Display display=new Display();
            display.Subscribe(clock);
            clock.Start();
        }
    }
}