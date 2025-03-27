--Q-1. write a SQL query to find the details of those salespeople who come from the 'Paris' City or 'Rome' City. 
--Return salesman_id, name, city, commission.
use assignment4

select salesman_id,name,city,commission
from Tbl_Salesman
where city like 'Paris' or city like 'Rome'
