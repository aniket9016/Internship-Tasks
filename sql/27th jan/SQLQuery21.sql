--Q-21. write a SQL query to locate all customers with a grade value. Return customer_id, cust_name,city, 
--grade, salesman_id.
use assignment4
select * 
from Tbl_Customer
where grade is not null