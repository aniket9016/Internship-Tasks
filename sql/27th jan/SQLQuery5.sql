--Q-5. write a SQL query to find salespeople who receive commissions between 0.12 and 0.14 
--(begin and end values are included). Return salesman_id, name, city, and commission.
use assignment4
select salesman_id,name,city,commission
from Tbl_Salesman
where commission between 0.12 and 0.14;