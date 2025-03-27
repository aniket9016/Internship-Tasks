--Q-8. write a SQL query to find the details of all salespeople except those whose names begin with any letter 
--between 'A' and 'L' (not inclusive). Return salesman_id, name, city, commission.
use assignment4
select salesman_id,name,city,commission
from Tbl_Salesman
where name not like '[B-K]%' 