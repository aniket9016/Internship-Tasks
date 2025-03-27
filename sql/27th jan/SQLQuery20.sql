--Q-20. write a SQL query to find all those customers who does not have any grade. Return customer_id,
--cust_name, city, grade, salesman_id.
use assignment4
select * from Tbl_Customer
where grade is null