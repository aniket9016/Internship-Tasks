--Q-10. write a SQL query to find the highest purchase amount ordered by each customer on a particular date. 
--Return, order date and highest purchase amount.
use assignment4
select ord_date,max(purch_amt) as max_purch_amt
from Tbl_Orders
group by ord_date,customer_id