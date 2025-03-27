--Q-23. write a SQL query to compute the average price for unique companies. Return average price and company id.
use assignment4
select PRO_COM,avg(PRO_PRICE) as average
from Tbl_ItemMaster
group by PRO_COM