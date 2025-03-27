using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library_Management_System
{
    class Book
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string ISBN { get; set; }

        public Book(string title, string author, string isbn)
        {
            this.Title = title;
            this.Author = author;
            this.ISBN = isbn;
        }

        public virtual void Display()
        {
            Console.WriteLine($"Title: {Title}, Author: {Author}, ISBN: {ISBN}");
        }
    }

    class EBook : Book
    {
        public double FileSize { get; set; }
        public string Format { get; set; }

        public EBook(string title, string author, string isbn, double fileSize, string format)
            : base(title, author, isbn)
        {
            this.FileSize = fileSize;
            this.Format = format;
        }

        public override void Display()
        {
            Console.WriteLine($"[E-Book] Title: {Title}, Author: {Author}, ISBN: {ISBN}, File Size: {FileSize}MB, Format: {Format}");
        }
    }

    class Library
    {
        private List<Book> books = new List<Book>();

    public void AddBook(Book book)
        {
            books.Add(book);
            Console.WriteLine("Book added successfully.");
        }

        public void DisplayBooks()
        {
            if (books.Count == 0)
            {
                Console.WriteLine("No books available in the library.");
                return;
            }

            foreach (var book in books)
            {
                book.Display();
            }
        }

        public void RemoveBook(string isbn)
        {
            Book bookToRemove = books.Find(b => b.ISBN == isbn);
            if (bookToRemove != null)
            {
                books.Remove(bookToRemove);
                Console.WriteLine("Book removed successfully.");
            }
            else
            {
                Console.WriteLine("Book not found.");
            }
        }
    }

    class Program
    {
        static void Main()
        {
            Library library = new Library();
            while (true)
            {
                Console.WriteLine("\n---------------Library Management System-------------");
                Console.WriteLine("1. Add Book");
                Console.WriteLine("2. Add E-Book");
                Console.WriteLine("3. Display Books");
                Console.WriteLine("4. Remove Book");
                Console.WriteLine("5. Exit");
                Console.Write("Enter your choice: ");

                int choice;
                if (!int.TryParse(Console.ReadLine(), out choice))
                {
                    Console.WriteLine("Invalid input. Please enter a number between 1 and 5.");
                    continue;
                }

                switch (choice)
                {
                    case 1:
                        Console.Write("Enter Title: ");
                        string title = Console.ReadLine();
                        Console.Write("Enter Author: ");
                        string author = Console.ReadLine();
                        Console.Write("Enter ISBN: ");
                        string isbn = Console.ReadLine();
                        library.AddBook(new Book(title, author, isbn));
                        break;

                    case 2:
                        Console.Write("Enter Title: ");
                        string eTitle = Console.ReadLine();
                        Console.Write("Enter Author: ");
                        string eAuthor = Console.ReadLine();
                        Console.Write("Enter ISBN: ");
                        string eISBN = Console.ReadLine();
                        Console.Write("Enter File Size (MB): ");
                        double fileSize;
                        if (!double.TryParse(Console.ReadLine(), out fileSize))
                        {
                            Console.WriteLine("Invalid file size.");
                            break;
                        }
                        Console.Write("Enter Format: ");
                        string format = Console.ReadLine();
                        library.AddBook(new EBook(eTitle, eAuthor, eISBN, fileSize, format));
                        break;

                    case 3:
                        Console.WriteLine("\nLibrary Collection:");
                        library.DisplayBooks();
                        break;

                    case 4:
                        Console.Write("Enter ISBN of book to remove: ");
                        string removeISBN = Console.ReadLine();
                        library.RemoveBook(removeISBN);
                        break;

                    case 5:
                        Console.WriteLine("Exiting...");
                        return;

                    default:
                        Console.WriteLine("Invalid choice. Please enter a number between 1 and 5.");
                        break;
                }
            }
        }
    }
}
