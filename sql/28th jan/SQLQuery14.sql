--Q-14. write a SQL query to find the maximum order (purchase) amount based on the combination of each customer and 
--order date. Filter the rows for maximum order (purchase) amount is either 2000, 3000, 5760, 6000. Return customer id,
--order date and maximum purchase amount.
use assignment4
select customer_id,ord_date,max(purch_amt) as maximum 
from Tbl_Orders
group by customer_id,ord_date
having max(purch_amt) in(2000,3000,5760,6000);