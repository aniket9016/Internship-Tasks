--Q-4. write a SQL query to count the number of customers. Return number of customers.
use assignment4
select count(distinct customer_id) as number_of_customers 
from Tbl_Customer