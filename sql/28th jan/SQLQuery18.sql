--Q-18. write a SQL query to count all the orders generated on '2012-08-17'. Return number of orders.
use assignment4
select count(*) as no_of_orders
from Tbl_Orders
where ord_date ='2012-08-17'