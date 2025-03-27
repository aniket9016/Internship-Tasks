--Q-16. write a SQL query to find the maximum order (purchase) amount for each customer. The customer ID should be in 
--the range 3002 and 3007(Begin and end values are included.). Filter the rows for maximum order (purchase) 
--amount is higher than 1000. Return customer id and maximum purchase amount.
use assignment4
select customer_id,max(purch_amt) as maximum 
from Tbl_Orders
group by customer_id
having (customer_id between 3002 and 3007) and max(purch_amt) >1000