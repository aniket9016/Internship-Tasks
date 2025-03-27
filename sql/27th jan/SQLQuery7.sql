--Q-7. write a SQL query to retrieve the details of the salespeople whose names begin with any letter between
--'A' and 'L' (not inclusive). Return salesman_id, name, city, commission.
use assignment4
select salesman_id,name,city,commission
from Tbl_Salesman
where name like '[B-K]%' 