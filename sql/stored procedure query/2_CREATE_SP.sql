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
CREATE PROCEDURE SP_Last5OrdersByCustomer
    @CustomerID INT
AS
BEGIN
    WITH RankedOrders AS (
        SELECT *, ROW_NUMBER() OVER (ORDER BY OrderDate DESC) AS rn
        FROM Orders
        WHERE CustomerID = @CustomerID
    )
    SELECT * FROM RankedOrders WHERE rn <= 5
END;
EXEC SP_Last5OrdersByCustomer
@CustomerID=2
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
CREATE PROCEDURE SP_TopCustomerPerMonth
AS
BEGIN
    WITH MonthlySpending AS (
        SELECT 
            FORMAT(o.OrderDate, 'yyyy-MM') AS Month,
            o.CustomerID,
            SUM(oi.Quantity * b.Price) AS TotalSpent,
            ROW_NUMBER() OVER (
                PARTITION BY FORMAT(o.OrderDate, 'yyyy-MM')
                ORDER BY SUM(oi.Quantity * b.Price) DESC
            ) AS rn
        FROM Orders o
        JOIN OrderItems oi ON o.OrderID = oi.OrderID
		JOIN Books B ON b.BookID=oi.BookID
        GROUP BY FORMAT(o.OrderDate, 'yyyy-MM'), o.CustomerID
    )
    SELECT Month, CustomerID, TotalSpent
    FROM MonthlySpending
    WHERE rn = 1
    ORDER BY Month;
END;
EXEC SP_TopCustomerPerMonth
------------------------------5------------------------------
--5. List books to be restocked using a temp table, based on past 30 days’ sales and current stock.
CREATE PROCEDURE SP_BooksToRestock
AS
BEGIN
    CREATE TABLE #RestockList (
        BookID INT,
        Title NVARCHAR(255),
        SoldLast30Days INT,
        Stock INT
    );

    INSERT INTO #RestockList (BookID, Title, SoldLast30Days, Stock)
    SELECT 
        b.BookID,
        b.Title,
        ISNULL(SUM(oi.Quantity), 0) AS SoldLast30Days,
        b.StockQty
    FROM Books b
    LEFT JOIN OrderItems oi ON b.BookID = oi.BookID
    LEFT JOIN Orders o ON oi.OrderID = o.OrderID
        AND o.OrderDate >= DATEADD(DAY, -30, GETDATE())
    GROUP BY b.BookID, b.Title, b.StockQty

    SELECT * FROM #RestockList;

    DROP TABLE #RestockList;
END;
EXEC SP_BooksToRestock
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
CREATE PROCEDURE SP_BookRankPerCustomer
AS
BEGIN
    WITH BookRank AS (
        SELECT 
            o.CustomerID,
            oi.BookID,
            SUM(oi.Quantity) AS TotalQuantity,
            RANK() OVER (PARTITION BY o.CustomerID ORDER BY SUM(oi.Quantity) DESC) AS Rank
        FROM Orders o
        JOIN OrderItems oi ON o.OrderID = oi.OrderID
        GROUP BY o.CustomerID, oi.BookID
    )
    SELECT * FROM BookRank
    ORDER BY CustomerID, Rank;
END;
EXEC SP_BookRankPerCustomer
------------------------------10	------------------------------
--10. For each order, find other books commonly bought together (market basket-style).
CREATE PROCEDURE SP_BooksBoughtTogether
AS
BEGIN
    SELECT 
        a.BookID AS Book1,
        b.BookID AS Book2,
        COUNT(*) AS TimesBoughtTogether
    FROM OrderItems a
    JOIN OrderItems b ON a.OrderID = b.OrderID AND a.BookID < b.BookID
    GROUP BY a.BookID, b.BookID
    ORDER BY TimesBoughtTogether DESC;
END;
EXEC SP_BooksBoughtTogether
------------------------------11------------------------------
--11. Write a query Return the top-selling book for each week in a given year.
CREATE PROCEDURE SP_TopSellingBookPerWeek
    @Year INT
AS
BEGIN
    WITH WeeklySales AS (
        SELECT 
            DATEPART(WEEK, o.OrderDate) AS WeekNum,
            oi.BookID,
            SUM(oi.Quantity) AS TotalSold,
            RANK() OVER (
                PARTITION BY DATEPART(WEEK, o.OrderDate)
                ORDER BY SUM(oi.Quantity) DESC
            ) AS rn
        FROM Orders o
        JOIN OrderItems oi ON o.OrderID = oi.OrderID
        WHERE YEAR(o.OrderDate) = @Year
        GROUP BY DATEPART(WEEK, o.OrderDate), oi.BookID
    )
    SELECT WeekNum, BookID, TotalSold
    FROM WeeklySales
    WHERE rn = 1
    ORDER BY WeekNum;
END;
EXEC SP_TopSellingBookPerWeek
    @Year=2024
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
CREATE PROCEDURE SP_OrderProfits
AS
BEGIN
    SELECT 
        o.OrderID,
        oi.BookID,
        b.Title,
        (oi.Quantity * oi.SellingPrice) - (oi.Quantity * oi.CostPrice) AS Profit
    FROM Orders o
    JOIN OrderItems oi ON o.OrderID = oi.OrderID
    JOIN Books b ON oi.BookID = b.BookID
	ORDER BY oi.OrderID 
END;
EXEC SP_OrderProfits