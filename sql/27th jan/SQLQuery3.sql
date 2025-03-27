--Q-3. write a SQL query to find the details of those salespeople who live in cities other than Paris and Rome.
--Return salesman_id, name, city, commission.
use assignment4

select salesman_id,name,city,commission
from Tbl_Salesman
where city <>'Paris' and city <>'Rome'