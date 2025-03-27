--Q-9. write a SQL query to find the highest purchase amount ordered by each customer. 
--Return customer ID, maximum purchase amount.
use assignment4
select customer_id,max(purch_amt) as max_purch_amt
from Tbl_Orders
group by customer_id