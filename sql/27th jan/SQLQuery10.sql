--Q-10. write a SQL query to find the details of the customers whose names end with the letter 'n'. 
--Return customer_id, cust_name, city, grade, salesman_id.

use assignment4
select customer_id,cust_name,city,grade,salesman_id
from Tbl_Customer
where cust_name like '%n'
