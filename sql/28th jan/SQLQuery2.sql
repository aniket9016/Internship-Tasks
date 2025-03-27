--Q-2. write a SQL query to calculate the average purchase amount of all orders. Return average purchase amount.
use assignment4
select avg(purch_amt) as average_purchase_amount
from Tbl_Orders