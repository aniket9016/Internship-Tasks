using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace rough23
{
    class Program
    {
        static void Main()
        {
            using (var context = new SchoolContext())
            {

                // Ensure a Grade exists before assigning it
                var existingGrade = context.Grades.FirstOrDefault();
                if (existingGrade == null)
                {
                    existingGrade = new Grade { GradeName = "Default Grade" };
                    context.Grades.Add(existingGrade);
                    context.SaveChanges();  // Save to get auto-generated GradeId
                }

                // Create and add a new student
                var newStudent = new Student()
                {
                    FirstName = "Bill",
                    LastName = "Gates",
                    Photo = new byte[0],  // Prevent null exception
                    GradeId = existingGrade.GradeId // Assign existing GradeId
                };

                context.Students.Add(newStudent);
                context.SaveChanges(); // Save Student

                Console.WriteLine("Student added successfully!");

                // Retrieve and update an existing student
                var student = context.Students.FirstOrDefault();
                if (student != null)
                {
                    student.LastName = "Friss";
                    context.SaveChanges(); // Save changes
                    Console.WriteLine("Student updated successfully!");
                }

                // Display states of tracked entities
                DisplayStates(context.ChangeTracker.Entries());
            }
        }

        static void DisplayStates(IEnumerable<EntityEntry> entries)
        {
            foreach (var entry in entries)
            {
                Console.WriteLine($"Entity: {entry.Entity.GetType().Name}, State: {entry.State}");
            }
        }
    }
}
