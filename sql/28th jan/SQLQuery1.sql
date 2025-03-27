--Q-1. write a SQL query to calculate total purchase amount of all orders. Return total purchase amount.
use assignment4
select sum(purch_amt) as total_purchase_amount
from Tbl_Orders
