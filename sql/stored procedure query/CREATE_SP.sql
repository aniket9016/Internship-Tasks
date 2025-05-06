use Stored_Procedure
----------------------------1--------------------------------
CREATE PROCEDURE SP_PlaceOrder
    @CustomerID int,
    @BookID int,
	@QTY int
AS
BEGIN
	declare @orderid int
    INSERT INTO Orders(CustomerID,OrderDate) values(@CustomerID,GETDATE())
	select top(1) @orderid=OrderID from Orders order by OrderDate desc 
	INSERT INTO OrderItems(OrderID,BookID,Quantity) values(@orderid,@BookID,@QTY)
	UPDATE Books SET StockQty = StockQty - @QTY WHERE BookID = @BookID;
END
----------------------------2--------------------------------
CREATE PROCEDURE SP_GetCustomerOrderHistory
    @CustomerID int
AS
BEGIN
    SELECT 
		o.CustomerID,oi.OrderID,b.Title,oi.Quantity,b.Price,sum(oi.Quantity*b.Price) AS 'Total_Sum'
	FROM
		Orders o
	JOIN OrderItems oi on oi.OrderID=o.OrderID
	JOIN Books b on b.BookID=oi.BookID
	where o.CustomerID=@CustomerID
	GROUP BY o.CustomerID,oi.OrderID,b.Title,oi.Quantity,b.Price
END
----------------------------3--------------------------------
CREATE PROCEDURE SP_GetLowStockBooks
    @Thresholdquantity int
AS
BEGIN
    SELECT *
	FROM Books
	where StockQty<@Thresholdquantity
END
----------------------------4--------------------------------
CREATE PROCEDURE SP_UpdateBookPrice
    @BookID int,
	@NewPrice decimal(10,2)
AS
BEGIN
	SELECT BookID,Title,Author,Price,@NewPrice as 'New Price',StockQty
	FROM Books WHERE BookID=@BookID
    UPDATE Books
	set Price=@NewPrice
	where BookID=@BookID
END
----------------------------5--------------------------------
CREATE PROCEDURE SP_CancelOrder
    @OrderID INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Orders WHERE OrderID = @OrderID)
    BEGIN
        PRINT 'Order not found.';
        RETURN;
    END
    UPDATE B
    SET B.StockQty = B.StockQty + OI.Quantity
    FROM Books B
    INNER JOIN OrderItems OI ON B.BookID = OI.BookID
    WHERE OI.OrderID = @OrderID;
    DELETE FROM OrderItems WHERE OrderID = @OrderID;
    DELETE FROM Orders WHERE OrderID = @OrderID;
    PRINT 'Order canceled and stock restored successfully.';
END;

----------------------------6--------------------------------
CREATE PROCEDURE SP_TopSellingBooks
    @TopN int=5
AS
BEGIN
	SELECT top (@TopN) b.BookID,b.Title,sum(o.Quantity) 'total quantity sold'
	from Books b
	join OrderItems o on o.BookID=b.BookID
	group by o.BookID,b.BookID,b.Title
	order by sum(o.Quantity) desc,BookID
END
----------------------------7--------------------------------
CREATE PROCEDURE SP_CustomerSpendingReport
    @CustomerID int
AS
BEGIN
	IF NOT EXISTS (SELECT 1 FROM Orders WHERE CustomerID = @CustomerID)
    BEGIN
        PRINT 'Customer not found.';
        RETURN;
    END
	SELECT o.CustomerID,o.OrderID,o.OrderDate,sum(oi.Quantity*b.Price) as 'Amount'
	FROM Orders o
	JOIN OrderItems oi on oi.OrderID=o.OrderID
	JOIN Books b on b.BookID=oi.BookID
	where o.CustomerID=@CustomerID
	group by o.CustomerID,o.OrderID,o.OrderDate
END
----------------------------8--------------------------------
CREATE PROCEDURE SP_BooksbyAuthor
    @AuthorName varchar(max)
AS
BEGIN
	IF NOT EXISTS (SELECT 1 FROM Books WHERE Author= @AuthorName)
    BEGIN
        PRINT 'Author not found.';
        RETURN;
    END
	SELECT BookID,Title,Price,StockQty
	FROM Books
	WHERE Author=@AuthorName
END
----------------------------9--------------------------------
CREATE PROCEDURE SP_MonthlySalesReport
    @Year int,
	@Month int
AS
BEGIN
	SELECT top(1) count(oi.OrderID) as 'total number of orders', sum(oi.Quantity*b.Price) as 'total revenue generated',b.Title
	FROM Orders o
	JOIN OrderItems oi on oi.OrderID=o.OrderID
	JOIN Books b on b.BookID=oi.BookID
	where year(OrderDate)=@Year and month(OrderDate)=@Month        
	group by oi.OrderID,b.Title,oi.Quantity,b.Price
	order by oi.Quantity desc
END
----------------------------10--------------------------------
CREATE PROCEDURE SP_AddNewBook
	@Title varchar(100),
	@Author varchar(100),
	@Price decimal(10,2),
	@StockQty int
AS
BEGIN
	INSERT INTO Books(Title,Author,Price,StockQty)VALUES(@Title,@Author,@Price,@StockQty)
	SELECT SCOPE_IDENTITY() AS BookID;
END
----------------------------11--------------------------------
CREATE PROCEDURE SP_UpdateCustomerEmail
	@CustomerID int,
	@NewEmail varchar(100)
AS
BEGIN
	UPDATE Customers SET Email=@NewEmail
	SELECT SCOPE_IDENTITY() AS NewEmail;
END
SELECT * FROM Customers