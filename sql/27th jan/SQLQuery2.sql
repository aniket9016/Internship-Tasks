--Q-2. write a SQL query to find the details of the salespeople who come from either 'Paris' or 'Rome'.
--Return salesman_id, name, city, commission.
use assignment4

select salesman_id,name,city,commission
from Tbl_Salesman
where city like 'Paris' or city like 'Rome'