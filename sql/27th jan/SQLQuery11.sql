--Q-11. write a SQL query to find the details of those salespeople whose names begin with ‘N’ and the fourth character 
--is 'l'. Rests may be any character. Return salesman_id, name, city, commission.
use assignment4
select * 
from Tbl_Salesman
where name like 'n__l%'