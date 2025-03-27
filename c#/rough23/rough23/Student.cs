using rough23;

public class Student
{
    public int StudentId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public byte[] Photo { get; set; }

    // Nullable Foreign Key
    public int? GradeId { get; set; }
    public Grade Grade { get; set; }
}
