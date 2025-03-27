--Q-9. write a SQL query to retrieve the details of the customers whose names begins with the letter 'B'. 
--Return customer_id, cust_name, city, grade, salesman_id.
use assignment4
select customer_id,cust_name,city,grade,salesman_id
from Tbl_Customer
where cust_name like 'B%' 