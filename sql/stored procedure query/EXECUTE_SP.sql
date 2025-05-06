use Stored_Procedure
----------------------------1--------------------------------
EXEC SP_PlaceOrder
@CustomerID=6,
@BookID =7,
@QTY=10
SELECT * FROM Customers
SELECT * FROM Books
SELECT * FROM Orders
SELECT * FROM OrderItems
----------------------------2--------------------------------
EXEC SP_GetCustomerOrderHistory
@CustomerID=1
SELECT * from Customers
----------------------------3--------------------------------
EXEC SP_GetLowStockBooks
@Thresholdquantity=90
SELECT * from Books
----------------------------4--------------------------------
select * from Books
EXEC SP_UpdateBookPrice
@BookID=10,
@NewPrice=11.88
----------------------------5--------------------------------
EXEC SP_CancelOrder
@OrderID=11
SELECT * from Orders
select * from OrderItems
select * from Books
----------------------------6--------------------------------
EXEC SP_TopSellingBooks
@TopN=8
----------------------------7--------------------------------
EXEC SP_CustomerSpendingReport
@CustomerID=8
SELECT * from Orders
---------------------------8--------------------------------
EXEC SP_BooksbyAuthor
@AuthorName='Homer'
select * from Books
---------------------------9--------------------------------
EXEC SP_MonthlySalesReport
@Year=2025,
@Month=05
select * from Orders
select * from OrderItems
select * from Books
---------------------------10--------------------------------
EXEC SP_AddNewBook
@Title='It starts with us',@Author='Tony Stark',@Price=13.25,@StockQty=50
select * from Books