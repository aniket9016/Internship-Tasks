using disconnectedScenario;

var std = new Student() { FirstName = "Bill" };

using (var context = new SchoolContext())
{
    //1. Attach an entity to context with Added EntityState
    context.Add<Student>(std);

    //or the followings are also valid
    // context.Students.Add(std);
    // context.Entry<Student>(std).State = EntityState.Added;
    // context.Attach<Student>(std);

    //2. Calling SaveChanges to insert a new record into Students table
    context.SaveChanges();
}