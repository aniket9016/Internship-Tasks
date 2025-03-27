--Q-22. write a SQL query to count the number of products whose price are higher than or equal to 350. 
--Return number of products.
use assignment4
select count(*) as no_of_products
from Tbl_ItemMaster
where PRO_PRICE>=350