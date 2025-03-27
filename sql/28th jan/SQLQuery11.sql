--Q-11. write a SQL query to determine the highest purchase amount made by each salesperson on '2012-08-17'. 
--Return salesperson ID, purchase amount.
use assignment4
select salesman_id,max(purch_amt) as max_purch_amt
from Tbl_Orders
where ord_date = '2012-08-17'
group by salesman_id