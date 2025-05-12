use Stored_Procedure
------------------------------1------------------------------
--1. Get the top 3 most sold books in each category based on quantity sold. 
WITH BookSales AS (
    SELECT 
        b.Category,
        oi.BookID,
        SUM(oi.Quantity) AS TotalQuantity,
        ROW_NUMBER() OVER (
            PARTITION BY b.Category
            ORDER BY SUM(oi.Quantity) DESC
        ) AS rn
    FROM Books b
    JOIN OrderItems oi ON b.BookID = oi.BookID
    GROUP BY b.Category, oi.BookID
)
SELECT Category, BookID, TotalQuantity
FROM BookSales
WHERE rn <= 3
ORDER BY Category, TotalQuantity DESC;
------------------------------2------------------------------
--2. Create a procedure that returns the last 5 orders for a given CustomerID using ROW_NUMBER and CTE.
------------------------------3------------------------------
--3. Find customers who have ordered the same book in different orders. 
SELECT 
    o.CustomerID,
    c.Name,
    oi.BookID,
    b.Title,
    COUNT(DISTINCT o.OrderID) AS OrderCount
FROM 
    Orders o
JOIN 
    OrderItems oi ON o.OrderID = oi.OrderID
JOIN 
    Books b ON oi.BookID = b.BookID
JOIN 
    Customers c ON o.CustomerID = c.CustomerID
GROUP BY 
    o.CustomerID, c.Name, oi.BookID, b.Title
HAVING 
    COUNT(DISTINCT o.OrderID) > 1;
------------------------------4------------------------------
--4. For each month, return the top spending customer. 
------------------------------5------------------------------
--5. List books to be restocked using a temp table, based on past 30 days’ sales and current stock.
------------------------------6------------------------------
--6. Find customers who placed orders in 3 or more different months. 
SELECT 
    c.CustomerID,
    c.Name,
    COUNT(DISTINCT FORMAT(o.OrderDate, 'yyyy-MM')) AS DistinctMonths
FROM 
    Customers c
JOIN 
    Orders o ON c.CustomerID = o.CustomerID
GROUP BY 
    c.CustomerID, c.Name
HAVING 
    COUNT(DISTINCT FORMAT(o.OrderDate, 'yyyy-MM')) >= 3;
------------------------------7------------------------------
--7. List customers who haven’t placed any orders in the last year. 
SELECT c.CustomerID, c.Name
FROM Customers c
WHERE c.CustomerID NOT IN (
    SELECT DISTINCT o.CustomerID
    FROM Orders o
    WHERE o.OrderDate >= DATEADD(YEAR, -1, GETDATE())
);
------------------------------8------------------------------
--8. Maintain and retrieve price change history with old vs new values and who made the change.
------------------------------9------------------------------
--9. Show a rank of each book based on quantity ordered per customer.
------------------------------10	------------------------------
--10. For each order, find other books commonly bought together (market basket-style).
------------------------------11------------------------------
--11. Write a query Return the top-selling book for each week in a given year.

------------------------------12------------------------------
--12. Identify all books that have never been ordered by any customer.
SELECT b.Title
FROM Books b
LEFT JOIN OrderItems oi on oi.BookID=b.BookID
WHERE oi.BookID is null
------------------------------14------------------------------
--14. Write a procedure that identifies customers with duplicate emails (case-insensitive). 
SELECT LOWER(Email) AS 'Email', COUNT(*) AS 'Email count'
FROM Customers
GROUP BY LOWER(Email)
HAVING COUNT(*) > 1
------------------------------15------------------------------
--15. For each gender (from Customers table), return top 3 most ordered books. 
CREATE PROCEDURE SP_Top3Books_ByGender
AS
BEGIN
    WITH BookSalesByGender AS (
        SELECT 
            c.Gender,
            oi.BookID,
            SUM(oi.Quantity) AS TotalQuantity,
            ROW_NUMBER() OVER (
                PARTITION BY c.Gender
                ORDER BY SUM(oi.Quantity) DESC
            ) AS rn
        FROM Customers c
        JOIN Orders o ON c.CustomerID = o.CustomerID
        JOIN OrderItems oi ON o.OrderID = oi.OrderID
        GROUP BY c.Gender, oi.BookID
    )
    SELECT 
        Gender,
        BookID,
        TotalQuantity
    FROM BookSalesByGender
    WHERE rn <= 3
    ORDER BY Gender, TotalQuantity DESC;
END;
EXEC SP_Top3Books_ByGender
------------------------------16------------------------------
--16. Create a procedure to return each order's profit (SellingPrice - CostPrice * Quantity).
select * from Customers 