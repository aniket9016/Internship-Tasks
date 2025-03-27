--Q-4. write a SQL query to retrieve the details of all customers whose ID belongs to any of the values 3007, 3008 or 3009.
--Return customer_id, cust_name, city, grade, and salesman_id.
use assignment4
select customer_id,cust_name,city,grade,salesman_id
from Tbl_Customer
where customer_id in (3007,3008,3009);