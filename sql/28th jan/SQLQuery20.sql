--Q-20. write a SQL query to count the number of orders based on the combination of each order date and salesperson. 
--Return order date, salesperson id.
use assignment4
select ord_date,salesman_id,count(*) as no_of_orders
from Tbl_Orders
group by salesman_id,ord_date