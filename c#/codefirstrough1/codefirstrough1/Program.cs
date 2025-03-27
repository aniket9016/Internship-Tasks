using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

public class Program
{
    public static void Main()
    {
        using (var ctx = new SchoolContext())
        {
            // Insert a Grade
            var grade = new Grade { GradeName = "Grade 10", Section = "A" };
            ctx.Grades.Add(grade);
            ctx.SaveChanges();
            Console.WriteLine("Grade saved successfully!");

            // Insert a Student linked to the Grade
            var student = new Student
            {
                StudentName = "Bill",
                DateOfBirth = new DateTime(2005, 5, 15),
                Height = 5.7m,
                Weight = 65.5f,
                Grade = grade // Linking student to grade
            };
            ctx.Students.Add(student);
            ctx.SaveChanges();
            Console.WriteLine("Student saved successfully!");

            // Fetch and display all students with grades
            Console.WriteLine("\nStudent List:");
            var students = ctx.Students.Include(s => s.Grade).ToList();
            foreach (var stud in students)
            {
                Console.WriteLine($"ID: {stud.StudentID}, Name: {stud.StudentName}, Grade: {stud.Grade?.GradeName}, Section: {stud.Grade?.Section}");
            }
        }
    }
}

// Entity Framework 6 DbContext
public class SchoolContext : DbContext
{
    public SchoolContext() : base("Data Source=(LocalDB)\\MSSQLLocalDB;Initial Catalog=SchoolDB1;Integrated Security=True") { }

    public DbSet<Student> Students { get; set; }
    public DbSet<Grade> Grades { get; set; }
}

// Student Entity
public class Student
{
    public int StudentID { get; set; }
    public string StudentName { get; set; } = string.Empty;
    public DateTime? DateOfBirth { get; set; }
    public byte[]? Photo { get; set; }
    public decimal Height { get; set; }
    public float Weight { get; set; }
    public Grade? Grade { get; set; }  // Foreign key relationship
}

// Grade Entity
public class Grade
{
    public int GradeId { get; set; }
    public string GradeName { get; set; } = string.Empty;
    public string Section { get; set; } = string.Empty;
    public ICollection<Student> Students { get; set; } = new List<Student>();
}
