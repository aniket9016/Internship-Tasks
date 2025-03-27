--Q-6. write a SQL query to select orders between 500 and 4000 (begin and end values are included).
--Exclude orders amount 948.50 and 1983.43. Return ord_no, purch_amt, ord_date, customer_id, and salesman_id.
use assignment4
select ord_no,purch_amt,ord_date,customer_id,salesman_id
from Tbl_Orders
where purch_amt <> 948.50 and purch_amt <> 1983.43