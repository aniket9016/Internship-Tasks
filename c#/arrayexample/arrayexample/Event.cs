using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace arrayexample
{

    // Publisher Class (Doorbell)
    public class Doorbell
    {
        // Step 1: Define a delegate
        public delegate void DoorbellRangHandler(string message);

        // Step 2: Define an event based on the delegate
        public event DoorbellRangHandler DoorRang;

        // Method to trigger the event
        public void PressButton()
        {
            Console.WriteLine("Doorbell: Someone pressed the doorbell!");

            // Step 3: Raise the event if there are subscribers
            DoorRang?.Invoke("Doorbell is ringing...");
        }
    }

    // Subscriber Class (Resident)
    public class Resident
    {
        // Method that will execute when the event is raised
        public void AnswerDoor(string message)
        {
            Console.WriteLine("Resident: " + message + " I'm opening the door!");
        }
    }

    // Main Program
    class Event
    {
        static void Main()
        {
            // Step 4: Create instances of Publisher (Doorbell) and Subscriber (Resident)
            Doorbell myDoorbell = new Doorbell();
            Resident myResident = new Resident();

            // Step 5: Subscribe the Resident to the DoorRang event
            myDoorbell.DoorRang += myResident.AnswerDoor;

            // Step 6: Simulate pressing the doorbell
            myDoorbell.PressButton();
            Console.ReadLine();
        }
    }
}