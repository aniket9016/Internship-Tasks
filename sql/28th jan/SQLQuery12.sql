--Q-12. write a SQL query to find the highest order (purchase) amount by each customer on a particular order date.
--Filter the result by highest order (purchase) amount above 2000.00. Return customer id, order date and maximum 
--purchase amount.
use assignment4
select customer_id,ord_date,max(purch_amt) as maximum 
from Tbl_Orders
group by customer_id,ord_date
having max(purch_amt)>2000