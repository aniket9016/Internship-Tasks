--Q-13. write a SQL query to find the maximum order (purchase) amount in the range 2000 - 6000 (Begin and end values are 
--included.) by combination of each customer and order date. Return customer id, order date and maximum purchase amount.
use assignment4
select customer_id,ord_date,max(purch_amt) as maximum 
from Tbl_Orders
group by customer_id,ord_date
having max(purch_amt) between 2000 and 6000