-- Customers Table
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    JoinDate DATE NOT NULL
);

-- Books Table
CREATE TABLE Books (
    BookID INT PRIMARY KEY,
    Title VARCHAR(150) NOT NULL,
    Author VARCHAR(100) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    StockQty INT NOT NULL
);

-- Orders Table
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT NOT NULL,
    OrderDate DATE NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

-- OrderItems Table
CREATE TABLE OrderItems (
    OrderItemID INT PRIMARY KEY,
    OrderID INT NOT NULL,
    BookID INT NOT NULL,
    Quantity INT NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (BookID) REFERENCES Books(BookID)
);
INSERT INTO Customers (CustomerID, Name, Email, JoinDate) VALUES
(1, 'Alice Johnson', 'alice@example.com', '2023-01-15'),
(2, 'Bob Smith', 'bob@example.com', '2023-02-10'),
(3, 'Carol Davis', 'carol@example.com', '2023-03-05'),
(4, 'David Lee', 'david@example.com', '2023-04-01'),
(5, 'Eva Brown', 'eva@example.com', '2023-05-20'),
(6, 'Frank White', 'frank@example.com', '2023-06-12'),
(7, 'Grace Kim', 'grace@example.com', '2023-07-25'),
(8, 'Henry Clark', 'henry@example.com', '2023-08-30'),
(9, 'Ivy Wilson', 'ivy@example.com', '2023-09-14'),
(10, 'Jack Miller', 'jack@example.com', '2023-10-03');

INSERT INTO Books (BookID, Title, Author, Price, StockQty) VALUES
(1, 'The Great Gatsby', 'F. Scott Fitzgerald', 10.99, 100),
(2, 'To Kill a Mockingbird', 'Harper Lee', 12.50, 80),
(3, '1984', 'George Orwell', 9.75, 120),
(4, 'Pride and Prejudice', 'Jane Austen', 8.99, 70),
(5, 'Moby-Dick', 'Herman Melville', 11.45, 60),
(6, 'Hamlet', 'William Shakespeare', 7.25, 90),
(7, 'The Catcher in the Rye', 'J.D. Salinger', 10.10, 110),
(8, 'The Hobbit', 'J.R.R. Tolkien', 13.30, 95),
(9, 'War and Peace', 'Leo Tolstoy', 14.99, 40),
(10, 'The Odyssey', 'Homer', 9.20, 85);

INSERT INTO Orders (OrderID, CustomerID, OrderDate) VALUES
(1, 1, '2024-01-01'),
(2, 2, '2024-01-05'),
(3, 3, '2024-01-10'),
(4, 4, '2024-01-15'),
(5, 5, '2024-01-20'),
(6, 6, '2024-02-01'),
(7, 7, '2024-02-10'),
(8, 8, '2024-02-15'),
(9, 9, '2024-03-01'),
(10, 10, '2024-03-05');
INSERT INTO OrderItems (OrderItemID, OrderID, BookID, Quantity) VALUES
(1, 1, 1, 2),
(2, 1, 3, 1),
(3, 2, 2, 1),
(4, 3, 4, 3),
(5, 4, 5, 1),
(6, 5, 6, 2),
(7, 6, 7, 1),
(8, 7, 8, 2),
(9, 8, 9, 1),
(10, 9, 10, 1);

SELECT * FROM Customers;
SELECT * FROM Books;
SELECT * FROM Orders;
SELECT * FROM OrderItems;

